/* Casieria EHL — balances per currency (21 November 2026). Strict: what leaves in USD must be there in USD; lei never
   cover a dollar. Loaded from the hooks with require(__hooks + "/sold.js")($app, DynamicModel) — a handler runs in its own
   runtime, so helpers live in a module, as totp.js does. */
module.exports = function (app, DM) {
  function one(sql, bind) { var r = new DM({ v: "" }); app.db().newQuery(sql).bind(bind).one(r); return parseFloat(r.v || "0"); }
  function casierLower() { try { return String(app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim().toLowerCase(); } catch (err) { return ""; } }
  return {
    /* what a person holds in one currency: received in it from the till, plus exchanges into it, minus exchanges out of it,
       his cash expenses, the outflows and the cash rents he paid in it. xi / xc / xr: a row being edited is left out */
    persV: function (n, v, xi, xc, xr) {
      return one("SELECT CAST(" +
        "(SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
        " + (SELECT COALESCE(SUM(sumaIn),0) FROM schimburi WHERE TRIM(persoana)={:n} AND valutaIn={:v})" +
        " - (SELECT COALESCE(SUM(sumaDin),0) FROM schimburi WHERE TRIM(persoana)={:n} AND valutaDin={:v})" +
        " - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:xc})" +
        " - (SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:xi})" +
        " - (SELECT COALESCE(SUM(COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0)),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:xr})" +
        " AS TEXT) AS v", { n: String(n || "").trim(), v: v, xi: xi || "", xc: xc || "", xr: xr || "" });
    },
    /* what the EHL till holds in one currency: cash receipts minus what left it in cash — outflows, the cashier's cash
       rents and cash expenses. xi: an outflow being edited is left out */
    casaV: function (v, xi) {
      return one("SELECT CAST(" +
        "(SELECT COALESCE(SUM(suma),0) FROM incasari WHERE [[mod]]<>'Transfer' AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
        " - (SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE sursa='Casa' AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:xi})" +
        " - (SELECT COALESCE(SUM(COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0)),0) FROM chirii WHERE sursa='Casa' AND [[mod]]<>'Transfer' AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
        " - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND COALESCE(sursa,'')='' AND {:c}<>'' AND LOWER(TRIM(platitDe))={:c} AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
        " AS TEXT) AS v", { v: v, xi: xi || "", c: casierLower() });
    },
    casierLower: casierLower
  };
};
