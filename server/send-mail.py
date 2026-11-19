#!/usr/bin/env python3
"""Casieria EHL — send one plain-text e-mail from the server (standard library only).
   python3 send-mail.py "subject" "body"
   Settings: /opt/casieria/mail.conf (root, 600), one "key: value" per line:
     smtp_host: smtp.gmail.com      smtp_port: 587 (STARTTLS) or 465 (SSL)
     smtp_user: adresa@gmail.com    smtp_pass: the 16-character Gmail app password (never the account password)
     from: adresa@gmail.com         to: owner@gmail.com (several: comma-separated)
     from_name: CasaEHL BackUP      (the name shown in the inbox)
     domain: casaehl.com            (used by backup-weekly.sh for the link)
"""
import smtplib, ssl, sys
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid

CONF = "/opt/casieria/mail.conf"

def read_conf(path):
    out = {}
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                if ":" in line and not line.lstrip().startswith("#"):
                    k, v = line.split(":", 1); out[k.strip()] = v.strip()
    except OSError:
        pass
    return out

def main():
    if len(sys.argv) < 3:
        print("usage: send-mail.py subject body", file=sys.stderr); return 2
    c = read_conf(CONF)
    need = [k for k in ("smtp_host", "smtp_user", "smtp_pass", "to") if not c.get(k)]
    if need:
        print("mail.conf incomplete, missing: " + ", ".join(need), file=sys.stderr); return 1
    msg = EmailMessage()
    msg["Subject"] = sys.argv[1]
    msg["From"] = formataddr((c.get("from_name") or "", c.get("from") or c["smtp_user"]))
    msg["To"] = c["to"]
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=c.get("domain") or "casieria.local")
    msg.set_content(sys.argv[2])
    port = int(c.get("smtp_port") or 587)
    ctx = ssl.create_default_context()
    def auth(s):
        # one AUTH PLAIN by hand: smtplib's login() retries with AUTH LOGIN after a 535 and Gmail then drops the
        # connection, which hides the real answer ("Username and Password not accepted") behind "connection closed"
        import base64
        code, text = s.docmd("AUTH PLAIN", base64.b64encode(("\0%s\0%s" % (c["smtp_user"], c["smtp_pass"])).encode()).decode())
        if code != 235:
            raise RuntimeError("SMTP %d %s — the app password does not belong to %s, or it was revoked" % (code, text.decode(errors="replace").split("\n")[0], c["smtp_user"]))
    try:
        if port == 465:
            with smtplib.SMTP_SSL(c["smtp_host"], port, context=ctx, timeout=30) as s:
                s.ehlo(c.get("domain") or "casieria.local"); auth(s); s.send_message(msg)
        else:
            with smtplib.SMTP(c["smtp_host"], port, timeout=30) as s:
                s.ehlo(c.get("domain") or "casieria.local"); s.starttls(context=ctx); s.ehlo(c.get("domain") or "casieria.local"); auth(s); s.send_message(msg)
    except Exception as e:  # the caller logs and keeps the link
        print("send failed: %s" % e, file=sys.stderr); return 1
    print("sent to " + c["to"]); return 0

if __name__ == "__main__":
    sys.exit(main())
