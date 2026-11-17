#!/bin/bash
# Optional, decided by the owner: firewall + key-only SSH. Run on the server as root: bash harden_ssh_firewall.sh
echo "=== 2. firewall: only ssh, http, https"
ufw default deny incoming >/dev/null && ufw default allow outgoing >/dev/null
ufw allow 22/tcp >/dev/null; ufw allow 80/tcp >/dev/null; ufw allow 443/tcp >/dev/null
ufw --force enable >/dev/null
ufw status | sed 's/^/  /' | head -12

echo "=== 3. sshd: keys only (every successful login in the last 30 days was by key, as root)"
cat > /etc/ssh/sshd_config.d/00-hardening.conf <<'EOF'
# keys only; root stays reachable with its key (the server is administered as root over keys)
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
MaxAuthTries 4
EOF
if sshd -t; then systemctl reload ssh && echo "  sshd reloaded"; sshd -T 2>/dev/null | grep -E "^(passwordauthentication|permitrootlogin|maxauthtries) " | sed 's/^/  /'; else echo "  sshd config INVALID, removing"; rm /etc/ssh/sshd_config.d/00-hardening.conf; fi

