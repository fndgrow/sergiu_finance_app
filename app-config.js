/* Adresa serverului PocketBase. Gol = același domeniu de pe care s-a deschis aplicația (cazul normal).
   Pentru teste locale se poate pune de ex. "https://casa.example.com". */
window.PB_URL = "";
/* Cheia publică (site key) Cloudflare Turnstile: confirmarea „Sunt om” înainte de cod. Gol = fără confirmare.
   Secretul pereche stă numai pe server, în /opt/casieria/pb_data/turnstile.secret (vezi README §17a). */
window.TURNSTILE_SITE_KEY = "";
