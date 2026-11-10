# Casieria EHL — how the application works inside

This is the technical description: how the code is organised, how data travels between the phone and the server, how the figures are computed, what happens on every action. For the user-facing description (what each figure means, how to enter operations) see [README.md](README.md). Everything a developer or designer needs to change the application without breaking it is here.

Contents

1. [The big picture](#1-the-big-picture)
2. [Files and their roles](#2-files-and-their-roles)
3. [Client: state in memory](#3-client-state-in-memory)
4. [Client: the render cycle](#4-client-the-render-cycle)
5. [Sign-in, lock screen and session, step by step](#5-sign-in-lock-screen-and-session-step-by-step)
6. [Loading data and live updates](#6-loading-data-and-live-updates)
7. [Writing data: online, offline, rejected](#7-writing-data-online-offline-rejected)
8. [Change history (jurnal)](#8-change-history-jurnal)
9. [The form engine](#9-the-form-engine)
10. [Calculations: calc()](#10-calculations-calc)
11. [Screens](#11-screens)
12. [The overview: charts](#12-the-overview-charts)
13. [Icons, currency badges, colours, category labels](#13-icons-currency-badges-colours-category-labels)
14. [Translations](#14-translations)
15. [Browser history and the back button](#15-browser-history-and-the-back-button)
16. [The desktop date picker](#16-the-desktop-date-picker)
17. [Responsive layout](#17-responsive-layout)
18. [PWA: installation and the offline cache](#18-pwa-installation-and-the-offline-cache)
19. [Excel export](#19-excel-export)
20. [Server: PocketBase](#20-server-pocketbase)
21. [Database schema: collections and fields](#21-database-schema-collections-and-fields)
22. [Access rules](#22-access-rules)
23. [Server hooks, line by line](#23-server-hooks-line-by-line)
24. [Deployment: what the scripts do](#24-deployment-what-the-scripts-do)
25. [Tests: what they check and how they work](#25-tests-what-they-check-and-how-they-work)
26. [How to make changes](#26-how-to-make-changes)
27. [Developer FAQ](#27-developer-faq)
28. [The firm's rules added on 6 November 2026](#28-the-firms-rules-added-on-6-november-2026)

---

## 1. The big picture

```
┌──────────── phone / computer ────────────────┐        ┌──────────── VPS Ubuntu ─────────────┐
│ index.html + styles.css + app.js (no build)   │ HTTPS  │ nginx :443  ──proxy──►  PocketBase  │
│ vendor/pocketbase.umd.js  (API client)        │◄──────►│ 127.0.0.1:8090                      │
│ sw.js (offline cache of the app files)        │  SSE   │   pb_public/  = the app files        │
│ localStorage: data cache, queue, session      │        │   pb_data/    = SQLite + backups     │
└───────────────────────────────────────────────┘        │   pb_hooks/   = server logic         │
                                                         │   pb_migrations/ = schema + rules    │
                                                         └──────────────────────────────────────┘
```

- **Client** — one HTML page and one logic file `app.js` (~2 400 lines), no framework, no build step. The whole interface is built as HTML strings by the `v…()` functions and inserted into `<main id="app">`.
- **Server** — PocketBase: a ready-made backend (Go) with a SQLite database, REST API, per-collection access rules, live updates over SSE and an admin UI. Our server logic is one JavaScript hooks file and four migration files.
- **Transport** — ordinary HTTPS requests through the PocketBase SDK plus one persistent SSE connection for updates. All requests go to the domain the app was opened from (`app-config.js` can point at another address for development).

## 2. Files and their roles

| File | Lines | What is inside |
|---|---|---|
| `index.html` | 43 | the shell: header (`.bar` with logo, title, signed-in user block, burger button, language button), `<main id="app">`, `<nav id="nav">`, containers `#sheet`, `#menu` and `#toasts`, script tags |
| `styles.css` | ~770 | theme variables (`:root`, dark theme), all styles, media queries for phones (≤ 899 px), 620/900/1200/1400/1800 px tiers and `hover:hover` |
| `app.js` | ~2 400 | all behaviour: translations, state, sign-in and lock screen, sync, calculations, forms, screens, charts, date picker |
| `app-config.js` | 3 | `window.PB_URL`, the server address; empty = same origin |
| `vendor/pocketbase.umd.js` | — | the official PocketBase JS SDK 0.28.2 |
| `sw.js` | 46 | service worker: caches the app files and libraries; the `CACHE` version |
| `manifest.json` | — | name, icons, colours for installing on a phone |
| `icons/` | — | PNG icons 192/512, maskable, apple-touch |
| `server/pb_migrations/1762000000_init.js` | 97 | creates every collection with its fields and rules |
| `server/pb_migrations/1762000001_settings.js` | 15 | trusts the X-Real-IP header, sets the app name |
| `server/pb_migrations/1762000002_backups.js` | 12 | daily backup at 03:00, keep 14 |
| `server/pb_migrations/1762000003_sursa.js` | 12 | the `sursa` field on expenses |
| `server/pb_migrations/1762000004_incasari_director.js` | 12 | client incomes are created by directors only |
| `server/pb_migrations/1762000005_incasari_confirmat.js` | — | `incasari.confirmat`: who confirmed a founder's money and when |
| `server/pb_migrations/1762000006_proiecte_contract.js` | — | `proiecte.sumaContract`, `proiecte.adaugator` |
| `server/pb_migrations/1762000007_cheltuieli_pentru.js` | — | `cheltuieli.pentru`: Proiect / EHL / Altele |
| `server/pb_migrations/1762000008_iesiri_sursa.js` | — | `iesiri.sursa`, `iesiri.platitDe`: paid from the till or from a collaborator's advance |
| `server/pb_migrations/1762000009_iesiri_director.js` | — | till outflows are created by directors only |
| `server/pb_migrations/1762000010_imprumuturi_director.js` | — | loans are created by directors only |
| `server/pb_migrations/1762000011_operator_citire.js` | — | list/view rules: a collaborator reads only what is his |
| `server/pb_hooks/ehl.pb.js` | 151 | sign-in by code, the director's password, record authorship, validations |
| `server/install.sh` | 85 | installs PocketBase as a service + nginx site + certificate |
| `server/nginx-site.conf` | 32 | nginx site template (proxy to 8090, security headers) |
| `deploy.sh` | 28 | copies the files to the server over scp and restarts the service |
| `tests/smoke.js` | — | end-to-end scenario against an in-memory fake of the server |
| `tests/calc.js` | — | the calculations against hand-computed figures |
| `tests/fill.js` | — | drives the live server through every form |
| `tests/seed-year.js` | — | the first generator of a year of history (API, from a computer) |
| `tests/seed-year-server.js` | — | the richer generator of a year of history, run on the server |
| `tests/verify-server.js` | — | recomputes every dashboard figure from the raw records, on the server |
| `tests/verify-ui.js` | — | the real app in jsdom against the live server, through an SSH tunnel |
| `tools/make-icons.ps1` | — | generates the PNG icons |

`app.js` is wrapped in a single function `(function(){ … })()`, so nothing leaks into the global scope, and the sections inside the file come in this order:

1. translations `I18N`, `T()`, the server-message map `SRV_MSG` and `srvT()`
2. helpers: `esc`, `n`, `fmt`, `money`, `today`, `monthName`, `workdays`, …
3. state and sign-in: `S`, `ACCESS`, `login`, `enter`, `logout`, the lock screen (`lockScreen`, `unlockScreen`), `subscribe`, `checkSelf`, the queue
4. lookups: `clienti()`, `persoane()`, `categorii()`, `catLabel()`, `catRaw()`, …
5. `calc()` — every calculation
6. icons, currency badges, form definitions `FORMS`
7. the data layer: `saveDoc`, `delDoc`, `logEntry`, `jurnalRows`
8. Excel: `buildWb`, `exportRun`
9. screens: `render`, `vPanou`, `vAdd`, `vReg`, `vSet`, …, the quick-jump menu `openMenu`
10. forms: `openForm`, `drawSheet`, `fieldHtml`, `submitForm`
11. the date picker: `enhanceDates`, `dpOpen`, …
12. event handlers (`click`, `input`, `change`, `submit`, `keydown`, `popstate`, `visibilitychange`)
13. start-up (`boot`)

## 3. Client: state in memory

All state lives in a few variables inside the closure.

| Variable | What it holds |
|---|---|
| `S` | the data: `S.incasari`, `S.cheltuieli`, `S.iesiri`, `S.chirii`, `S.contracte`, `S.angajati`, `S.istoric`, `S.pontaj`, `S.imprumuturi`, `S.proiecte`, `S.utilizatori` (arrays of records) and `S.cfg` (settings) |
| `COLS` / `DATA_COLS` | the lists of collection names; `DATA_COLS` without `utilizatori` |
| `PB` | the PocketBase SDK instance; `PB.authStore` holds the token and the user record (the SDK keeps them in localStorage under `pocketbase_auth`) |
| `ACCESS` | `null` (signed out) or `{user:{id,nume,rol,cod,status,parolaSetata}}` |
| `ME` | the id of the current user (= `ACCESS.user.id`); it marks "my records" |
| `isDir` | `true` when the role is Director; recomputed in every `render()` by `computeDir()` |
| `LOCKED`, `LOCKVIEW`, `hiddenAt`, `LOCK_AFTER` | the lock screen: whether the screen is covered, which view to return to, when the app went to the background, the 10-minute threshold |
| `view` | the current tab: `panou`, `add`, `reg`, `mine`, `set` |
| `regTab` | the register tab: `incasari`, …, `salarii`, `jurnal` |
| `regFilter` | the expense-register filter `{col, categorie, luna}` after tapping a category on the overview |
| `REGPAGE`, `REGCLOSED`, `REG_PG` | the current page per register, which month groups are folded, 15 rows per page |
| `GATE` | the sign-in step: `{step:"cod"}`, `{step:"cod", relock:true, …}`, `{step:"parola", cod}`, `{step:"setparola", cod}` |
| `OV` | the overview month `{luna:"2026-11"}` or `""` for all, and `OV.more` (the category list unfolded) |
| `JUR` | the history tab: month, rows, loading flag |
| `sheetState` | the open form: `{col, id, data, err}`; `null` when no form is open |
| `QUEUE` | operations waiting for the network (section 7) |
| `FAILED` | operations the server rejected |
| `online` | whether there is a network (from `online/offline` events and request errors) |
| `loaded`, `stale`, `dbErr` | flags for the data-state note |
| `installEvt` | the deferred `beforeinstallprompt` event for the install button |
| `lang` | `"ro"` or `"ru"` |
| `WIDE_MQ` | a media query for ≥ 1400 px; the charts pick their size from it |

localStorage holds only:

| Key | What |
|---|---|
| `pocketbase_auth` | token and user record (written by the SDK) |
| `ehl.lang` | the language |
| `ehl.cod` | the director's code, so the weekly password prompt does not need the code typed again as a full sign-in |
| `ehl.exp` | when the director's session expires (ms) |
| `ehl.cache` | a snapshot of `S` for offline use, bound to the user id |
| `ehl.queue.<user id>` | the queue of unsent operations, one per user (`qKey`); a shared `ehl.queue` from older versions is taken over once |
| `ehl.failed.<user id>` | the rejected operations, one list per user |

## 4. Client: the render cycle

There is no virtual DOM and no targeted updates: every state change ends with a call to `render()`, which rebuilds the HTML of the whole screen.

```
render():
  isDir = computeDir()
  if there is no ACCESS, or the screen is LOCKED → view = "panou" (the gate screen), body.locked = true
  update the header: title and document.title, <html lang>, role badge, logo (links home), burger button,
                     the signed-in user block (initials + name + role), the language button (icon + the other language)
  renderNav()                     – bottom (phone) or header (desktop) navigation
  h = needGate() ? vGate()
    : view==="panou" ? vPanou()
    : view==="add"   ? vAdd()
    : view==="reg"   ? vReg()
    : view==="mine"  ? vMine()
    : view==="set"   ? vSet()
  app.innerHTML = h
  dpClose(); enhanceDates(app)    – wraps date inputs in our calendar (desktop only)
```

Forms live separately in `#sheet` and are drawn by `drawSheet()`; `render()` does not touch them. While a form is open, incoming data updates **do not** call `render()` (the `if(!sheetState)` check), so typing is never disturbed. Closing a form (`closeSheetNow()`) calls `render()`.

The quick-jump menu (`#menu`, `openMenu()`) and the register picker on phones (`openRegPick()`) are overlays drawn on demand and removed by `closeMenu()`.

Every HTML string goes through `esc()`, so typed text can never become markup.

All clicks are handled by one delegated handler, `document.addEventListener("click", …)`, which looks at the `data-` attributes of the nearest element: `data-view`, `data-form`, `data-edit`, `data-tab`, `data-ovluna`, `data-cat`, `data-colab`, `data-lang`, `data-retry`, `data-page`, `data-grp`, `data-more`, `data-goto`, `data-menu-close` and so on. Handlers therefore survive every re-render.

## 5. Sign-in, lock screen and session, step by step

**Current state (the firm's decision):** the director's password is switched off — `PAROLA_DIRECTOR = false` in `ehl.pb.js` makes the login route answer a director exactly like an operator (a code, a 1-year token), and `PAROLA_DIR = false` in `app.js` hides the password card and drops a code remembered by the old flow. The lock screen asks the code at most once in 2 days: `ehl.unlock` holds the time of the last successful code entry (`markUnlock()`), and `lockDue()` compares it with `LOCK_AFTER` on start-up and when the page comes back to the foreground. The description below of the password steps applies once both flags are set back to `true`.

**Start-up (`boot`).**
1. If `window.PocketBase` did not load → `noCfg = true`, the "application is not configured" screen.
2. `PB = new PocketBase(PB_URL || location.origin)`; `PB.autoCancellation(false)` so parallel requests do not cancel each other.
3. If `PB.authStore` holds a valid token and a user record → `enter(record)` at once (no network needed), then **`lockScreen()`**: the code screen covers the app, and `selfCheck()` confirms the session with the server in the background.
4. Otherwise: if localStorage holds `ehl.cod` (a director whose token ran out) → `GATE = {step:"cod", relock:true, cod, weekly}`, the code screen that leads to the password; else the plain code screen.
5. The service worker is registered.

**Typing the code (`login(cod)`).** `POST /api/ehl/login {cod}`. Possible answers:
- `{token, record}` — an operator: the token is saved, `enter(record)`.
- `{needSetPassword:true}` — a director without a password (first sign-in): `GATE.step = "setparola"`, a two-field form; then `login(cod, "", parolaNoua)`.
- `{needPassword:true}` — a director with a password on a new phone: `GATE.step = "parola"`; then `login(cod, parola)`.
- `{token, record, expires}` — a director after the password: a 7-day token; `ehl.cod` and `ehl.exp` are written to localStorage.
- error 401 — "wrong code/password", 429 — "too many attempts" (the server's text, translated by `srvT`), network — "no connection".

**`enter(user)`** sets `ACCESS`, `ME`, `isDir`, the initial tab (`panou` for a director, `add` for an operator) and calls `subscribe()`.

**The lock screen (`lockScreen` / `unlockScreen`).** The code is asked again on every start of the app and whenever the page comes back after more than `LOCK_AFTER` (10 minutes) in the background (`visibilitychange`: `hiddenAt` is stamped when the page hides). `lockScreen()` keeps the session, data and queue intact: it sets `LOCKED = true`, remembers `LOCKVIEW = view`, closes any open sheet and renders the gate with `GATE = {step:"cod", relock:true, nume}`. `needGate()` is `!ACCESS || LOCKED`, so the navigation disappears and the gate shows the user's name. On submit the typed code is compared **locally** with `ACCESS.user.cod` (no server round trip, no rate-limit cost, works offline); a match calls `unlockScreen()`, which restores `LOCKVIEW`. The gate also offers "Schimbă utilizatorul" (`#gateother`): a full `logout()` that also drops `ehl.cod`/`ehl.exp`, so another person can sign in on the same phone.

**Weekly expiry.** `expiryCheck()` compares `ehl.exp` with the clock: in every `selfCheck()` (every 3 minutes, on returning to the tab, when the network comes back) and on a 401 from the server. When the week is over → `sessionExpired()`: `logout("")`, then `GATE = {step:"cod", relock:true, weekly:true, cod, nume}`. The director types the **code first** (compared with the remembered `ehl.cod`), then the password screen appears with the "a week has passed" note, and `login(cod, parola)` issues a fresh 7-day token. The server token really is dead at that point (it was issued for exactly 7 days), so the screen cannot be bypassed.

**Deactivating a user.** PocketBase list rules **filter** rather than refuse: a deactivated user would just get empty lists without an error. So the client reads **its own** record (`getOne(ME)`): for a deactivated user that returns 404, and `logout(T("gate_bad"))` follows. This happens in `subscribe()`, in `selfCheck()` and on a live update of the own record.

**Sign-out (`logout`).** Unsubscribes from updates, clears `S`, `ACCESS`, `LOCKED`, `PB.authStore` and the `ehl.cache` snapshot; an explicit "Schimbă utilizatorul" also removes `ehl.cod`/`ehl.exp`.

## 6. Loading data and live updates

`subscribe()`:
1. `unsubAll()`, `resetData()`, `loadCache()` — the data from `ehl.cache` is shown first (instantly, even offline), then the `ehl.queue` and `ehl.failed` lists are loaded.
2. For every collection in `DATA_COLS` (operators skip `istoric`): `PB.collection(col).getFullList({batch:1000})` → `S[col] = items.map(norm)`; `saveCache()`; `render()`.
3. `sub(col, "*", cb)` — a subscription to the collection's SSE events (`create`/`update`/`delete`); the handler `applyEvent()` inserts, replaces or removes the record in `S[col]` by `id`, saves the cache and re-renders (unless a form is open).
4. Users: a director loads and listens to the whole collection; an operator only to his own record by id.
5. `config`: one record; `normCfg()` parses the JSON fields in case they arrive as strings.
6. `flushQueue()` — sends whatever accumulated offline.

`norm(record)` copies the record and adds `ts = created`, so time sorting works the same for server and local records.

A 10-second timer: if the data has not arrived, `stale = true` and the "data may be out of date" note shows.

Subscriptions are only used when the browser has `EventSource` (`RT`); otherwise the app works through reloads.

## 7. Writing data: online, offline, rejected

The single write entry points are `saveDoc(col, data, id)` (create when `id` is empty, otherwise update) and `delDoc(col, id)`.

```
saveDoc:
  body = clean(data)                 – strip id, by, ts, created, updated and other system fields
  (for utilizatori on create add a random password/passwordConfirm – PocketBase requires them,
   the server overwrites them anyway)
  if online and the queue is empty and the id is not temporary:
      PB.collection(col).create/update → applyEvent(…)  (the record lands in S immediately)
      on a network error → online=false → localWrite(…)
  else:
      localWrite(…)
  then logEntry("add"|"edit", col, id, copy)   – the history entry
```

`localWrite(op)` is the offline path:
- applies the operation to `S` immediately (a new record gets a temporary id `tmp…`, the author `ME`, the time "now");
- if it edits or deletes a record that is still in the queue as an unsent create, the change is **folded into** that queue item (a delete removes it); the server only ever sees the final state;
- otherwise it appends the operation to `QUEUE`, saves `ehl.queue` and calls `flushQueue()`.

`flushQueue()` sends operations **strictly in order**, one at a time:
- `create` → after the answer, the temporary id is replaced with the real one everywhere: in `S`, in later queue operations (`q.id`, `q.data.ref`, `q.data.data.id`), so history entries reference the right id;
- `update` / `delete` → the matching call; a 404 on delete counts as success;
- a network error → `online = false`, the queue stays, a retry follows the `online` event;
- a 401/403 → sign-out (the session is invalid);
- any other server error (400: an access rule or a validation, such as an empty description) → the operation **moves to `FAILED`** with the error text and time. Nothing is ever dropped silently.

`FAILED` is shown by `failedNote()` in a red note at the top of every screen: which record, the amount, the reason (translated by `srvT`); "Retry" puts it back into the queue, "Delete" needs two taps.

**Ids and lost answers.** The id of a new record is made on the client (`newId()`, 15 characters like PocketBase's own) and sent with the create. When a create reached the server but its answer was lost, the retry is refused with a validation error on the `id` field; `flushQueue()` reads that as "already there" and drops the operation, so a bad connection never doubles a record. Operations queued by older versions carry a `tmp…` id and no `data.id`; they still get a server id as described above.

**One queue per user.** `QUEUE` and `FAILED` are stored under the user's id. `logout()` empties them in memory only, so the next person on the phone never sends someone else's records; they go out when their author signs in again. When storage is full, `saveQueue()` drops the `ehl.cache` snapshot to make room: the snapshot can be reloaded, unsent records cannot.

Why an online write bypasses the queue only when the queue is **empty**: otherwise ordering would break (a new record could overtake an older one it refers to).

The "Save" button is disabled while the request runs (`btn.disabled`), so a double tap never creates two records.

## 8. Change history (jurnal)

`logEntry(act, col, ref, data)` creates a record in the `jurnal` collection: `{act: add|edit|del, col, ref: the record id, nume: the author's name, data: a copy of the record at that moment}`. The author `by` and the time `created` are set by the server. For a delete, `data` is the record **before** deletion (copied from `S`).

History entries also go through the queue when there is no network. The collection rules forbid `update` and `delete` to everyone except the superuser.

Reading: `jurnalRows(luna)` requests the entries whose `created` falls inside the month (`luna` is checked against `^[0-9]{4}-[0-9]{2}$` so nothing else can reach the filter), sorted by time descending. The `vJurnal()` screen groups them by day; `jurSum()` builds each row's caption through the `REGDEF` of the collection.

## 9. The form engine

Every form is described by **data**, not markup — the `FORMS` object:

```js
FORMS.cheltuieli = { title:"a_chelt", icon:"up", fields:function(){ return [
  {k:"data",      t:"date",   l:"f_data",      req:1, def:today()},
  {k:"suma",      t:"number", l:"f_sumamdl",   req:1, step:"0.01"},
  {k:"descriere", t:"text",   l:"f_descr_req", req:1, hint:"f_descr_h", minlen:3},
  {k:"categorie", t:"text",   l:"f_categ",     req:1, list:categorii()},
  …
  {k:"sursa", t:"select", l:"src_t", req:1, opts:[…], def:"Avans", showIf:function(d){return d.mod!=="Transfer"}}
]}}
```

Field properties:

| Property | Meaning |
|---|---|
| `k` | the field name in the record |
| `t` | type: `text`, `number`, `date`, `month`, `select`, `checkbox`, `multi` (a set of chips) |
| `l` | the translation key of the label |
| `req` | required |
| `def` | the default for a new record |
| `list` | suggestions (`<datalist>`) from values already entered |
| `opts` | options for `select`/`multi` |
| `half` | two adjacent `half` fields share one row |
| `showIf(d)` | shown only under a condition (for example `luna` only for salaries) |
| `lockIf(d)` | the field is locked at 1 (the rate when the currency is MDL) |
| `newOnly` | only on create (the "left the till now" checkbox of a loan) |
| `hint` | a hint under the field |
| `minlen` | minimum text length |
| `onchg` | internal |

`fields()` is a function, not an array, because suggestion lists and options depend on the current data (clients, projects, people, currencies).

**Opening:** `openForm(col, id)` builds `sheetState.data` from the record (or from `def`), calls `sheetOpened()` (a browser-history entry) and `drawSheet()`.

**`drawSheet()`** builds the HTML: the title, the fields through `fieldHtml()` (`half` pairs are wrapped in `.pair`), the `calc` block (for example "equivalent in MDL" — `FORMS[col].calc(d)` returns labels and values), the "Save" and (for a director, on edit) "Delete" buttons, the `<datalist>`s. The category field shows categories through `catLabel()` (translated) and the typed value is mapped back by `catRaw()` to the stored Romanian name, so the data never splits in two.

**Typing:** the `input` handler writes `sheetState.data[k] = value` and refreshes the `calc` block without redrawing the form. The `change` handler redraws the form when something other fields depend on changes: the currency (fill the rate from settings), the outflow destination, the payment mode, checkboxes, the employee/month in a timesheet.

**Saving (`submitForm`):**
1. required fields (`req`) honouring `showIf`/`newOnly`, then `minlen`;
2. special branches: `utilizatori` (code uniqueness, the 4–8 digit format, no self-demotion/deactivation, optionally create the employee and salary history), `angajati` (a new salary → a new `istoric` row), `imprumuturi` (optionally create the cash outflow);
3. the general branch: build `b` from the fields (numbers through `n()`, strings trimmed), force `curs=1` when `valuta==="MDL"`, `saveDoc(col, b, id)`;
4. success → `closeSheet()` + a toast; error → the text in the form (403 → "no rights", otherwise "no connection").

Delete: the "Delete" button turns into "Yes, delete" on the first tap and calls `delDoc` on the second.

## 10. Calculations: calc()

`calc()` runs on every dashboard render and returns an object `C` with every total. It never writes to `S`. The helper `sum(arr, f)` adds `f(r)` over the array and rounds to cents (`round2`).

Order of computation:

1. **Per currency** (`vals` from settings): `intratNum[v]`, `intratTr[v]`, `iesDepus[v]`, `iesPers[v]` (without the cashier), `iesSal[v]`, `iesImpr[v]`, `iesAlte[v]`, `iesChirii[v]` (rent paid in cash in that currency), `iesCheltCasier[v]` (MDL only: the cashier's cash expenses). `iesTotal[v]` is their sum; `ramas[v] = intratNum[v] − iesTotal[v]`; `ramasMDL[v] = ramas[v] × cursAzi(v)`; `casaMDL = Σ ramasMDL`.
2. **In MDL by row** (each row's own rate): `incTotal`, `incNumMDL`, `incTrMDL`, `cheltTotal`, `cheltNum`, `cheltTr`, `depusMDL`, `salPlatitMDL`, `avansMDL`, `chiriiMDL`, `chiriiTrMDL`.
3. **The account:** `contMDL = incTrMDL + depusMDL − cheltTr − chiriiTrMDL`.
4. **Collaborators:** the names from "Dat persoanei" outflows and cash expenses (without the cashier); for each `primit`, `cheltuit`, `proprii` (own money), `transfer` (informative), `ramas = primit − cheltuit`. `colabRamas = Σ ramas`.
5. **The firm's total:** `totalFirma = casaMDL + contMDL + colabRamas`.
6. **By client, project, category:** `perClient` (incomes − expenses), `proiecte` (budget, spent, received, percent), `perProiect` (projects without a card), `perCateg`.
7. **Contracts:** by client name `incCash`, `incTr`, the remainders, `contrPct`.
8. **Salaries:** for every timesheet `wd = workdays(luna)` = 24 (the firm's rule: every month counts 24 working days, `ZILE_LUNA`), `sal = salariuLa(angajat, month end)`, `pretZi = sal / 24`, `s1 = z1 × pretZi` (days 1–15), `s2 = z2 × pretZi` (days 16–end), `total = s1 + s2`; by month `castigat`, `platit` (Salarii outflows with that `luna`), `rest`. Salaries are paid every two weeks, so the timesheet form and the Salarii register show both halves.
9. **Loans:** `imprTotal`, `imprRestituit` (Achitat), `imprRamas`, `imprRestante` (due date < today and not Achitat), by person.

`salariuLa(angajat, data)` finds the `istoric` row with the largest `dinData ≤ data`; if there is none, the earliest row.

Name comparison is `sameP(a,b)`: `trim` + lower case.

## 11. Screens

| Function | Screen | Who |
|---|---|---|
| `vGate()` → `vPin()` | sign-in: code / password / set password; the lock screen (with the user's name and "Schimbă utilizatorul"); the install block | signed out or locked |
| `vPanou()` | the overview: `vOverview()` + tiles + sections built with `statCard()` | director (an operator sees `vPin()`, the director's code prompt) |
| `vAdd()` | the action cards (`FORMS`), `vWho()` (who I am), `vMyBalance()` (my balance), the "correct order" steps, install, sign-out | everyone |
| `vReg()` | the registers by tab (`REGDEF`/`REGTBL`), the filter, `vSalarii()`, `vJurnal()` | director |
| `vMine()` | my last 60 records (`r.by === ME`) | operator |
| `vSet()` | `vUsers()`, then `setCard()` blocks: currencies, cashier, password, categories, export; sign-out; install | director |
| `openColab(name)` | the per-collaborator detail sheet (not a form) | everyone, on tap |
| `openMenu()` | the quick-jump menu: a list of the dashboard blocks in on-screen order, built by `dashBlocks()`; tapping scrolls to the block | director, from the burger |
| `openRegPick()` | on phones: a dropdown naming every register with its row count | director |

`REGDEF` describes how a record of each collection is shown as a row: `main` (title), `sub` (subtitle), `amt` (amount with its currency badge), `cls` (colour), `meta` (date etc.). The same functions serve the history and "Ale mele".

`REGTBL` adds the desktop table view: for each register the heading of the second column (`th`), the icon and colour of the row (`ic`), the "who and how" column (`how`) and the MDL value used for the month total (`mdl`). `regTable()` renders rows grouped by month (`<tbody class="g">`, a `data-grp` header row that folds the group; folded groups are remembered in `REGCLOSED`), with the month's record count and total. `vReg()` renders **both** the table and the phone cards for the same rows; CSS shows one or the other, so a test must count distinct ids, not elements. Long registers are paged 15 rows at a time (`REG_PG`, `pager()`, `REGPAGE`).

The set of cards on "Add" (`order`) is wider for a director: "Project" and "User" are added.

`statusNote()` — the state notes at the top: rejected records, no network, N records waiting, server error, loading, stale data.

## 12. The overview: charts

`vOverview()` builds: the month chips (`monthsBack(6)` + "all"), the expenses card and the cash-flow card (side by side on wide screens, container `.dash-ov`).

`ovData(luna)`:
- the month's expenses by category (`byCat`), sorted descending; with more than 7 categories, the seventh onwards fold into "Alte categorii" (slot 7);
- `total`, `inc` (the month's incomes in MDL), `prev` (last month's expenses for the percentage), `months` (6 months of incomes and expenses).

`donutSvg(cats, total)` — on phones and laptops an SVG 340×300 with a ring of radius 62 and stroke 22, badges and percent labels for slices ≥ 6 %; on wide screens (`WIDE_MQ`, ≥ 1400 px) a "bare" 172×172 ring (radius 74, stroke 24) without labels, because the list beside it carries them. Each slice is a `<circle>` with `stroke-dasharray = slice length − 2px` (a two-pixel gap) and `stroke-dashoffset`, rotated −90° to start at the top. Badges are plain `<g>` groups with the category outline (**not** nested `<svg>`, whose size browsers ignore). The centre shows the total abbreviated (`fmtK`: 23k, 1,2M). Slices, badges, the legend and the list rows carry `data-cat` — a tap opens the expense register filtered. The category list under the ring is folded by default and opens with "Detalii" (`data-more`, remembered in `OV.more`).

`flowSvg(months)` — an SVG 320×130 (640×250 on wide screens): two bars per month (incomes slot 3, expenses slot 2), bar width 13 (22 wide), rounded tops, scaled to the maximum; the selected month is highlighted, the others dimmed; a `<rect class="hit">` across each group catches the tap (`data-ovluna`).

Colours are the slots `--s1…--s7` (section 13). Label text always uses the theme's text colour, never the series colour.

## 13. Icons, currency badges, colours, category labels

**Icons** — the `ICONS` object: name → SVG contents (outlines on a 24×24 grid, stroke 1.8, round caps). `icon(name)` wraps them in `<svg class="ic-svg" … stroke="currentColor">`, so the colour comes from CSS. Used in the navigation, the header (logo, burger, globe), action cards, register rows and category badges. `DEST_IC` maps outflow destinations to icon + colour, `REG_IC` registers to icons.

**Category icon** — `catIcon(name)`: the `CAT_ICON_RULES` table of regular expressions over Romanian and Russian keywords (`material|материал` → bricks, `transport|транспорт|taxi` → truck, …); an unknown category gets a tag.

**Category colour** — `catSlot(name)`: the category's position in the settings list modulo 7 → slot `--s(N+1)`. So a colour sticks to its category, not to its rank in a given month.

**Category labels** — categories are **stored** as typed (the defaults are Romanian). `CAT_RU` maps the common Romanian names to Russian, `CAT_RO` is its inverse; `catLabel()` shows the name in the interface language, `catRaw()` maps what was typed in a form back to the stored name.

**The series palette** (`--s1…--s7`) — a validated categorical palette: blue, orange, teal, yellow, magenta, violet, green; the dark theme has its own steps of the same hues. It was checked for distinguishability under colour-vision deficiency and for contrast on the card background.

**Currency badges** — `CUR`: code → symbol and colour (`MDL` "L" accent green, `EUR` "€" blue, `USD` "$" green, `RON` "L" yellow; GBP/UAH/RUB prepared). `curBadge(cod, withCode)` draws the round badge and, optionally, the code beside it. An unknown currency gets a grey badge with its first letter.

**Avatars** — `initials(name)` and `toneOf(name)` give the signed-in user block and the collaborator rows a two-letter avatar on a colour derived from the name.

**Theme** — variables on `:root`: `--paper`, `--surface`, `--surface-2`, `--ink`, `--muted`, `--line`, `--accent`, `--pos`, `--neg`, `--warn`, the fonts `--d` (Archivo: headings and figures) and `--b` (Public Sans: text). The dark theme switches on with the system setting (`prefers-color-scheme`) or the `data-theme="dark"` attribute on `<html>`.

## 14. Translations

`I18N.ro` and `I18N.ru` are flat dictionaries key → string (313 keys each). `T(key)` returns the translation for the current language, falling back to Romanian, then to the key itself. Every label, field, button and message goes through `T()`; values stored in the database (`Numerar`, `Transfer`, `Dat persoanei`, `Activ`, statuses) are always Romanian and are translated only for display.

**Server messages** come in Romanian; `SRV_MSG` maps every known message text to a translation key and `srvT()` shows it in the interface language (sign-in errors, password errors, rejected records in `FAILED`).

The language button is a single one (`#langbtn`): it shows a globe icon and the code of the **other** language; a tap changes `lang`, writes `ehl.lang`, re-renders the screen and any open form. `render()` also updates `document.title` and `<html lang>`.

Month names come from `monthName("2026-11")` through the language's list; short names are the first three letters. A handful of labels (Excel column headers, "working days", the calendar buttons) are inline `lang==="ru" ? … : …` ternaries rather than dictionary keys.

## 15. Browser history and the back button

The phone's back button (and swipe) would otherwise close the app. So:
- opening any form or sheet, `sheetOpened()` does `history.pushState({v:view, sheet:true})`;
- changing the tab — `histPush({v:view})`;
- `closeSheet()` does not close the form itself but calls `history.back()` when the top history entry is a sheet; the `popstate` handler closes it (`closeSheetNow()`), so the ✕, Esc and the system back button behave the same;
- a `popstate` with a `{v}` state switches the tab.

On start-up `history.replaceState({v:view})`.

## 16. The desktop date picker

Native date pickers look foreign on a computer and fine on phones. So `COARSE = matchMedia("(pointer: coarse)")` detects a touch device: nothing changes there. On a computer, `enhanceDates(root)` runs after every render, finds `input[type=date|month]` without `data-dp`, wraps each in `.dp-wrap`, hides the real input (it keeps `data-k`, its name, the ISO value and all handlers) and adds a visible `readonly` field showing `dd.mm.yyyy` (or "noiembrie 2026" for a month).

A click on the visible field → `dpOpen()`: the single popover `#dpop` is filled by `dpRender()` (a header with arrows, a Mon–Sun grid with the neighbouring months dimmed, or a 12-month grid; today outlined, the selection filled; "Clear" and "Today" buttons) and positioned under the field with the screen edge in mind. Picking → `dpSet(v)`: writes the ISO value into the hidden input, dispatches `input` and `change` (the ordinary form handlers catch them), updates the visible field, closes. It also closes on Esc, an outside click, scrolling and resizing.

## 17. Responsive layout

The base is mobile: one column, a bottom navigation, forms as full-screen sheets (`.sheet` fills the window).

| Threshold | What changes |
|---|---|
| ≤ 899 px (phones) | the bottom navigation with pill-shaped active icons; the header shows the burger (quick-jump menu) and hides the name text; registers show cards, the register picker button and the quick-jump menu; the dashboard blocks are reordered for a narrow screen |
| ≥ 620 px | tiles 4 per row, action cards 3 per row |
| ≥ 900 px | the navigation moves into the header (`nav` becomes a centred row of pill tabs), content is a centred 1240 px column, "Add" is two columns (`.add-layout`: actions left, guidance right), the overview puts `.dash-ov` cards side by side and `.dash-grid` in two columns, tiles 5 per row; registers switch to the month-grouped table; settings `.set-grid` in two columns; forms become a centred window `.sheet-in` on a dimmed backdrop, limited to the window height, scrolling inside |
| ≥ 1200 px | the header shows the signed-in user's name and role beside the avatar |
| ≥ 1400 px | a 1400 px column, action cards 4 per row; the charts take their wide sizes (`WIDE_MQ`) |
| ≥ 1800 px (27"+) | 17 px type, a 1760 px column, cards 5 per row, the overview in three columns, larger charts, settings in three columns |
| `hover:hover` | hover states only on devices with a mouse |

The sign-in and lock screens on wide displays are a narrow centred column (`body.locked`).

Phone safe areas (notch, home gesture) are honoured through `env(safe-area-inset-*)`.

## 18. PWA: installation and the offline cache

`manifest.json` sets the name, icons (including maskable), colours (white theme and background since the redesign), `display: standalone`. `index.html` carries the iOS meta tags.

`sw.js`:
- on install it caches the shell files (`SHELL`: html, css, js, SDK, manifest, icons) under `CACHE`;
- on activate it deletes caches of other versions (so **every change to the files needs the `CACHE` number bumped**, or phones keep the old version until the browser cache expires);
- requests to `/api/` and `/_/` are left alone (API, SSE, admin UI);
- own files are served "network first, cache on failure" (updates arrive at once, offline still works);
- libraries from cdnjs/jsdelivr and fonts are "cache first".

The install button (`installNote()`): if a `beforeinstallprompt` event arrived (Chrome/Edge), a button calls `installEvt.prompt()`; otherwise platform instructions are shown (iPhone through Safari's Share sheet, other phones through Chrome, computers through the address-bar icon). In installed mode (`display-mode: standalone`) the block is hidden.

## 19. Excel export

The ExcelJS library loads from a CDN (with a fallback address), `defer`. `exportRun(luna, doar)`:
1. waits for the library (up to 4 s), otherwise falls back to CSV (`exportCSV`);
2. loads the month's history if needed (`jurnalRows`);
3. `buildWb()` creates the workbook: the "Panou" sheet (`wsPanou`: title, summary, till by currency, collaborators, clients, categories — with fills and formats), then one sheet per register through `wsAdd(wb, name, columns, rows, totals)`: frozen header, autofilter, zebra rows, date format `dd.mm.yyyy` and amount format `#,##0.00`, a totals row;
4. `wb.xlsx.writeBuffer()` → `downloadBlob()` creates a link with `download` and clicks it.

The "only the chosen month" filter is `inM(r)` over `dateOf(r)`.

## 20. Server: PocketBase

PocketBase runs with this command (from `casieria.service`):

```
/opt/casieria/pocketbase serve --http=127.0.0.1:8090 --dir=/opt/casieria/pb_data \
   --publicDir=/opt/casieria/pb_public --hooksDir=/opt/casieria/pb_hooks --migrationsDir=/opt/casieria/pb_migrations
```

- `pb_public` is served as static files at the domain root — that is the app;
- the REST API lives under `/api/collections/<name>/records`, live updates at `/api/realtime` (SSE), our routes under `/api/ehl/…`;
- the admin UI is `/_/` (the superuser from `ADMIN.txt`);
- on start-up new files from `pb_migrations` are applied (by name, once; the applied list is kept in the database);
- `*.pb.js` hooks load at start-up and reload when the file changes.

nginx accepts HTTPS on the domain and proxies everything to 8090 with the `X-Real-IP`, `X-Forwarded-*`, `Upgrade/Connection` headers; `proxy_buffering off` and `proxy_read_timeout 600s` are needed for SSE. The security headers are added at the nginx level.

PocketBase settings made by migrations: `trustedProxy.headers = ["X-Real-IP"]` (so the attempt limit counts the client's address, not nginx's), the app name, the daily backup.

## 21. Database schema: collections and fields

Every record has the system fields `id` (15 characters; new records get it on the client, see section 7), `created`, `updated`. Every register has `by` (a relation to `utilizatori`, set by the server).

| Collection | Fields |
|---|---|
| `utilizatori` (auth) | `nume` text; `rol` select Operator/Director; `cod` text 4–8 digits, unique index; `status` select Activ/Inactiv; `parolaSetata` bool; system `email`, `password`, `verified`, `tokenKey` (email and password are random; `tokenKey` is refreshed on every sign-in: one session per account) |
| `incasari` | `data`, `client` (a client or a founder = a director's name), `proiect`, `descriere`, `valuta` text; `curs`, `suma` number; `mod` text (Numerar/Transfer; a transfer is always MDL); `confirmat` text (set by the server for a founder's money) |
| `cheltuieli` | `data`, `categorie`, `descriere`, `pentru` (Proiect/EHL/Altele), `client`, `proiect`, `platitDe`, `mod`, `sursa` (Avans/Proprii/empty) text; `suma` number |
| `iesiri` | `data`, `destinatie` (Dat persoanei/Depus pe cont/Salarii/Împrumut/Restituire fondator/Alte), `valuta`, `persoana`, `luna` (YYYY-MM), `nota`, `sursa` (Casa/Avans), `platitDe`; `curs`, `suma` |
| `chirii` | `dataInceput`, `dataSfarsit`, `locatia`, `chirias`, `valuta`, `mod`, `nota`; `curs`, `chirie`, `gaj`, `comunale`, `avarii` |
| `contracte` | `client`, `nota`; `sumaContract`, `deIncasatCash` |
| `imprumuturi` | `data`, `persoana`, `termen`, `status` (Neachitat/Achitat), `nota`; `suma` |
| `proiecte` | `nume`, `client`, `responsabili` (names separated by commas), `dataInceput`, `termen`, `status` (Activ/Pauză/Finalizat), `nota`; `buget`, `sumaContract`, `adaugator` |
| `angajati` | `nume`, `dataInceput`, `status` |
| `istoric` | `angajat`, `dinData`; `salariu` |
| `pontaj` | `luna`, `angajat`; `z1`, `z2` |
| `jurnal` | `act` (add/edit/del), `col`, `ref`, `nume`; `data` JSON |
| `config` | `valute` JSON `[{cod, curs}]`; `casier` text; `categorii` JSON `[…]` |
| `login_attempts` | `ip`; written only by the server |

Dates are stored as **text** in ISO form (`2026-11-02`) so comparisons and the export do not depend on time zones; amounts are numbers. People, clients and projects are referenced by **name** (text); a rename is propagated by the client (`renamePerson`), and the server hooks compare names exactly (SQLite's `LOWER()` knows ASCII only, so it is not used on names).

## 22. Access rules

Rules are PocketBase expressions on the collections (`1762000000_init.js`, changed by `…0004`, `…0009`, `…0010`, `…0011`). The base expressions:

```
MEMBER   = @request.auth.id != "" && @request.auth.status != "Inactiv"
DIRECTOR = @request.auth.rol = "Director" && @request.auth.status != "Inactiv"
OWN_OR_DIR = DIRECTOR || (MEMBER && by = @request.auth.id)
```

| Collection | list/view | create | update | delete |
|---|---|---|---|---|
| `incasari` | DIRECTOR | DIRECTOR (+ founder code hook) | OWN_OR_DIR (+ the 15-day hook) | DIRECTOR |
| `cheltuieli` | DIRECTOR or MEMBER with `by = auth.id` or `platitDe = auth.nume` | MEMBER (+ the collaborator's cash-balance hook) | OWN_OR_DIR (+ hooks) | DIRECTOR |
| `iesiri` | DIRECTOR or MEMBER with `by = auth.id` or `persoana = auth.nume` | DIRECTOR | OWN_OR_DIR (+ hooks) | DIRECTOR |
| `imprumuturi` | DIRECTOR | DIRECTOR | OWN_OR_DIR | DIRECTOR |
| `contracte` | DIRECTOR | MEMBER | OWN_OR_DIR | DIRECTOR |
| `chirii`, `angajati` | OWN_OR_DIR | MEMBER | OWN_OR_DIR (+ the 15-day hook) | DIRECTOR |
| `proiecte` | MEMBER | MEMBER | OWN_OR_DIR | DIRECTOR |
| `istoric` | DIRECTOR | DIRECTOR | DIRECTOR | DIRECTOR |
| `pontaj` | OWN_OR_DIR | MEMBER (+ own-employee hook) | OWN_OR_DIR (+ hook) | DIRECTOR |
| `utilizatori` | DIRECTOR or `id = @request.auth.id && status != "Inactiv"` | DIRECTOR | DIRECTOR | DIRECTOR |
| `jurnal` | DIRECTOR | MEMBER | null | null |
| `config` | MEMBER | DIRECTOR | DIRECTOR | null |
| `login_attempts` | null | null | null | null |

`null` means superuser only. An important PocketBase trait: a `list` rule acts as a filter (records that do not match are simply left out of the answer), while `view`/`update`/`delete` return 404 on a mismatch. A request with a dead or missing token is treated as a stranger: lists come back empty and a single record answers 404, never 401 — the client therefore asks `auth-refresh` why it was signed out (`signedOut()`, section 28).

A collaborator's client still asks for every collection; the ones he may not read simply come back empty, so the loading code is the same for both roles.

## 23. Server hooks, line by line

File `server/pb_hooks/ehl.pb.js`. In the PocketBase JS engine handlers cannot see functions declared outside them, so everything is written inside each handler (that is why create and update handlers repeat the same lines).

**`routerUse` (every request).** Anything outside `/api/` and `/_/` — the app files — is answered with `Cache-Control: no-cache`, so a browser revalidates them instead of keeping an old `app.js` for hours.

**`POST /api/ehl/login`**
1. `cod` is taken from the body; the format is `^[0-9]{4,8}$`, otherwise 400.
2. `ip = e.realIP()`. The `login_attempts` rows with that ip in the last 15 minutes are counted; 8 or more → 429.
3. The user is looked up by `cod`. If none is found and the collection holds **zero** users → a director is created with that code, plus a `config` record with default currencies and categories; `first = true`.
4. No user or `Inactiv` → an attempt is recorded (rows older than a day are purged) and 401 follows.
5. `PAROLA_DIRECTOR = false` (the current state): operators and directors alike get `rec.refreshTokenKey(); $app.save(rec)` and then `rec.newAuthToken()` (1 year). Refreshing the token key is what makes it **one session per account**: every token issued before stops working.
6. With `PAROLA_DIRECTOR = true` a director goes through `needSetPassword` / `needPassword` and gets a static 7-day token, as before.

**`POST /api/ehl/password`** — unchanged; only reachable in the client when the password is on.

**Every register, create/update:** `by` is set on create and restored on update; a non-director editing a row created more than 15 days ago gets a 400.

**`utilizatori`** create/update/delete — code validation, default status/role, random email and password, no self-deactivation, no self-demotion, no self-delete.

**`incasari`, create/update — the founder's code.** When `client` is exactly the name of a user with `rol = Director`, the body must carry `codFondator` equal to that founder's `cod` (it is not a schema field, so it is never stored); otherwise 400 "Codul fondatorului este greșit.". On success `confirmat = "<name> · <UTC date time>"`; for an ordinary client `confirmat` is emptied.

**`iesiri`, create/update — the source.** On create: a director or the cashier → `sursa = "Casa"`, `platitDe = ""`; anyone else → `sursa = "Avans"`, `platitDe = his name`. On update both are restored. (Since migration `…0009` only directors can create outflows, so "Avans" is unreachable; the code path stays.)

**`pontaj`, create/update.** A non-director may name only an employee from `angajati` with `by = auth.id`; otherwise 400.

**`cheltuieli`, create/update — the collaborator.** For a non-director who is not the cashier: `platitDe` is forced to his own name; for cash `sursa = "Avans"` and the amount may not exceed what the director gave him minus his cash expenses (he cannot go below zero); a transfer is not limited by his balance, nor by the account (it may go below zero).

**`cheltuieli`, create/update — the description:** at least 3 characters after `trim`.

## 24. Deployment: what the scripts do

**`deploy.sh user@host`** (from a computer): creates the folders on the server, copies `index.html styles.css app.js app-config.js sw.js manifest.json`, the icons and the SDK into `pb_public`, the hooks into `pb_hooks`, the migrations into `pb_migrations`, `install.sh` and the nginx template into `/opt/casieria`; if the service is already installed — `systemctl restart casieria`. The restart applies new migrations; hooks reload even without it.

**`install.sh DOMAIN EMAIL [PASSWORD]`** (on the server, once): installs `unzip`; downloads the required PocketBase version (`PB_VERSION`) from GitHub and unpacks it; `pocketbase migrate up` applies the schema; creates/updates the superuser; writes the `casieria.service` unit (autostart, restart on crash, log in `std.log`); enables the service and checks `/api/health`; unless `SKIP_NGINX=1` — copies the site template with the domain and port filled in, enables it, `nginx -t`, reloads nginx, obtains a certificate with `certbot --nginx` and a redirect to HTTPS.

**`reset.sh`** (on the server, tests only; not in the repository): stops the service, deletes `pb_data`, re-applies the migrations and the superuser, starts. **It deletes all data.**

Upgrading PocketBase: change `PB_VERSION` in `install.sh`, copy it to the server, run `install.sh` again (it re-downloads the binary and restarts the service; the data is untouched).

## 25. Tests: what they check and how they work

All tests run on Node.js; the interface tests use jsdom (a browser without a window). `npm install jsdom` is needed once (not saved in the repository).

**`tests/smoke.js`** loads `index.html` + `app.js` in jsdom, replaces `window.PocketBase` with an in-memory **fake** of the server that mirrors the access rules and the sign-in route, and walks through: the gate and the language button, the director's first sign-in and password set-up, creating users and employees, the desktop date picker, the back button, an income in euro and an expense, the dashboard figures, the overview with its donut and category filter (counting distinct record ids, because the redesign renders a table row and a card for each record), refusing an expense without a description, every register tab, the history, the offline queue (a record without network, an edit folded into the queue, the flush when the network returns, the temporary id replaced), sign-out and sign-in as an operator, the employee balance, the weekly expiry (code first, then the password), the password change, the lock screen after 10 minutes in the background (wrong code refused, right code returns to the same view), deactivating an operator, a wrong code. Any error in the window console also counts as a failure.

**`tests/calc.js`** — a fixed set of records with hand-computed answers (till by currency, the account, an employee balance with own money, the firm's total, a contract, a salary, loans, the donut shares) following the workbook rules; it compares them with the dashboard text. It guards the formulas against accidental change.

**`tests/fill.js`** — the same jsdom, but with the **real** SDK and the real server (through an SSH tunnel): it goes through every form as a user would. It leaves the data behind. Test databases only.

**`tests/seed-year.js`** — the first generator of 12 months of history through the API from a computer (projects, contracts, instalments, advances, expenses, salaries, timesheets, rent, deposits, loans); it watches the cash in the till so it never goes negative; it writes history entries like the app. Deterministic.

**`tests/seed-year-server.js`** — the richer generator, run **on the server** as root (`node seed-year-server.js [--wipe]`): it reads the superuser from `ADMIN.txt`, impersonates the director, creates operators (who then write their own expenses with their own tokens), employees with salary raises, a cashier, six projects with contracts, incomes in four currencies, salaries paid for the previous month with two tight months, a holiday, a hire and a leaver, rent with a deposit and damage, loans with their outflows and a repayment, edits and a delete in the history. It refuses to run on a non-empty database; `--wipe` empties everything except the director first. It keeps an independent ledger and saves it as `/root/casieria-seed-expected.json`.

**`tests/verify-server.js`** — run on the server: fetches every record as the director, recomputes every dashboard figure with the README formulas independently of `app.js`, compares them with the generator's ledger, flags negative shelves, missing descriptions and the like, and saves `/root/casieria-verify.json`.

**`tests/verify-ui.js`** — run from a computer with the real SDK against `ssh -N -L 18090:127.0.0.1:8090 <server>` and a director impersonation token (`DIR_TOKEN`): it starts with a stored session (the lock screen appears), unlocks with the code, compares every figure on the dashboard with `verify.json`, opens every register and the history, the collaborator sheet, signs out, signs in as an operator by code and checks his balance, "Ale mele" and his project list, and confirms a deactivated code is refused.

Server rules were additionally checked with a scenario of ~45 curl requests against a live PocketBase (bootstrap, passwords, operator rights, history immutability, the attempt limit).

## 26. How to make changes

1. **Looks:** `styles.css`. Colours and fonts are the variables at the top; the mobile base is the upper part of the file, the phone-only rules are `@media (max-width:899px)`, the desktop tiers are the media queries at the end. Icons are the `ICONS` object in `app.js` (24×24 outlines).
2. **Texts:** the `I18N.ro` and `I18N.ru` dictionaries; when adding a key, add it to both. A new server message also needs a row in `SRV_MSG`.
3. **A new form field:** add its description to `FORMS.<collection>.fields`, the field to a migration (a new file `176…_name.js` with `collection.fields.add(...)`), and if needed to `REGDEF`/`REGTBL` (register display), `calc()` and the Excel export (`buildWb`).
4. **A new server rule or validation:** a hook in `ehl.pb.js`; make sure the client form checks the same thing beforehand (so a record does not land in `FAILED` needlessly).
5. **Before deploying:** bump `CACHE` in `sw.js`; `node tests/smoke.js .` and `node tests/calc.js .` must print `ALL GOOD`; then `bash deploy.sh user@host`.
6. **Commits:** the `main` branch is what gets deployed; design work is best done on a branch and merged through a pull request.

## 27. Developer FAQ

**Why no framework and no build?** The app is small, one logic file, a full re-render takes milliseconds, and no build means anyone can edit the files and deploy them without installing tools.

**Why are the calculations on the client, not the server?** All of the firm's data fits in a phone's memory (tens of thousands of rows), and computing from the full set of records on the fly guarantees the figures always agree with the registers. The server is responsible for rights, authorship and the immutability of the history. When the data grows very large, a "period closing" with carried-over balances will be added (see the README's limitations).

**Why are the lists loaded whole?** For the same reason: the totals are cumulative. On sign-in one request per collection, then only change events over SSE.

**What if two people edit the same record?** The last write on the server wins; both edits are visible in the history with their authors and values, so it can be sorted out.

**What if a phone with an open session is lost?** The code is asked on every start and after 10 minutes in the background, so a found phone shows only the lock screen. The director also deactivates the user (status Inactiv), and the token stops working on the very next request. For a director, changing the password voids all of their sessions.

**Why is the lock screen checked locally rather than on the server?** The session is already valid; the lock only protects against someone picking up the phone. A local comparison works offline and does not consume the server's attempt limit. The server still verifies the session every 3 minutes and on every write.

**How do I add a currency?** In settings: code and rate. The shelf appears by itself. The badge is grey with the first letter; a coloured one can be added to `CUR`.

**Where does the rate in old rows come from?** From the row itself: the rate is written on entry and never changes. The rate in settings only affects today's conversion of the till balances to MDL and the pre-filled value in new forms.

## 28. The firm's rules added on 6 November 2026

Everything below was asked for by the directors while the app went into use. Where a rule is enforced is named each time: **client** means `app.js` only (it can be bypassed with a raw API call and relies on the data on the device), **server** means a collection rule or a hook.

**Sign-in and sessions**
- Directors sign in by code alone (`PAROLA_DIRECTOR` / `PAROLA_DIR` = false). *server + client.*
- The lock screen asks the code at most once in 2 days: `ehl.unlock` in localStorage holds the last entry, `lockDue()` compares it with `LOCK_AFTER`. *client.*
- One session per account: a sign-in refreshes the token key. The other device learns it from its next request, from the 3-minute `selfCheck()`, or at once from the realtime update of its own user record; `signedOut()` calls `authRefresh()` — 401 means "opened on another device" (`sess_other`), anything else a deactivated user. *server + client.*
- A page left open reloads itself when `sw.js` on the server names a newer cache version (`verCheck()`, never while a form is open). `sw.js` fetches the shell with `cache: "no-cache"`. *client + the cache header on the server.*

**People**
- Several directors with equal rights; every register row shows `byLine(r)` ("introdus de …").
- Deactivated users leave the list for `vArhiva()` with a restore button.
- `renamePerson(old, new)` rewrites the name in every register and in the cashier setting when a director renames a user or an employee. *client.*
- Salary changes: the employee form carries `dinSal` ("Salariul se aplică din"); a new `istoric` row is written from that date, a second change for the same date updates that row. Operators add employees without a salary.

**The till, the account, the founders**
- The till cannot be overdrawn: `casaNeed` / `casaErr` refuse an outflow, a cash rent or a loan above the shelf of that currency. *client (director's device).*
- The account holds lei only: a transfer income or a transfer rent is fixed to MDL (`mdlIf` on the currency field); a deposit from the till may come from any currency shelf and reaches the account as `suma × curs` lei. Unlike the till it **may go below zero**: a transfer is always accepted, and `contDeficit(C)` feeds the dashboard block "Contul este în minus" — the amount to put on the account and the newest transfer payments that took it there. *client.*
- Founders are the directors. An income picks its source from `fondatori()` first, then the real clients; a founder's money needs `codFondator` and is a **loan to the firm**: `C.fond` (per founder: put in, returned, owed) is rendered right under the dashboard totals, the outflow destination "Restituire fondator" repays it, and founders are left out of `C.perClient`. *code check: client + server.*

**Projects and expenses**
- A project carries `sumaContract` and `adaugator`; `projInc(name)` splits what the client paid into cash and transfer from the incomes naming the project.
- An expense is for a project, for the firm or for something else (`pentru`, `pentruOf()`); "Proiect" requires the project. `C.perPentru` feeds a dashboard block.
- A transfer expense is paid by the account: `C.trPers` lists who paid by transfer; the cash report (`C.colab`) no longer lists people who only paid by transfer.

**Collaborators**
- Cards: Cheltuială, Chirie, Pontaj, Angajat. No income, no till outflow, no loan, no contract, no project card. *client + create rules.*
- Nobody picks the payer of an expense: it is the account that records it (`platitDe` is set by the client and forced by the hook). A director or the cashier pays cash from the till (`isTillPayer`), and money handed to them never leaves the till; the only exception is a salary a director pays to a collaborator account, which comes out of that collaborator's advance. The same for rents (`chirii.sursa`, `chirii.platitDe`, migration `…0020`): a collaborator's cash rent comes out of his advance (`C.colab[].chirii`, the hook checks his balance), a director's or the cashier's out of the till. A collaborator pays his expenses himself: cash comes out of what the director gave him and cannot go below zero (`avansErr`, and the hook); a transfer is paid by the firm's account, whatever its balance. The payer and the source are not his to choose.
- He fills timesheets only for the employees he created. *client + server.*
- He reads only what is his (migration `…0011`). His "Panou" is `vPanouOp()`: `mineView()` swaps the registers for his rows (his advances play the incomes), so the director's overview and `calc()` are reused unchanged, then adds his tiles, his expenses by category / target / project, the money he received and `mineList()` — every operation he entered.

**Live updates after a pause**
- Events missed while the page sat in the background or offline never come again, so `refreshData()` fetches every list afresh (no reset) on every return to the foreground, on every reconnection and every 3 minutes, then redraws — unless a form is open.

**Writes**
- New records get their id on the client; a create repeated after a lost answer is recognised by the validation error on `id` and dropped from the queue.
- The queue and the rejected list are stored per user (`ehl.queue.<id>`, `ehl.failed.<id>`).

**The EHL model (10 November 2026)**
- `vTranzactii()` on the EHL tab merges incasari, iesiri, cheltuieli, chirii and imprumuturi into one list (source → destination, who recorded it, signed amount), newest first, 30 shown before folding. `loadRecHist(col, id)` fetches the journal rows with `ref = id` when a director opens an existing record and renders them under the form: created / changed fields (old → new, system and code fields skipped) / deleted, with time and author.
- Cards: the EHL account (`ehlMode()`) has incasari, iesiri, proiecte, utilizatori; the administrator account has cheltuieli, iesiri, chirii, imprumuturi, grafic, pontaj, angajati, utilizatori. Out of Casa EHL (`fromCasa(d)`) the destinations are `DEST_CASA` only and "Dat persoanei" offers the directors (`fPersoanaIes()`); the hook enforces both. Loans are handed out of the lender's own account (`sursa Avans`). Contracts live on the projects: `contractLei(p)` = sumaContract + adaugator + contractEUR/USD at today's rates (migration `…0022`), `projInc()` also reports what came in per currency (`byVal`), `C.contracte` is derived from the projects and the "contracte" register tab is gone.
- Currency exchange: collection `schimburi` (migration `…0025`: data, persoana, valutaDin, sumaDin, valutaIn, sumaIn, nota, by; read = directors or own rows). The hook sets `persoana` to the signed-in name and refuses equal currencies or non-positive sums. In `calc()` each person's `val[currency]` gets + sumaIn / − sumaDin and `ramas` (lei) gets sumaIn×rate(in) − sumaDin×rate(din) at today's rates (`rateAzi`); `soldVal(name, cur)` backs the form check (no more than held). Register tab, `vTranzactii` row, Excel sheet, cards for the administrator and the collaborator.
- Users: the create hook on `utilizatori` requires `body.ehlCod` == the signed-in director's `codEHL` (the client sends `ehlCod()` on create) and forces `rol = Operator`, `codEHL = ""`; the update hook refuses any change of `rol`. The client hides the Users card from the administrator account, shows the "add user" button only in EHL mode, blocks `openForm("utilizatori")` outside it, and never shows the role field.
- Loans carry `valuta` + `curs` (migration `…0024`); `imprLei(r)` = suma × (curs or 1) is what the books, the register total, the transactions list and the Excel sheet use; the till/account checks (`casaNeed`, `avansErr`) work in the loan's currency / in lei, and the outflow created by "dinCasa" copies the currency.
- Each person in `C.colab` / `C.dirs` also carries `val[currency]` (received − handed on − cash rents in that currency, cash expenses off MDL); `soldPeValute(name)` renders them under the "Soldul meu" tile like `casaPeValute` under the till.
- The expense category is a `select` (options = `catMains()`, labels through `catLabel()`), the subcategory too (`catSubs()` of the chosen main); nothing is typed, new categories come from Settings. `catRaw()`/`catJoin()` still turn the pair into the stored "Main / Sub" string.
- Project "Adițional": `adaugator` + `adaugatorValuta` (migration `…0026`); `aditEur(p)` converts it to euro through today's rates and feeds the card, the dashboard row, `ramasEur` and `contractLei`.
- Projects, since the evening of 10 November: the form asks for the contract in euro only — `contractEUR` (required) split into `contractCash` + `contractTransfer` (migration `…0023`); the change handler fills the transfer part with what is left of the contract, and submit refuses parts that do not add up to it (`contract_split`). `responsabili` is no longer chosen: on create the client writes `meName()` into it. `projIncEur(nume)` converts what the client paid into euro (EUR rows at face value, the rest through lei at the rate of the day) and the project card, the dashboard row and the Excel sheet show contract / cash paid of agreed / transfer paid of agreed / left, all in EUR. The MDL, adaugator, USD and buget fields stay in the schema for old records but are not shown in the form.
- Two sign-ins for a director: his own code opens the administrator account (`homeView()` = "panou", his own dashboard `vPanouOp()`; the firm-wide dashboard moved to the "ehl" view, `vPanouEHL()`); his EHL code (`utilizatori.codEHL`, looked up by the login route when no `cod` matches) opens the EHL account: the response carries `ehl: true`, the client keeps `ehl.mode` and the typed code in localStorage (`ehlMode()`, `ehlCod()`), lands on the EHL tab, shows "EHL" in the header and sends the code along with outflows from the till instead of asking it. The EHL sign-in does not refresh the token key, so it leaves the administrator session alone.
- The till is the directors' common "Casa EHL". `isTillPayer` is true for the cashier only: a director is a person with an account of his own (`C.dirs`, split off `C.colab` by `fondatoriToti()`), fed by "Dat persoanei" outflows to him from the till and spent on his expenses, rents and what he hands to collaborators (`sursa = "Avans"`, `platitDe = his name`). `C.colabRamas` adds both groups into `totalFirma`.
- An outflow by a director carries `din` in the form (Casa / Avans; set automatically from the person and the destination, `ieseDinAvans(id, d)` reads it). Money leaving the till needs the director's `codEHL` (`utilizatori.codEHL`, migration `…0021`): the form asks it, the client compares it with `myCodEHL()`, the hook compares the body's `codEHL` with the author's and never stores it. A loan "din casă" sends it too.
- A director's own account is capped like an advance (`avansErr` for everyone but the cashier; the hooks repeat the balance SQL for directors with the message `cont_meu_lipsa`).

**Known gaps**
- The work schedule, the day-based salaries, the employees rubric, the "Arhitectură" category and the evening reminder (7–9 November 2026, migrations 12–19) are not yet described here; the commit messages are the reference.
- The till rule is client-only; the audit trail (`jurnal`) is still written by the client.
- `tests/fill.js`, `tests/seed-year*.js` and `tests/verify-*.js` predate these rules and were not updated; `tests/smoke.js` and `tests/calc.js` are current (the fake server in `smoke.js` mirrors the rules and hooks above).
