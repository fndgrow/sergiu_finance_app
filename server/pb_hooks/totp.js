/* Casieria EHL — TOTP (RFC 6238, 30 s, 6 digits, HMAC-SHA1) and session lengths, for the PocketBase JS VM.
   The VM has no HMAC-SHA1, so SHA-1 is written out here. Loaded from the hooks with require("./totp.js"). */

function sha1(bytes) {
  var h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
  var ml = bytes.length, msg = bytes.slice();
  msg.push(0x80);
  while (msg.length % 64 !== 56) msg.push(0);
  var bits = ml * 8;
  for (var i = 7; i >= 0; i--) msg.push(i >= 4 ? 0 : (bits >>> (i * 8)) & 0xff);
  var w = new Array(80);
  for (var off = 0; off < msg.length; off += 64) {
    for (var t = 0; t < 16; t++) w[t] = ((msg[off + t * 4] << 24) | (msg[off + t * 4 + 1] << 16) | (msg[off + t * 4 + 2] << 8) | msg[off + t * 4 + 3]) >>> 0;
    for (t = 16; t < 80; t++) { var x = w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]; w[t] = ((x << 1) | (x >>> 31)) >>> 0; }
    var a = h0, b = h1, c = h2, d = h3, e = h4;
    for (t = 0; t < 80; t++) {
      var f, k;
      if (t < 20) { f = (b & c) | (~b & d); k = 0x5A827999; }
      else if (t < 40) { f = b ^ c ^ d; k = 0x6ED9EBA1; }
      else if (t < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC; }
      else { f = b ^ c ^ d; k = 0xCA62C1D6; }
      var tmp = ((((a << 5) | (a >>> 27)) >>> 0) + (f >>> 0) + e + k + w[t]) >>> 0;
      e = d; d = c; c = ((b << 30) | (b >>> 2)) >>> 0; b = a; a = tmp;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
  }
  var out = [];
  [h0, h1, h2, h3, h4].forEach(function (h) { out.push((h >>> 24) & 0xff, (h >>> 16) & 0xff, (h >>> 8) & 0xff, h & 0xff); });
  return out;
}
function hmacSha1(key, msg) {
  if (key.length > 64) key = sha1(key);
  var ipad = [], opad = [];
  for (var i = 0; i < 64; i++) { var k = i < key.length ? key[i] : 0; ipad.push(k ^ 0x36); opad.push(k ^ 0x5c); }
  return sha1(opad.concat(sha1(ipad.concat(msg))));
}
var B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Decode(s) {
  s = String(s || "").toUpperCase().replace(/[^A-Z2-7]/g, "");
  var bits = 0, val = 0, out = [];
  for (var i = 0; i < s.length; i++) {
    val = (val << 5) | B32.indexOf(s[i]); bits += 5;
    if (bits >= 8) { out.push((val >>> (bits - 8)) & 0xff); bits -= 8; val &= (1 << bits) - 1; }
  }
  return out;
}
/* the 6-digit code of one 30-second step */
function codeAt(secret, step) {
  var msg = [];
  for (var i = 7; i >= 0; i--) msg.push(i >= 4 ? 0 : Math.floor(step / Math.pow(256, i)) & 0xff);
  var h = hmacSha1(base32Decode(secret), msg), o = h[19] & 0x0f;
  var v = (((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]) % 1000000;
  return ("000000" + v).slice(-6);
}
function nowStep() { return Math.floor(Date.now() / 30000); }
/* returns the matching step (> lastStep, within ±1 step of now) or 0: a code is accepted once and never replayed */
function verify(secret, code, lastStep) {
  code = String(code || "").replace(/\s+/g, "");
  if (!/^[0-9]{6}$/.test(code) || !secret) return 0;
  var now = nowStep();
  for (var d = -1; d <= 1; d++) { var s = now + d; if (s > (lastStep || 0) && codeAt(secret, s) === code) return s; }
  return 0;
}
function newSecret() { return $security.randomStringWithAlphabet(32, B32); }
function uri(issuer, account, secret) { return "otpauth://totp/" + encodeURIComponent(issuer) + ":" + encodeURIComponent(account) + "?secret=" + secret + "&issuer=" + encodeURIComponent(issuer) + "&algorithm=SHA1&digits=6&period=30"; }

/* recovery codes: 8 codes like "k7m2-9x4p", kept as sha256 hashes */
function newRecovery() {
  var codes = [];
  for (var i = 0; i < 8; i++) codes.push($security.randomStringWithAlphabet(4, "abcdefghjkmnpqrstuvwxyz23456789") + "-" + $security.randomStringWithAlphabet(4, "abcdefghjkmnpqrstuvwxyz23456789"));
  return codes;
}
function hashCode(c) { return $security.sha256(String(c || "").trim().toLowerCase()); }

/* sessions: a director's ends at the next 05:00 in Chișinău (EET/EEST), a collaborator's after two days */
function chisinauOffsetHours(d) {
  var y = d.getUTCFullYear();
  var lastSun = function (m) { var x = new Date(Date.UTC(y, m + 1, 0)); return x.getUTCDate() - x.getUTCDay(); };
  var start = Date.UTC(y, 2, lastSun(2), 1), end = Date.UTC(y, 9, lastSun(9), 1);
  return (d.getTime() >= start && d.getTime() < end) ? 3 : 2;
}
function secondsUntilFive() {
  var now = new Date(), off = chisinauOffsetHours(now);
  var local = new Date(now.getTime() + off * 3600000);
  var next = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 5, 0, 0) - off * 3600000;
  if (next <= now.getTime() + 60000) next += 86400000;
  return Math.max(300, Math.floor((next - now.getTime()) / 1000));
}
var TWO_DAYS = 2 * 24 * 3600;

module.exports = { codeAt: codeAt, verify: verify, nowStep: nowStep, newSecret: newSecret, uri: uri, newRecovery: newRecovery, hashCode: hashCode, secondsUntilFive: secondsUntilFive, TWO_DAYS: TWO_DAYS, sha1: sha1, hmacSha1: hmacSha1, base32Decode: base32Decode };
