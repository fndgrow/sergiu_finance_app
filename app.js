(function(){
"use strict";

/* ---------------- i18n ---------------- */
var I18N={
ro:{
 app:"Casieria EHL",director:"Director",angajat:"Operator",oaspete:"Vizitator",
 nav_panou:"Panou",nav_add:"Adaugă",nav_reg:"Registre",nav_set:"Setări",nav_mine:"Ale mele",
 // dashboard
 t_total:"Banii firmei",t_casa:"Casa EHL",t_cont:"Pe cont",t_colab:"La colaboratori",
 t_incasari:"Încasări",t_cheltuieli:"Cheltuieli",
 s_bani:"Sumar bani",s_casa:"Casa pe valute",s_colab:"Raport pe colaborator",
 s_client:"Sold pe client",s_proiect:"Cheltuieli pe proiect",s_categ:"Cheltuieli pe categorie",
 s_contr:"Contracte",s_sal:"Salarii",s_impr:"Împrumuturi",s_chirii:"Chirii",
 l_num:"Încasat numerar",l_tr:"Încasat transfer",l_chnum:"Cheltuieli numerar",l_chtr:"Cheltuieli transfer",
 l_salplatit:"Salarii plătite",l_avans:"Avansuri date",l_depus:"Depus pe cont",l_chirii:"Chirii plătite",
 l_castigat:"Câștigat",l_plata:"Plătit",l_rest:"Rest de achitat",l_imprtot:"Total împrumutat",
 l_restituit:"Restituit",l_derecup:"De recuperat",l_restante:"Restanțe",l_nrcontr:"Contracte",
 l_valcontr:"Valoare contracte",l_incas:"Încasat",l_ramas:"Rămas",l_procent:"Procent încasat",
 l_primit:"Primit",l_cheltuit:"Cheltuit",l_inmana:"Rămas în mână",l_justif:"Rest de justificat",
 l_total:"Total",l_azi:"la cursul de azi",l_impr:"Împrumuturi din casă",l_alte:"Alte ieșiri",
 // add
 add_t:"Ce înregistrăm?",
 a_inc:"Încasare",a_inc_d:"Bani primiți de la client",
 a_chelt:"Cheltuială",a_chelt_d:"Bani cheltuiți, în lei",
 a_ies:"Ieșire din casă",a_ies_d:"Avans, depunere, salariu",
 a_chirie:"Chirie / cazare",a_chirie_d:"Plată locație",
 a_impr:"Împrumut",a_impr_d:"Bani dați cu termen",a_schimb:"Schimb valutar",a_schimb_d:"Din banii mei: dintr-o valută în alta",r_schimb:"Schimb valutar",f_val_din:"Valuta dată",f_suma_din:"Suma dată",f_val_in:"Valuta primită",f_suma_in:"Suma primită",sch_same:"Alegeți două valute diferite.",sch_lipsa:"Nu aveți atâta în valuta dată.",sch_curs:"Curs rezultat",sch_dupa:"Rămâne în valuta dată",
 a_contr:"Contract",a_contr_d:"Sumă și plan de încasare",
 a_pontaj:"Salarii",a_pontaj_d:"Zilele mele din grafic, achitare",
 a_ang:"Angajat",a_ang_d:"Nume, salariu, status",
 // fields
 f_data:"Data",f_client:"Client",f_proiect:"Proiect",f_descr:"Descriere",f_valuta:"Valuta",
 f_curs:"Curs la data",f_suma:"Suma",f_sumamdl:"Suma (MDL)",f_mod:"Mod",f_categ:"Categorie",
 f_platit:"Plătit de",f_dest:"Destinație",f_pers:"Persoana",f_nota:"Notă",f_luna:"Luna",
 f_loc:"Locația",f_chirias:"Chiriașul",f_di:"Data început",f_ds:"Data sfârșit",
 f_chirie:"Chirie",f_gaj:"Gaj",f_comun:"Comunale",f_avarii:"Avarii",
 f_termen:"Termen",f_status:"Status",f_contract:"Sumă contract",f_decash:"De încasat cash",
 f_ang:"Angajat",f_an:"Anul",f_z1:"Zile 1–15",f_z2:"Zile 16–sfârșit",
 f_nume:"Nume",f_start:"Data începerii",f_salariu:"Salariu lunar (MDL)",
 numerar:"Numerar",transfer:"Transfer",activ:"Activ",inactiv:"Inactiv",
 neachitat:"Neachitat",achitat:"Achitat",
 d_depus:"Depus pe cont",d_pers:"Dat persoanei",d_sal:"Salarii",d_impr:"Împrumut",d_alte:"Alte",
 // actions
 save:"Salvează",saving:"Se salvează…",del:"Șterge",del_q:"Sigur ștergeți?",del_yes:"Da, șterge",cancel:"Anulează",
 saved:"Salvat",deleted:"Șters",edit:"Editare",
 eq:"Echivalent MDL",tot:"Total",
 impr_cash:"Banii au ieșit din casă acum",impr_cash_h:"Creează automat și o ieșire din casă, ca să nu rămână casa umflată.",
 req:"Completați câmpurile obligatorii.",date_future:"Data nu poate fi în viitor.",lock_old:"Înregistrarea a fost introdusă de altcineva sau are mai mult de 15 zile: o poate modifica doar cel care a introdus-o, în primele 15 zile. Dumneavoastră o puteți doar vedea.",srv_old:"Înregistrarea are mai mult de 15 zile; o poate modifica doar directorul.",
 // registers
 r_inc:"Încasări",r_chelt:"Cheltuieli",r_ies:"Ieșiri din casă",r_chirii:"Chirii",
 r_contr:"Contracte",r_sal:"Salarii",r_impr:"Împrumuturi",
 mine_t:"Ce am introdus eu",mine_e:"Nu ați introdus încă nimic.",
 nothing:"Nimic încă",nothing_d:"Apăsați „Adaugă” ca să începeți.",
 // settings
 set_val:"Valute și cursuri",set_val_h:"Cursul de azi. Se folosește pentru soldul casei, nu pentru rândurile deja introduse.",
 set_cas:"Casierul",set_cas_h:"Banii dați casierului nu sunt socotiți ieșire din casă.",
 set_cat:"Categorii de cheltuieli",set_cat_h:"Scrieți una nouă în câmpul de jos; × o șterge (de două ori). O subcategorie se scrie cu bară: „Materiale / Acoperiș”. Înregistrările vechi își păstrează categoria.",f_subcat:"Subcategorie",cat_add:"Adaugă categorie",cat_ph:"Denumire",
 set_pin:"Cod de acces director",set_pin_h:"Cine îl știe vede panoul și registrele. Schimbați-l dacă a ajuns la cineva din afară.",
 set_add:"Adaugă valută",cod:"Cod",
 pin_t:"Cod director",pin_h:"Introduceți codul ca să vedeți panoul, registrele și setările.",pin_bad:"Cod greșit.",pin_ok:"Intră",
 pin_as:"Sunteți conectat ca operator. Puteți introduce date.",
 exit_dir:"Ieși din modul director",
 // states
 loading:"Se încarcă datele…",offline:"Datele nu pot fi citite acum. Verificați conexiunea.",
 nowrite:"Nu aveți drept de scriere pe acest link. Cereți acces de tip Contributor.",
 nosign:"Conectați-vă în Claude ca să folosiți aplicația.",
 stale:"Datele pot fi învechite.",
 by:"introdus de",
 ord:"Ordinea corectă",
 ord_1:"Bani primiți → Încasare.",
 ord_2:"Bani scoși fizic din casă (avans, depunere, salariu, împrumut) → Ieșire din casă.",
 ord_3:"Bani cheltuiți → Cheltuială, în lei, cu „Plătit de” corect.",
 ord_4:"Numele clientului trebuie scris identic peste tot.",
 a_proj:"Proiect",a_proj_d:"Nume, responsabili, buget",
 r_proj:"Proiecte",s_proiecte:"Proiecte active",
 f_resp:"Responsabili",f_buget:"Buget (MDL)",
 st_activ:"Activ",st_pauza:"În pauză",st_final:"Finalizat",
 p_buget:"Buget",p_cheltuit:"Cheltuit",p_incasat:"Încasat",p_rest:"Rest buget",
 p_resp:"Responsabili",p_niciunul:"Fără responsabil",p_depasit:"Buget depășit",
 p_alte:"Alte proiecte (fără fișă)",
 me_t:"Ați intrat ca",me_h:"Alegeți-vă numele. Proiectele dvs. și câmpul „Plătit de” se completează singure.",
 me_ch:"Schimbă",me_pick:"Alegeți numele",me_none:"Nicio persoană în listă. Directorul adaugă angajații.",
 proj_none:"Niciun proiect încă",proj_none_d:"Directorul creează proiectele și le dă responsabili.",
 r_jur:"Istoric",j_h:"Fiecare adăugare, modificare și ștergere rămâne aici, cu autorul, ora și valorile de atunci.",
 j_load:"Arată luna",j_loading:"Se caută…",j_empty:"Nicio operațiune în luna aceasta.",
 j_add:"Adăugat",j_edit:"Modificat",j_del:"Șters",j_by:"de",
 j_exp:"Descarcă Excel",j_exp_h:"Un fișier .xlsx gata de citit: panou, toate registrele și istoricul, fiecare pe foaia lui, cu filtre și totaluri.",
 exported:"Descărcat",exp_no:"Descărcarea nu este disponibilă aici.",exp_work:"Se pregătește…",
 exp_t:"Export Excel",exp_tot:"Toate datele",exp_luna:"Doar luna aleasă",exp_btn:"Descarcă .xlsx",
 a_user:"Utilizator",u_deact:"Dezactivează",u_deact_h:"Colaboratorul pierde accesul pe loc și trece în Arhivă, de unde poate fi reactivat.",u_deact_done:"Colaboratorul a fost dezactivat.",u_ehl_only:"Colaboratorii se creează doar din contul EHL. Administratorii sunt Sergiu și Grigore.",a_user_d:"Acces pentru un angajat nou",r_user:"Utilizatori",
 f_rol:"Rol",rol_op:"Operator",rol_dir:"Director",f_cod:"Cod de acces",
 f_cod_h:"4–8 cifre pe care i le dați angajatului. Cu ele intră în aplicație de pe telefonul lui.",
 also_ang:"Îl trec și la angajați, cu salariu",
 gate_t:"Cod de acces",gate_h:"Introduceți codul primit de la director. La prima pornire a aplicației, codul introdus devine codul directorului.",gate_bad:"Cod greșit sau utilizator dezactivat.",
 u_none:"Niciun utilizator încă",u_none_d:"Adăugați primul utilizator ca angajații să poată intra cu codul lor.",
 logout:"Schimbă utilizatorul",u_inactiv:"Dezactivat",
 setup_t:"Aplicația nu este configurată",setup_h:"Biblioteca serverului nu s-a încărcat. Reîncărcați pagina; dacă persistă, verificați fișierul vendor/pocketbase.umd.js.",
 auth_err:"Nu se poate conecta la server.",
 offline_note:"Fără conexiune. Puteți introduce date, se trimit când revine internetul.",
 pending:"{n} înregistrări așteaptă trimiterea la server.",
 first_pin:"Prima pornire: acest cod a devenit codul directorului. Schimbați-vă numele în Setări → Utilizatori.",
 install:"Instalează pe telefon",install_phone:"Instalează aplicația pe telefon",install_pc:"Instalează aplicația pe computer",
 install_ios_h:"Pe iPhone: apăsați butonul Partajare (pătratul cu săgeată) din Safari, apoi „Adaugă pe ecranul principal”.",
 install_android_h:"Deschideți această adresă în Chrome, apoi meniul ⋮ → „Instalează aplicația” sau „Adaugă pe ecranul principal”.",
 install_pc_h:"În Chrome sau Edge apăsați pictograma de instalare din bara de adrese (dreapta), apoi „Instalează”. Aplicația apare ca program separat.",
 cod_bad:"Codul trebuie să aibă 4–8 cifre și să nu fie folosit deja.",
 self_lock:"Nu vă puteți dezactiva sau retrograda propriul cont.",
 pw_t:"Parola directorului",pw_h:"Pe un telefon nou directorul confirmă parola. Apoi se cere din nou o dată pe săptămână.",
 pw_week:"A trecut o săptămână de la ultima confirmare. Introduceți parola ca să continuați.",
 pw_set_t:"Setați parola directorului",pw_set_h:"Codul rămâne pentru intrare. Parola se cere pe fiecare telefon nou și o dată pe săptămână. Minim 8 caractere.",
 f_parola:"Parola",f_parola2:"Repetați parola",f_parola_veche:"Parola actuală",f_parola_noua:"Parola nouă",
 pw_short:"Parola trebuie să aibă cel puțin 8 caractere.",pw_mismatch:"Parolele nu coincid.",pw_bad:"Parolă greșită.",
 pw_saved:"Parola a fost salvată.",pw_other:"Alt cod",set_pw:"Parola directorului",set_pw_h:"Se cere pe fiecare telefon nou și o dată pe săptămână.",
 ov_chelt:"Cheltuieli",ov_vs:"față de luna trecută",ov_flux:"Flux de numerar",ov_all:"Toate lunile",ov_none:"Nicio cheltuială în această perioadă.",
 ov_alte:"Alte categorii",ov_in:"Încasări",ov_out:"Cheltuieli",filt_clear:"Șterge filtrul",
 f_descr_req:"Pe ce s-au cheltuit banii",f_descr_h:"Obligatoriu: scrieți concret ce s-a cumpărat sau plătit.",descr_short:"Descrierea trebuie să aibă cel puțin 3 caractere.",
 src_t:"Plătit din",src_avans:"Avansul de la firmă",src_proprii:"Banii mei (firma îmi datorează)",src_proprii_short:"din banii proprii",
 src_h:"Dacă ați plătit din buzunarul dvs. pentru firmă, alegeți „Banii mei”: suma apare la director ca datorie a firmei față de dvs.",
 colab_owed:"Firma îi datorează",colab_has:"Are în mână bani ai firmei",colab_zero:"Sold zero",colab_proprii:"din banii proprii",
 colab_proprii_h:"Din această sumă, {s} MDL a plătit din banii proprii pentru firmă.",colab_spent:"Cheltuit pentru firmă",colab_got:"Primit de la firmă",
 my_sold:"Soldul meu",my_sold_h:"Minus înseamnă că firma vă datorează bani. Apăsați ca să vedeți fiecare sumă.",
 relock_t:"Cod de acces",relock_h:"Introduceți din nou codul ca să continuați. Se cere la fiecare deschidere a aplicației.",relock_week:"A trecut o săptămână: introduceți codul, apoi parola directorului.",
 failed_t:"{n} înregistrări respinse de server",failed_h:"Nu s-au pierdut: sunt păstrate pe acest telefon. Verificați motivul și reîncercați.",failed_retry:"Reîncearcă",failed_toast:"Serverul a respins o înregistrare. Vedeți nota de sus.",
 // server messages (texts sent by server/pb_hooks/ehl.pb.js, shown through srvT)
 srv_cod:"Cod invalid.",srv_many:"Prea multe încercări. Așteptați 15 minute.",srv_bad_user:"Cod greșit sau utilizator dezactivat.",srv_pw8:"Parola trebuie să aibă cel puțin 8 caractere.",srv_pw_bad:"Parolă greșită.",srv_pw_dir:"Doar directorul are parolă.",srv_pw_new8:"Parola nouă trebuie să aibă cel puțin 8 caractere.",srv_pw_cur:"Parola actuală este greșită.",srv_cod48:"Codul trebuie să aibă 4–8 cifre.",srv_self_lock:"Nu vă puteți dezactiva sau retrograda propriul cont.",srv_self_del:"Nu vă puteți șterge propriul cont.",srv_descr:"Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).",
 show_more:"Arată încă {n}",show_less:"Arată mai puțin",
 th_det:"Detalii",th_how:"Cine și cum",n_rec:"Înregistrări: {n}",
 pg_of:"{a}–{b} din {n}",pg_prev:"Pagina anterioară",pg_next:"Pagina următoare",
 ov_more:"Detalii",ov_all_s:"Toate",per_lbl:"Perioada",menu_t:"Salt rapid",menu_a:"Meniu",s_totals:"Totaluri",
 f_dinsal:"Salariul nou se aplică din",f_dinsal_h:"Luna în care cade această dată se calculează întreagă cu salariul nou (și pontajele deja scrise). Lunile dinainte rămân cu salariul vechi.",
 f_salariu_nou:"Salariu nou (MDL)",sal_actual:"Salariu actual",sal_din:"Salariu din",sal_nou:"Salariu nou din",
 save_err:"Serverul nu a acceptat înregistrarea.",
 pending_out:"Înregistrările netrimise ({n}) rămân pe acest telefon și se trimit când utilizatorul intră din nou.",
 val_used:"Valuta {v} este folosită în înregistrări și nu poate fi ștearsă sau redenumită.",
 pontaj_dup:"Pentru acest angajat există deja un pontaj în luna aleasă. Deschideți-l și corectați-l.",
 pontaj_zile:"Zilele: 0–15 pentru prima jumătate și 0–16 pentru a doua.",
 casa_lipsa:"În casă nu sunt destui bani: disponibil {s} {v}. Alimentați mai întâi casa.",
 by_lbl:"introdus de",
 arch_t:"Arhivă: utilizatori dezactivați",arch_h:"Nu mai pot intra, dar înregistrările lor rămân în registre și în istoric. Pot fi restabiliți oricând.",
 restore:"Restabilește",restored:"Utilizator restabilit",fondator:"fondator",
 f_codfond:"Codul fondatorului",f_codfond_h:"Fondatorul confirmă încasarea cu codul său de acces.",codfond_bad:"Codul fondatorului este greșit.",confirmat:"confirmat de",
 cont_lipsa:"Pe cont nu sunt destui bani: disponibil {s} MDL. Depuneți mai întâi din casă.",
 cont_lei:"Pe cont intră doar lei: alegeți MDL.",
 d_rest:"Restituire fondator",s_fond:"Datorii către fondatori",l_fond_primit:"Împrumutat de la fondatori",l_fond_dat:"Datorie",
 pontaj_h:"Pontajul se face doar pentru angajații pe care i-ați creat dumneavoastră.",
 pontaj_pay:"Achitat: plătesc acum",pontaj_pay_h:"Se creează cheltuieli „Salarii” pe proiectele din zilele lunii (sau EHL). Banii ies din avansul dvs.; la director, din casă. Plata merge și dacă banii lipsesc.",pontaj_suma:"Achit acum (MDL)",pontaj_suma_h:"Gol = toată suma rămasă pe lună, inclusiv zilele bifate de alți colaboratori. Puteți scrie și o parte, de exemplu doar zilele dvs.",
 pontaj_paid:"Achitat deja",ang_deact:"Șterge angajatul",ang_deact_h:"Angajatul trece în arhivă: dispare din liste, dar pontajele, salariile și istoricul lui rămân.",ang_deact_yes:"Da, trece în arhivă",ang_deact_done:"Angajat trecut în arhivă",pontaj_dinavans:"Colaborator: salariul se scade din avansul lui, nu din casă",pontaj_due:"De achitat",pontaj_nosal:"Angajatul nu are salariu stabilit, nu este nimic de achitat.",pontaj_nota:"Salariu pontaj",
 srv_ies_op:"Colaboratorul înregistrează din avans doar plăți de salariu (bifa Achitat din pontaj).",
 a_grafic:"Grafic de lucru",a_grafic_d:"Ore lucrate, zi cu zi",gr_full:"8h",gr_ore:"ore",gr_h1:"Ore 1–15",gr_h2:"Ore 16–sfârșit",gr_tot:"Total ore",gr_zile:"Zile (8 ore = o zi)",
 gr_din:"Zilele vin din graficul de lucru și nu se scriu de mână.",arch_ang:"Arhivă: angajați inactivi",arch_ang_h:"Nu apar în grafic, pontaj și rapoarte; înregistrările lor rămân. Pot fi reactivați oricând.",inact_lbl:"Inactivi",
 gr_mode_ang:"Pe angajat",gr_mode_zi:"Pe zi",gr_zi:"Zi",gr_half:"½ zi",gr_mine:"zilele mele",
 gr_h_zi:"Alegeți data, apoi la fiecare angajat bifați zi întreagă sau jumătate. Fiecare bifă se salvează imediat, cu numele dvs.",
 gr_lock:"Zilele de până la ultima plată sunt închise și nu se mai schimbă.",srv_gr_dup:"Ziua este deja bifată de alt utilizator.",gr_other:"Ziua a fost introdusă de alt utilizator și nu poate fi schimbată.",
 f_complet:"Salariu complet (luna întreagă, indiferent de zile)",f_complet_h:"Se achită salariul lunar întreg, plus extra.",
 pontaj_paidby:"Achitat de",sal_descr:"Salariu",gr_bani:"Cuvenit pe lună",gr_nosal:"fără salariu stabilit",gr_none:"Alegeți angajatul.",gr_h:"Apăsați „Zi” pentru o zi întreagă sau „½ zi” pentru jumătate. Se bifează doar ziua de azi și cele trecute. Fiecare zi se salvează imediat, cu numele dvs.; o zi o schimbă doar cel care a introdus-o.",gr_future:"Zilele viitoare nu se bifează: doar azi și înapoi.",gr_remind_t:"Graficul de lucru nu a fost deschis azi",gr_remind:"Notați zilele angajaților dvs. care au lucrat azi. Panoul dispare după ce deschideți graficul.",
 reset_btn:"Șterge datele",reset_t:"Ștergerea tuturor datelor",reset_h:"Se șterg toate înregistrările: încasări, cheltuieli, ieșiri, chirii, contracte, împrumuturi, proiecte, angajați, salarii, grafic, istoric. Se șterg și conturile colaboratorilor. Nu se poate anula.",reset_keep:"Rămân doar conturile directorilor și setările (valute, categorii, casier).",reset_cod:"Codul dvs. de acces, pentru confirmare",reset_go:"Șterg tot, definitiv",reset_busy:"Se șterge…",reset_done:"Datele au fost șterse. Aplicația repornește.",srv_reset_dir:"Doar directorul poate șterge datele.",srv_reset_cod:"Codul de acces este greșit.",srv_sal_lock:"Plățile de salariu nu se mai schimbă și nu se șterg.",
 srv_grafic:"Graficul se face doar pentru angajații creați de dumneavoastră.",srv_ore:"Ziua se bifează întreagă (8 ore) sau jumătate (4 ore).",srv_gr_lock:"Zilele achitate nu se mai schimbă.",f_extra:"Extra (MDL)",f_extra_h:"Remunerare suplimentară pentru luna aceasta, dacă angajatul a făcut ceva în plus. Intră în suma de achitat.",
 op_ang:"Angajați",ang_n:"angajați",f_aditional:"Adițional",inc_peste:"Suma depășește contractul proiectului. Mai pot fi încasați {x}.",inc_peste_cash:"Cash pe acest proiect mai pot fi încasați {x} (partea cash din contract).",inc_peste_tr:"Prin transfer pe acest proiect mai pot fi încasați {x} (partea transfer din contract).",op_ang_h:"Pentru luna aleasă sus: toate zilele angajatului și de cine au fost bifate, suma lunii, cât s-a achitat și de cine, restul. Ceasul deschide graficul, rotița fișa.",pontaj_lipsa:"fără pontaj în luna aceasta",gr_zile_s:"zile",rest_total:"rest pe toate lunile",sal_h:"Salariul îl puteți stabili doar pentru angajații pe care i-ați creat dumneavoastră.",srv_sal:"Salariul se stabilește doar pentru angajații creați de dumneavoastră.",
 f_contract_mdl:"Suma contractului (MDL)",p_cash:"Încasat cash",p_tr:"Încasat transfer",p_ramas:"Rămas de încasat",
 f_adaug:"Adăugător (MDL)",f_contract_eur:"Contract în EUR",f_contract_eur_sum:"Suma contractului (EUR)",f_contract_cash:"Din care cash (EUR)",f_contract_tr:"Din care transfer (EUR)",contract_split:"Cash + transfer trebuie să dea suma contractului.",f_proiect_nume:"Denumire proiect",f_client_nume:"Numele clientului",s_tranz:"Toate tranzacțiile",s_tranz_h:"Fiecare mișcare de bani, de la cea mai nouă: de unde au plecat, unde au ajuns, cine a înregistrat-o. Apăsați pe un rând ca să vedeți înregistrarea și istoricul ei.",tz_cont:"Cont",rec_hist:"Istoricul înregistrării",rec_hist_none:"Fără istoric.",j_nochange:"Salvat fără modificări",f_contract_usd:"Contract în USD",pers_dir_h:"Din Casa EHL banii merg doar la un administrator.",p_adaug:"Adăugător",p_total:"Contract + adăugător",
 sess_other:"Contul a fost deschis pe alt dispozitiv. Introduceți codul ca să continuați aici.",
 op_primit:"Primit de la director",op_primit_dir:"Luat din Casa EHL",op_dat:"Dat mai departe",op_adv_dir:"Bani luați din Casa EHL",nav_ehl:"EHL",app_ehl:"Casa EHL · contul comun",op_chn:"Cheltuit numerar",op_prop:"Din banii mei",op_tr:"Prin transfer (din cont)",op_adv:"Bani primiți de la director",op_proj:"Cheltuieli pe proiect",
 cont_intra:"Pe cont intră",
 s_cont_minus:"Contul este în minus",l_cont_achitat:"De achitat pe cont",cont_minus_h:"Plățile prin transfer au depășit banii de pe cont. Mai jos sunt plățile care au dus contul în minus. Acoperiți-l cu o încasare prin transfer sau cu Ieșire din casă → Depus pe cont.",
 srv_cont:"Pe cont nu sunt destui bani. Depuneți mai întâi din casă.",srv_avans:"Nu aveți destui bani din avans. Cereți mai întâi bani de la director.",op_tr_h:"din contul firmei",din_casa:"din casă",cont_meu_disp:"Disponibil în contul meu",f_codehl:"Codul EHL",f_codehl_h:"Banii ies din Casa EHL: confirmați cu codul dumneavoastră EHL.",codehl_bad:"Codul EHL este greșit.",codehl_fmt:"Codul EHL trebuie să aibă 4–8 cifre.",codehl_none:"Nu aveți cod EHL: fără el nu se pot scoate bani din Casa EHL. Cereți-l în Setări → Utilizatori.",f_codehl_set:"Cod EHL (acces la Casa EHL)",f_codehl_set_h:"4–8 cifre. Doar un director cu cod EHL poate scoate bani din casa comună.",f_din:"Din",f_din_h:"Casa EHL este casa comună a directorilor; Contul meu sunt banii pe care i-am luat din ea.",din_casa_ehl:"Casa EHL",din_cont_meu:"Contul meu",s_dirs:"Conturile administratorilor",s_dirs_h:"Banii luați de fiecare director din Casa EHL, ce a dat mai departe sau a cheltuit, și ce mai are în mână.",l_dirs:"La administratori",
 s_colab_exp:"Cheltuielile și chiriile colaboratorilor",s_tr:"Cheltuieli din cont (transfer)",tr_h:"La transfer banii se iau din contul bancar, nu de la persoană. Apăsați pe un nume ca să vedeți pe ce s-au cheltuit.",colab_tr:"Plătit prin transfer (din cont)",
 avans_lipsa:"Nu aveți destui bani din avans: disponibil {s} MDL. Cereți mai întâi bani de la director.",cont_meu_lipsa:"Nu aveți destui bani în contul dumneavoastră: disponibil {s} MDL. Luați mai întâi din Casa EHL.",ehl_dest:"Din Casa EHL banii merg doar la administratori, pe cont sau înapoi la fondator.",avans_disp:"Disponibil din avansul meu",din_avans:"din avansul lui",colab_gave:"Ieșiri făcute din avans",
 f_pentru:"Cheltuiala este pentru",pt_proiect:"Proiect",pt_proiecte:"Proiecte",pt_ehl:"EHL (firma)",pt_alte:"Altele",s_pentru:"Cheltuieli: proiecte, EHL, altele",
 fond_h:"Banii puși de un fondator sunt un împrumut către firmă: datoria crește cu fiecare încasare de la el și scade prin Ieșire din casă → Restituire fondator."
},
ru:{
 app:"Касса EHL",director:"Директор",angajat:"Оператор",oaspete:"Гость",
 nav_panou:"Сводка",nav_add:"Добавить",nav_reg:"Журналы",nav_set:"Настройки",nav_mine:"Мои записи",
 t_total:"Деньги фирмы",t_casa:"Касса EHL",t_cont:"На счету",t_colab:"У сотрудников",
 t_incasari:"Поступления",t_cheltuieli:"Расходы",
 s_bani:"Сводка по деньгам",s_casa:"Касса по валютам",s_colab:"Отчёт по сотрудникам",
 s_client:"Сальдо по клиентам",s_proiect:"Расходы по проектам",s_categ:"Расходы по категориям",
 s_contr:"Договоры",s_sal:"Зарплаты",s_impr:"Займы",s_chirii:"Аренда",
 l_num:"Поступило наличными",l_tr:"Поступило переводом",l_chnum:"Расходы наличными",l_chtr:"Расходы переводом",
 l_salplatit:"Выплачено зарплат",l_avans:"Выдано авансов",l_depus:"Внесено на счёт",l_chirii:"Оплачено аренды",
 l_castigat:"Начислено",l_plata:"Выплачено",l_rest:"Остаток к выплате",l_imprtot:"Выдано займов",
 l_restituit:"Возвращено",l_derecup:"К возврату",l_restante:"Просрочено",l_nrcontr:"Договоров",
 l_valcontr:"Сумма договоров",l_incas:"Получено",l_ramas:"Остаток",l_procent:"Процент получения",
 l_primit:"Получил",l_cheltuit:"Потратил",l_inmana:"Осталось на руках",l_justif:"Под отчётом у сотрудников",
 l_total:"Итого",l_azi:"по курсу на сегодня",l_impr:"Займы из кассы",l_alte:"Прочие выдачи",
 add_t:"Что записываем?",
 a_inc:"Поступление",a_inc_d:"Деньги от клиента",
 a_chelt:"Расход",a_chelt_d:"Потраченные деньги, в леях",
 a_ies:"Выдача из кассы",a_ies_d:"Аванс, внесение, зарплата",
 a_chirie:"Аренда / проживание",a_chirie_d:"Оплата жилья или помещения",
 a_impr:"Заём",a_impr_d:"Деньги в долг со сроком",a_schimb:"Обмен валюты",a_schimb_d:"Из моих денег: из одной валюты в другую",r_schimb:"Обмен валюты",f_val_din:"Отдал валюту",f_suma_din:"Отдал сумму",f_val_in:"Получил валюту",f_suma_in:"Получил сумму",sch_same:"Выберите две разные валюты.",sch_lipsa:"У вас нет столько в отданной валюте.",sch_curs:"Курс обмена",sch_dupa:"Останется в отданной валюте",
 a_contr:"Договор",a_contr_d:"Сумма и план поступлений",
 a_pontaj:"Зарплата",a_pontaj_d:"Мои дни из графика, выплата",
 a_ang:"Сотрудник",a_ang_d:"Имя, оклад, статус",
 f_data:"Дата",f_client:"Клиент",f_proiect:"Проект",f_descr:"Описание",f_valuta:"Валюта",
 f_curs:"Курс на дату",f_suma:"Сумма",f_sumamdl:"Сумма (MDL)",f_mod:"Способ",f_categ:"Категория",
 f_platit:"Кто платил",f_dest:"Назначение",f_pers:"Человек",f_nota:"Примечание",f_luna:"Месяц",
 f_loc:"Объект",f_chirias:"Арендатор",f_di:"Дата начала",f_ds:"Дата окончания",
 f_chirie:"Аренда",f_gaj:"Залог",f_comun:"Коммунальные",f_avarii:"Ущерб",
 f_termen:"Срок",f_status:"Статус",f_contract:"Сумма договора",f_decash:"К получению наличными",
 f_ang:"Сотрудник",f_an:"Год",f_z1:"Дни 1–15",f_z2:"Дни 16–конец",
 f_nume:"Имя",f_start:"Дата начала работы",f_salariu:"Оклад в месяц (MDL)",
 numerar:"Наличные",transfer:"Перевод",activ:"Активен",inactiv:"Неактивен",
 neachitat:"Не погашен",achitat:"Погашен",
 d_depus:"Внесено на счёт",d_pers:"Выдано человеку",d_sal:"Зарплата",d_impr:"Заём",d_alte:"Прочее",
 save:"Сохранить",saving:"Сохраняю…",del:"Удалить",del_q:"Точно удалить?",del_yes:"Да, удалить",cancel:"Отмена",
 saved:"Сохранено",deleted:"Удалено",edit:"Изменить",
 eq:"Эквивалент MDL",tot:"Итого",
 impr_cash:"Деньги вышли из кассы сейчас",impr_cash_h:"Автоматически создаст и выдачу из кассы, чтобы касса не была завышена.",
 req:"Заполните обязательные поля.",date_future:"Дата не может быть в будущем.",lock_old:"Запись внёс другой человек или ей больше 15 дней: изменить её может только автор, в первые 15 дней. Вы можете только смотреть.",srv_old:"Записи больше 15 дней, изменить её может только директор.",
 r_inc:"Поступления",r_chelt:"Расходы",r_ies:"Выдачи из кассы",r_chirii:"Аренда",
 r_contr:"Договоры",r_sal:"Зарплаты",r_impr:"Займы",
 mine_t:"Мои записи",mine_e:"Вы ещё ничего не вносили.",
 nothing:"Пока пусто",nothing_d:"Нажмите «Добавить», чтобы начать.",
 set_val:"Валюты и курсы",set_val_h:"Курс на сегодня. Используется для остатка кассы, но не для уже внесённых строк.",
 set_cas:"Кассир",set_cas_h:"Деньги, выданные кассиру, не считаются выходом из кассы.",
 set_cat:"Категории расходов",set_cat_h:"Новую впишите в поле ниже; «×» — удалить (два нажатия). Подкатегория пишется через косую черту: «Materiale / Acoperiș». Старые записи сохраняют свою категорию.",f_subcat:"Подкатегория",cat_add:"Добавить категорию",cat_ph:"Название",
 set_pin:"Код доступа директора",set_pin_h:"Кто знает код, видит сводку и журналы. Смените, если код ушёл наружу.",
 set_add:"Добавить валюту",cod:"Код",
 pin_t:"Код директора",pin_h:"Введите код, чтобы увидеть сводку, журналы и настройки.",pin_bad:"Неверный код.",pin_ok:"Войти",
 pin_as:"Вы вошли как оператор. Вносить данные можно.",
 exit_dir:"Выйти из режима директора",
 loading:"Загружаю данные…",offline:"Данные сейчас недоступны. Проверьте соединение.",
 nowrite:"У вас нет права записи по этой ссылке. Попросите доступ уровня Contributor.",
 nosign:"Войдите в Claude, чтобы пользоваться приложением.",
 stale:"Данные могут быть устаревшими.",
 by:"внёс",
 ord:"Правильный порядок",
 ord_1:"Деньги получили → Поступление.",
 ord_2:"Деньги физически вышли из кассы (аванс, внесение, зарплата, заём) → Выдача из кассы.",
 ord_3:"Деньги потратили → Расход, в леях, с верным «Кто платил».",
 ord_4:"Имя клиента должно быть написано одинаково везде.",
 a_proj:"Проект",a_proj_d:"Название, ответственные, бюджет",
 r_proj:"Проекты",s_proiecte:"Активные проекты",
 f_resp:"Ответственные",f_buget:"Бюджет (MDL)",
 st_activ:"Активен",st_pauza:"На паузе",st_final:"Завершён",
 p_buget:"Бюджет",p_cheltuit:"Потрачено",p_incasat:"Получено",p_rest:"Остаток бюджета",
 p_resp:"Ответственные",p_niciunul:"Без ответственного",p_depasit:"Бюджет превышен",
 p_alte:"Прочие проекты (без карточки)",
 me_t:"Вы вошли как",me_h:"Выберите своё имя. Ваши проекты и поле «Кто платил» подставятся сами.",
 me_ch:"Сменить",me_pick:"Выберите имя",me_none:"В списке никого нет. Директор добавляет сотрудников.",
 proj_none:"Проектов пока нет",proj_none_d:"Директор создаёт проекты и назначает ответственных.",
 r_jur:"История",j_h:"Каждое добавление, изменение и удаление остаётся здесь — с автором, временем и значениями на тот момент.",
 j_load:"Показать месяц",j_loading:"Ищу…",j_empty:"В этом месяце операций не было.",
 j_add:"Добавлено",j_edit:"Изменено",j_del:"Удалено",j_by:"—",
 j_exp:"Скачать Excel",j_exp_h:"Готовый .xlsx: сводка, все журналы и история — каждый на своём листе, с фильтрами и итогами.",
 exported:"Скачано",exp_no:"Скачивание здесь недоступно.",exp_work:"Готовлю файл…",
 exp_t:"Выгрузка в Excel",exp_tot:"Все данные",exp_luna:"Только выбранный месяц",exp_btn:"Скачать .xlsx",
 a_user:"Пользователь",u_deact:"Деактивировать",u_deact_h:"Колаборатор сразу теряет доступ и попадает в Архив, откуда его можно вернуть.",u_deact_done:"Колаборатор деактивирован.",u_ehl_only:"Колабораторов создают только из аккаунта EHL. Администраторы — Sergiu и Grigore.",a_user_d:"Доступ новому сотруднику",r_user:"Пользователи",
 f_rol:"Роль",rol_op:"Оператор",rol_dir:"Директор",f_cod:"Код доступа",
 f_cod_h:"4–8 цифр, которые вы даёте сотруднику. По ним он входит со своего телефона.",
 also_ang:"Добавить и в сотрудники, с окладом",
 gate_t:"Код доступа",gate_h:"Введите код, который дал директор. При самом первом запуске введённый код становится кодом директора.",gate_bad:"Неверный код или пользователь отключён.",
 u_none:"Пользователей пока нет",u_none_d:"Добавьте первого, чтобы сотрудники входили по своему коду.",
 logout:"Сменить пользователя",u_inactiv:"Отключён",
 setup_t:"Приложение не настроено",setup_h:"Не загрузилась библиотека сервера. Обновите страницу; если повторяется, проверьте файл vendor/pocketbase.umd.js.",
 auth_err:"Не удаётся подключиться к серверу.",
 offline_note:"Нет связи. Вносить можно, данные отправятся, когда появится интернет.",
 pending:"{n} записей ждут отправки на сервер.",
 first_pin:"Первый запуск: этот код стал кодом директора. Поменяйте имя в Настройки → Пользователи.",
 install:"Установить на телефон",install_phone:"Установить приложение на телефон",install_pc:"Установить приложение на компьютер",
 install_ios_h:"На iPhone: кнопка «Поделиться» (квадрат со стрелкой) в Safari, затем «На экран Домой».",
 install_android_h:"Откройте этот адрес в Chrome, затем меню ⋮ → «Установить приложение» или «Добавить на главный экран».",
 install_pc_h:"В Chrome или Edge нажмите значок установки в адресной строке (справа), затем «Установить». Приложение появится отдельной программой.",
 cod_bad:"Код должен быть из 4–8 цифр и не повторять другой.",
 self_lock:"Нельзя отключить или понизить собственную учётную запись.",
 pw_t:"Пароль директора",pw_h:"На новом телефоне директор подтверждает пароль. Дальше он запрашивается раз в неделю.",
 pw_week:"Прошла неделя с последнего подтверждения. Введите пароль, чтобы продолжить.",
 pw_set_t:"Задайте пароль директора",pw_set_h:"Код остаётся для входа. Пароль спрашивается на каждом новом телефоне и раз в неделю. Минимум 8 символов.",
 f_parola:"Пароль",f_parola2:"Повторите пароль",f_parola_veche:"Текущий пароль",f_parola_noua:"Новый пароль",
 pw_short:"Пароль должен быть не короче 8 символов.",pw_mismatch:"Пароли не совпадают.",pw_bad:"Неверный пароль.",
 pw_saved:"Пароль сохранён.",pw_other:"Другой код",set_pw:"Пароль директора",set_pw_h:"Запрашивается на каждом новом телефоне и раз в неделю.",
 ov_chelt:"Расходы",ov_vs:"к прошлому месяцу",ov_flux:"Поток денег",ov_all:"Все месяцы",ov_none:"В этом периоде расходов нет.",
 ov_alte:"Прочие категории",ov_in:"Поступления",ov_out:"Расходы",filt_clear:"Сбросить фильтр",
 f_descr_req:"На что потрачены деньги",f_descr_h:"Обязательно: напишите конкретно, что куплено или оплачено.",descr_short:"Описание должно быть не короче 3 символов.",
 src_t:"Оплачено из",src_avans:"Аванс от фирмы",src_proprii:"Мои деньги (фирма должна вернуть)",src_proprii_short:"из своих денег",
 src_h:"Если платили за фирму из своего кармана, выберите «Мои деньги»: директор увидит сумму как долг фирмы перед вами.",
 colab_owed:"Фирма должна",colab_has:"На руках деньги фирмы",colab_zero:"Баланс ноль",colab_proprii:"из своих денег",
 colab_proprii_h:"Из этой суммы {s} MDL оплачено из своих денег за фирму.",colab_spent:"Потрачено на фирму",colab_got:"Получено от фирмы",
 my_sold:"Мой баланс",my_sold_h:"Минус означает, что фирма должна вам деньги. Нажмите, чтобы увидеть каждую сумму.",
 relock_t:"Код доступа",relock_h:"Введите код ещё раз, чтобы продолжить. Он запрашивается при каждом открытии приложения.",relock_week:"Прошла неделя: введите код, затем пароль директора.",
 failed_t:"{n} записей отклонено сервером",failed_h:"Они не потеряны и хранятся на этом телефоне. Проверьте причину и повторите.",failed_retry:"Повторить",failed_toast:"Сервер отклонил запись. Смотрите заметку вверху.",
 // server messages
 srv_cod:"Неверный код.",srv_many:"Слишком много попыток. Подождите 15 минут.",srv_bad_user:"Неверный код или пользователь отключён.",srv_pw8:"Пароль должен быть не короче 8 символов.",srv_pw_bad:"Неверный пароль.",srv_pw_dir:"Пароль есть только у директора.",srv_pw_new8:"Новый пароль должен быть не короче 8 символов.",srv_pw_cur:"Текущий пароль неверен.",srv_cod48:"Код должен состоять из 4–8 цифр.",srv_self_lock:"Нельзя отключить или понизить собственную учётную запись.",srv_self_del:"Нельзя удалить собственную учётную запись.",srv_descr:"Напишите, на что потрачены деньги (описание обязательно).",
 show_more:"Показать ещё {n}",show_less:"Свернуть",
 th_det:"Детали",th_how:"Кто и как",n_rec:"Записей: {n}",
 pg_of:"{a}–{b} из {n}",pg_prev:"Предыдущая страница",pg_next:"Следующая страница",
 ov_more:"Подробнее",ov_all_s:"Все",per_lbl:"Период",menu_t:"Быстрый переход",menu_a:"Меню",s_totals:"Итоги",
 f_dinsal:"Новый оклад действует с",f_dinsal_h:"Месяц, на который приходится эта дата, целиком считается по новому окладу (включая уже внесённые табели). Предыдущие месяцы остаются по старому.",
 f_salariu_nou:"Новый оклад (MDL)",sal_actual:"Текущий оклад",sal_din:"Оклад с",sal_nou:"Новый оклад с",
 save_err:"Сервер не принял запись.",
 pending_out:"Неотправленные записи ({n}) остались на этом телефоне и отправятся, когда пользователь войдёт снова.",
 val_used:"Валюта {v} используется в записях, её нельзя удалить или переименовать.",
 pontaj_dup:"Для этого сотрудника уже есть табель за выбранный месяц. Откройте его и исправьте.",
 pontaj_zile:"Дни: 0–15 за первую половину и 0–16 за вторую.",
 casa_lipsa:"В кассе недостаточно денег: доступно {s} {v}. Сначала пополните кассу.",
 by_lbl:"внёс",
 arch_t:"Архив: отключённые пользователи",arch_h:"Войти они не могут, но их записи остаются в журналах и истории. Их можно восстановить в любой момент.",
 restore:"Восстановить",restored:"Пользователь восстановлен",fondator:"учредитель",
 f_codfond:"Код учредителя",f_codfond_h:"Учредитель подтверждает поступление своим кодом доступа.",codfond_bad:"Код учредителя неверный.",confirmat:"подтвердил",
 cont_lipsa:"На счёте недостаточно денег: доступно {s} MDL. Сначала внесите из кассы.",
 cont_lei:"На счёт поступают только леи: выберите MDL.",
 d_rest:"Возврат учредителю",s_fond:"Долги перед учредителями",l_fond_primit:"Занято у учредителей",l_fond_dat:"Долг",
 pontaj_h:"Табель можно заполнять только для сотрудников, которых создали вы.",
 pontaj_pay:"Оплачено: выплачиваю сейчас",pontaj_pay_h:"Создаются расходы «Зарплата» по проектам из дней месяца (или EHL). Деньги берутся из вашего аванса; у директора из кассы. Выплата проходит и при нехватке денег.",
 pontaj_paid:"Уже выплачено",ang_deact:"Удалить сотрудника",ang_deact_h:"Сотрудник уходит в архив: исчезает из списков, но его табели, оклады и история остаются.",ang_deact_yes:"Да, в архив",ang_deact_done:"Сотрудник переведён в архив",pontaj_dinavans:"Сотрудник-оператор: зарплата вычитается из его аванса, а не из кассы",pontaj_due:"К выплате",pontaj_nosal:"У сотрудника не задан оклад, выплачивать нечего.",pontaj_nota:"Зарплата по табелю",
 srv_ies_op:"Сотрудник записывает из аванса только выплаты зарплаты (галочка «Оплачено» в табеле).",
 a_grafic:"График работы",a_grafic_d:"Часы по дням",gr_full:"8ч",gr_ore:"ч",gr_h1:"Часы 1–15",gr_h2:"Часы 16–конец",gr_tot:"Всего часов",gr_zile:"Дней (8 часов = день)",
 gr_din:"Дни берутся из графика работы и вручную не вводятся.",arch_ang:"Архив: неактивные сотрудники",arch_ang_h:"Не показываются в графике, табеле и отчётах; их записи остаются. Можно вернуть в любой момент.",inact_lbl:"Неактивные",
 gr_mode_ang:"По сотруднику",gr_mode_zi:"По дню",gr_zi:"День",gr_half:"½ дня",gr_mine:"мои дни",pontaj_suma:"Выплачиваю сейчас (MDL)",pontaj_suma_h:"Пусто = весь остаток за месяц, включая дни, отмеченные другими. Можно указать часть, например только свои дни.",
 gr_h_zi:"Выберите дату, затем у каждого сотрудника отметьте полный день или половину. Каждая отметка сохраняется сразу, с вашим именем.",
 gr_lock:"Дни до последней выплаты закрыты и больше не меняются.",srv_gr_dup:"Этот день уже отмечен другим пользователем.",gr_other:"День внёс другой пользователь, изменить его нельзя.",
 f_complet:"Полный оклад (за весь месяц, независимо от дней)",f_complet_h:"Выплачивается весь месячный оклад плюс премия.",
 pontaj_paidby:"Выплатил",sal_descr:"Зарплата",gr_bani:"Причитается за месяц",gr_nosal:"оклад не задан",gr_none:"Выберите сотрудника.",gr_h:"Нажмите «День» за полный день или «½ дня» за половину. Отмечать можно только сегодня и прошедшие дни. Каждый день сохраняется сразу, с вашим именем; изменить день может только тот, кто его внёс.",gr_future:"Будущие дни не отмечаются: только сегодня и назад.",gr_remind_t:"График работы сегодня не открывался",gr_remind:"Отметьте дни ваших сотрудников, которые работали сегодня. Панель исчезнет после открытия графика.",
 reset_btn:"Удалить данные",reset_t:"Удаление всех данных",reset_h:"Удаляются все записи: поступления, расходы, выдачи, аренда, договоры, займы, проекты, сотрудники, зарплаты, график, история. Удаляются и учётные записи сотрудников-операторов. Отменить нельзя.",reset_keep:"Остаются только учётные записи директоров и настройки (валюты, категории, кассир).",reset_cod:"Ваш код доступа, для подтверждения",reset_go:"Удалить всё, безвозвратно",reset_busy:"Удаляется…",reset_done:"Данные удалены. Приложение перезапускается.",srv_reset_dir:"Удалять данные может только директор.",srv_reset_cod:"Код доступа неверный.",srv_sal_lock:"Выплаты зарплаты не меняются и не удаляются.",
 srv_grafic:"График можно вести только для сотрудников, которых создали вы.",srv_ore:"День отмечается полным (8 часов) или половиной (4 часа).",srv_gr_lock:"Оплаченные дни больше не меняются.",f_extra:"Премия (MDL)",f_extra_h:"Дополнительное вознаграждение за этот месяц, если сотрудник сделал что-то сверх. Входит в сумму к выплате.",
 op_ang:"Сотрудники",ang_n:"сотрудн.",f_aditional:"Дополнительно",inc_peste:"Сумма превышает договор проекта. Можно получить ещё {x}.",inc_peste_cash:"Наличными по этому проекту можно получить ещё {x} (часть cash договора).",inc_peste_tr:"Переводом по этому проекту можно получить ещё {x} (часть transfer договора).",op_ang_h:"За выбранный сверху месяц: все дни сотрудника и кто их отметил, сумма за месяц, сколько и кем выплачено, остаток. Часы открывают график, шестерёнка карточку.",pontaj_lipsa:"табеля за этот месяц нет",gr_zile_s:"дн.",rest_total:"остаток за все месяцы",sal_h:"Оклад можно задать только сотрудникам, которых создали вы.",srv_sal:"Оклад можно задать только сотрудникам, которых создали вы.",
 f_contract_mdl:"Сумма договора (MDL)",p_cash:"Получено наличными",p_tr:"Получено переводом",p_ramas:"Осталось получить",
 f_adaug:"Дополнительно (MDL)",f_contract_eur:"Договор в EUR",f_contract_eur_sum:"Сумма договора (EUR)",f_contract_cash:"Из них наличными (EUR)",f_contract_tr:"Из них переводом (EUR)",contract_split:"Наличные + перевод должны давать сумму договора.",f_proiect_nume:"Название проекта",f_client_nume:"Имя клиента",s_tranz:"Все операции",s_tranz_h:"Каждое движение денег, новые сверху: откуда ушли, куда пришли, кто записал. Нажмите на строку, чтобы открыть запись и её историю.",tz_cont:"Счёт",rec_hist:"История записи",rec_hist_none:"Истории нет.",j_nochange:"Сохранено без изменений",f_contract_usd:"Договор в USD",pers_dir_h:"Из кассы EHL деньги идут только администратору.",p_adaug:"Дополнительно",p_total:"Договор + дополнительно",
 sess_other:"В аккаунт вошли на другом устройстве. Введите код, чтобы продолжить здесь.",
 op_primit:"Получено от директора",op_primit_dir:"Взято из кассы EHL",op_dat:"Передано дальше",op_adv_dir:"Деньги, взятые из кассы EHL",nav_ehl:"EHL",app_ehl:"Касса EHL · общий счёт",op_chn:"Потрачено наличными",op_prop:"Из своих денег",op_tr:"Переводом (со счёта)",op_adv:"Деньги, полученные от директора",op_proj:"Расходы по проектам",
 cont_intra:"На счёт поступит",
 s_cont_minus:"Счёт в минусе",l_cont_achitat:"Нужно внести на счёт",cont_minus_h:"Платежи переводом превысили деньги на счёте. Ниже — платежи, которые увели счёт в минус. Покройте его поступлением переводом или Выдачей из кассы → Внесено на счёт.",
 srv_cont:"На счёте недостаточно денег. Сначала внесите из кассы.",srv_avans:"В вашем авансе недостаточно денег. Сначала получите деньги у директора.",op_tr_h:"со счёта фирмы",din_casa:"из кассы",cont_meu_disp:"Доступно на моём счёте",f_codehl:"Код EHL",f_codehl_h:"Деньги уходят из кассы EHL: подтвердите своим кодом EHL.",codehl_bad:"Код EHL неверный.",codehl_fmt:"Код EHL должен быть из 4–8 цифр.",codehl_none:"У вас нет кода EHL: без него нельзя брать деньги из кассы EHL. Задайте его в Настройки → Пользователи.",f_codehl_set:"Код EHL (доступ к кассе EHL)",f_codehl_set_h:"4–8 цифр. Брать деньги из общей кассы может только директор с кодом EHL.",f_din:"Откуда",f_din_h:"Касса EHL — общая касса директоров; Мой счёт — деньги, которые я взял из неё.",din_casa_ehl:"Касса EHL",din_cont_meu:"Мой счёт",s_dirs:"Счета администраторов",s_dirs_h:"Сколько каждый директор взял из кассы EHL, что передал дальше или потратил, и сколько у него на руках.",l_dirs:"У администраторов",
 s_colab_exp:"Расходы и аренда сотрудников",s_tr:"Расходы со счёта (перевод)",tr_h:"При переводе деньги берутся с банковского счёта, а не у человека. Нажмите на имя, чтобы увидеть, на что они потрачены.",colab_tr:"Оплачено переводом (со счёта)",
 avans_lipsa:"В вашем авансе недостаточно денег: доступно {s} MDL. Сначала получите деньги у директора.",cont_meu_lipsa:"На вашем счёте недостаточно денег: доступно {s} MDL. Сначала возьмите из кассы EHL.",ehl_dest:"Из кассы EHL деньги идут только администраторам, на счёт или обратно учредителю.",avans_disp:"Доступно из моего аванса",din_avans:"из аванса:",colab_gave:"Выдачи из аванса",
 f_pentru:"Расход относится к",pt_proiect:"Проект",pt_proiecte:"Проекты",pt_ehl:"EHL (фирма)",pt_alte:"Прочее",s_pentru:"Расходы: проекты, EHL, прочее",
 fond_h:"Деньги, внесённые учредителем, — это заём фирме: долг растёт с каждым поступлением от него и уменьшается через Выдачу из кассы → Возврат учредителю."
}};
var lang="ro";
try{var sl=localStorage.getItem("ehl.lang"); if(sl==="ro"||sl==="ru") lang=sl;}catch(e){}
function T(k){var d=I18N[lang];return (d&&d[k])||I18N.ro[k]||k;}
/* the server answers in Romanian; known messages are shown in the interface language */
var SRV_MSG={"Cod invalid.":"srv_cod","Prea multe încercări. Așteptați 15 minute.":"srv_many","Cod greșit sau utilizator dezactivat.":"srv_bad_user","Parola trebuie să aibă cel puțin 8 caractere.":"srv_pw8","Parolă greșită.":"srv_pw_bad","Doar directorul are parolă.":"srv_pw_dir","Parola nouă trebuie să aibă cel puțin 8 caractere.":"srv_pw_new8","Parola actuală este greșită.":"srv_pw_cur","Codul trebuie să aibă 4–8 cifre.":"srv_cod48","Nu vă puteți dezactiva sau retrograda propriul cont.":"srv_self_lock","Nu vă puteți șterge propriul cont.":"srv_self_del","Doar directorul poate șterge datele.":"srv_reset_dir","Plățile de salariu nu se mai schimbă și nu se șterg.":"srv_sal_lock","Codul de acces este greșit.":"srv_reset_cod","Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).":"srv_descr","Înregistrarea are mai mult de 15 zile; o poate modifica doar directorul.":"srv_old","Codul fondatorului este greșit.":"codfond_bad","Pontajul se face doar pentru angajații creați de dumneavoastră.":"pontaj_h","Pe cont nu sunt destui bani. Depuneți mai întâi din casă.":"srv_cont","Nu aveți destui bani din avans. Cereți mai întâi bani de la director.":"srv_avans","Din Casa EHL banii merg doar la administratori, pe cont sau înapoi la fondator.":"ehl_dest","Codul EHL este greșit.":"codehl_bad","Codul EHL trebuie să aibă 4–8 cifre.":"codehl_fmt","Nu aveți destui bani în contul dumneavoastră. Luați mai întâi din Casa EHL.":"cont_meu_lipsa","Colaboratorul înregistrează din avans doar plăți de salariu (bifa Achitat din pontaj).":"srv_ies_op","Salariul se stabilește doar pentru angajații creați de dumneavoastră.":"srv_sal","Graficul se face doar pentru angajații creați de dumneavoastră.":"srv_grafic","Ziua se bifează întreagă (8 ore) sau jumătate (4 ore).":"srv_ore","Zilele achitate nu se mai schimbă.":"srv_gr_lock","Zilele viitoare nu se bifează: doar azi și înapoi.":"gr_future","Ziua este deja bifată de alt utilizator.":"srv_gr_dup"};
function srvT(m){var k=SRV_MSG[String(m||"").trim()];return k?T(k):m}

/* ---------------- helpers ---------------- */
var $=function(s,r){return (r||document).querySelector(s)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]})}
function n(v){var x=parseFloat(String(v==null?"":v).replace(",","."));return isFinite(x)?x:0}
function fmt(v,dec){var d=dec==null?2:dec;try{return new Intl.NumberFormat(lang==="ru"?"ru-RU":"ro-RO",{minimumFractionDigits:d,maximumFractionDigits:d}).format(v||0)}catch(e){return (v||0).toFixed(d)}}
function money(v){return fmt(v,2)}
function today(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate())}
function p2(x){return x<10?"0"+x:""+x}
function curMonth(){return today().slice(0,7)}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
/* The id of a new record is made on the phone (15 characters, like PocketBase's own), so a create that is sent
   again after its answer was lost is refused as a duplicate instead of becoming a second record. */
function newId(){var a="abcdefghijklmnopqrstuvwxyz0123456789",s="";for(var i=0;i<15;i++)s+=a.charAt(Math.floor(Math.random()*36));return s}
function localTs(s){var d=new Date(String(s||"").replace(" ","T"));return isNaN(d.getTime())?String(s||""):d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate())+" "+p2(d.getHours())+":"+p2(d.getMinutes())}
function toast(msg){var w=$("#toasts");var el=document.createElement("div");el.className="toast";el.textContent=msg;w.appendChild(el);setTimeout(function(){el.remove()},2200)}
function monthName(ym){if(!ym)return"";var p=ym.split("-");var names=lang==="ru"?["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"]:["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];var i=parseInt(p[1],10)-1;return (names[i]||"")+" "+p[0]}
/* The firm's rule: a monthly salary is always divided by 24 working days, whatever the month, and paid in two halves
   (days 1–15 and 16–end). So the price of a day is salary / 24 and each half is its days × that price. */
var ZILE_LUNA=24;
function workdays(ym){return ym&&ym.length>=7?ZILE_LUNA:0}
function monthEnd(ym){var y=parseInt(ym.slice(0,4),10),m=parseInt(ym.slice(5,7),10);return ym+"-"+p2(new Date(y,m,0).getDate())}

/* ---------------- state ---------------- */
var DEF_CFG={valute:[{cod:"MDL",curs:1},{cod:"EUR",curs:20.22},{cod:"USD",curs:17.5}],casier:"",
  categorii:["Materiale","Materiale / Fundația","Materiale / Finisaje exterioare","Materiale / Instalații sanitare și electrice","Materiale / Acoperiș","Materiale / Finisaje interioare","Arhitectură","Tâmplărie","Combustibil","Transport","Servicii terțe","Taxe și impozite","Instrumente și unelte","Reparații administrative","Marketing","Comision","Consumabile","Cheltuieli neplanificate","Kit MgO"],pin:"1234"};
var S={cfg:null,incasari:[],cheltuieli:[],iesiri:[],chirii:[],contracte:[],angajati:[],istoric:[],pontaj:[],grafic:[],imprumuturi:[],proiecte:[],utilizatori:[]};
var COLS=["incasari","cheltuieli","iesiri","chirii","contracte","angajati","istoric","pontaj","grafic","imprumuturi","schimburi","proiecte","utilizatori"];
var DATA_COLS=["incasari","cheltuieli","iesiri","chirii","contracte","angajati","istoric","pontaj","grafic","imprumuturi","schimburi","proiecte"];
var PB=null,ME=null,DL=true,loaded={},loadTimer=null,stale=false,dbErr=false,authErr="",noCfg=false;
/* ACCESS: null (locked) | {user:{id,nume,rol,cod,status}}; QUEUE: writes waiting for the network */
var ACCESS=null,gateBusy=false,gateErr="",subs=[],installEvt=null,online=true,QUEUE=[],flushing=false;
var view="add",regTab="incasari",isDir=false;

function cfg(){return S.cfg||DEF_CFG}
function valute(){var v=cfg().valute;return (v&&v.length)?v:DEF_CFG.valute}
function cursAzi(cod){var v=valute().filter(function(x){return x.cod===cod})[0];return v?(n(v.curs)||1):1}
function casier(){return (cfg().casier||"").trim()}
function sameP(a,b){return String(a||"").trim().toLowerCase()===String(b||"").trim().toLowerCase()}
function uniq(a){var o=[],seen={};a.forEach(function(x){var k=String(x||"").trim();if(k&&!seen[k.toLowerCase()]){seen[k.toLowerCase()]=1;o.push(k)}});return o.sort(function(x,y){return x.localeCompare(y)})}
function clienti(){return uniq(S.incasari.map(function(r){return r.client}).concat(S.cheltuieli.map(function(r){return r.client}),S.contracte.map(function(r){return r.client}),S.proiecte.map(function(p){return p.client})))}
/* incomes and expenses pick the client from the ones already known (projects, contracts, earlier rows); only when
   none exists yet is the field free text. Choosing a project fills the client in (see the change handler). */
/* the founders are the directors: money they put in is an income "from" them, so the client list of an income offers
   them first (marked "fondator"), then the real clients */
function fondatori(){return uniq(S.utilizatori.filter(function(u){return u.rol==="Director"&&u.status!=="Inactiv"}).map(function(u){return u.nume}))}
function fondatoriToti(){return uniq(S.utilizatori.filter(function(u){return u.rol==="Director"}).map(function(u){return u.nume}))} /* a debt outlives a deactivation */
/* the director whose name an income names as its source; money from a founder is confirmed with that founder's code */
function fondatorOf(name){return S.utilizatori.filter(function(u){return u.rol==="Director"&&sameP(u.nume,name)})[0]||null}
function fClient(req,withFounders){
  var fnd=withFounders?fondatori():[];
  var lst=clienti().filter(function(c){return !fnd.some(function(f){return sameP(f,c)})});
  var opts=fnd.map(function(f){return {v:f,l:f+" · "+T("fondator")}}).concat(opt(lst));
  /* only the director creates clients (on a project or a contract); an operator always picks from the list */
  if(!opts.length&&isDir)return {k:"client",t:"text",l:"f_client",req:req};
  return {k:"client",t:"select",l:"f_client",req:req,allowEmpty:1,opts:opts};
}
function proiecteNume(){return uniq(S.incasari.map(function(r){return r.proiect}).concat(S.cheltuieli.map(function(r){return r.proiect}),S.proiecte.map(function(p){return p.nume})))}
function respList(p){return String(p&&p.responsabili||"").split(",").map(function(s){return s.trim()}).filter(Boolean)}
function myUser(){
  if(!ACCESS||!ACCESS.user)return null;
  var live=S.utilizatori.filter(function(u){return u.id===ACCESS.user.id})[0];
  var u=live||ACCESS.user;
  return (u&&u.status!=="Inactiv")?u:null;
}
function computeDir(){var u=myUser();return !!(u&&u.rol==="Director")}
function meName(){var u=myUser();return (u&&u.nume)||""}
/* who entered a record: the author set by the server, named through the users list (directors hold the whole list) */
function byName(r){var u=r&&r.by?S.utilizatori.filter(function(x){return x.id===r.by})[0]:null;return u?(u.nume||""):""}
function byLine(r){var b=byName(r);return b?T("by_lbl")+" "+b:""}
/* People are named by text in every register. When a user or an employee is renamed, the old name is replaced in all
   the rows that carry it (and in the cashier setting), so the reports keep following the same person. Directors only. */
function renamePerson(oldN,newN){
  oldN=String(oldN||"").trim();newN=String(newN||"").trim();
  if(!isDir||!oldN||!newN||oldN===newN)return Promise.resolve();
  if(!PB||!online)return Promise.reject(new Error(T("offline")));
  /* the server renames in one go, every row of every author (the update hooks keep payer fields otherwise); then refetch */
  return PB.send("/api/ehl/rename",{method:"POST",body:{vechi:oldN,nou:newN},requestKey:null}).then(function(){return refreshData()});
}
function unsubAll(){subs.forEach(function(u){try{u()}catch(e){}});subs=[];if(PB){try{PB.realtime.unsubscribe()}catch(e){}}}
function resetData(){COLS.forEach(function(c){S[c]=[]});S.cfg=null;loaded={};stale=false;dbErr=false;if(loadTimer){clearTimeout(loadTimer);loadTimer=null}}
function logout(msg){
  unsubAll();resetData();
  /* unsent records stay stored under their own user (qKey) and go out when that user signs in again */
  var left=QUEUE.length;QUEUE=[];FAILED=[];
  if(left)toast(T("pending_out").replace("{n}",String(left)));
  ACCESS=null;ME=null;isDir=false;LOCKED=false;sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";
  if(PB)PB.authStore.clear();
  try{localStorage.removeItem("ehl.cache");localStorage.removeItem("ehl.mode");localStorage.removeItem("ehl.ehlcod")}catch(e){}
  gateErr=msg||"";view="add";render();
}
function needGate(){return !ACCESS||LOCKED}
function userOf(r){return {id:r.id,nume:r.nume||"",rol:r.rol||"Operator",cod:r.cod||"",codEHL:r.codEHL||"",status:r.status||"Activ",parolaSetata:!!r.parolaSetata}}
/* the EHL code of the signed-in director (taking money out of the common till needs it) */
function myCodEHL(){var u=myUser();return String((u&&u.codEHL)||"")}
/* EHL mode: the director signed in with his EHL code — the firm-wide view, and money leaves the common till without
   asking the code again (it is sent along from here). Kept in localStorage, dropped on sign-out. */
function ehlMode(){try{return localStorage.getItem("ehl.mode")==="1"}catch(e){return false}}
function ehlCod(){try{return localStorage.getItem("ehl.ehlcod")||""}catch(e){return ""}}
function homeView(){return isDir?(ehlMode()?"ehl":"panou"):"add"}
function enter(user){
  ACCESS={user:userOf(user)};ME=user.id;gateErr="";GATE={step:"cod"};
  isDir=computeDir();view=homeView();
  subscribe();
}
/* Gate steps: "cod" (everyone) -> for directors "setparola" (first time) or "parola" (new phone, or weekly). */
var GATE={step:"cod"};
/* Lock screen: the access code is asked again on every start of the app and after it sat in the background
   for LOCK_AFTER; the session itself (token, data, offline queue) stays, only the screen is covered. */
var LOCKED=false,LOCKVIEW="",hiddenAt=0,LOCK_AFTER=2*24*3600*1000; /* the code is asked at most once in 2 days (the firm's choice) */
var PAROLA_DIR=false; /* the director's password is switched off for now (see PAROLA_DIRECTOR in the server hooks) */
function lastUnlock(){try{return parseInt(localStorage.getItem("ehl.unlock")||"0",10)||0}catch(e){return 0}}
function markUnlock(){try{localStorage.setItem("ehl.unlock",String(Date.now()))}catch(e){}}
function lockDue(){return Date.now()-lastUnlock()>LOCK_AFTER}
var EDIT_DAYS=15; /* an operator may correct his own rows for this many days; afterwards only the director */
function lockScreen(){
  if(!ACCESS||LOCKED)return;
  LOCKED=true;LOCKVIEW=view;gateErr="";
  if(sheetState||$("#sheet").innerHTML){sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";}
  GATE={step:"cod",relock:true,nume:ACCESS.user.nume};
  render();
}
function unlockScreen(){
  LOCKED=false;gateErr="";GATE={step:"cod"};markUnlock();
  view=LOCKVIEW||homeView();
  render();
}
function sessionExp(){try{return parseInt(localStorage.getItem("ehl.exp")||"0",10)||0}catch(e){return 0}}
/* POST /api/ehl/login {cod[,parola|parolaNoua]} -> {token,record,expires} | {needPassword} | {needSetPassword};
   the server counts failed attempts per IP, and director tokens expire after 7 days */
function login(cod,parola,parolaNoua){
  cod=String(cod||"").trim();
  if(!PB)return Promise.reject({code:"no_db"});
  var body={cod:cod};if(parola)body.parola=parola;if(parolaNoua)body.parolaNoua=parolaNoua;
  return PB.send("/api/ehl/login",{method:"POST",body:body,requestKey:null}).then(function(res){
    if(res.needSetPassword){GATE={step:"setparola",cod:cod,nume:res.record&&res.record.nume,first:res.first};return res;}
    if(res.needPassword){GATE={step:"parola",cod:cod,nume:res.record&&res.record.nume};return res;}
    PB.authStore.save(res.token,res.record);
    try{if(res.ehl){localStorage.setItem("ehl.mode","1");localStorage.setItem("ehl.ehlcod",cod)}else{localStorage.removeItem("ehl.mode");localStorage.removeItem("ehl.ehlcod")}}catch(e){}
    try{
      /* only a password-backed director session (it carries "expires") remembers the code for the weekly password screen */
      if(res.record&&res.record.rol==="Director"&&res.expires){localStorage.setItem("ehl.cod",cod);localStorage.setItem("ehl.exp",String(res.expires))}
      else{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}
    }catch(e){}
    markUnlock();
    enter(res.record);
    if(res.first||GATE.first)toast(T("first_pin"));
    return res;
  });
}
/* a director's week is over: keep the code, ask for the password again */
function sessionExpired(){
  var cod="",nume=ACCESS&&ACCESS.user?ACCESS.user.nume:"";try{cod=localStorage.getItem("ehl.cod")||""}catch(e){}
  logout("");
  GATE=cod?{step:"cod",relock:true,weekly:true,cod:cod,nume:nume}:{step:"cod"};
  render();
}
function expiryCheck(){
  if(!ACCESS||!isDir)return false;
  var exp=sessionExp();
  if(exp&&Date.now()>exp-60000){sessionExpired();return true;}
  return false;
}
/* ---- loading + live updates ---- */
function netErr(e){return !e||e.status===0||e.isAbort===true||(!e.status&&!e.code)}
function norm(r){var o={};for(var k in r)o[k]=r[k];o.ts=o.ts||o.created||"";if(!o.by)o.by="";return o}
function normCfg(c){
  var o=norm(c);
  ["valute","categorii","directori"].forEach(function(k){if(typeof o[k]==="string"){try{o[k]=JSON.parse(o[k])}catch(e){o[k]=null}}});
  return o;
}
function applyEvent(col,ev){
  var list=S[col]||[];
  if(ev.action==="delete"){S[col]=list.filter(function(r){return r.id!==ev.record.id})}
  else{var rec=norm(ev.record),i=-1;list.forEach(function(r,k){if(r.id===rec.id)i=k});
    if(i<0)list.push(rec);else list[i]=rec;S[col]=list;}
  saveCache();
  if(!sheetState)render();
}
function authErrOf(e){
  if(e&&(e.status===401||e.status===403)){
    if(e.status===401){
      if(PAROLA_DIR&&isDir){sessionExpired();return true;}
      /* the token died: the account was opened on another device (one session per account) */
      logout(T("sess_other"));return true;
    }
    logout(T("gate_bad"));return true;
  }
  return false;
}
/* List rules filter instead of refusing, so a deactivated user just sees empty lists;
   the only reliable signal is our own user record disappearing (404) or the token refresh failing. */
/* A page left open keeps running the code it was loaded with, while the server moves on (new fields, new rules).
   The version is the cache name in sw.js: it is read once at start-up and again on every self-check; when it has
   changed the page reloads itself — never while a form is open (then right after it closes). Unsent records are safe:
   the queue lives in localStorage. */
var VER0="",verNew=false;
function verFetch(){
  if(typeof window.fetch!=="function")return Promise.resolve("");
  return window.fetch("./sw.js",{cache:"no-store"}).then(function(r){return r.ok?r.text():""})
    .then(function(t){var m=/casieria-ehl-v(\d+)/.exec(t||"");return m?m[1]:""}).catch(function(){return ""});
}
function verCheck(){
  verFetch().then(function(v){
    if(!v)return;
    if(!VER0){VER0=v;return;}
    if(v!==VER0){verNew=true;verApply();}
  });
}
function verApply(){if(verNew&&!sheetState){try{window.location.reload()}catch(e){}}}
function selfCheck(){
  verCheck();
  if(!PB||!ACCESS||!online)return Promise.resolve();
  if(expiryCheck())return Promise.resolve();
  return PB.collection("utilizatori").getOne(ACCESS.user.id,{requestKey:null}).then(function(u){
    S.utilizatori=S.utilizatori.filter(function(x){return x.id!==u.id}).concat([norm(u)]);checkSelf();
  }).catch(function(e){if(e&&(e.status===404||e.status===401||e.status===403))signedOut()});
}
/* Our own record cannot be read any more. PocketBase answers a dead token like a stranger (404 on the record), so the
   reason is asked from the token itself: a refresh refused with 401 means the account was opened on another device
   (one session per account); anything else is a deactivated user. */
function signedOut(){
  if(!PB||!ACCESS)return;
  PB.collection("utilizatori").authRefresh({requestKey:null}).then(function(){return T("gate_bad")},function(e){return (e&&e.status===401)?T("sess_other"):T("gate_bad")})
    .then(function(m){if(ACCESS)logout(m)});
}
setInterval(function(){selfCheck();refreshData()},3*60*1000);
/* Live updates arrive over the realtime stream, but events missed while the page sat in the background or offline never
   come again (phones cut the stream). So the lists are fetched afresh on every return to the foreground, on every
   reconnection and every 3 minutes — without resetting S, so nothing flickers — and the screen is redrawn. */
var refreshing=false;
function refreshData(){
  if(!PB||!ACCESS||!online||refreshing)return Promise.resolve();
  refreshing=true;
  var got={};
  return Promise.all(DATA_COLS.map(function(col){
    return PB.collection(col).getFullList({batch:1000,requestKey:null}).then(function(items){got[col]=items.map(norm)}).catch(function(e){if(authErrOf(e))throw e});
  })).then(function(){
    return PB.collection("config").getFullList({requestKey:null}).then(function(items){if(items[0])S.cfg=normCfg(items[0])}).catch(function(){});
  }).then(function(){
    Object.keys(got).forEach(function(col){S[col]=got[col];loaded[col]=true});
    stale=false;saveCache();if(!sheetState)render();
  },function(){}).then(function(){refreshing=false});
}
document.addEventListener("visibilitychange",function(){
  if(document.visibilityState==="hidden"){hiddenAt=Date.now();return;}
  if(ACCESS&&!LOCKED&&hiddenAt&&lockDue())lockScreen();
  selfCheck();refreshData();
});
var RT=typeof window.EventSource==="function";
function sub(col,topic,cb){
  if(!RT)return;
  try{PB.collection(col).subscribe(topic,cb,{requestKey:null}).then(function(un){subs.push(un)}).catch(function(){})}catch(e){}
}
function subscribe(){
  unsubAll();resetData();
  if(!PB||!ACCESS)return;
  loadCache();
  loadTimer=setTimeout(function(){stale=true;render()},10000);
  var cols=DATA_COLS.slice(); /* operators get only the salary rows of their own employees (server rule) */
  cols.forEach(function(col){
    PB.collection(col).getFullList({batch:1000,requestKey:null}).then(function(items){
      S[col]=items.map(norm);loaded[col]=true;stale=false;
      if(loadTimer){clearTimeout(loadTimer);loadTimer=null}
      saveCache();if(!sheetState)render();
    }).catch(function(e){
      if(authErrOf(e))return;
      if(netErr(e)){online=false;loaded[col]=!!(S[col]&&S[col].length)}else dbErr=true;
      render();
    });
    sub(col,"*",function(ev){applyEvent(col,ev)});
  });
  if(isDir){
    PB.collection("utilizatori").getFullList({batch:500,requestKey:null}).then(function(items){S.utilizatori=items.map(norm);saveCache();checkSelf()}).catch(authErrOf);
    sub("utilizatori","*",function(ev){applyEvent("utilizatori",ev);checkSelf();if(ev.record&&ev.record.id===ME)selfCheck()}); /* my record changed: maybe a sign-in elsewhere */
  }else{
    PB.collection("utilizatori").getOne(ME,{requestKey:null}).then(function(u){S.utilizatori=[norm(u)];saveCache();checkSelf()})
      .catch(function(e){if(e&&e.status===404){signedOut();return}authErrOf(e)});
    sub("utilizatori",ME,function(ev){applyEvent("utilizatori",ev);checkSelf();selfCheck()});
  }
  PB.collection("config").getFullList({requestKey:null}).then(function(items){if(items[0])S.cfg=normCfg(items[0]);saveCache();if(!sheetState)render()}).catch(authErrOf);
  sub("config","*",function(ev){if(ev.action!=="delete")S.cfg=normCfg(ev.record);saveCache();if(!sheetState)render()});
  flushQueue();
}
/* our own user record changed: name, role or deactivation */
function checkSelf(){
  if(!ACCESS)return;
  var me=S.utilizatori.filter(function(u){return u.id===ACCESS.user.id})[0];
  if(!me||me.status==="Inactiv"){logout(T("gate_bad"));return;}
  ACCESS.user=userOf(me);
  try{PB.authStore.save(PB.authStore.token,me)}catch(e){}
  var was=isDir;isDir=computeDir();
  if(was!==isDir){view=homeView();subscribe();return;}
  if(!sheetState)render();
}
/* ---- offline cache + write queue ---- */
function saveCache(){
  if(!ACCESS)return;
  try{var o={u:ACCESS.user.id,cfg:S.cfg};COLS.forEach(function(c){o[c]=S[c]});localStorage.setItem("ehl.cache",JSON.stringify(o))}catch(e){}
}
function loadCache(){
  try{var o=JSON.parse(localStorage.getItem("ehl.cache")||"null");
    if(o&&o.u===ACCESS.user.id){COLS.forEach(function(c){if(o[c])S[c]=o[c]});if(o.cfg)S.cfg=o.cfg;}}catch(e){}
  loadQueue();
}
/* The queue and the rejected list belong to the user who wrote them: each user has own keys, so after
   "Schimbă utilizatorul" the next person on the phone never sends someone else's records under own name. */
function qKey(k){return "ehl."+k+"."+ME}
function readList(k){var a;try{a=JSON.parse(localStorage.getItem(k)||"[]")}catch(e){a=[]}return (a instanceof Array)?a:[]}
function saveQueue(){
  if(!ME)return;
  var v=JSON.stringify(QUEUE);
  try{localStorage.setItem(qKey("queue"),v)}catch(e){
    /* storage is full: the data snapshot can be loaded again from the server, unsent records cannot */
    try{localStorage.removeItem("ehl.cache");localStorage.setItem(qKey("queue"),v)}catch(e2){}
  }
}
var FAILED=[];
function saveFailed(){if(!ME)return;try{localStorage.setItem(qKey("failed"),JSON.stringify(FAILED))}catch(e){}}
function loadQueue(){
  QUEUE=readList(qKey("queue"));FAILED=readList(qKey("failed"));
  /* earlier versions kept one queue for the whole phone: take it over once */
  var oq=readList("ehl.queue"),of=readList("ehl.failed");
  if(oq.length||of.length){QUEUE=oq.concat(QUEUE);FAILED=of.concat(FAILED);saveQueue();saveFailed()}
  try{localStorage.removeItem("ehl.queue");localStorage.removeItem("ehl.failed")}catch(e){}
}
function retryFailed(i){var op=FAILED[i];if(!op)return;FAILED.splice(i,1);delete op.err;delete op.at;QUEUE.push(op);saveFailed();saveQueue();render();flushQueue()}
function dropFailed(i){FAILED.splice(i,1);saveFailed();render()}
function failedNote(){
  if(!FAILED.length)return "";
  return '<div class="failed"><b>'+esc(T("failed_t").replace("{n}",String(FAILED.length)))+'</b><br>'+esc(T("failed_h"))+FAILED.map(function(op,i){
    var d=op.data||{};var what=[FORMS[op.col]?T(FORMS[op.col].title):op.col,d.suma!=null?money(n(d.suma))+" "+(d.valuta||"MDL"):"",d.descriere||d.nota||d.nume||d.client||""].filter(Boolean).join(" · ");
    return '<div style="margin-top:8px"><span class="num">'+esc(what)+'</span><br><small style="color:var(--muted)">'+esc(srvT(op.err||""))+'</small><br>'
      +'<button type="button" class="btn" data-retry="'+i+'">'+esc(T("failed_retry"))+'</button><button type="button" class="btn danger" data-dropfailed="'+i+'">'+esc(T("del"))+'</button></div>';
  }).join("")+'</div>';
}
function flushQueue(){
  if(flushing||!PB||!ACCESS||!QUEUE.length||!online)return;
  flushing=true;
  var op=QUEUE[0],p;
  if(op.op==="create")p=PB.collection(op.col).create(op.data,{requestKey:null}).then(function(rec){
    var real=rec.id,tmp=op.id;
    S[op.col]=(S[op.col]||[]).map(function(r){return r.id===tmp?norm(rec):r});
    QUEUE.forEach(function(q){if(q.id===tmp)q.id=real;if(q.data&&q.data.ref===tmp)q.data.ref=real;if(q.data&&q.data.data&&q.data.data.id===tmp)q.data.data.id=real});
  });
  else if(op.op==="update")p=PB.collection(op.col).update(op.id,op.data,{requestKey:null}).then(function(rec){S[op.col]=(S[op.col]||[]).map(function(r){return r.id===rec.id?norm(rec):r})});
  else p=PB.collection(op.col).delete(op.id,{requestKey:null}).catch(function(e){if(e&&e.status===404)return;throw e});
  p.then(function(){QUEUE.shift();saveQueue();flushing=false;saveCache();if(QUEUE.length)flushQueue();else if(!sheetState)render()})
   .catch(function(e){
     flushing=false;
     if(netErr(e)){online=false;render();return;}
     if(authErrOf(e))return;
     /* the id is taken: an earlier attempt reached the server and only its answer was lost, so the record is already there */
     if(op.op==="create"&&e&&e.status===400&&e.response&&e.response.data&&e.response.data.id){
       QUEUE.shift();saveQueue();saveCache();
       if(QUEUE.length)flushQueue();else if(!sheetState)render();
       return;
     }
     /* refused by the server (rule or validation): park it where the user can see and retry it; nothing is ever dropped silently */
     var bad=QUEUE.shift();bad.err=(e&&e.response&&e.response.message)||String(e&&e.message||e);bad.at=new Date().toISOString();
     FAILED.push(bad);saveFailed();saveQueue();saveCache();toast(T("failed_toast"));selfCheck();
     if(QUEUE.length)flushQueue();else render();
   });
}
window.addEventListener("online",function(){online=true;dbErr=false;if(ACCESS){if(!loaded.incasari)subscribe();else{flushQueue();refreshData()}}render()});
window.addEventListener("offline",function(){online=false;render()});
function codNou(){
  for(var i=0;i<60;i++){
    var c=String(Math.floor(100000+Math.random()*900000));
    if(!S.utilizatori.some(function(u){return String(u.cod)===c}))return c;
  }
  return String(Date.now()).slice(-6);
}
function proiecteVizibile(){
  var all=S.proiecte.filter(function(p){return p.status!=="Finalizat"});
  if(isDir)return all.map(function(p){return p.nume}).sort(function(a,b){return String(a).localeCompare(String(b))});
  var me=meName();
  var mine=me?all.filter(function(p){return respList(p).some(function(r){return sameP(r,me)})}):[];
  return (mine.length?mine:all).map(function(p){return p.nume}).sort(function(a,b){return String(a).localeCompare(String(b))});
}
function fProiect(){
  var lst=proiecteVizibile();
  if(!lst.length)return {k:"proiect",t:"text",l:"f_proiect",list:proiecteNume()};
  return {k:"proiect",t:"select",l:"f_proiect",allowEmpty:1,opts:opt(lst)};
}
function oameni(){
  var u=S.utilizatori.filter(function(x){return x.status!=="Inactiv"}).map(function(x){return x.nume});
  var a=angajatiActivi();
  var base=uniq(u.concat(a));
  return base.length?uniq(base.concat(persoane())):persoane();
}
/* money leaving the till goes to someone: the field offers every active user (directors included), the employees and
   the names already used in the registers, and still accepts a name that is not on the list */
function fPersoana(req){return {k:"persoana",t:"text",l:"f_pers",req:req,list:oameni()}}
/* Money out of the common Casa EHL reaches only an administrator (a director), the bank or a founder it is owed to;
   everything else (salaries, loans, other) is paid by an administrator from his own account. */
var DEST_CASA=["Dat persoanei","Depus pe cont","Restituire fondator"];
function fromCasa(d){return !!(isDir&&!isCasierMe()&&(ehlMode()||!d||d.din!=="Avans"))}
function destOpts(){
  var all=[{v:"Dat persoanei",l:T("d_pers")},{v:"Depus pe cont",l:T("d_depus")},{v:"Salarii",l:T("d_sal")},{v:"Împrumut",l:T("d_impr")},{v:"Restituire fondator",l:T("d_rest")},{v:"Alte",l:T("d_alte")}];
  var st=sheetState&&sheetState.col==="iesiri"&&!sheetState.id?sheetState:null;
  return (st&&fromCasa(st.data))?all.filter(function(o){return DEST_CASA.indexOf(o.v)>=0}):all;
}
function fPersoanaIes(){
  var st=sheetState&&sheetState.col==="iesiri"&&!sheetState.id?sheetState:null;
  if(st&&fromCasa(st.data)&&st.data.destinatie==="Dat persoanei")return {k:"persoana",t:"select",l:"f_pers",req:1,allowEmpty:1,opts:opt(directorNames()),hint:"pers_dir_h"};
  return fPersoana(0);
}
function persoane(){return uniq(S.iesiri.map(function(r){return r.persoana}).concat(S.cheltuieli.map(function(r){return r.platitDe}),S.angajati.map(function(r){return r.nume}),S.imprumuturi.map(function(r){return r.persoana})))}
/* Expense categories are stored as typed (the defaults are Romanian). The common ones are shown in the interface
   language; catRaw maps what was typed in a form back to the stored name, so the data never splits in two. */
var CAT_RU={materiale:"Материалы",transport:"Транспорт",combustibil:"Топливо",unelte:"Инструменты",birou:"Офис",taxe:"Налоги",
 "reparații":"Ремонт",reparatii:"Ремонт","arhitectură":"Архитектура",arhitectura:"Архитектура",diverse:"Разное",salarii:"Зарплаты",chirie:"Аренда",chirii:"Аренда",
 comunale:"Коммунальные услуги","mâncare":"Питание",mancare:"Питание",telefon:"Связь",alte:"Прочее",
 "tâmplărie":"Столярные работы",timplarie:"Столярные работы","servicii terțe":"Услуги третьих лиц","taxe și impozite":"Налоги и сборы","instrumente și unelte":"Инструменты",
 "reparații administrative":"Административный ремонт",marketing:"Маркетинг",comision:"Комиссия",consumabile:"Расходные материалы","cheltuieli neplanificate":"Незапланированные расходы","kit mgo":"Kit MgO"};
var CAT_RO={};Object.keys(CAT_RU).forEach(function(k){var r=CAT_RU[k].toLowerCase();if(!CAT_RO[r])CAT_RO[r]=k.charAt(0).toUpperCase()+k.slice(1)});
/* A category may have a subcategory: stored as one string "Materiale / Acoperiș" (CAT_SEP). The main part is translated
   for display, the subcategory is shown as typed. Colours, the donut and the category totals group by the main part. */
var CAT_SEP=" / ";
function catMain(c){var s=String(c==null?"":c),i=s.indexOf(CAT_SEP);return (i<0?s:s.slice(0,i)).trim()}
function catSub(c){var s=String(c==null?"":c),i=s.indexOf(CAT_SEP);return i<0?"":s.slice(i+CAT_SEP.length).trim()}
function catJoin(m,sub){m=String(m||"").trim();sub=String(sub||"").trim();return sub?m+CAT_SEP+sub:m}
function uniqKeep(a){var o=[],seen={};a.forEach(function(x){var k=String(x||"").trim();if(k&&!seen[k.toLowerCase()]){seen[k.toLowerCase()]=1;o.push(k)}});return o}
function catLabel(c){var m=catMain(c),sub=catSub(c),k=m.toLowerCase();var ml=(lang==="ru"?CAT_RU[k]:CAT_RO[k])||m;return sub?ml+CAT_SEP+sub:ml}
function catRaw(v){var s=String(v||"").trim();if(!s)return s;
  var m=catMain(s),sub=catSub(s),k=m.toLowerCase(),mains=catMains();
  var hit=mains.filter(function(c){return c.toLowerCase()===k})[0]||mains.filter(function(c){return catLabel(c).toLowerCase()===k})[0]||m;
  return catJoin(hit,sub)}
function categorii(){var c=cfg().categorii;return uniq((c&&c.length?c:DEF_CFG.categorii).concat(S.cheltuieli.map(function(r){return r.categorie})))}
/* main categories in the order of the settings list (then the ones only found in records), and the subcategories of one main */
function catMains(){var c=cfg().categorii;return uniqKeep((c&&c.length?c:DEF_CFG.categorii).map(catMain).concat(S.cheltuieli.map(function(r){return catMain(r.categorie)})))}
function catSubs(main){if(!main)return [];return uniqKeep(categorii().filter(function(c){return catSub(c)&&sameP(catMain(c),main)}).map(catSub))}
function angajatiActivi(){return S.angajati.filter(function(a){return a.status!=="Inactiv"}).map(function(a){return a.nume})}
/* an operator fills timesheets only for the employees he created himself (the server checks the same); a director for all */
/* an operator sets and sees the salary only of the employees he created himself; a director of everyone */
function angajatMeu(nume){return !!String(nume||"").trim()} /* employees are shared: every user may schedule, pay and see the salary of any of them */
/* a collaborator is an operator account; his own salary comes out of the advance the director gave him, never out of the till */
function colabUser(nume){return !!(nume&&S.utilizatori.some(function(u){return u.rol==="Operator"&&u.status!=="Inactiv"&&sameP(u.nume,nume)}))}
function pontajTotal(d){var wd=workdays(d.luna),sal=salariuLa(d.angajat,d.luna?monthEnd(d.luna):today()),pz=wd?sal/wd:0;return round2((d.complet?sal:(n(d.z1)+n(d.z2))*pz)+n(d.extra))}
/* the whole month is one sum, whoever scheduled the days: everything paid so far by anyone counts */
function pontajPlatit(d){return round2(platiSalariu(d.angajat,d.luna).reduce(function(a,p){return a+p.suma},0))}
function pontajDue(d){return round2(pontajTotal(d)-pontajPlatit(d))}
/* the bonuses and the "full salary" mark of the other users' Salarii rows for this employee and month */
function pontajAltii(angajat,luna){var o={extra:0,complet:false};S.pontaj.forEach(function(r){if(r.by===ME||!sameP(r.angajat,angajat)||r.luna!==luna)return;o.extra+=n(r.extra);if(r.complet)o.complet=true});o.extra=round2(o.extra);return o}
/* the form's data completed with what the others added: the sums below are for the whole month */
function dPlin(d){var o={};for(var k in d)o[k]=d[k];var alt=pontajAltii(d.angajat,d.luna);o.extra=round2(n(d.extra)+alt.extra);o.complet=!!d.complet||alt.complet;return o}
/* the month's figures for the reports: all days, all bonuses, all payments */
function pontajLuna(angajat,luna){var g=graficOre(angajat,luna),ex=0,cp=false;S.pontaj.forEach(function(r){if(!sameP(r.angajat,angajat)||r.luna!==luna)return;ex+=n(r.extra);if(r.complet)cp=true});
  var d={angajat:angajat,luna:luna,z1:g.z1,z2:g.z2,extra:round2(ex),complet:cp},sal=salariuLa(angajat,monthEnd(luna));
  return {g:g,sal:sal,extra:d.extra,complet:cp,tot:(sal>0&&(g.n||cp||ex>0))?pontajTotal(d):0,paid:pontajPlatit(d),due:round2(((sal>0&&(g.n||cp||ex>0))?pontajTotal(d):0)-pontajPlatit(d))}}
/* the days of a month by the user who booked them: "3,00 Ruslan · 2,00 Sergiu" */
function zilePeAutor(angajat,luna){var m={},ord=[];S.grafic.forEach(function(r){if(!sameP(r.angajat,angajat)||String(r.data||"").slice(0,7)!==luna||!(n(r.ore)>0))return;var w=grWho(r)||"…";if(!(w in m)){m[w]=0;ord.push(w)}m[w]+=n(r.ore)/8});
  return ord.map(function(w){return {nume:w,zile:round2(m[w])}})}
function zilePeAutorTxt(angajat,luna){return zilePeAutor(angajat,luna).map(function(x){return fmt(x.zile,2)+" "+x.nume}).join(" · ")}
/* who paid how much for an employee and month: "4.266,67 Ruslan" */
function platitDeTxt(angajat,luna){var m={},ord=[];platiSalariu(angajat,luna).forEach(function(p){var w=p.nume||"…";if(!(w in m)){m[w]=0;ord.push(w)}m[w]+=p.suma});return ord.map(function(w){return money(round2(m[w]))+" "+w}).join(" · ")}
/* the work schedule: hours per employee per day; eight hours make one timesheet day */
function graficOre(angajat,luna,by){var o={h1:0,h2:0,n:0,z1:0,z2:0};if(!angajat||!luna)return o;
  S.grafic.forEach(function(r){if(!sameP(r.angajat,angajat)||String(r.data||"").slice(0,7)!==luna)return;if(by&&r.by!==by)return;var h=n(r.ore);if(!(h>0))return;o.n++;if(parseInt(String(r.data).slice(8,10),10)<=15)o.h1+=h;else o.h2+=h});
  o.h1=round2(o.h1);o.h2=round2(o.h2);o.z1=round2(o.h1/8);o.z2=round2(o.h2/8);return o}
/* the days this user scheduled for an employee: what he pays for */
function graficMele(angajat,luna){return graficOre(angajat,luna,ME)}
function pontajDinGrafic(d){if(!d||!d.angajat||!d.luna)return false;var g=graficOre(d.angajat,d.luna);if(!g.n)return false;d.z1=String(g.z1);d.z2=String(g.z2);return true}
/* every salary payment for an employee and month, by anyone: the expenses "Salarii" and the old-style outflows */
function platiSalariu(angajat,luna){
  return S.cheltuieli.filter(function(r){return r.categorie==="Salarii"&&r.luna===luna&&sameP(r.angajat,angajat)}).map(function(r){return {by:r.by,data:r.data,suma:n(r.suma),nume:byName(r)||r.platitDe||""}})
    .concat(S.iesiri.filter(function(r){return r.destinatie==="Salarii"&&r.luna===luna&&sameP(r.persoana,angajat)}).map(function(r){return {by:r.by,data:r.data,suma:round2(n(r.suma)*n(r.curs)),nume:byName(r)||r.platitDe||""}}));
}
/* a day is closed once anyone paid the employee on that day or later: what was paid for does not move any more */
function ziInchisa(angajat,iso){return platiSalariu(angajat,String(iso).slice(0,7)).some(function(p){return String(p.data||"")>=String(iso)})}
function lunaAchitata(angajat,luna){return platiSalariu(angajat,luna).length>0}
/* the till is paid by the cashier and by the directors; everyone else pays from an advance */
function isTillPayer(name){return !!(name&&casier()&&sameP(name,casier()))} /* the EHL model: only the cashier pays from the till; a director pays from his own account */
function directorNames(){var c=cfg().directori;return uniq((Array.isArray(c)?c:[]).concat(S.utilizatori.filter(function(u){return u.rol==="Director"}).map(function(u){return u.nume})))}
/* the employees one can schedule and pay: the active ones that are not directors (nobody pays a director's salary) */
function angajatiLucru(){var d=directorNames();return angajatiActivi().filter(function(nm){return !d.some(function(x){return sameP(x,nm)})})}
function angajatiPontaj(){return angajatiLucru()}
function platesteSalariu(angajat,luna,due){
  var rows=S.grafic.filter(function(r){return sameP(r.angajat,angajat)&&String(r.data||"").slice(0,7)===luna&&n(r.ore)>0}); /* everyone's days: the payment covers the whole month */
  var groups={},tot=0;rows.forEach(function(r){var k=(r.pentru==="Proiect"&&r.proiect)?"Proiect|"+r.proiect:"EHL|";groups[k]=(groups[k]||0)+n(r.ore);tot+=n(r.ore)});
  var keys=Object.keys(groups);if(!keys.length||!(tot>0)){keys=["EHL|"];groups["EHL|"]=1;tot=1;}
  var payer=isDir?(colabUser(angajat)?angajat:(casier()||meName())):meName(),left=round2(due),p=Promise.resolve();
  keys.forEach(function(k,i){
    var share=i===keys.length-1?left:round2(due*groups[k]/tot);left=round2(left-share);if(!(share>0))return;
    var pt=k.split("|")[0],pr=k.split("|")[1],pj=S.proiecte.filter(function(x){return sameP(x.nume,pr)})[0];
    p=p.then(function(){return saveDoc("cheltuieli",{data:today(),suma:share,categorie:"Salarii",descriere:T("sal_descr")+" "+angajat+" · "+monthName(luna),
      client:pj?(pj.client||""):"",proiect:pt==="Proiect"?pr:"",pentru:pt,platitDe:payer,mod:"Numerar",sursa:"Avans",angajat:angajat,luna:luna})});
  });
  return p;
}
function fAngajatPontaj(){return {k:"angajat",t:"select",l:"f_ang",req:1,allowEmpty:1,opts:opt(angajatiLucru())}}

/* ---------------- calculations (mirrors the workbook) ---------------- */
function calc(){
  var C={},vals=valute().map(function(v){return v.cod});
  var sum=function(arr,f){var t=0;arr.forEach(function(r){t+=f(r)||0});return round2(t)};

  C.vals=vals;
  C.intratNum={};C.intratTr={};
  C.iesDepus={};C.iesPers={};C.iesSal={};C.iesChirii={};C.iesImpr={};C.iesAlte={};C.iesFond={};C.iesCheltCasier={};
  vals.forEach(function(v){
    C.intratNum[v]=sum(S.incasari,function(r){return r.mod==="Numerar"&&r.valuta===v?n(r.suma):0});
    C.intratTr[v]=sum(S.incasari,function(r){return r.mod==="Transfer"&&r.valuta===v?n(r.suma):0});
    C.iesDepus[v]=sum(S.iesiri,function(r){return !dinAvans(r)&&r.destinatie==="Depus pe cont"&&r.valuta===v?n(r.suma):0});
    C.iesPers[v]=sum(S.iesiri,function(r){return !dinAvans(r)&&r.destinatie==="Dat persoanei"&&r.valuta===v&&!isTillPayer(r.persoana)?n(r.suma):0});
    C.iesSal[v]=sum(S.iesiri,function(r){return !dinAvans(r)&&r.destinatie==="Salarii"&&r.valuta===v?n(r.suma):0});
    C.iesImpr[v]=sum(S.iesiri,function(r){return !dinAvans(r)&&r.destinatie==="Împrumut"&&r.valuta===v?n(r.suma):0});
    C.iesAlte[v]=sum(S.iesiri,function(r){return !dinAvans(r)&&r.destinatie==="Alte"&&r.valuta===v?n(r.suma):0});
    C.iesFond[v]=sum(S.iesiri,function(r){return !dinAvans(r)&&r.destinatie==="Restituire fondator"&&r.valuta===v?n(r.suma):0});
    C.iesChirii[v]=sum(S.chirii,function(r){return !dinAvans(r)&&r.mod==="Numerar"&&r.valuta===v?chirieTotal(r):0}); /* a collaborator's cash rent comes out of his advance */
    C.iesCheltCasier[v]=(v==="MDL")?sum(S.cheltuieli,function(r){return r.mod==="Numerar"&&isTillPayer(r.platitDe)?n(r.suma):0}):0;
  });
  C.iesTotal={};C.ramas={};C.ramasMDL={};C.casaMDL=0;
  vals.forEach(function(v){
    C.iesTotal[v]=C.iesDepus[v]+C.iesPers[v]+C.iesSal[v]+C.iesChirii[v]+C.iesImpr[v]+C.iesAlte[v]+C.iesFond[v]+C.iesCheltCasier[v];
    C.ramas[v]=C.intratNum[v]-C.iesTotal[v];
    C.ramasMDL[v]=C.ramas[v]*cursAzi(v);
    C.casaMDL+=C.ramasMDL[v];
  });

  C.incTotal=sum(S.incasari,function(r){return n(r.suma)*n(r.curs)});
  C.incNumMDL=sum(S.incasari,function(r){return r.mod==="Numerar"?n(r.suma)*n(r.curs):0});
  C.incTrMDL=sum(S.incasari,function(r){return r.mod==="Transfer"?n(r.suma)*n(r.curs):0});
  C.cheltTotal=sum(S.cheltuieli,function(r){return n(r.suma)});
  C.cheltNum=sum(S.cheltuieli,function(r){return r.mod==="Numerar"?n(r.suma):0});
  C.cheltTr=sum(S.cheltuieli,function(r){return r.mod==="Transfer"?n(r.suma):0});
  C.depusMDL=sum(S.iesiri,function(r){return r.destinatie==="Depus pe cont"?n(r.suma)*n(r.curs):0});
  C.salPlatitMDL=round2(sum(S.iesiri,function(r){return r.destinatie==="Salarii"?n(r.suma)*n(r.curs):0})+sum(S.cheltuieli,function(r){return r.categorie==="Salarii"?n(r.suma):0}));
  C.avansMDL=sum(S.iesiri,function(r){return r.destinatie==="Dat persoanei"&&!isTillPayer(r.persoana)?n(r.suma)*n(r.curs):0});
  C.chiriiMDL=sum(S.chirii,function(r){return chirieTotal(r)*n(r.curs)});
  C.chiriiTrMDL=sum(S.chirii,function(r){return r.mod==="Transfer"?chirieTotal(r)*n(r.curs):0});

  C.contMDL=C.incTrMDL+C.depusMDL-C.cheltTr-C.chiriiTrMDL;

  // collaborators
  var names=uniq(S.iesiri.filter(function(r){return r.destinatie==="Dat persoanei"}).map(function(r){return r.persoana})
    .concat(S.cheltuieli.filter(function(r){return r.mod==="Numerar"}).map(function(r){return r.platitDe}),S.iesiri.filter(dinAvans).map(function(r){return r.platitDe}),S.chirii.filter(dinAvans).map(function(r){return r.platitDe})))
    .filter(function(p){return !isTillPayer(p)});
  C.colab=names.map(function(p){
    var primit=sum(S.iesiri,function(r){return r.destinatie==="Dat persoanei"&&sameP(r.persoana,p)?n(r.suma)*n(r.curs):0});
    var chn=sum(S.cheltuieli,function(r){return r.mod==="Numerar"&&sameP(r.platitDe,p)?n(r.suma):0});
    var cht=sum(S.cheltuieli,function(r){return r.mod==="Transfer"&&sameP(r.platitDe,p)?n(r.suma):0});
    var prop=sum(S.cheltuieli,function(r){return r.mod==="Numerar"&&r.sursa==="Proprii"&&sameP(r.platitDe,p)?n(r.suma):0});
    /* what he handed on from his advance: outflows he recorded himself (paid from his money, not from the till) */
    var dat=sum(S.iesiri,function(r){return dinAvans(r)&&sameP(r.platitDe,p)?n(r.suma)*n(r.curs):0});
    var chr=sum(S.chirii,function(r){return dinAvans(r)&&r.mod==="Numerar"&&sameP(r.platitDe,p)?chirieTotal(r)*n(r.curs):0}); /* cash rents he paid from his advance */
    /* the same balance per currency: what he received in each, minus what he handed on or paid in it; cash expenses are in lei */
    var sch=sum(S.schimburi,function(r){return sameP(r.persoana,p)?n(r.sumaIn)*rateAzi(r.valutaIn)-n(r.sumaDin)*rateAzi(r.valutaDin):0});
    var val={},mov={};vals.forEach(function(v){
      var got=sum(S.iesiri,function(r){return r.destinatie==="Dat persoanei"&&sameP(r.persoana,p)&&(r.valuta||"MDL")===v?n(r.suma):0});
      var xin=sum(S.schimburi,function(r){return sameP(r.persoana,p)&&(r.valutaIn||"MDL")===v?n(r.sumaIn):0}),xout=sum(S.schimburi,function(r){return sameP(r.persoana,p)&&(r.valutaDin||"MDL")===v?n(r.sumaDin):0});
      mov[v]=v==="MDL"||got>0||xin>0; /* a currency is listed once something came in it (lei always) */
      val[v]=round2(got+xin-xout
        -sum(S.iesiri,function(r){return dinAvans(r)&&sameP(r.platitDe,p)&&(r.valuta||"MDL")===v?n(r.suma):0})
        -sum(S.chirii,function(r){return dinAvans(r)&&r.mod==="Numerar"&&sameP(r.platitDe,p)&&(r.valuta||"MDL")===v?chirieTotal(r):0})
        -(v==="MDL"?chn:0));
    });
    return {nume:p,primit:primit,cheltuit:round2(chn+dat+chr),ramas:round2(primit-chn-dat-chr+sch),transfer:cht,proprii:prop,dat:dat,chirii:chr,schimb:round2(sch),val:val,mov:mov};
  }).filter(function(x){return x.primit||x.cheltuit}); /* transfers are not his money: they have their own report (C.trPers) */
  var dnames=fondatoriToti();
  C.dirs=C.colab.filter(function(x){return dnames.some(function(f){return sameP(f,x.nume)})}); /* the administrators' accounts: fed from the EHL till */
  C.colab=C.colab.filter(function(x){return !dnames.some(function(f){return sameP(f,x.nume)})});
  C.dirRamas=sum(C.dirs,function(x){return x.ramas});
  C.colabRamas=round2(sum(C.colab,function(x){return x.ramas})+C.dirRamas);
  /* expenses by transfer are paid from the bank account, not from the person: reported apart, by who paid and how much */
  C.trPers=uniq(S.cheltuieli.filter(function(r){return r.mod==="Transfer"}).map(function(r){return r.platitDe})).map(function(p){
    var rows=S.cheltuieli.filter(function(r){return r.mod==="Transfer"&&sameP(r.platitDe,p)});
    return {nume:p,val:sum(rows,function(r){return n(r.suma)}),n:rows.length};
  }).sort(function(a,b){return b.val-a.val});
  C.totalFirma=C.casaMDL+C.contMDL+C.colabRamas;

  // founders: what they put in is a loan to the firm, repaid through "Restituire fondator" outflows
  var fnd=fondatoriToti();
  C.fond=fnd.map(function(f){
    var primit=sum(S.incasari,function(r){return sameP(r.client,f)?n(r.suma)*n(r.curs):0});
    var rest=sum(S.iesiri,function(r){return r.destinatie==="Restituire fondator"&&sameP(r.persoana,f)?n(r.suma)*n(r.curs):0});
    return {nume:f,primit:primit,restituit:rest,datorie:round2(primit-rest)};
  }); /* every founder is listed, also with nothing owed: the report is always on the main page */
  C.fondPrimit=sum(C.fond,function(x){return x.primit});
  C.fondRest=sum(C.fond,function(x){return x.restituit});
  C.fondDatorie=round2(C.fondPrimit-C.fondRest);

  // per client / project / category (the founders are not clients)
  C.perClient=clienti().filter(function(cl){return !fnd.some(function(f){return sameP(f,cl)})}).map(function(cl){
    var inc=sum(S.incasari,function(r){return sameP(r.client,cl)?n(r.suma)*n(r.curs):0});
    var ch=sum(S.cheltuieli,function(r){return sameP(r.client,cl)?n(r.suma):0});
    return {nume:cl,inc:inc,chelt:ch,sold:inc-ch};
  }).filter(function(x){return x.inc||x.chelt}).sort(function(a,b){return b.inc-a.inc});
  C.proiecte=S.proiecte.map(function(p){
    var inc=sum(S.incasari,function(r){return sameP(r.proiect,p.nume)?n(r.suma)*n(r.curs):0});
    var ch=sum(S.cheltuieli,function(r){return sameP(r.proiect,p.nume)?n(r.suma):0});
    var bg=n(p.buget),pi=projInc(p.nume),pe=projIncEur(p.nume),ct=round2(n(p.sumaContract)+n(p.contractEUR)*cursAzi("EUR")+n(p.contractUSD)*cursAzi("USD"));
    return {id:p.id,nume:p.nume,client:p.client||"",status:p.status||"Activ",resp:respList(p),
      buget:bg,inc:inc,chelt:ch,rest:bg-ch,pct:bg>0?Math.min(100,ch/bg*100):0,
      contract:ct,adaug:n(p.adaugator),incCash:pi.cash,incTr:pi.tr,ramasContract:round2(ct+n(p.adaugator)-pi.cash-pi.tr),
      contractEUR:n(p.contractEUR),contractCash:n(p.contractCash),contractTransfer:n(p.contractTransfer),incCashEur:pe.cash,incTrEur:pe.tr,aditEur:aditEur(p),ramasEur:round2(n(p.contractEUR)+aditEur(p)-pe.cash-pe.tr)};
  }).sort(function(a,b){return (a.status==="Finalizat"?1:0)-(b.status==="Finalizat"?1:0)||b.chelt-a.chelt});
  var defNames=S.proiecte.map(function(p){return String(p.nume||"").trim().toLowerCase()});
  C.perProiect=proiecteNume().map(function(p){
    return {nume:p,val:sum(S.cheltuieli,function(r){return sameP(r.proiect,p)?n(r.suma):0})};
  }).filter(function(x){return x.val>0&&defNames.indexOf(x.nume.toLowerCase())<0}).sort(function(a,b){return b.val-a.val});
  C.perPentru=["Proiect","EHL","Altele"].map(function(k){return {k:k,val:sum(S.cheltuieli,function(r){return pentruOf(r)===k?n(r.suma):0})}});
  C.perCateg=catMains().map(function(c){
    var subs={};
    var val=sum(S.cheltuieli,function(r){if(!sameP(catMain(r.categorie),c))return 0;var sk=catSub(r.categorie);if(sk)subs[sk]=round2((subs[sk]||0)+n(r.suma));return n(r.suma)});
    return {nume:c,val:val,subs:Object.keys(subs).map(function(k){return {nume:k,val:subs[k]}}).sort(function(a,b){return b.val-a.val})};
  }).filter(function(x){return x.val>0}).sort(function(a,b){return b.val-a.val});

  // contracts
  /* the contracts are the projects': the contract sum in lei (its EUR and USD parts at today's rate) against what the client paid */
  C.contracte=S.proiecte.map(function(p){
    var pi=projInc(p.nume),val=contractLei(p);
    return {id:p.id,client:p.nume+(p.client?" · "+p.client:""),val:val,deCash:0,deTr:0,incCash:pi.cash,incTr:pi.tr,ramas:round2(val-pi.cash-pi.tr),ramasCash:0,ramasTr:0};
  }).filter(function(x){return x.val>0||x.incCash||x.incTr});
  C.contrVal=sum(C.contracte,function(x){return x.val});
  C.contrInc=sum(C.contracte,function(x){return x.incCash+x.incTr});
  C.contrRamas=C.contrVal-C.contrInc;
  C.contrPct=C.contrVal>0?(C.contrInc/C.contrVal*100):0;

  // salaries
  C.pontaj=S.pontaj.map(function(p){
    var ym=p.luna||"";
    var wd=workdays(ym);
    var sal=salariuLa(p.angajat,ym?monthEnd(ym):today());
    var pz=wd>0?sal/wd:0;
    var z1=n(p.z1),z2=n(p.z2);
    return {id:p.id,luna:ym,angajat:p.angajat,z1:z1,z2:z2,wd:wd,sal:sal,pretZi:pz,extra:n(p.extra),complet:!!p.complet,
      s1:z1*pz,s2:z2*pz,total:(p.complet?sal:(z1+z2)*pz)+n(p.extra)};
  });
  var luni=uniq(C.pontaj.map(function(p){return p.luna}).concat(S.iesiri.filter(function(r){return r.destinatie==="Salarii"}).map(function(r){return r.luna}),S.cheltuieli.filter(function(r){return r.categorie==="Salarii"&&r.luna}).map(function(r){return r.luna})));
  C.salLuni=luni.map(function(l){
    var cas=sum(C.pontaj,function(p){return p.luna===l?p.total:0});
    var pl=round2(sum(S.iesiri,function(r){return r.destinatie==="Salarii"&&r.luna===l?n(r.suma)*n(r.curs):0})+sum(S.cheltuieli,function(r){return r.categorie==="Salarii"&&r.luna===l?n(r.suma):0}));
    return {luna:l,castigat:cas,platit:pl,rest:cas-pl};
  }).sort(function(a,b){return b.luna.localeCompare(a.luna)});
  C.salCastigat=sum(C.salLuni,function(x){return x.castigat});
  C.salPlatit=sum(C.salLuni,function(x){return x.platit});
  C.salRest=C.salCastigat-C.salPlatit;

  // loans
  C.imprTotal=sum(S.imprumuturi,imprLei);
  C.imprRestituit=sum(S.imprumuturi,function(r){return r.status==="Achitat"?imprLei(r):0});
  C.imprRamas=C.imprTotal-C.imprRestituit;
  var td=today();
  C.imprRestante=S.imprumuturi.filter(function(r){return r.status!=="Achitat"&&r.termen&&r.termen<td}).length;
  C.imprNeachitate=S.imprumuturi.filter(function(r){return r.status!=="Achitat"}).length;
  C.imprPers=uniq(S.imprumuturi.map(function(r){return r.persoana})).map(function(p){
    return {nume:p,total:sum(S.imprumuturi,function(r){return sameP(r.persoana,p)?imprLei(r):0}),
      ramas:sum(S.imprumuturi,function(r){return sameP(r.persoana,p)&&r.status!=="Achitat"?imprLei(r):0})};
  }).filter(function(x){return x.total>0});

  return C;
}
function chirieTotal(r){return n(r.chirie)+n(r.gaj)+n(r.comunale)+n(r.avarii)}
/* what a project's client has paid, in lei at each row's rate: cash and transfer apart */
function projInc(nume){
  var o={cash:0,tr:0,byVal:{}};
  if(String(nume||"").trim())S.incasari.forEach(function(r){if(sameP(r.proiect,nume)){var v=n(r.suma)*n(r.curs),cur=r.valuta||"MDL";if(r.mod==="Transfer")o.tr+=v;else o.cash+=v;
    var b=o.byVal[cur]||(o.byVal[cur]={cash:0,tr:0});if(r.mod==="Transfer")b.tr=round2(b.tr+n(r.suma));else b.cash=round2(b.cash+n(r.suma))}});
  o.cash=round2(o.cash);o.tr=round2(o.tr);return o;
}
/* the project's "Adițional" in euro: entered in EUR, MDL or USD, converted at the rates of the day */
function aditEur(p){var v=p.adaugatorValuta||"EUR";return round2(n(p.adaugator)*rateAzi(v)/(cursAzi("EUR")||1))}
function incEur(r){return (r.valuta==="EUR")?n(r.suma):n(r.suma)*n(r.curs)/(cursAzi("EUR")||1)} /* an income in euro: EUR at face value, the rest through lei at today's rate */
function projIncEur(nume){
  var o={cash:0,tr:0},rate=cursAzi("EUR")||1;
  if(String(nume||"").trim())S.incasari.forEach(function(r){if(sameP(r.proiect,nume)){var v=incEur(r);if(r.mod==="Transfer")o.tr+=v;else o.cash+=v}});
  o.cash=round2(o.cash);o.tr=round2(o.tr);return o;
}
/* the contract of a project in lei: the MDL part, the extra work, and the EUR/USD parts at today's rate */
function contractLei(p){return round2(n(p.sumaContract)+(aditEur(p)+n(p.contractEUR))*cursAzi("EUR")+n(p.contractUSD)*cursAzi("USD"))}
/* The director's rule: money that is not in the till cannot be handed out. casaNeed says what a row takes from which
   shelf (nothing when it does not leave the till); casaErr refuses a row that takes more than the shelf holds.
   An edit that takes no more than the row already took always passes, so old rows stay correctable. */
function casaNeed(col,d){
  if(col==="iesiri")return (dinAvans(d)||(d.destinatie==="Dat persoanei"&&isTillPayer(d.persoana)))?null:{v:d.valuta||"MDL",s:n(d.suma)};
  if(col==="chirii")return (d.mod==="Numerar"&&!dinAvans(d))?{v:d.valuta||"MDL",s:chirieTotal(d)}:null;
  if(col==="imprumuturi")return d.dinCasa?{v:d.valuta||"MDL",s:n(d.suma)}:null;
  return null;
}
/* An outflow recorded by a collaborator is paid from the money the director gave him (his advance), never from the
   till of the director: the server marks it sursa "Avans" with his name in platitDe. A director's or the cashier's
   outflow comes from the till ("Casa"). */
function isCasierMe(){return !!(casier()&&sameP(meName(),casier()))}
function dinAvans(r){return !!(r&&r.sursa==="Avans"&&String(r.platitDe||"").trim())}
function ieseDinAvans(id,d){var old=id?(S.iesiri||[]).filter(function(r){return r.id===id})[0]:null;if(old)return dinAvans(old);if(isCasierMe())return false;return !isDir||!!(d&&d.din==="Avans")}
function rateAzi(v){return (v||"MDL")==="MDL"?1:cursAzi(v)} /* a currency in lei at the rate of the day */
function soldVal(nume,v){var C=calc(),x=C.colab.concat(C.dirs||[]).filter(function(c){return sameP(c.nume,nume)})[0];return x&&x.val?n(x.val[v||"MDL"]):0} /* what a person holds in one currency */
function imprLei(r){return round2(n(r.suma)*(n(r.curs)||1))} /* a loan in lei: old loans have no rate and are lei */
function soldAvans(nume){var C=calc(),x=C.colab.concat(C.dirs||[]).filter(function(c){return sameP(c.nume,nume)})[0];return x?x.ramas:0} /* a collaborator's advance or a director's own account */
/* a collaborator cannot hand out more than he holds; an edit that takes no more than before always passes */
function avansErr(col,d,id){
  var need=0,old=null;
  if(col==="iesiri"){if(!ieseDinAvans(id))return "";need=n(d.suma)*n(d.curs);old=id?S.iesiri.filter(function(r){return r.id===id})[0]:null;}
  else if(col==="chirii"){
    /* a collaborator's cash rent comes out of his advance and cannot take it below zero */
    if(isCasierMe()||d.mod==="Transfer")return "";
    var or=id?S.chirii.filter(function(r){return r.id===id})[0]:null,bkr=(or&&dinAvans(or)&&or.mod!=="Transfer")?round2(chirieTotal(or)*n(or.curs)):0,ndr=round2(chirieTotal(d)*n(d.curs));
    if(!(ndr>0)||(bkr&&ndr<=bkr))return "";
    var frr=round2(soldAvans(meName())+bkr);
    return ndr>frr+0.004?T(isDir?"cont_meu_lipsa":"avans_lipsa").replace("{s}",money(Math.max(0,frr))):"";
  }
  else if(col==="imprumuturi"){if(id||!d.dinCasa||isCasierMe())return "";need=n(d.suma)*(n(d.curs)||1);} /* a loan is handed out of the lender's own account */
  else if(col==="cheltuieli"){
    /* cash is his own pocket of the firm's money: it cannot go below zero. A transfer is paid by the firm's account. */
    if(isCasierMe()||d.mod==="Transfer")return "";
    var oc=id?S.cheltuieli.filter(function(r){return r.id===id})[0]:null,bk=(oc&&oc.mod!=="Transfer")?n(oc.suma):0,nd=round2(n(d.suma));
    if(!(nd>0)||(bk&&nd<=bk))return "";
    var fr=round2(soldAvans(meName())+bk);
    return nd>fr+0.004?T(isDir?"cont_meu_lipsa":"avans_lipsa").replace("{s}",money(Math.max(0,fr))):"";
  }
  else return "";
  need=round2(need);if(!(need>0))return "";
  var back=old?round2(n(old.suma)*n(old.curs)):0;
  if(back&&need<=back)return "";
  var free=round2(soldAvans(old?old.platitDe:meName())+back);
  return need>free+0.004?T(isDir?"cont_meu_lipsa":"avans_lipsa").replace("{s}",money(Math.max(0,free))):"";
}
function casaErr(col,d,id){
  if(!isDir)return ""; /* a collaborator does not see the till; what leaves it is recorded by a director */
  if(col==="iesiri"&&ieseDinAvans(id,d))return "";
  if(col==="imprumuturi")return ""; /* loans never come out of Casa EHL */
  var need=casaNeed(col,d);if(!need||!(need.s>0))return "";
  var old=id?(S[col]||[]).filter(function(r){return r.id===id})[0]:null,was=old?casaNeed(col,old):null;
  var back=(was&&was.v===need.v)?was.s:0;
  if(back&&need.s<=back)return "";
  var free=round2((calc().ramas[need.v]||0)+back);
  return need.s>free+0.004?T("casa_lipsa").replace("{s}",money(Math.max(0,free))).replace("{v}",need.v):"";
}
/* The bank account, unlike the till, may go below zero: a transfer is always accepted (the bank has paid it), and the
   overdraft is shown as money the firm still has to put on the account. contDeficit() names the payments behind it:
   the newest transfer expenses and transfer rents, as many as it takes to cover the minus. */
function contDeficit(C){
  var lipsa=round2(-C.contMDL);if(!(lipsa>0.004))return null;
  var rows=S.cheltuieli.filter(function(r){return r.mod==="Transfer"}).map(function(r){return {col:"cheltuieli",id:r.id,data:r.data,ts:r.ts,val:n(r.suma),t:r.descriere||catLabel(r.categorie)||"—",s:[r.platitDe,catLabel(r.categorie),pentruOf(r)==="Proiect"?r.proiect:""].filter(Boolean).join(" · ")}})
    .concat(S.chirii.filter(function(r){return r.mod==="Transfer"}).map(function(r){return {col:"chirii",id:r.id,data:r.dataInceput,ts:r.ts,val:round2(chirieTotal(r)*n(r.curs)),t:r.locatia||"—",s:[T("a_chirie"),r.chirias].filter(Boolean).join(" · ")}}))
    .sort(function(a,b){return String(b.data).localeCompare(String(a.data))||String(b.ts||"").localeCompare(String(a.ts||""))});
  var out=[],acc=0;
  for(var i=0;i<rows.length&&acc<lipsa-0.004;i++){out.push(rows[i]);acc+=rows[i].val}
  return {lipsa:lipsa,rows:out};
}
function salariuLa(angajat,data){
  var best=null;
  S.istoric.forEach(function(h){
    if(!sameP(h.angajat,angajat))return;
    if(h.dinData&&h.dinData<=data){ if(!best||h.dinData>best.dinData) best=h; }
  });
  if(!best){ // fall back to earliest record
    S.istoric.forEach(function(h){ if(sameP(h.angajat,angajat)&&(!best||h.dinData<best.dinData)) best=h; });
  }
  return best?n(best.salariu):0;
}

/* ---------------- icons (inline SVG, 24px grid, stroke) ---------------- */
/* Lucide icons (https://lucide.dev, ISC licence), 24px grid, drawn with stroke by icon() */
var ICONS={
 bricks:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 9v6"/><path d="M16 15v6"/><path d="M16 3v6"/><path d="M3 15h18"/><path d="M3 9h18"/><path d="M8 15v6"/><path d="M8 3v6"/>',
 truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
 fuel:'<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
 wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
 office:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
 tax:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>',
 hammer:'<path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',
 dots:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
 tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
 food:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
 home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 phone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
 bolt:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
 cart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
 shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
 water:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
 cardIc:'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
 down:'<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/>',
 up:'<circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>',
 send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
 clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
 file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
 calendar:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
 folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
 userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
 chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
 plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
 list:'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
 gear:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
 lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
 bank:'<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
 x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
 chevL:'<path d="m15 18-6-6 6-6"/>',
 chevR:'<path d="m9 18 6-6-6-6"/>',
 arrowUp:'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
 arrowDown:'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
 minus:'<path d="M5 12h14"/>',
 globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
 cash:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
 inArrow:'<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
 outArrow:'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
 menu:'<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
 trash:'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>'
};
function icon(name,cls){return '<svg class="ic-svg'+(cls?" "+cls:"")+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[name]||ICONS.tag)+'</svg>'}
/* category name -> icon, by keyword in Romanian or Russian; unknown categories get a tag */
var CAT_ICON_RULES=[
 [/material|материал|ciment|цемент|nisip|песок|beton|бетон/i,"bricks"],[/transport|транспорт|camion|грузов|taxi|такси|livrar|достав/i,"truck"],
 [/combust|топлив|benzin|бензин|motorin|дизел|carburant/i,"fuel"],[/unelt|scul|инструм|echipament|оборуд/i,"wrench"],
 [/birou|офис|papet|канцел|rechizit/i,"office"],[/tax|налог|impozit|amend|штраф|stat|госпошл/i,"tax"],
 [/repara|ремонт|service|сервис/i,"hammer"],[/divers|прочее|прочие|alte|разное|другое/i,"dots"],
 [/mâncare|mancare|еда|питан|hran|produs|продукт|masă|masa|обед/i,"food"],[/chiri|аренд|cazare|жиль|locuin/i,"home"],
 [/telefon|телефон|internet|интернет|comunic|связ/i,"phone"],[/salar|зарплат|angaja|сотрудн|munc|рабоч/i,"users"],
 [/energ|электр|curent|lumin|свет|gaz|газ/i,"bolt"],[/apă|apa|вода|canal/i,"water"],[/cump|покуп|магазин|magazin|piaț|piata|рынок/i,"cart"],
 [/asigur|страх|pază|охран|securit/i,"shield"],[/banc|банк|comision|комисс|card|карт/i,"cardIc"],
 [/acoperi|крыш|кровл/i,"home"],[/tâmplar|tamplar|lemn|столяр|плотн/i,"hammer"],[/instala|sanitar|electric|сантех|электр|монтаж/i,"bolt"]
];
/* currency badge: symbol + fixed colour per currency, code printed beside it */
var CUR={MDL:{s:"L",c:"var(--accent)"},EUR:{s:"€",c:"var(--s1)"},USD:{s:"$",c:"var(--s7)"},RON:{s:"L",c:"var(--s4)"},GBP:{s:"£",c:"var(--s6)"},UAH:{s:"₴",c:"var(--s5)"},RUB:{s:"₽",c:"var(--s2)"}};
function curBadge(cod,withCode){var k=String(cod||"").toUpperCase(),d=CUR[k]||{s:k.slice(0,1)||"?",c:"var(--muted)"};
  return '<span class="cur" title="'+esc(k)+'"><span class="cur-b" style="background:'+d.c+'">'+esc(d.s)+'</span>'+(withCode!==false?'<span class="cur-c">'+esc(k)+'</span>':'')+'</span>'}
function catIconOf(s){for(var i=0;i<CAT_ICON_RULES.length;i++){if(CAT_ICON_RULES[i][0].test(s))return CAT_ICON_RULES[i][1]}return "tag"}
function catIcon(name){var sub=catSub(name);if(sub){var si=catIconOf(sub);if(si!=="tag")return si}return catIconOf(catMain(name)||String(name||""))}
/* fixed categorical slot per category: by position in the settings list, so a colour follows its category */
function catSlot(name){var m=catMain(name),i=-1;catMains().forEach(function(c,k){if(sameP(c,m))i=k});return i<0?6:(i%7)}

/* an expense is for a project, for the firm itself ("EHL") or for something else; rows from before the field
   existed count as a project when they name one, otherwise as "Altele" */
function pentruOf(r){var p=String(r&&r.pentru||"");return p==="Proiect"||p==="EHL"||p==="Altele"?p:(String(r&&r.proiect||"").trim()?"Proiect":"Altele")}
function onlyIf(f,fn,req){f.showIf=fn;if(req)f.req=1;return f}
/* ---------------- form definitions ---------------- */
function opt(list){return list.map(function(v){return typeof v==="string"?{v:v,l:v}:v})}
var FORMS={
 incasari:{title:"a_inc",icon:"down",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today(),noFuture:1},
   fClient(1,1),
   {k:"codFondator",t:"pin",l:"f_codfond",req:1,hint:"f_codfond_h",showIf:function(d){return !!fondatorOf(d.client)}},
   fProiect(),
   {k:"descriere",t:"text",l:"f_descr"},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs",mdlIf:function(d){return d.mod==="Transfer"}},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"}
 ]},calc:function(d){return [{l:T("eq"),v:money(n(d.suma)*n(d.curs))+" MDL"}]}},

 cheltuieli:{title:"a_chelt",icon:"up",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today(),noFuture:1},
   {k:"suma",t:"number",l:"f_sumamdl",req:1,step:"0.01"},
   {k:"descriere",t:"text",l:"f_descr_req",req:1,hint:"f_descr_h",minlen:3},
   /* the category is chosen, never typed: the list comes from the settings (and from what was used before) */
   {k:"categorie",t:"select",l:"f_categ",req:1,allowEmpty:1,opts:catMains().map(function(c){return {v:c,l:catLabel(c)}})},
   {k:"subcat",t:"select",l:"f_subcat",allowEmpty:1,opts:catSubs(sheetState&&sheetState.col==="cheltuieli"?catMain(catRaw(sheetState.data.categorie)):"").map(function(c){return {v:c,l:c}}),
    showIf:function(d){return !!d.subcat||catSubs(catMain(catRaw(d.categorie))).length>0}},
   /* what the money was spent for: a project (then the project is named), the firm itself, or something else */
   {k:"pentru",t:"select",l:"f_pentru",req:1,opts:[{v:"Proiect",l:T("pt_proiect")},{v:"EHL",l:T("pt_ehl")},{v:"Altele",l:T("pt_alte")}],def:"Proiect"},
   onlyIf(fProiect(),function(d){return pentruOf(d)==="Proiect"},1),
   onlyIf(fClient(0),function(d){return pentruOf(d)==="Proiect"}),
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"},
 ]},calc:function(d){
   /* who pays is never chosen: the account that records the expense. A director or the cashier pays from the till,
      a collaborator from his advance; a transfer comes from the firm's account for everyone. */
   if(isCasierMe())return [{l:T("f_mod"),v:d.mod==="Transfer"?T("op_tr_h"):T("din_casa")}];
   return d.mod==="Transfer"?[{l:T("f_mod"),v:T("op_tr_h")}]:[{l:isDir?T("cont_meu_disp"):T("avans_disp"),v:money(soldAvans(meName()))+" MDL"}]}},

 iesiri:{title:"a_ies",icon:"send",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today(),noFuture:1},
   {k:"destinatie",t:"select",l:"f_dest",req:1,opts:destOpts(),def:"Dat persoanei"},
   /* a director says where the money comes from: the common EHL till, or his own account (money he took from it) */
   {k:"din",t:"select",l:"f_din",req:1,opts:[{v:"Casa",l:T("din_casa_ehl")},{v:"Avans",l:T("din_cont_meu")}],def:"Casa",hint:"f_din_h",showIf:function(){return isDir&&!isCasierMe()&&!ehlMode()&&!(sheetState&&sheetState.id)}}, /* the EHL account pays from the till only */
   {k:"codEHL",t:"pin",l:"f_codehl",req:1,hint:"f_codehl_h",showIf:function(d){return isDir&&!isCasierMe()&&!ehlMode()&&!(sheetState&&sheetState.id)&&d.din!=="Avans"}},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"},
   fPersoanaIes(),
   {k:"luna",t:"month",l:"f_luna",def:curMonth(),showIf:function(d){return d.destinatie==="Salarii"}},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){var out=[{l:d.destinatie==="Depus pe cont"?T("cont_intra"):T("eq"),v:money(n(d.suma)*n(d.curs))+" MDL"}];
   if(ieseDinAvans(sheetState&&sheetState.id,d))out.push({l:isDir?T("cont_meu_disp"):T("avans_disp"),v:money(soldAvans(meName()))+" MDL"});
   return out}},

 chirii:{title:"a_chirie",icon:"home",fields:function(){return[
   {k:"dataInceput",t:"date",l:"f_di",req:1,half:1,def:today()},
   {k:"dataSfarsit",t:"date",l:"f_ds",half:1},
   {k:"locatia",t:"text",l:"f_loc",req:1},
   {k:"chirias",t:"text",l:"f_chirias",list:persoane()},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs",mdlIf:function(d){return d.mod==="Transfer"}},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"chirie",t:"number",l:"f_chirie",half:1,step:"0.01"},
   {k:"gaj",t:"number",l:"f_gaj",half:1,step:"0.01"},
   {k:"comunale",t:"number",l:"f_comun",half:1,step:"0.01"},
   {k:"avarii",t:"number",l:"f_avarii",half:1,step:"0.01"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){var t=n(d.chirie)+n(d.gaj)+n(d.comunale)+n(d.avarii);
   var out=[{l:T("tot"),v:money(t)+" "+(d.valuta||"")},{l:T("eq"),v:money(t*n(d.curs))+" MDL"}];
   /* a collaborator pays the rent from his advance (cash) or from the firm's account (transfer) */
   if(!isCasierMe())out.push(d.mod==="Transfer"?{l:T("f_mod"),v:T("op_tr_h")}:{l:isDir?T("cont_meu_disp"):T("avans_disp"),v:money(soldAvans(meName()))+" MDL"});
   return out}},

 imprumuturi:{title:"a_impr",icon:"clock",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today(),noFuture:1},
   {k:"persoana",t:"text",l:"f_pers",req:1,list:persoane()},
   /* a loan may be in lei, euro or dollars; the rate of the day turns it into lei for the books */
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"},
   {k:"termen",t:"date",l:"f_termen"},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Neachitat",l:T("neachitat")},{v:"Achitat",l:T("achitat")}],def:"Neachitat"},
   {k:"dinCasa",t:"checkbox",l:"impr_cash",hint:"impr_cash_h",newOnly:1,showIf:function(){return isDir}}, /* only a director takes money out of the till */
   {k:"nota",t:"text",l:"f_nota"}
 ]}},

 /* currency exchange: out of what he holds in one currency into another; the rate falls out of the two sums */
 schimburi:{title:"a_schimb",icon:"globe",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today(),noFuture:1},
   {k:"valutaDin",t:"select",l:"f_val_din",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"EUR"},
   {k:"sumaDin",t:"number",l:"f_suma_din",req:1,half:1,step:"0.01"},
   {k:"valutaIn",t:"select",l:"f_val_in",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL"},
   {k:"sumaIn",t:"number",l:"f_suma_in",req:1,half:1,step:"0.01"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){var a=n(d.sumaDin),b=n(d.sumaIn),old=sheetState&&sheetState.id?S.schimburi.filter(function(r){return r.id===sheetState.id})[0]:null;
   var have=soldVal(meName(),d.valutaDin)+((old&&old.valutaDin===d.valutaDin)?n(old.sumaDin):0);
   var rate=(a>0&&b>0)?(((d.valutaDin||"MDL")==="MDL")?a/b:b/a):0; /* lei per unit of the other currency, whichever side the lei are on */
   return [{l:T("sch_curs"),v:rate?(Math.round(rate*10000)/10000).toFixed(4):"—"},{l:T("sch_dupa"),v:money(round2(have-a))+" "+(d.valutaDin||"")}]}},

 contracte:{title:"a_contr",icon:"file",fields:function(){return[
   {k:"client",t:"text",l:"f_client",req:1,list:clienti()},
   {k:"sumaContract",t:"number",l:"f_contract",req:1,step:"0.01"},
   {k:"deIncasatCash",t:"number",l:"f_decash",step:"0.01",def:"0"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){return [{l:T("f_decash"),v:money(n(d.deIncasatCash))},{l:T("transfer"),v:money(n(d.sumaContract)-n(d.deIncasatCash))}]}},

 pontaj:{title:"a_pontaj",icon:"calendar",fields:function(){return[
   {k:"luna",t:"month",l:"f_luna",req:1,def:curMonth()},
   fAngajatPontaj(),
   {k:"z1",t:"number",l:"f_z1",half:1,step:"0.5",def:"0",roIf:function(d){return graficOre(d.angajat,d.luna).n>0||!!dPlin(d).complet}},
   {k:"z2",t:"number",l:"f_z2",half:1,step:"0.5",def:"0",roIf:function(d){return graficOre(d.angajat,d.luna).n>0||!!dPlin(d).complet},hint:"gr_din",hintIf:function(d){return graficOre(d.angajat,d.luna).n>0}},
   /* the whole monthly salary, whatever the days */
   {k:"complet",t:"checkbox",l:"f_complet",hint:"f_complet_h",showIf:function(d){return !!d.angajat&&pontajPlatit(d)<=0.004&&!pontajAltii(d.angajat,d.luna).complet}},
   /* a bonus on top, for work beyond the ordinary */
   {k:"extra",t:"number",l:"f_extra",step:"0.01",def:"0",hint:"f_extra_h",showIf:function(d){return !!d.angajat}},
   /* "paid now": expenses "Salarii" on the projects of my days, for what is still due; from my advance (a director: from the till) */
   {k:"achitat",t:"checkbox",l:"pontaj_pay",hint:"pontaj_pay_h",showIf:function(d){return !!d.angajat&&pontajDue(dPlin(d))>0.004}},
   /* the whole remainder by default; a part (for instance one's own days only) when a sum is typed */
   {k:"suma",t:"number",l:"pontaj_suma",step:"0.01",hint:"pontaj_suma_h",showIf:function(d){return !!d.angajat&&!!d.achitat&&pontajDue(dPlin(d))>0.004}}
 ]},calc:function(d0){var d=dPlin(d0),wd=workdays(d.luna),sal=salariuLa(d.angajat,d.luna?monthEnd(d.luna):today()),pz=wd?sal/wd:0;
   var out=[{l:(lang==="ru"?"Раб. дней":"Zile lucr."),v:String(wd)}];
   if(!d.angajat)return out;
   var gt=graficOre(d.angajat,d.luna);
   if(gt.n){out.push({l:T("gr_tot"),v:fmt(gt.h1+gt.h2,1)+" "+T("gr_ore")+" · "+fmt(gt.z1+gt.z2,2)+" "+T("gr_zile_s")});
     zilePeAutor(d.angajat,d.luna).forEach(function(x){out.push({l:T("gr_zile_s")+" · "+x.nume,v:fmt(x.zile,2)})});}
   if(sal>0){
     out.push({l:(lang==="ru"?"Цена дня":"Preț zi"),v:money(pz)+" MDL"});
     if(d.complet)out.push({l:T("f_salariu"),v:money(sal)+" MDL"});
     else{out.push({l:T("f_z1")+" · "+fmt(n(d.z1),2)+" "+T("gr_zile_s"),v:money(n(d.z1)*pz)+" MDL"});out.push({l:T("f_z2")+" · "+fmt(n(d.z2),2)+" "+T("gr_zile_s"),v:money(n(d.z2)*pz)+" MDL"});}
     if(n(d.extra)>0)out.push({l:T("f_extra"),v:money(n(d.extra))+" MDL"});
     out.push({l:T("tot"),v:money(pontajTotal(d))+" MDL",cls:"tot"});
     var paid=pontajPlatit(d),due=pontajDue(d);
     if(paid>0)out.push({l:T("pontaj_paid"),v:money(paid)+" MDL"});
     if(due>0.004)out.push({l:T("pontaj_due"),v:money(due)+" MDL",cls:"tot"});
     if(d.achitat&&due>0.004)out.push({l:T("pontaj_suma"),v:money(n(d.suma)>0?n(d.suma):due)+" MDL",cls:"tot"});
     if(isDir&&colabUser(d.angajat))out.push({l:T("pontaj_dinavans"),v:money(soldAvans(d.angajat))+" MDL"});
   }
   /* who paid what for this employee and month, everyone included */
   platiSalariu(d.angajat,d.luna).sort(function(a,b){return String(a.data).localeCompare(String(b.data))}).forEach(function(p){
     out.push({l:T("pontaj_paidby")+" "+(p.nume||(p.by===ME?meName():"…"))+" · "+shortDate(p.data),v:money(p.suma)+" MDL"});
   });
   return out}},

 utilizatori:{title:"a_user",icon:"userplus",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"rol",t:"select",l:"f_rol",req:1,opts:[{v:"Operator",l:T("rol_op")},{v:"Director",l:T("rol_dir")}],def:"Operator",showIf:function(){return false}}, /* never shown: new users are collaborators, the administrators are fixed */
   {k:"cod",t:"text",l:"f_cod",req:1,hint:"f_cod_h",def:codNou()},
   {k:"codEHL",t:"text",l:"f_codehl_set",hint:"f_codehl_set_h",showIf:function(d){return d.rol==="Director"}},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("activ")},{v:"Inactiv",l:T("u_inactiv")}],def:"Activ"},
   {k:"caAngajat",t:"checkbox",l:"also_ang",newOnly:1},
   {k:"salariu",t:"number",l:"f_salariu",step:"0.01",def:"0",showIf:function(d){return !!d.caAngajat}}
 ]}},

 proiecte:{title:"a_proj",icon:"folder",fields:function(){return[
   /* a project is named after the work and the client; the contract is always in euro and is split into what the
      client pays in cash and what by transfer; the responsible is the account that creates it */
   {k:"nume",t:"text",l:"f_proiect_nume",req:1},
   {k:"client",t:"text",l:"f_client_nume",req:1,list:clienti()},
   {k:"contractEUR",t:"number",l:"f_contract_eur_sum",req:1,step:"0.01"},
   {k:"contractCash",t:"number",l:"f_contract_cash",step:"0.01",def:"0",half:1},
   {k:"contractTransfer",t:"number",l:"f_contract_tr",step:"0.01",def:"0",half:1},
   {k:"adaugator",t:"number",l:"f_aditional",step:"0.01",def:"0",half:1}, /* extra the client agreed beyond the contract, in any currency */
   {k:"adaugatorValuta",t:"select",l:"f_valuta",half:1,opts:opt(valute().map(function(v){return v.cod})),def:"EUR"},
   {k:"dataInceput",t:"date",l:"f_di",half:1,def:today()},
   {k:"termen",t:"date",l:"f_termen",half:1},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("st_activ")},{v:"Pauză",l:T("st_pauza")},{v:"Finalizat",l:T("st_final")}],def:"Activ"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){var pe=projIncEur(d.nume),ce=n(d.contractEUR);
   /* the contract in euro, the cash and the transfer part (paid / agreed), and what is still to come */
   return [{l:T("f_contract"),v:money(ce)+" EUR"},{l:T("p_cash"),v:money(pe.cash)+" / "+money(n(d.contractCash))+" EUR"},{l:T("p_tr"),v:money(pe.tr)+" / "+money(n(d.contractTransfer))+" EUR"},{l:T("f_aditional"),v:money(n(d.adaugator))+" "+(d.adaugatorValuta||"EUR")+((d.adaugatorValuta||"EUR")!=="EUR"&&n(d.adaugator)?" = "+money(aditEur(d))+" EUR":"")},{l:T("p_ramas"),v:money(round2(ce+aditEur(d)-pe.cash-pe.tr))+" EUR"}]}},

 angajati:{title:"a_ang",icon:"user",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"dataInceput",t:"date",l:"f_start",def:today()},
   /* salaries are the director's: an operator adds the person only */
   {k:"salariu",t:"number",l:(sheetState&&sheetState.id)?"f_salariu_nou":"f_salariu",req:isDir?1:0,step:"0.01",newOnly:1,hint:"",showIf:function(d){return isDir||!(sheetState&&sheetState.id)||angajatMeu(d.nume)}},
   {k:"dinSal",t:"date",l:"f_dinsal",hint:"f_dinsal_h",def:today(),showIf:function(d){return !!(sheetState&&sheetState.id)&&angajatMeu(d.nume)}},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("activ")},{v:"Inactiv",l:T("inactiv")}],def:"Activ"}
 ]},calc:function(d){
   /* the salary rubric: what he gets now and since when, every earlier step, and the new salary with its date */
   if(!angajatMeu(d.nume))return [];
   var hist=S.istoric.filter(function(h){return sameP(h.angajat,d.nume)}).sort(function(a,b){return String(a.dinData).localeCompare(String(b.dinData))});
   var out=[],cur=salariuLa(d.nume,today()),edit=!!(sheetState&&sheetState.id);
   if(edit&&hist.length){
     out.push({l:T("sal_actual"),v:money(cur)+" MDL"});
     hist.forEach(function(h){out.push({l:T("sal_din")+" "+shortDate(h.dinData),v:money(n(h.salariu))+" MDL"})});
   }
   var sal=n(d.salariu);
   if(sal>0&&(!hist.length||sal!==cur))out.push({l:T("sal_nou")+" "+shortDate(edit?(d.dinSal||today()):(d.dataInceput||today())),v:money(sal)+" MDL",cls:"tot"});
   return out}}
};

FORMS.grafic={title:"a_grafic",icon:"clock",fields:function(){return[]}}; /* drawn by openGrafic(), not by the form engine */

/* ---------------- work schedule: full or half days per employee and day, for a project or for EHL; each day signed by its author ---------------- */
var GR={mode:"ang",angajat:"",luna:curMonth(),zi:today(),pentru:"EHL",proiect:""};
function grRec(angajat,iso){return S.grafic.filter(function(r){return sameP(r.angajat,angajat)&&r.data===iso})[0]||null}
/* a day is changed only by its author, and not once that author has paid the employee for that month */
function grEditable(r,angajat,iso){if(String(iso)>today())return false;if(r&&r.by!==ME)return false;if(ziInchisa(angajat,iso))return false;return true}
function grProjOpts(){return S.proiecte.filter(function(p){return p.status!=="Finalizat"}).map(function(p){return p.nume}).sort(function(a,b){return String(a).localeCompare(String(b))})}
function grTag(r){if(!r)return "";return (r.pentru==="Proiect"&&r.proiect)?r.proiect:"EHL"}
function grWho(r){return r?(byName(r)||r.deCine||(r.by===ME?meName():"")):""}
function openGrafic(angajat,luna){
  grMarkOpened();grRemindShown=false;
  var lst=angajatiLucru();
  GR.angajat=angajat||(lst.some(function(a){return sameP(a,GR.angajat)})?GR.angajat:(lst[0]||""));
  GR.luna=luna||GR.luna||curMonth();
  if(String(GR.zi).slice(0,7)!==GR.luna)GR.zi=GR.luna===curMonth()?today():GR.luna+"-01";
  if(GR.pentru==="Proiect"&&!grProjOpts().some(function(p){return sameP(p,GR.proiect)})){GR.pentru="EHL";GR.proiect="";}
  sheetState=null;sheetOpened();drawGrafic();document.body.style.overflow="hidden";
}
/* the controls of one employee-day: full day, half day, and who entered it for what */
function grCell(angajat,iso){
  var r=grRec(angajat,iso),hrs=r?n(r.ore):0,ed=grEditable(r,angajat,iso),who=grWho(r);
  return '<span class="gr-ctl">'
    +'<button type="button" class="gr-full" data-grset="8" data-gra="'+esc(angajat)+'" data-grd="'+iso+'" aria-pressed="'+(hrs===8?"true":"false")+'"'+(ed?"":" disabled")+'>'+esc(T("gr_zi"))+'</button>'
    +'<button type="button" class="gr-full" data-grset="4" data-gra="'+esc(angajat)+'" data-grd="'+iso+'" aria-pressed="'+(hrs===4?"true":"false")+'"'+(ed?"":" disabled")+'>'+esc(T("gr_half"))+'</button></span>'
    +(r&&hrs>0?'<span class="gr-meta">'+esc(grTag(r))+(who?' · '+esc(who):'')+'</span>':'');
}
function drawGrafic(){
  var lst=angajatiLucru(),a=GR.angajat,ym=GR.luna;
  var y=parseInt(ym.slice(0,4),10),m=parseInt(ym.slice(5,7),10),dim=new Date(y,m,0).getDate();
  var wd=lang==="ru"?["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]:["Du","Lu","Ma","Mi","Jo","Vi","Sâ"];
  var h='<div class="sheet"><div class="sheet-in"><div class="sheet-head"><h2>'+esc(T("a_grafic"))+'</h2><button class="x" type="button" id="closeSheet" aria-label="'+esc(T("cancel"))+'">'+icon("x")+'</button></div>';
  h+='<div class="chips" style="margin-bottom:10px"><button type="button" class="chip" data-grmode="ang"'+(GR.mode==="ang"?' aria-pressed="true"':'')+'>'+esc(T("gr_mode_ang"))+'</button><button type="button" class="chip" data-grmode="zi"'+(GR.mode==="zi"?' aria-pressed="true"':'')+'>'+esc(T("gr_mode_zi"))+'</button></div>';
  /* what the day is worked for; applies to the days tapped from now on */
  var pj=grProjOpts();
  h+='<div class="pair"><label><span>'+esc(T("f_pentru"))+'</span><select data-gr="pentru"><option value="EHL"'+(GR.pentru!=="Proiect"?' selected':'')+'>'+esc(T("pt_ehl"))+'</option>'+(pj.length?'<option value="Proiect"'+(GR.pentru==="Proiect"?' selected':'')+'>'+esc(T("pt_proiect"))+'</option>':'')+'</select></label>'
    +'<label'+(GR.pentru==="Proiect"?'':' hidden')+'><span>'+esc(T("f_proiect"))+'</span><select data-gr="proiect">'+pj.map(function(p){return '<option value="'+esc(p)+'"'+(sameP(p,GR.proiect)?' selected':'')+'>'+esc(p)+'</option>'}).join("")+'</select></label></div>';
  if(GR.mode==="zi"){
    h+='<label><span>'+esc(T("f_data"))+'</span><input type="date" data-gr="zi" value="'+esc(GR.zi)+'" max="'+today()+'"></label><p class="hint">'+esc(T("gr_h_zi"))+'</p>';
    if(!lst.length)h+='<p class="hint">'+esc(T("gr_none"))+'</p>';
    else h+='<div class="card rows" style="margin-top:8px">'+lst.map(function(p){return '<div class="row gr-row"><span class="l">'+esc(p)+'</span>'+grCell(p,GR.zi)+'</div>'}).join("")+'</div>';
  }else{
    h+='<div class="pair"><label><span>'+esc(T("f_ang"))+'</span><select data-gr="angajat">'+(lst.length?lst.map(function(p){return '<option value="'+esc(p)+'"'+(sameP(p,a)?' selected':'')+'>'+esc(p)+'</option>'}).join(""):'<option value="">—</option>')+'</select></label>'
      +'<label><span>'+esc(T("f_luna"))+'</span><input type="month" data-gr="luna" value="'+esc(ym)+'"></label></div>';
    if(!a)h+='<p class="hint">'+esc(T("gr_none"))+'</p>';
    else{
      var g=graficOre(a,ym),gm=graficMele(a,ym);
      h+='<p class="hint">'+esc(lunaAchitata(a,ym)?T("gr_lock"):T("gr_h"))+'</p><div class="gr-grid">';
      for(var d=1;d<=dim;d++){var iso=ym+"-"+p2(d),r=grRec(a,iso),hrs=r?n(r.ore):0,dow=new Date(y,m-1,d).getDay();
        h+='<div class="gr-day'+(dow===0?" sun":"")+(hrs>0?" on":"")+'"><span class="gr-n">'+d+' <small>'+wd[dow]+'</small></span>'+grCell(a,iso)+'</div>';
      }
      h+='</div><div class="calc-row"><div class="calcbox"><span>'+esc(T("gr_tot"))+'</span><span class="num">'+fmt(g.h1+g.h2,1)+' '+esc(T("gr_ore"))+'</span></div><div class="calcbox"><span>'+esc(T("gr_zile"))+'</span><span class="num">'+fmt(g.z1+g.z2,2)+'</span></div>'
        +'<div class="calcbox"><span>'+esc(T("gr_mine"))+'</span><span class="num">'+fmt(gm.z1+gm.z2,2)+' '+esc(T("gr_zile_s"))+'</span></div></div>';
      /* the money for the whole month: worth at this employee's salary, what was paid by anyone, what is still owed */
      var L=pontajLuna(a,ym),sal=L.sal,worth=L.tot,paid=L.paid,due=L.due,aut=zilePeAutorTxt(a,ym),pl=platitDeTxt(a,ym);
      if(aut)h+='<p class="hint">'+esc(T("gr_zile_s")+": "+aut)+'</p>';
      if(pl)h+='<p class="hint">'+esc(T("pontaj_paidby")+" "+pl)+'</p>';
      h+='<div class="calc-row"><div class="calcbox"><span>'+esc(T("gr_bani"))+'</span><span class="num">'+(sal>0?money(worth)+" MDL":esc(T("gr_nosal")))+'</span></div>'
        +'<div class="calcbox"><span>'+esc(T("l_plata"))+'</span><span class="num">'+money(paid)+'</span></div>'
        +'<div class="calcbox"><span>'+esc(T("pontaj_due"))+'</span><span class="num">'+(sal>0?money(due)+" MDL":"—")+'</span></div></div>';
    }
  }
  $("#sheet").innerHTML=h+'</div></div>';
}
/* one row per employee and day; a day set back to zero keeps its row, the sums ignore it */
function grSet(angajat,iso,hrs){
  if(!angajat||!iso)return;
  hrs=n(hrs)===4?4:(n(hrs)===8?8:0);
  var r=grRec(angajat,iso);
  if(!grEditable(r,angajat,iso)){toast(T(String(iso)>today()?"gr_future":(r&&r.by!==ME?"gr_other":"gr_lock")));drawGrafic();return;}
  var body={angajat:angajat,data:iso,ore:hrs,pentru:(GR.pentru==="Proiect"&&GR.proiect)?"Proiect":"EHL",proiect:(GR.pentru==="Proiect"&&GR.proiect)?GR.proiect:"",deCine:meName()},p;
  if(!r){if(!(hrs>0))return;p=saveDoc("grafic",body);}
  else if(n(r.ore)===hrs&&(r.pentru||"EHL")===body.pentru&&(r.proiect||"")===body.proiect)return;
  else p=saveDoc("grafic",body,r.id);
  p.then(function(){if($("#sheet").querySelector("[data-grmode]"))drawGrafic()}).catch(function(e){toast(saveErr(e));drawGrafic()});
}
function grChange(el){
  var k=el.dataset.gr;
  if(k==="angajat"){GR.angajat=el.value;drawGrafic();return;}
  if(k==="luna"){if(/^[0-9]{4}-[0-9]{2}$/.test(el.value)){GR.luna=el.value;GR.zi=GR.luna===curMonth()?today():GR.luna+"-01";}drawGrafic();return;}
  if(k==="zi"){if(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(el.value)){GR.zi=el.value;GR.luna=el.value.slice(0,7);}drawGrafic();return;}
  if(k==="pentru"){GR.pentru=el.value;if(GR.pentru==="Proiect"&&!GR.proiect)GR.proiect=grProjOpts()[0]||"";drawGrafic();return;}
  if(k==="proiect"){GR.proiect=el.value;return;}
}

/* ---------------- db layer ---------------- */
/* Writes go straight to the server when online; otherwise they are applied locally and queued (see flushQueue).
   The audit trail is one jurnal record per change; the server forbids editing or deleting it. */
var JUR={luna:curMonth(),rows:null,loading:false};
function clean(data){
  var skip={id:1,by:1,ts:1,created:1,updated:1,collectionId:1,collectionName:1,expand:1};
  var body={};for(var k in data){if(data[k]!==undefined&&!skip[k])body[k]=data[k]}return body;
}
function localWrite(op){
  if(op.op==="create"){var rec=norm(op.data);rec.id=op.id;delete rec.codFondator;delete rec.codEHL;rec.by=ME||"";rec.created=new Date().toISOString();rec.ts=rec.created;S[op.col]=(S[op.col]||[]).concat([rec]);}
  else if(op.op==="update"){S[op.col]=(S[op.col]||[]).map(function(r){if(r.id!==op.id)return r;var o=norm(r);for(var k in op.data)o[k]=op.data[k];return o})}
  else S[op.col]=(S[op.col]||[]).filter(function(r){return r.id!==op.id});
  if(op.op!=="create"){
    /* the record is still an unsent create: fold the change into it */
    var c=QUEUE.filter(function(q){return q.op==="create"&&q.id===op.id})[0];
    if(c){
      if(op.op==="update"){for(var k2 in op.data)c.data[k2]=op.data[k2]}else{QUEUE.splice(QUEUE.indexOf(c),1)}
      saveQueue();saveCache();return Promise.resolve(op.id);
    }
  }
  QUEUE.push(op);saveQueue();saveCache();flushQueue();
  return Promise.resolve(op.id);
}
function isTmp(id){return String(id||"").indexOf("tmp")===0}
function logEntry(act,col,ref,data){
  if(!PB||!ACCESS||col==="jurnal")return Promise.resolve();
  var e={id:newId(),act:act,col:col,ref:ref,nume:meName()||"",data:data||{}};
  if(online&&!QUEUE.length){
    return PB.collection("jurnal").create(e,{requestKey:null}).then(function(){})
      .catch(function(x){if(netErr(x)){online=false;return localWrite({op:"create",col:"jurnal",id:e.id,data:e}).then(function(){})}});
  }
  return localWrite({op:"create",col:"jurnal",id:e.id,data:e}).then(function(){});
}
function saveDoc(col,data,id){
  if(!PB||!ACCESS)return Promise.reject({code:"no_db"});
  var body=clean(data),p;
  if(!id)body.id=newId();
  if(col==="utilizatori"&&!id){var pw="x"+uid()+uid();body.password=pw;body.passwordConfirm=pw;}
  var queued=function(){return localWrite({op:id?"update":"create",col:col,id:id||body.id,data:body})};
  if(online&&!QUEUE.length&&!isTmp(id)){
    p=(id?PB.collection(col).update(id,body,{requestKey:null}):PB.collection(col).create(body,{requestKey:null}))
      .then(function(rec){applyEvent(col,{action:id?"update":"create",record:rec});return rec.id})
      .catch(function(e){if(netErr(e)){online=false;return queued()}throw e});
  }else p=queued();
  return p.then(function(rid){
    var copy=clean(body);delete copy.password;delete copy.passwordConfirm;delete copy.codFondator;delete copy.codEHL;copy.id=rid;
    return logEntry(id?"edit":"add",col,rid,copy).then(function(){return rid});
  });
}
function delDoc(col,id){
  if(!PB||!ACCESS)return Promise.reject({code:"no_db"});
  var rec=S[col].filter(function(r){return r.id===id})[0];
  var copy=rec?JSON.parse(JSON.stringify(rec)):{id:id};
  var p;
  if(online&&!QUEUE.length&&!isTmp(id)){
    p=PB.collection(col).delete(id,{requestKey:null}).then(function(){applyEvent(col,{action:"delete",record:{id:id}})})
      .catch(function(e){if(netErr(e)){online=false;return localWrite({op:"delete",col:col,id:id})}throw e});
  }else p=localWrite({op:"delete",col:col,id:id});
  return p.then(function(){return logEntry("del",col,id,copy)});
}
function jurnalRows(luna){
  if(!PB)return Promise.resolve([]);
  if(!/^[0-9]{4}-[0-9]{2}$/.test(String(luna||"")))return Promise.resolve([]);
  /* the server keeps "created" in UTC; the month asked for is the local one */
  var y=parseInt(luna.slice(0,4),10),m=parseInt(luna.slice(5,7),10),utc=function(d){return d.toISOString().replace("T"," ").slice(0,19)};
  var from=utc(new Date(y,m-1,1)),to=utc(new Date(y,m,1,0,0,-1));
  return PB.collection("jurnal").getFullList({batch:1000,requestKey:null,sort:"-created",
      filter:'created >= "'+from+'" && created <= "'+to+'"'})
    .then(function(items){return items.map(function(e){var o=norm(e);o.ts=localTs(o.created);
      if(typeof o.data==="string"){try{o.data=JSON.parse(o.data)}catch(x){o.data={}}}return o})});
}
function loadJurnal(){
  JUR.loading=true;JUR.rows=null;render();
  jurnalRows(JUR.luna).then(function(rows){JUR.rows=rows;JUR.loading=false;render()})
    .catch(function(e){if(authErrOf(e))return;JUR.rows=[];JUR.loading=false;render()});
}
/* ---------- Excel export ---------- */
var XH="FF0E6A4E",XALT="FFF4F8F6",XSOFT="FFD9EDE4",XLINE="FFCDD6D1",XMUT="FF5E6760";
var FMT_M='#,##0.00',FMT_D='dd.mm.yyyy',FMT_P='0.0%';
function xd(s){if(!s||String(s).length<10)return s||"";var t=Date.parse(String(s).slice(0,10)+"T00:00:00Z");return isNaN(t)?s:new Date(t)}
function wsAdd(wb,name,cols,rows,totals){
  var ws=wb.addWorksheet(name,{views:[{state:"frozen",ySplit:1}],
    pageSetup:{paperSize:9,orientation:"landscape",fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:.3,right:.3,top:.5,bottom:.5,header:.2,footer:.2}}});
  ws.columns=cols.map(function(c){return {header:c.h,key:c.k,width:c.w||15}});
  var hr=ws.getRow(1);hr.height=24;
  hr.eachCell({includeEmpty:true},function(cell){
    cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:XH}};
    cell.font={bold:true,color:{argb:"FFFFFFFF"},size:10.5};
    cell.alignment={vertical:"middle",horizontal:"left",wrapText:true};
  });
  rows.forEach(function(r,i){
    var row=ws.addRow(r);row.height=18;
    row.eachCell({includeEmpty:true},function(cell){
      cell.alignment=cell.alignment||{vertical:"middle"};
      cell.border={bottom:{style:"hair",color:{argb:XLINE}}};
      if(i%2===1)cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:XALT}};
    });
  });
  cols.forEach(function(c,i){
    var col=ws.getColumn(i+1);
    if(c.fmt)col.numFmt=c.fmt;
    if(c.align)col.alignment={horizontal:c.align,vertical:"middle"};
  });
  if(rows.length)ws.autoFilter={from:{row:1,column:1},to:{row:1,column:cols.length}};
  if(totals){
    var tr=ws.addRow(totals);tr.height=20;
    tr.eachCell({includeEmpty:true},function(cell){
      cell.font={bold:true,color:{argb:"FF161A17"}};
      cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:XSOFT}};
      cell.border={top:{style:"thin",color:{argb:XH}}};
    });
  }
  return ws;
}
function wsPanou(wb,C,luna,doar){
  var ws=wb.addWorksheet(T("nav_panou"),{views:[{showGridLines:false}],
    pageSetup:{paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:0}});
  ws.columns=[{width:38},{width:20},{width:20},{width:20}];
  var r=ws.addRow([T("app")]);r.height=34;
  ws.mergeCells("A1:D1");
  r.getCell(1).font={bold:true,size:18,color:{argb:XH}};
  r.getCell(1).alignment={vertical:"middle"};
  var sub=ws.addRow([(lang==="ru"?"Выгружено ":"Exportat ")+today()+(doar?" · "+monthName(luna):"")]);
  ws.mergeCells("A2:D2");sub.getCell(1).font={size:10,color:{argb:XMUT}};
  ws.addRow([]);
  function head(t){
    var h=ws.addRow([t]);h.height=22;
    ws.mergeCells("A"+h.number+":D"+h.number);
    h.getCell(1).fill={type:"pattern",pattern:"solid",fgColor:{argb:XH}};
    h.getCell(1).font={bold:true,color:{argb:"FFFFFFFF"},size:11};
    h.getCell(1).alignment={vertical:"middle",indent:1};
  }
  function kv(label,val,strong,fmt){
    var row=ws.addRow([label,val]);row.height=17;
    row.getCell(1).font={bold:!!strong,size:10.5};
    row.getCell(2).numFmt=fmt||FMT_M;
    row.getCell(2).font={bold:!!strong,size:10.5};
    row.getCell(2).alignment={horizontal:"right"};
    row.getCell(1).border={bottom:{style:"hair",color:{argb:XLINE}}};
    row.getCell(2).border={bottom:{style:"hair",color:{argb:XLINE}}};
    if(strong){row.getCell(1).fill=row.getCell(2).fill={type:"pattern",pattern:"solid",fgColor:{argb:XSOFT}};}
  }
  function cols4(a,b,c,d,isHead){
    var row=ws.addRow([a,b,c,d]);row.height=17;
    [1,2,3,4].forEach(function(i){
      var cell=row.getCell(i);
      cell.font={bold:!!isHead,size:10.5,color:{argb:isHead?XMUT:"FF161A17"}};
      if(i>1){cell.numFmt=FMT_M;cell.alignment={horizontal:"right"}}
      cell.border={bottom:{style:"hair",color:{argb:XLINE}}};
    });
    return row;
  }
  head(T("s_bani"));
  kv(T("t_incasari"),C.incTotal);kv(T("t_cheltuieli"),C.cheltTotal);
  kv(T("l_num"),C.incNumMDL);kv(T("l_tr"),C.incTrMDL);
  kv(T("l_chnum"),C.cheltNum);kv(T("l_chtr"),C.cheltTr);
  kv(T("l_salplatit"),C.salPlatitMDL);kv(T("l_avans"),C.avansMDL);
  kv(T("l_depus"),C.depusMDL);kv(T("l_chirii"),C.chiriiMDL);
  kv(T("t_casa"),C.casaMDL,1);kv(T("t_cont"),C.contMDL,1);kv(T("l_justif"),C.colabRamas,1);
  kv(T("t_total"),C.totalFirma,1);
  ws.addRow([]);
  head(T("s_casa"));
  cols4(T("f_valuta"),T("l_num"),(lang==="ru"?"Выдано":"Ieșit"),T("l_ramas"),1);
  C.vals.forEach(function(v){if(C.intratNum[v]||C.iesTotal[v])cols4(v,C.intratNum[v],C.iesTotal[v],C.ramas[v])});
  ws.addRow([]);
  if(C.colab.length){
    head(T("s_colab"));
    cols4(T("f_pers"),T("l_primit"),T("l_cheltuit"),T("l_inmana")+" / "+T("colab_owed"),1);
    C.colab.forEach(function(x){cols4(x.nume,x.primit,x.cheltuit,x.ramas)});
    ws.addRow([]);
  }
  if(C.perClient.length){
    head(T("s_client"));
    cols4(T("f_client"),T("t_incasari"),T("t_cheltuieli"),(lang==="ru"?"Сальдо":"Sold"),1);
    C.perClient.forEach(function(x){cols4(x.nume,x.inc,x.chelt,x.sold)});
    ws.addRow([]);
  }
  if(C.perCateg.length){
    head(T("s_categ"));
    C.perCateg.forEach(function(x){kv(catLabel(x.nume),x.val)});
  }
  return ws;
}
function buildWb(luna,doar){
  var wb=new window.ExcelJS.Workbook();
  wb.creator="Casieria EHL";wb.created=new Date();
  var C=calc();
  var inM=function(r){return !doar||String(dateOf(r)).slice(0,7)===luna};
  wsPanou(wb,C,luna,doar);

  var inc=S.incasari.filter(inM).sort(function(a,b){return String(a.data).localeCompare(String(b.data))});
  wsAdd(wb,T("r_inc"),[
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_client"),k:"client",w:24},{h:T("f_proiect"),k:"proiect",w:20},
    {h:T("f_descr"),k:"descriere",w:28},{h:T("f_valuta"),k:"valuta",w:9,align:"center"},
    {h:T("f_curs"),k:"curs",w:10,fmt:'#,##0.0000'},{h:T("f_suma"),k:"suma",w:14,fmt:FMT_M},
    {h:T("f_sumamdl"),k:"mdl",w:15,fmt:FMT_M},{h:T("f_mod"),k:"mod",w:12}],
    inc.map(function(r){return {data:xd(r.data),client:r.client,proiect:r.proiect,descriere:r.descriere,
      valuta:r.valuta,curs:n(r.curs),suma:n(r.suma),mdl:n(r.suma)*n(r.curs),
      mod:r.mod==="Numerar"?T("numerar"):T("transfer")}}),
    {data:T("l_total"),mdl:inc.reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0)});

  var ch=S.cheltuieli.filter(inM).sort(function(a,b){return String(a.data).localeCompare(String(b.data))});
  wsAdd(wb,T("r_chelt"),[
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_categ"),k:"categorie",w:16},{h:T("f_subcat"),k:"subcat",w:16},
    {h:T("f_descr"),k:"descriere",w:30},{h:T("f_client"),k:"client",w:22},{h:T("f_proiect"),k:"proiect",w:20},
    {h:T("f_sumamdl"),k:"suma",w:15,fmt:FMT_M},{h:T("f_platit"),k:"platitDe",w:20},{h:T("f_mod"),k:"mod",w:12},{h:T("src_t"),k:"sursa",w:16}],
    ch.map(function(r){return {data:xd(r.data),categorie:catLabel(catMain(r.categorie)),subcat:catSub(r.categorie),descriere:r.descriere,client:r.client,
      proiect:r.proiect,suma:n(r.suma),platitDe:r.platitDe,mod:r.mod==="Numerar"?T("numerar"):T("transfer"),
      sursa:r.mod==="Transfer"?"":(r.sursa==="Proprii"?T("src_proprii_short"):T("src_avans"))}}),
    {data:T("l_total"),suma:ch.reduce(function(a,r){return a+n(r.suma)},0)});

  var ie=S.iesiri.filter(inM).sort(function(a,b){return String(a.data).localeCompare(String(b.data))});
  var dm={"Depus pe cont":"d_depus","Dat persoanei":"d_pers",Salarii:"d_sal","Împrumut":"d_impr",Alte:"d_alte"};
  wsAdd(wb,T("r_ies"),[
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_dest"),k:"dest",w:20},
    {h:T("f_valuta"),k:"valuta",w:9,align:"center"},{h:T("f_curs"),k:"curs",w:10,fmt:'#,##0.0000'},
    {h:T("f_suma"),k:"suma",w:14,fmt:FMT_M},{h:T("eq"),k:"mdl",w:15,fmt:FMT_M},
    {h:T("f_pers"),k:"persoana",w:20},{h:T("f_luna"),k:"luna",w:14},{h:T("f_nota"),k:"nota",w:26}],
    ie.map(function(r){return {data:xd(r.data),dest:T(dm[r.destinatie]||"d_alte"),valuta:r.valuta,curs:n(r.curs),
      suma:n(r.suma),mdl:n(r.suma)*n(r.curs),persoana:r.persoana,luna:r.luna?monthName(r.luna):"",nota:r.nota}}),
    {data:T("l_total"),mdl:ie.reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0)});

  if(C.proiecte.length)wsAdd(wb,T("r_proj"),[
    {h:T("f_nume"),k:"nume",w:26},{h:T("f_client"),k:"client",w:22},{h:T("f_resp"),k:"resp",w:28},
    {h:T("f_status"),k:"status",w:13},{h:T("f_contract_eur_sum"),k:"contractEUR",w:16,fmt:FMT_M},{h:T("f_contract_cash"),k:"contractCash",w:16,fmt:FMT_M},{h:T("f_contract_tr"),k:"contractTransfer",w:16,fmt:FMT_M},
    {h:T("p_cheltuit"),k:"chelt",w:15,fmt:FMT_M},{h:T("p_incasat"),k:"inc",w:15,fmt:FMT_M},
    {h:T("p_rest"),k:"rest",w:15,fmt:FMT_M},{h:"%",k:"pct",w:9,fmt:FMT_P}],
    C.proiecte.map(function(p){return {nume:p.nume,client:p.client,resp:p.resp.join(", ")||T("p_niciunul"),
      status:p.status==="Finalizat"?T("st_final"):(p.status==="Pauză"?T("st_pauza"):T("st_activ")),
      buget:p.buget,chelt:p.chelt,inc:p.inc,rest:p.buget?p.rest:null,pct:p.buget?p.chelt/p.buget:null}}),
    {nume:T("l_total"),buget:C.proiecte.reduce(function(a,p){return a+p.buget},0),
     chelt:C.proiecte.reduce(function(a,p){return a+p.chelt},0),
     inc:C.proiecte.reduce(function(a,p){return a+p.inc},0)});

  var chi=S.chirii.filter(inM);
  if(chi.length)wsAdd(wb,T("r_chirii"),[
    {h:T("f_di"),k:"di",w:12,fmt:FMT_D},{h:T("f_ds"),k:"ds",w:12,fmt:FMT_D},{h:T("f_loc"),k:"loc",w:26},
    {h:T("f_chirias"),k:"chirias",w:20},{h:T("f_valuta"),k:"valuta",w:9,align:"center"},
    {h:T("f_chirie"),k:"chirie",w:12,fmt:FMT_M},{h:T("f_gaj"),k:"gaj",w:12,fmt:FMT_M},
    {h:T("f_comun"),k:"comunale",w:12,fmt:FMT_M},{h:T("f_avarii"),k:"avarii",w:12,fmt:FMT_M},
    {h:T("eq"),k:"mdl",w:14,fmt:FMT_M},{h:T("f_mod"),k:"mod",w:12}],
    chi.map(function(r){return {di:xd(r.dataInceput),ds:xd(r.dataSfarsit),loc:r.locatia,chirias:r.chirias,
      valuta:r.valuta,chirie:n(r.chirie),gaj:n(r.gaj),comunale:n(r.comunale),avarii:n(r.avarii),
      mdl:chirieTotal(r)*n(r.curs),mod:r.mod==="Numerar"?T("numerar"):T("transfer")}}),
    {di:T("l_total"),mdl:chi.reduce(function(a,r){return a+chirieTotal(r)*n(r.curs)},0)});

  if(C.contracte.length)wsAdd(wb,T("r_contr"),[
    {h:T("f_client"),k:"client",w:26},{h:T("f_contract"),k:"val",w:16,fmt:FMT_M},
    {h:T("f_decash"),k:"deCash",w:16,fmt:FMT_M},{h:T("l_incas")+" "+T("numerar"),k:"incCash",w:16,fmt:FMT_M},
    {h:T("l_incas")+" "+T("transfer"),k:"incTr",w:16,fmt:FMT_M},{h:T("l_ramas"),k:"ramas",w:16,fmt:FMT_M},
    {h:"%",k:"pct",w:9,fmt:FMT_P}],
    C.contracte.map(function(x){return {client:x.client,val:x.val,deCash:x.deCash,incCash:x.incCash,
      incTr:x.incTr,ramas:x.ramas,pct:x.val?(x.incCash+x.incTr)/x.val:null}}),
    {client:T("l_total"),val:C.contrVal,ramas:C.contrRamas});

  if(C.salLuni.length){
    wsAdd(wb,T("r_sal"),[
      {h:T("f_luna"),k:"luna",w:18},{h:T("l_castigat"),k:"castigat",w:16,fmt:FMT_M},
      {h:T("l_plata"),k:"platit",w:16,fmt:FMT_M},{h:T("l_rest"),k:"rest",w:16,fmt:FMT_M}],
      C.salLuni.map(function(m){return {luna:monthName(m.luna),castigat:m.castigat,platit:m.platit,rest:m.rest}}),
      {luna:T("l_total"),castigat:C.salCastigat,platit:C.salPlatit,rest:C.salRest});
    if(C.pontaj.length)wsAdd(wb,T("a_pontaj"),[
      {h:T("f_luna"),k:"luna",w:18},{h:T("f_ang"),k:"angajat",w:24},
      {h:T("f_z1"),k:"z1",w:11,fmt:'0'},{h:T("f_z2"),k:"z2",w:13,fmt:'0'},
      {h:(lang==="ru"?"Раб. дней":"Zile lucr."),k:"wd",w:12,fmt:'0'},
      {h:(lang==="ru"?"Цена дня":"Preț zi"),k:"pz",w:13,fmt:FMT_M},{h:T("f_extra"),k:"extra",w:12,fmt:FMT_M},{h:T("tot"),k:"total",w:15,fmt:FMT_M}],
      C.pontaj.map(function(p){return {luna:monthName(p.luna),angajat:p.angajat,z1:p.z1,z2:p.z2,wd:p.wd,pz:p.pretZi,extra:p.extra,total:p.total}}),
      {luna:T("l_total"),total:C.salCastigat});
  }

  if(S.imprumuturi.length)wsAdd(wb,T("r_impr"),[
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_pers"),k:"persoana",w:24},
    {h:T("f_valuta"),k:"valuta",w:9,align:"center"},{h:T("f_curs"),k:"curs",w:10,fmt:'#,##0.0000'},{h:T("f_suma"),k:"suma",w:14,fmt:FMT_M},
    {h:T("f_sumamdl"),k:"mdl",w:15,fmt:FMT_M},{h:T("f_termen"),k:"termen",w:12,fmt:FMT_D},
    {h:T("f_status"),k:"status",w:14},{h:T("f_nota"),k:"nota",w:28}],
    S.imprumuturi.map(function(r){return {data:xd(r.data),persoana:r.persoana,valuta:r.valuta||"MDL",curs:n(r.curs)||1,suma:n(r.suma),mdl:imprLei(r),
      termen:xd(r.termen),status:r.status==="Achitat"?T("achitat"):T("neachitat"),nota:r.nota}}),
    {data:T("l_total"),mdl:C.imprTotal});
  if(S.schimburi.length)wsAdd(wb,T("r_schimb"),[
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_pers"),k:"persoana",w:24},{h:T("f_val_din"),k:"vd",w:10,align:"center"},{h:T("f_suma_din"),k:"sd",w:14,fmt:FMT_M},
    {h:T("f_val_in"),k:"vi",w:10,align:"center"},{h:T("f_suma_in"),k:"si",w:14,fmt:FMT_M},{h:T("f_nota"),k:"nota",w:28}],
    S.schimburi.map(function(r){return {data:xd(r.data),persoana:r.persoana,vd:r.valutaDin,sd:n(r.sumaDin),vi:r.valutaIn,si:n(r.sumaIn),nota:r.nota}}),null);

  if(JUR.rows&&JUR.rows.length)wsAdd(wb,T("r_jur"),[
    {h:T("f_data"),k:"zi",w:12,fmt:FMT_D},{h:(lang==="ru"?"Время":"Ora"),k:"ora",w:9,align:"center"},
    {h:(lang==="ru"?"Действие":"Operațiune"),k:"act",w:14},{h:(lang==="ru"?"Журнал":"Registru"),k:"col",w:18},
    {h:T("f_pers"),k:"nume",w:20},{h:(lang==="ru"?"Запись":"Înregistrare"),k:"sum",w:34},
    {h:(lang==="ru"?"Значения":"Valori"),k:"det",w:60}],
    JUR.rows.slice().reverse().map(function(e){
      var d=e.data||{};
      var det=Object.keys(d).filter(function(k){return ["id","by","ts"].indexOf(k)<0&&d[k]!==""&&d[k]!=null})
        .map(function(k){return k+": "+d[k]}).join("; ");
      var acts={add:"j_add",edit:"j_edit",del:"j_del"};
      return {zi:xd(String(e.ts).slice(0,10)),ora:String(e.ts).slice(11,16),act:T(acts[e.act]||"j_edit"),
        col:FORMS[e.col]?T(FORMS[e.col].title):e.col,nume:e.nume,sum:jurSum(e),det:det};
    }));
  return wb;
}
function csvEsc(s){s=String(s==null?"":s);return /[";\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
function exportCSV(){
  var out=[];
  COLS.concat(["istoric"]).forEach(function(c){
    var list=S[c];if(!list||!list.length)return;
    var keys={};list.forEach(function(r){for(var k in r)keys[k]=1});
    var ks=Object.keys(keys);
    out.push("## "+c);out.push(ks.join(";"));
    list.forEach(function(r){out.push(ks.map(function(k){return csvEsc(r[k])}).join(";"))});
    out.push("");
  });
  return downloadBlob("casieria-"+today()+".csv",new Blob(["﻿"+out.join("\n")],{type:"text/csv;charset=utf-8"}));
}
function downloadBlob(name,blob){
  return new Promise(function(res){
    var url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=name;a.rel="noopener";document.body.appendChild(a);a.click();
    setTimeout(function(){a.remove();URL.revokeObjectURL(url);res()},1500);
  });
}
var exporting=false;
function exportRun(luna,doar){
  if(!DL){toast(T("exp_no"));return}
  if(exporting)return;
  exporting=true;
  var btns=document.querySelectorAll("#expbtn,#expsub");
  btns.forEach(function(b){b.disabled=true;b.textContent=T("exp_work")});
  var fin=function(){exporting=false;render()};
  var waitLib=function(tries){
    if(window.ExcelJS)return Promise.resolve(true);
    if(tries<=0)return Promise.resolve(false);
    return new Promise(function(r){setTimeout(r,250)}).then(function(){return waitLib(tries-1)});
  };
  var go=function(){return waitLib(16).then(function(ok){
    if(!ok)return exportCSV();
    var wb=buildWb(luna,doar);
    return wb.xlsx.writeBuffer().then(function(buf){
      var nm="Casieria-EHL-"+(doar?luna:today())+".xlsx";
      return downloadBlob(nm,new Blob([buf],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
    });
  })};
  var p=(JUR.rows===null||JUR.luna!==luna)
    ?jurnalRows(luna).then(function(rows){JUR.luna=luna;JUR.rows=rows}).catch(function(){})
    :Promise.resolve();
  p.then(go).then(function(){toast(T("exported"));fin()})
   .catch(function(e){if(!e||e.code!=="declined")toast(T("exp_no"));fin()});
}
function saveCfg(patch){
  var cur=JSON.parse(JSON.stringify(cfg()));
  for(var k in patch)cur[k]=patch[k];
  if(!PB||!S.cfg||!S.cfg.id)return Promise.reject({code:"no_db"});
  var id=S.cfg.id;S.cfg=cur;S.cfg.id=id;
  return PB.collection("config").update(id,{valute:cur.valute,casier:cur.casier,categorii:cur.categorii},{requestKey:null})
    .then(function(rec){S.cfg=normCfg(rec);saveCache()});
}

/* ---------------- views ---------------- */
function render(){
  var app=$("#app");
  isDir=computeDir();
  if(needGate())view="panou";
  document.body.classList.toggle("locked",needGate());
  /* the EHL account (the common till) looks unlike an administrator account: dark header, its own title, "EHL" badge */
  var inEHL=!!(ACCESS&&isDir&&ehlMode());
  document.body.classList.toggle("ehl-mode",inEHL);
  $("#ttl").textContent=inEHL?T("app_ehl"):T("app");document.title=inEHL?T("app_ehl"):T("app");document.documentElement.lang=lang;
  $("#role").textContent=!ACCESS?T("oaspete"):(isDir?(ehlMode()?"EHL":T("director")):T("angajat"));
  $("#role").className="role"+(isDir?" on":"");
  /* header: brand mark, and who is signed in (initials, name, role) */
  var lg=$("#logo");if(lg&&!lg.firstChild)lg.innerHTML=icon("wallet");
  var bgi=$("#burger");if(bgi&&!bgi.firstChild){bgi.innerHTML=icon("menu");bgi.setAttribute("aria-label",T("menu_a"));}
  /* the brand leads home: the dashboard for a director, "Add" for an operator; nothing while signed out */
  var br=$(".brand");if(br){if(ACCESS&&!needGate()){br.dataset.view=homeView();br.setAttribute("role","link");br.tabIndex=0;}else{delete br.dataset.view;br.removeAttribute("role");br.removeAttribute("tabindex");}}
  var meBox=$("#me"),nm=meName();
  if(meBox){meBox.hidden=!ACCESS;$("#uname").textContent=nm;$("#av").textContent=initials(nm);}
  /* one button that names the other language */
  var lb=$("#langbtn");if(lb){var other=lang==="ru"?"ro":"ru";lb.dataset.lang=other;lb.innerHTML=icon("globe")+'<span>'+other.toUpperCase()+'</span>';lb.setAttribute("aria-label",other==="ru"?"Русский":"Română");}
  renderNav();
  var h="";
  if(needGate())h=vGate();
  else if(view==="panou")h=vPanou();
  else if(view==="ehl")h=vPanouEHL();
  else if(view==="add")h=vAdd();
  else if(view==="reg")h=vReg();
  else if(view==="mine")h=vMine();
  else if(view==="set")h=vSet();
  var oldMs=$(".mstrip",app),oldSl=oldMs?oldMs.scrollLeft:0;
  app.innerHTML=h;
  app.scrollTop=0;
  dpClose();enhanceDates(app);
  /* on a narrow screen the month strip scrolls; bring the chosen month into view */
  var ms=$(".mstrip",app),mp=ms&&$(".mp[aria-pressed]",ms);
  if(mp&&ms.scrollWidth>ms.clientWidth)ms.scrollLeft=Math.max(0,mp.offsetLeft+mp.offsetWidth-ms.clientWidth+16);
  else if(ms)ms.scrollLeft=oldSl;
  var bg=$("#burger");if(bg)bg.hidden=!(isDir&&ACCESS&&!needGate());
  fitRing();
}
/* The expenses ring is as tall as its card allows, so the gap on its right equals the gaps above and below.
   The card's height comes from its row (the cash-flow card or the list), measured with the CSS base size in place;
   the ring then takes that height minus the card padding, never less than the base. */
/* quick jump (phones): every block of the dashboard, named by its title; a tap closes the menu and scrolls to it */
var MENU_IC=null;
function dashBlocks(){
  return Array.prototype.slice.call(document.querySelectorAll("#app .dash-ov>.sec,#app .dash-grid>.sec")).map(function(sec){
    var t=sec.querySelector("h2,.ov-head"),lbl=t?t.textContent.replace(/\s+$/,""):T("s_totals");
    return {el:sec,lbl:lbl,y:sec.getBoundingClientRect().top};
  }).sort(function(p,q){return p.y-q.y}); /* in the order they appear on screen (phones reorder the blocks) */
}
function openMenu(){
  if(view!=="ehl"){view="ehl";histPush({v:view});render();} /* the quick-jump menu lists the blocks of the EHL tab */
  if(!MENU_IC){MENU_IC={};[["ov_chelt","outArrow"],["ov_flux","chart"],["s_totals","wallet"],["s_cont_minus","bank"],["s_bani","wallet"],["s_casa","cash"],["s_colab","users"],["s_colab_exp","outArrow"],["s_tranz","list"],["s_tr","bank"],["s_client","user"],["s_categ","tag"],["s_proiecte","folder"],["p_alte","folder"],["s_contr","file"],["s_sal","users"],["s_impr","clock"],["s_fond","user"],["s_chirii","home"]].forEach(function(p){MENU_IC[p[0]]=p[1]})}
  var byLbl={};Object.keys(MENU_IC).forEach(function(k){byLbl[T(k)]=MENU_IC[k]});
  var m=$("#menu");if(!m)return;
  m.innerHTML='<div class="menu-bg" data-menu-close="1"></div><div class="menu-p" role="dialog" aria-label="'+esc(T("menu_t"))+'"><div class="menu-h"><b>'+esc(T("menu_t"))+'</b><button type="button" class="x" data-menu-close="1" aria-label="'+esc(T("cancel"))+'">'+icon("x")+'</button></div><div class="menu-g">'
    +dashBlocks().map(function(b,i){return '<button type="button" class="menu-i" data-goto="'+i+'"><span class="ic-badge tint" style="--c:var(--accent)">'+icon(byLbl[b.lbl]||"list")+'</span>'+esc(b.lbl)+'</button>'}).join("")+'</div></div>';
  m.hidden=false;document.body.classList.add("menu-open");
}
function closeMenu(){var rb=$("#regmore");if(rb)rb.classList.remove("open");var m=$("#menu");if(m){m.hidden=true;m.innerHTML="";}document.body.classList.remove("menu-open")}
function fitRing(){
  var c=$(".ov-exp");if(!c)return;
  c.style.removeProperty("--ring");
  if(!(WIDE_MQ&&WIDE_MQ.matches))return;
  var base=parseFloat(getComputedStyle(c).getPropertyValue("--ring"))||0;
  /* the list beside it keeps at least 460px; the ring never takes that room */
  var room=c.clientWidth-40-24-460;
  var ring=Math.max(200,Math.min(560,Math.max(base,c.offsetHeight-40),room));
  if(ring!==base)c.style.setProperty("--ring",ring+"px");
}
var fitRingRaf=0;
window.addEventListener("resize",function(){cancelAnimationFrame(fitRingRaf);fitRingRaf=requestAnimationFrame(fitRing)});
function renderNav(){
  if(needGate()){$("#nav").innerHTML="";return;}
  var items=isDir
    ?[["ehl",icon("wallet"),T("nav_ehl")],["panou",icon("chart"),T("nav_panou")],["add",icon("plus"),T("nav_add")],["reg",icon("list"),T("nav_reg")],["set",icon("gear"),T("nav_set")]]
    :[["add",icon("plus"),T("nav_add")],["panou",icon("chart"),T("nav_panou")],["mine",icon("list"),T("nav_mine")]];
  $("#nav").innerHTML=items.map(function(it){
    return '<button type="button" data-view="'+it[0]+'"'+(view===it[0]?' aria-current="page"':'')+'><span class="ic">'+it[1]+'</span><span class="lb">'+esc(it[2])+'</span></button>';
  }).join("");
}
/* Install button: the browser's own prompt where it exists (Chrome/Edge on Android and desktop),
   otherwise the steps for this device (iPhone: Share -> Add to Home Screen). Hidden once installed. */
function isStandalone(){try{return window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}catch(e){return false}}
function installNote(){
  if(isStandalone())return "";
  var ua=navigator.userAgent||"",ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  var label=T(COARSE?"install_phone":"install_pc");
  if(installEvt)return '<div class="sec"><button class="btn" id="installbtn" type="button">'+icon("down")+' '+esc(label)+'</button></div>';
  var how=ios?T("install_ios_h"):(COARSE?T("install_android_h"):T("install_pc_h"));
  return '<div class="sec"><div class="card pad inst"><span class="ic-badge tint" style="--c:var(--accent)">'+icon("down")+'</span><div><div class="d" style="font-weight:600;margin-bottom:4px">'+esc(label)+'</div><p class="hint" style="margin:0">'+esc(how)+'</p></div></div></div>';
}
/* the evening reminder: from 21:00, a collaborator who has not opened the work schedule today is told to record the
   employees who worked today; opening the schedule once (any employee, any month) clears it for the day */
var GR_REMIND_H=21;
function grKey(){return "ehl.grafic."+(ME||"")}
function grOpenedToday(){try{return localStorage.getItem(grKey())===today()}catch(e){return true}}
function grMarkOpened(){try{localStorage.setItem(grKey(),today())}catch(e){}}
function grRemindDue(){return !!(ACCESS&&!isDir&&!LOCKED&&new Date().getHours()>=GR_REMIND_H&&!grOpenedToday()&&angajatiLucru().length>0)}
function grRemindNote(){return grRemindDue()?'<div class="note alert"><b>'+esc(T("gr_remind_t"))+'</b><span>'+esc(T("gr_remind"))+'</span><button type="button" class="btn sm" data-grafic="">'+icon("clock")+esc(T("a_grafic"))+'</button></div>':""}
var grRemindShown=false;
setInterval(function(){var due=grRemindDue();if(due!==grRemindShown){grRemindShown=due;if(ACCESS&&!sheetState)render()}},60*1000);
function statusNote(){
  var h=failedNote()+grRemindNote();
  if(!online)h+='<div class="note">'+esc(T("offline_note"))+'</div>';
  if(QUEUE.length)h+='<div class="note">'+esc(T("pending").replace("{n}",String(QUEUE.length)))+'</div>';
  if(online&&dbErr)h+='<div class="note">'+esc(T("offline"))+'</div>';
  else if(online&&!loaded.incasari&&!S.incasari.length)h+='<div class="note">'+esc(T("loading"))+'</div>';
  else if(online&&stale)h+='<div class="note">'+esc(T("stale"))+'</div>';
  return h;
}
/* a figure tile: icon and label on top, the amount below with its unit as quiet text */
function tile(k,v,u,cls,big,ic,sub){
  var unit=u?'<span class="u">'+esc(u)+'</span>':'';
  return '<div class="tile'+(big?" big":"")+'"><span class="k">'+(ic?'<span class="t-ic '+(cls||"")+'">'+icon(ic)+'</span>':'')+esc(k)+'</span><span class="v '+(cls||"")+'">'+v+unit+'</span>'+(sub?'<span class="t-sub">'+sub+'</span>':'')+'</div>';
}
/* what the till holds in each currency, for the till tile (the total above it is in lei at today's rates) */
/* a person's balance in each currency, for the "Soldul meu" tile */
function soldPeValute(nume){
  var C=calc(),x=C.colab.concat(C.dirs||[]).filter(function(c){return sameP(c.nume,nume)})[0];if(!x||!x.val)return "";
  return C.vals.filter(function(v){return x.mov[v]||x.val[v]}).map(function(v){return '<span class="t-cur'+(x.val[v]<0?" neg":"")+'">'+curBadge(v,false)+money(x.val[v])+' '+esc(v)+'</span>'}).join("");
}
function casaPeValute(C){
  return C.vals.map(function(v){return '<span class="t-cur'+(C.ramas[v]<0?" neg":"")+'">'+curBadge(v,false)+money(C.ramas[v])+' '+esc(v)+'</span>'}).join("");
}
/* key figures of one subject in a grid, optionally under a progress bar (share done, 0-100) and above extra rows */
function statCard(items,pct,more){
  return '<div class="card stats">'+(pct!=null?'<div class="st-prog"><i style="width:'+Math.max(0,Math.min(100,pct)).toFixed(1)+'%"></i></div>':'')
    +'<div class="st-grid" style="--n:'+(items.length===4?2:items.length)+'">'+items.map(function(it){return '<div class="st"><span class="st-k">'+esc(it[0])+'</span><span class="st-v '+(it[2]||"")+'">'+it[1]+'</span>'+(it[3]?'<span class="st-s">'+esc(it[3])+'</span>':'')+'</div>'}).join("")+'</div>'
    +(more?'<div class="rows st-more">'+more+'</div>':'')+'</div>';
}
function toneOf(nm){var h=0;String(nm||"").split("").forEach(function(ch){h=(h*31+ch.charCodeAt(0))%997});return "var(--s"+(h%6+1)+")"} /* --s7 is too dark for initials on dark cards */
function initials(nm){return String(nm||"").split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w.charAt(0)}).join("").toUpperCase()||"·"}
/* long lists show their first rows; the rest open with a button under them (the card gets .open) */
/* strict: fold even a single extra row (otherwise one extra row is simply shown) */
function moreRows(rows,limit,strict){
  limit=limit||6;if(rows.length<=limit+(strict?0:1))return rows.join("");
  return rows.slice(0,limit).join("")+'<div class="more-rows"><div class="more-in">'+rows.slice(limit).join("")+'</div></div>'
    +'<button type="button" class="more-btn" data-more="1"><span class="mb-o">'+esc(T("show_more").replace("{n}",rows.length-limit))+'</span><span class="mb-c">'+esc(T("show_less"))+'</span>'+icon("chevR")+'</button>';
}
function rowsCardMore(rows,limit,strict){
  if(!rows.length)return rowsCard(rows);
  return '<div class="card rows">'+moreRows(rows,limit,strict)+'</div>';
}
function rowsCard(rows){
  if(!rows.length)return '<div class="card"><div class="empty">'+esc(T("nothing"))+'</div></div>';
  return '<div class="card rows">'+rows.join("")+'</div>';
}
/* a labelled value row; ic/col add an icon in a tinted circle */
function r2(l,v,sub,cls,tot,ic,col){
  return '<div class="row'+(tot?" tot":"")+(ic?" ri":"")+'"'+(ic?' style="--c:'+(col||"var(--muted)")+'"':'')+'>'+(ic?'<span class="ic-badge tint">'+icon(ic)+'</span>':'')+'<span class="l">'+esc(l)+(sub?'<span class="s">'+esc(sub)+'</span>':'')+'</span><span class="r '+(cls||"")+'">'+v+'</span></div>';
}
/* a value with a bar against the largest; categories pass their colour and icon, as in the expenses card */
function barRow(l,v,max,col,ic,sub){
  var pct=max>0?Math.max(2,Math.round(v/max*100)):0;
  return '<div class="row wrap'+(ic?" ri":"")+'"'+(col?' style="--c:'+col+'"':'')+'>'+(ic?'<span class="ic-badge tint">'+icon(ic)+'</span>':'')+'<span class="l">'+esc(l)+(sub?'<span class="s">'+esc(sub)+'</span>':'')+'</span><span class="r">'+money(v)+'</span><span class="bar-wrap"><span class="bar-fill" style="width:'+pct+'%"></span></span></div>';
}

/* ---------------- overview (month picker, expenses by category, cash flow) ---------------- */
var OV={luna:curMonth()};
var FOLD={}; /* which folding blocks are open (the employees block starts closed: it grows with the firm) */
var regFilter=null; /* {col:"cheltuieli",categorie,luna} set by tapping a category in the overview */
function ymOf(r){return String(dateOf(r)||"").slice(0,7)}
function addMonths(ym,k){var y=parseInt(ym.slice(0,4),10),m=parseInt(ym.slice(5,7),10)-1+k;var d=new Date(y,m,1);return d.getFullYear()+"-"+p2(d.getMonth()+1)}
function monthsBack(n){var out=[],cur=curMonth();for(var i=n-1;i>=0;i--)out.push(addMonths(cur,-i));return out}
function shortMonth(ym){var nm=monthName(ym).split(" ")[0];return nm.slice(0,3)}
function round2(v){return Math.round((v||0)*100)/100}
var OV_CHIRIE="Chirie"; /* the pseudo-category of the rents on the expenses card */
function ovData(luna){
  var inM=function(r){return !luna||ymOf(r)===luna};
  /* rents are expenses too: they join the card as the category "Chirie" (in lei at each row's rate) */
  var outRows=function(f){return S.cheltuieli.filter(f).map(function(r){return {categorie:r.categorie,suma:n(r.suma)}})
    .concat(S.chirii.filter(f).map(function(r){return {categorie:OV_CHIRIE,suma:round2(chirieTotal(r)*n(r.curs))}}))};
  var chelt=outRows(inM),inc=S.incasari.filter(inM);
  var byCat={},bySub={};chelt.forEach(function(r){var k=catMain(r.categorie)||"—",sk=catSub(r.categorie);byCat[k]=round2((byCat[k]||0)+n(r.suma));if(sk){bySub[k]=bySub[k]||{};bySub[k][sk]=round2((bySub[k][sk]||0)+n(r.suma))}});
  var cats=Object.keys(byCat).map(function(k){var sb=bySub[k]||{};return {nume:k,val:byCat[k],slot:catSlot(k),icon:catIcon(k),
    subs:Object.keys(sb).sort(function(a,b){return sb[b]-sb[a]}).map(function(x){return x+" "+money(sb[x])})}}).sort(function(a,b){return b.val-a.val});
  var total=round2(cats.reduce(function(a,c){return a+c.val},0));
  /* at most six named segments; the tail folds into "Alte" */
  if(cats.length>7){var head=cats.slice(0,6),tail=cats.slice(6);var rest=round2(tail.reduce(function(a,c){return a+c.val},0));
    head.push({nume:T("ov_alte"),val:rest,slot:6,icon:"dots",folded:tail.map(function(c){return catLabel(c.nume)})});cats=head;}
  var incTotal=round2(inc.reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0));
  var prevLuna=luna?addMonths(luna,-1):"";
  var prev=luna?round2(outRows(function(r){return ymOf(r)===prevLuna}).reduce(function(a,r){return a+n(r.suma)},0)):0;
  var months=monthsBack(6).map(function(m){
    return {luna:m,inc:round2(S.incasari.filter(function(r){return ymOf(r)===m}).reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0)),
      out:round2(outRows(function(r){return ymOf(r)===m}).reduce(function(a,r){return a+n(r.suma)},0))};
  });
  return {cats:cats,total:total,inc:incTotal,prev:prev,months:months};
}
function fmtK(v){var a=Math.abs(v);if(a>=1e6)return fmt(v/1e6,1)+"M";if(a>=1e4)return fmt(v/1e3,0)+"k";return fmt(v,0)}
/* On wide screens the category list sits beside the donut and already shows icons and percentages,
   so the ring is drawn bare and tight; elsewhere it carries its own badges and labels. */
function donutSvg(cats,total){
  var bare=!!(WIDE_MQ&&WIDE_MQ.matches);
  /* the bare ring fills its box edge to edge (outer radius 86); the hover thickening may spill past it */
  var W=bare?172:340,H=bare?172:300;
  var cx=bare?86:170,cy=bare?86:150,r=bare?74:62,sw=bare?24:22,C=2*Math.PI*r,gap=2;
  var segs="",badges="",acc=0;
  cats.forEach(function(c){
    var f=total>0?c.val/total:0,len=Math.max(0,f*C-gap);
    segs+='<circle class="seg" cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke="var(--s'+(c.slot+1)+')" stroke-width="'+sw+'" stroke-dasharray="'+len.toFixed(2)+' '+C.toFixed(2)+'" stroke-dashoffset="'+(-acc*C).toFixed(2)+'" data-cat="'+esc(c.nume)+'" data-label="'+esc(catLabel(c.nume))+'" data-pct="'+fmt(f*100,1)+'%"><title>'+esc(catLabel(c.nume))+' · '+money(c.val)+' MDL · '+fmt(f*100,1)+'%</title></circle>';
    /* badge + percent only for slices wide enough to carry them; the rest are read from the list below */
    if(!bare&&f>=0.06){
      var a=(acc+f/2)*2*Math.PI,R=98,x=cx+R*Math.sin(a),y=cy-R*Math.cos(a);
      var lx=cx+128*Math.sin(a),ly=cy-128*Math.cos(a),anchor=Math.sin(a)>0.25?"start":(Math.sin(a)<-0.25?"end":"middle");
      badges+='<g class="badge" data-cat="'+esc(c.nume)+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><circle r="16" fill="var(--s'+(c.slot+1)+')" opacity=".16"/>'
        +'<g transform="translate(-9 -9) scale(.75)" fill="none" stroke="var(--s'+(c.slot+1)+')" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[c.icon]||ICONS.tag)+'</g></g>'
        +'<text class="pct" x="'+lx.toFixed(1)+'" y="'+(ly+4).toFixed(1)+'" text-anchor="'+anchor+'">'+fmt(f*100,1)+'%</text>';
    }
    acc+=f;
  });
  return '<svg class="donut'+(bare?' bare':'')+'" viewBox="0 0 '+W+' '+H+'"'+(bare?' preserveAspectRatio="xMaxYMid meet"':'')+' role="img" aria-label="'+esc(T("ov_chelt"))+'"><g transform="rotate(-90 '+cx+' '+cy+')">'+segs+'</g>'
    +'<text class="mid" x="'+cx+'" y="'+(cy-4)+'" text-anchor="middle">'+esc(fmtK(total))+'</text><text class="mid2" x="'+cx+'" y="'+(cy+16)+'" text-anchor="middle">MDL</text>'+badges+'</svg>';
}
/* Wide screens get a wider canvas instead of a scaled-up one, so the chart fills its card while the labels keep their size. */
var WIDE_MQ=null;try{WIDE_MQ=window.matchMedia("(min-width:1400px)")}catch(e){}
function flowSvg(months){
  var wide=!!(WIDE_MQ&&WIDE_MQ.matches);
  var W=wide?640:320,H=wide?250:130,base=H-30,gw=W/months.length,bw=wide?22:13,mx=0;
  months.forEach(function(m){mx=Math.max(mx,m.inc,m.out)});
  var sc=mx>0?(base-20)/mx:0,out="";
  function bar(x,v,s,title){var h=Math.max(v>0?3:0,v*sc),y=base-h,rr=Math.min(4,h);
    return '<path class="bar" fill="var(--s'+s+')" d="M'+x+' '+base+'V'+(y+rr)+'a'+rr+' '+rr+' 0 0 1 '+rr+' -'+rr+'h'+(bw-2*rr)+'a'+rr+' '+rr+' 0 0 1 '+rr+' '+rr+'V'+base+'z"><title>'+title+'</title></path>'}
  months.forEach(function(m,i){
    var x0=i*gw+gw/2;
    out+='<g class="mo'+(m.luna===OV.luna?" on":"")+'" data-ovluna="'+m.luna+'">'
      +'<rect class="hit" x="'+(i*gw)+'" y="0" width="'+gw+'" height="'+H+'" fill="transparent"/>'
      +bar(x0-bw-1,m.inc,3,esc(monthName(m.luna))+' · '+T("ov_in")+' '+money(m.inc))
      +bar(x0+1,m.out,2,esc(monthName(m.luna))+' · '+T("ov_out")+' '+money(m.out))
      +'<text class="ax" x="'+x0+'" y="'+(H-10)+'" text-anchor="middle">'+esc(shortMonth(m.luna))+'</text></g>';
  });
  return '<svg class="flow" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(T("ov_flux"))+'"><line class="base" x1="0" x2="'+W+'" y1="'+base+'" y2="'+base+'"/>'+out+'</svg>';
}
function colabRow(x){
  var state=x.ramas<0?T("colab_owed"):(x.ramas>0?T("colab_has"):T("colab_zero"));
  var sub=T("l_primit")+" "+money(x.primit)+" · "+T("l_cheltuit")+" "+money(x.cheltuit)+(x.proprii?" · "+T("colab_proprii")+" "+money(x.proprii):"");
  if(x.val&&x.mov){var cur=Object.keys(x.val).filter(function(v){return v!=="MDL"&&(x.mov[v]||x.val[v])});if(cur.length)sub+=" · "+cur.map(function(v){return money(x.val[v])+" "+v}).join(" · ")+" · "+money(x.val.MDL)+" MDL";}
  var tone=x.ramas<0?"neg":(x.ramas>0?"warnc":"pos");
  /* initials on a tint picked from the name, so a person keeps the same colour; the state sits right of the name */
  return '<button type="button" class="tap row person" data-colab="'+esc(x.nume)+'"><span class="av" style="--c:'+toneOf(x.nume)+'">'+esc(initials(x.nume))+'</span><span class="l"><span class="nm-row">'+esc(x.nume)+'<span class="tagc '+tone+'">'+esc(state)+'</span></span></span>'
    +'<span class="r '+tone+'">'+money(x.ramas)+'</span><span class="pm">'+esc(sub)+'</span></button>';
}
/* who received what and what they spent for the company, newest first */
function openColab(name){
  var C=calc(),x=C.colab.filter(function(c){return sameP(c.nume,name)})[0]||{nume:name,primit:0,cheltuit:0,ramas:0,transfer:0,proprii:0};
  var got=S.iesiri.filter(function(r){return r.destinatie==="Dat persoanei"&&sameP(r.persoana,name)}).sort(function(a,b){return String(b.data).localeCompare(String(a.data))});
  var spent=S.cheltuieli.filter(function(r){return r.mod==="Numerar"&&sameP(r.platitDe,name)}).sort(function(a,b){return String(b.data).localeCompare(String(a.data))});
  var gave=S.iesiri.filter(function(r){return dinAvans(r)&&sameP(r.platitDe,name)})
    .concat(S.chirii.filter(function(r){return dinAvans(r)&&r.mod==="Numerar"&&sameP(r.platitDe,name)}).map(function(r){return {col:"chirii",id:r.id,data:r.dataInceput,persoana:r.locatia,nota:r.chirias,suma:chirieTotal(r),curs:r.curs}}))
    .sort(function(a,b){return String(b.data).localeCompare(String(a.data))});
  var h='<div class="sheet"><div class="sheet-in"><div class="sheet-head"><h2>'+esc(name)+'</h2><button class="x" type="button" id="closeSheet" aria-label="'+esc(T("cancel"))+'">'+icon("x")+'</button></div>';
  h+='<div class="tiles"><div class="tile big" style="background:'+(x.ramas<0?"var(--neg)":"var(--accent)")+'"><span class="k">'+esc(x.ramas<0?T("colab_owed"):T("colab_has"))+'</span><span class="v">'+money(Math.abs(x.ramas))+'<span class="u">MDL</span></span></div>'
    +tile(T("l_primit"),money(x.primit),"MDL")+tile(T("l_cheltuit"),money(x.cheltuit),"MDL")+'</div>';
  if(x.proprii)h+='<p class="note" style="margin-top:10px">'+esc(T("colab_proprii_h").replace("{s}",money(x.proprii)))+'</p>';
  h+='<div class="sec"><h2>'+esc(T("colab_spent"))+'</h2>'+(spent.length?'<div class="card rows">'+spent.map(function(r){
    return '<button type="button" class="tap row" data-edit="cheltuieli" data-id="'+esc(r.id)+'"><span class="l">'+esc(r.descriere||catLabel(r.categorie)||"—")+'<span class="s">'+esc([r.data,catLabel(r.categorie),r.proiect,r.sursa==="Proprii"?T("src_proprii_short"):""].filter(Boolean).join(" · "))+'</span></span><span class="r neg">'+money(n(r.suma))+'</span></button>';
  }).join("")+'</div>':'<div class="card"><div class="empty">'+esc(T("nothing"))+'</div></div>')+'</div>';
  var trs=S.cheltuieli.filter(function(r){return r.mod==="Transfer"&&sameP(r.platitDe,name)}).sort(function(a,b){return String(b.data).localeCompare(String(a.data))});
  if(trs.length)h+='<div class="sec"><h2>'+esc(T("colab_tr"))+'</h2><div class="card rows">'+trs.map(function(r){
    var pt=pentruOf(r);
    return '<button type="button" class="tap row" data-edit="cheltuieli" data-id="'+esc(r.id)+'"><span class="l">'+esc(r.descriere||catLabel(r.categorie)||"—")+'<span class="s">'+esc([r.data,catLabel(r.categorie),pt==="Proiect"?r.proiect:(pt==="EHL"?T("pt_ehl"):T("pt_alte"))].filter(Boolean).join(" · "))+'</span></span><span class="r neg">'+money(n(r.suma))+'</span></button>';
  }).join("")+r2(T("l_total"),money(trs.reduce(function(a,r){return a+n(r.suma)},0)),null,"neg",1)+'</div></div>';
  if(gave.length)h+='<div class="sec"><h2>'+esc(T("colab_gave"))+'</h2><div class="card rows">'+gave.map(function(r){
    return '<button type="button" class="tap row" data-edit="'+(r.col||"iesiri")+'" data-id="'+esc(r.id)+'"><span class="l">'+esc(r.col==="chirii"?T("a_chirie"):REGDEF.iesiri.main(r))+'<span class="s">'+esc([r.data,r.persoana,r.nota].filter(Boolean).join(" · "))+'</span></span><span class="r neg">'+money(n(r.suma)*n(r.curs))+'</span></button>';
  }).join("")+'</div></div>';
  h+='<div class="sec"><h2>'+esc(T("colab_got"))+'</h2>'+(got.length?'<div class="card rows">'+got.map(function(r){
    return '<button type="button" class="tap row" data-edit="iesiri" data-id="'+esc(r.id)+'"><span class="l">'+esc(r.nota||T("d_pers"))+'<span class="s">'+esc(r.data+(r.valuta!=="MDL"?" · "+money(n(r.suma))+" "+r.valuta+" × "+r.curs:""))+'</span></span><span class="r pos">'+money(n(r.suma)*n(r.curs))+'</span></button>';
  }).join("")+'</div>':'<div class="card"><div class="empty">'+esc(T("nothing"))+'</div></div>')+'</div></div></div>';
  sheetState=null;sheetOpened();$("#sheet").innerHTML=h;document.body.style.overflow="hidden";
}
function vMyBalance(){
  var me=meName();if(!me)return "";
  var C=calc(),x=C.colab.filter(function(c){return sameP(c.nume,me)})[0];
  if(!x)return "";
  return '<div class="sec"><h2>'+esc(T("my_sold"))+'</h2><div class="card rows">'+colabRow(x)+'</div><p class="hint" style="margin-top:6px">'+esc(T("my_sold_h"))+'</p></div>';
}
function cap(s){s=String(s||"");return s.charAt(0).toUpperCase()+s.slice(1)}
function vOverview(){
  var d=ovData(OV.luna);
  var months=monthsBack(6);
  /* month strip: short name, year, and a bar for that month's spending against the costliest of the six */
  var outMax=0;d.months.forEach(function(x){outMax=Math.max(outMax,x.out)});
  var h='<div class="sec"><div class="mbar"><div class="mstrip">'+d.months.map(function(x){
    var sm=monthName(x.luna).split(" ")[0],pct=outMax>0?Math.max(x.out>0?6:0,x.out/outMax*100):0;
    return '<button type="button" class="mp" data-ovluna="'+x.luna+'" title="'+esc(monthName(x.luna))+' · '+money(x.out)+' MDL"'+(OV.luna===x.luna?' aria-pressed="true"':'')+'>'
      +'<span class="mp-m">'+esc(sm.charAt(0).toUpperCase()+sm.slice(1))+'</span><span class="mp-ms">'+esc(cap(shortMonth(x.luna)))+'</span><span class="mp-y">'+x.luna.slice(0,4)+'</span>'
      +'<span class="mp-bar"><i style="width:'+pct.toFixed(1)+'%"></i></span></button>';
  }).join("")+'</div><button type="button" class="mp-all" data-ovluna=""'+(OV.luna===""?' aria-pressed="true"':'')+'>'+icon("calendar")+'<span class="mpa-l">'+esc(T("ov_all"))+'</span><span class="mpa-s">'+esc(T("ov_all_s"))+'</span></button></div>'
    +'<div class="mcap"><span class="mcap-p">'+esc(T("per_lbl"))+': <b>'+esc(OV.luna?cap(monthName(OV.luna)):T("ov_all"))+'</b></span>'
    +'<span class="mcap-v">'+esc(T("t_incasari"))+' <b class="pos">+'+money(d.inc)+'</b></span><span class="mcap-v">'+esc(T("t_cheltuieli"))+' <b class="neg">−'+money(d.total)+'</b></span></div></div>';
  h+='<div class="dash-ov">';
  /* expenses card */
  var delta="";
  if(OV.luna&&d.prev>0){var p=(d.total-d.prev)/d.prev*100;delta='<span class="delta '+(p>0?"neg":"pos")+'">'+icon(p>0?"arrowUp":"arrowDown")+fmt(Math.abs(p),0)+'%</span> <span class="hint">'+esc(T("ov_vs"))+'</span>';}
  h+='<div class="sec"><div class="card pad ov ov-exp'+(OV.more?" open":"")+'"><button type="button" class="ov-head" data-cat="">'+esc(T("ov_chelt"))+icon("chevR")+'</button>'
    +'<div class="hero neg">−'+money(d.total)+' <span class="u">MDL</span></div><div class="ov-delta">'+delta+'</div>';
  if(!d.cats.length)h+='<div class="empty">'+esc(T("ov_none"))+'</div>';
  else{
    h+='<div class="ov-body"><div class="ov-chart">'+donutSvg(d.cats,d.total);
    h+='<div class="legend">'+d.cats.map(function(c){
      return '<button type="button" class="lg" data-cat="'+esc(c.nume)+'"><span class="sw" style="background:var(--s'+(c.slot+1)+')"></span>'+esc(catLabel(c.nume))+'</button>';
    }).join("")+'</div></div>';
    h+='<div class="ov-fold"><div class="ov-fold-in"><div class="rows ov-list">'+d.cats.map(function(c){
      var pct=d.total?c.val/d.total*100:0;
      /* .share is the slice's share as a bar in its own colour; shown only where the list sits beside the donut */
      return '<button type="button" class="tap row" data-cat="'+esc(c.nume)+'" style="--c:var(--s'+(c.slot+1)+')"'+(c.folded?' title="'+esc(catLabel(c.nume)+": "+c.folded.join(", "))+'"':'')+'><span class="ic-badge" style="color:var(--s'+(c.slot+1)+')">'+icon(c.icon)+'</span><span class="l">'+esc(catLabel(c.nume))+(c.folded?'<span class="s">'+esc(c.folded.join(", "))+'</span>':(c.subs&&c.subs.length?'<span class="s">'+esc(c.subs.join(" · "))+'</span>':''))+'</span><span class="r">'+money(c.val)+'<span class="s">'+fmt(pct,1)+'%</span></span><span class="share"><i style="width:'+Math.max(2,pct).toFixed(1)+'%"></i></span></button>';
    }).join("")+'</div></div></div>'
      +'<button type="button" class="more-btn ov-more" data-more="1"><span class="mb-o">'+esc(T("ov_more"))+'</span><span class="mb-c">'+esc(T("show_less"))+'</span>'+icon("chevR")+'</button></div>';
  }
  h+='</div></div>';
  /* cash flow card */
  var net=round2(d.inc-d.total);
  h+='<div class="sec"><div class="card pad ov"><div class="ov-head">'+esc(T("ov_flux"))+'</div>'
    +'<div class="hero '+(net<0?"neg":"")+'">'+money(net)+' <span class="u">MDL</span></div>'
    +'<div class="pills"><span class="pill-in"><b>'+icon("plus")+'</b> '+money(d.inc)+'</span><span class="pill-out"><b>'+icon("minus")+'</b> '+money(d.total)+'</span></div>'
    +flowSvg(d.months)
    +'<div class="legend"><span class="lg"><span class="sw" style="background:var(--s3)"></span>'+esc(T("ov_in"))+'</span><span class="lg"><span class="sw" style="background:var(--s2)"></span>'+esc(T("ov_out"))+'</span></div>'
    +'</div></div>';
  h+='</div>';
  return h;
}

/* The collaborator's own dashboard: the director's look, built only from what is his — the money the director gave
   him, what he spent (cash, own money, by transfer) and every operation he entered. The firm's till, account, clients
   and founders are not his to see (the server does not send them to him either). */
function mineView(fn){
  var me=meName(),cols=["incasari","cheltuieli","iesiri","chirii","contracte","imprumuturi","schimburi","angajati","istoric","pontaj"],keep={};
  cols.forEach(function(c){keep[c]=S[c]});
  var adv=keep.iesiri.filter(function(r){return r.destinatie==="Dat persoanei"&&sameP(r.persoana,me)});
  S.cheltuieli=keep.cheltuieli.filter(function(r){return r.by===ME||sameP(r.platitDe,me)});
  /* what he received plays the part of the incomes in the month chart */
  S.incasari=adv.map(function(r){return {id:r.id,data:r.data,suma:r.suma,curs:r.curs,valuta:r.valuta,mod:"Numerar",client:"",proiect:"",ts:r.ts}});
  var gave=keep.iesiri.filter(function(r){return dinAvans(r)&&sameP(r.platitDe,me)});
  S.iesiri=adv.concat(gave);S.contracte=[];S.imprumuturi=[];S.istoric=keep.istoric;S.schimburi=keep.schimburi.filter(function(r){return sameP(r.persoana,me)}); /* salaries and employees are shared */
  ["chirii","pontaj"].forEach(function(c){S[c]=keep[c].filter(function(r){return r.by===ME})});
  try{return fn(me,adv)}finally{cols.forEach(function(c){S[c]=keep[c]})}
}
/* what the collaborator's employees are at: for the chosen month the hours from the schedule, the timesheet's worth,
   what was paid and what is still due; and the rest over every month. A tap opens the employee's schedule. */
function vAngajatiiMei(){
  var dn=directorNames(),mine=S.angajati.filter(function(a){return a.status!=="Inactiv"&&!dn.some(function(x){return sameP(x,a.nume)})});
  if(!mine.length)return "";
  var luna=OV.luna||curMonth();
  var open=!!FOLD.ang,rows=[],dueAll=0;
  /* the header folds the list: closed it says how many and what is still due, open it lists them (five at a time) */
  var h='<div class="sec sec-wide sec-late"><div class="sec-h"><button type="button" class="fold-h" data-fold="ang" aria-expanded="'+(open?"true":"false")+'"><h2>'+esc(T("op_ang"))+' <span class="cnt">'+mine.length+'</span></h2>'+icon("chevR")+'</button><div class="sec-act"><button class="btn sm" type="button" data-form="angajati">'+icon("userplus")+esc(T("a_ang"))+'</button></div></div>';
  mine.forEach(function(a){
    var L=pontajLuna(a.nume,luna),sal=salariuLa(a.nume,today()),gt=L.g,tot=L.tot,paid=L.paid,due=L.due,aut=zilePeAutorTxt(a.nume,luna),pl=platitDeTxt(a.nume,luna);
    var line1=T("f_salariu")+" "+money(sal)+" · "+monthName(luna)+": "+fmt(gt.z1+gt.z2,2)+" "+T("gr_zile_s")+(aut?" ("+aut+")":"");
    var line2=(gt.n||L.complet||L.extra>0||paid>0)?(T("tot")+" "+money(tot)+(L.extra>0?" ("+T("f_extra")+" "+money(L.extra)+")":"")+" · "+T("l_plata")+" "+money(paid)+(pl?" ("+pl+")":"")):T("pontaj_lipsa");
    dueAll=round2(dueAll+due);
    rows.push('<div class="row wrap user-row"><span class="l">'+esc(a.nume)+'<span class="s">'+esc(line1)+'</span><span class="s">'+esc(line2)+'</span></span><span class="r '+(due>0?"warnc":"pos")+'">'+money(due)+'</span>'
      +'<button type="button" class="btn sm ghost" data-grafic="'+esc(a.nume)+'" title="'+esc(T("a_grafic"))+'">'+icon("clock")+'</button>'
      +'<button type="button" class="btn sm ghost" data-edit="angajati" data-id="'+esc(a.id)+'" title="'+esc(T("a_ang"))+'">'+icon("gear")+'</button></div>');
  });
  if(!open)return h+'<p class="hint fold-sum">'+esc(mine.length+" "+T("ang_n")+" · "+monthName(OV.luna||curMonth())+" · "+T("l_rest")+" "+money(dueAll)+" MDL")+'</p></div>';
  var offMine=S.angajati.filter(function(a){return a.status==="Inactiv"}).map(function(a){return a.nume});
  return h+rowsCardMore(rows,5,true)+(offMine.length?'<p class="hint" style="margin-top:8px">'+esc(T("inact_lbl")+": "+offMine.join(", "))+'</p>':'')+'<p class="hint" style="margin-top:8px">'+esc(T("op_ang_h"))+'</p></div>';
}
function vPanouOp(){
  return statusNote()+mineView(function(me,adv){
    var C=calc(),sumBy=function(f){var t=0;S.cheltuieli.forEach(function(r){t+=f(r)||0});return round2(t)};
    var primit=round2(adv.reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0));
    var chn=sumBy(function(r){return r.mod==="Numerar"&&sameP(r.platitDe,me)?n(r.suma):0});
    var prop=sumBy(function(r){return r.mod==="Numerar"&&r.sursa==="Proprii"&&sameP(r.platitDe,me)?n(r.suma):0});
    var tr=sumBy(function(r){return r.mod==="Transfer"?n(r.suma):0});
    var dat=round2(S.iesiri.filter(dinAvans).reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0));
    var sold=soldAvans(me); /* taken minus everything paid out of the account, cash rents included: the same figure as on the EHL tab */
    var h=vOverview()+'<div class="dash-grid">';
    h+='<div class="sec sec-wide"><div class="tiles">'
      +tile(sold<0?T("colab_owed"):T("my_sold"),money(Math.abs(sold)),"MDL",sold<0?"neg":"",1,"wallet",soldPeValute(me))
      +tile(T(isDir?"op_primit_dir":"op_primit"),money(primit),"MDL","pos",0,"inArrow")
      +tile(T("op_chn"),money(chn),"MDL","neg",0,"cash")
      +(dat>0?tile(T("op_dat"),money(dat),"MDL","neg",0,"send"):"")
      +tile(T("op_prop"),money(prop),"MDL","",0,"user")
      +tile(T("op_tr"),money(tr),"MDL","",0,"bank")
      +'</div></div>';
    /* the categories live in the expenses frame on top (vOverview), not in a second block down here */
    if(C.cheltTotal>0){var mxp=Math.max.apply(null,C.perPentru.map(function(x){return x.val}));
      h+='<div class="sec"><h2>'+esc(T("s_pentru"))+'</h2>'+rowsCard(C.perPentru.map(function(x){
        return barRow(T(x.k==="Proiect"?"pt_proiecte":(x.k==="EHL"?"pt_ehl":"pt_alte")),x.val,mxp,x.k==="Proiect"?"var(--s1)":(x.k==="EHL"?"var(--s3)":"var(--muted)"),x.k==="Proiect"?"folder":(x.k==="EHL"?"wallet":"dots"));
      }))+'</div>';}
    var byP={};S.cheltuieli.forEach(function(r){if(pentruOf(r)==="Proiect"&&String(r.proiect||"").trim()){var k=String(r.proiect).trim();byP[k]=round2((byP[k]||0)+n(r.suma))}});
    var pj=Object.keys(byP).map(function(k){return {nume:k,val:byP[k]}}).sort(function(a,b){return b.val-a.val});
    if(pj.length)h+='<div class="sec"><h2>'+esc(T("op_proj"))+'</h2>'+rowsCardMore(pj.map(function(x){return barRow(x.nume,x.val,pj[0].val,"var(--s1)","folder")}),5,true)+'</div>';
    if(adv.length)h+='<div class="sec"><h2>'+esc(T(isDir?"op_adv_dir":"op_adv"))+'</h2>'+rowsCardMore(adv.slice().sort(function(a,b){return String(b.data).localeCompare(String(a.data))}).map(function(r){
      return r2(r.nota||T("d_pers"),money(n(r.suma)*n(r.curs)),shortDate(r.data)+(r.valuta!=="MDL"?" · "+money(n(r.suma))+" "+r.valuta+" × "+r.curs:""),"pos",0,"inArrow","var(--pos)");
    }),5,true)+'</div>';
    h+=vAngajatiiMei(); /* low on the page: the list grows with the firm */
    return h+mineList(15)+'</div>';
  });
}
/* Every movement of money in the firm, newest first: where it came from, where it went, who recorded it. The EHL
   account sees the whole chain — till → administrator → collaborator → expense — in one place; a tap opens the row. */
function vTranzactii(){
  var rows=[];
  var who=function(r){return byName(r)||""};
  S.incasari.forEach(function(r){rows.push({col:"incasari",id:r.id,data:r.data,ts:r.ts,t:T("a_inc")+" · "+(r.client||"—")+(r.proiect?" · "+r.proiect:""),s:[shortDate(r.data),(r.mod==="Transfer"?T("tz_cont"):T("din_casa_ehl")),r.descriere,who(r)?T("by_lbl")+" "+who(r):""],val:round2(n(r.suma)*n(r.curs)),sign:"pos",amt:money(n(r.suma))+" "+(r.valuta||"MDL")})});
  S.iesiri.forEach(function(r){var from=dinAvans(r)?r.platitDe:T("din_casa_ehl"),to=REGDEF.iesiri.main(r)+(r.persoana?" · "+r.persoana:"");
    rows.push({col:"iesiri",id:r.id,data:r.data,ts:r.ts,t:from+" → "+to,s:[shortDate(r.data),r.luna?monthName(r.luna):"",r.nota,who(r)?T("by_lbl")+" "+who(r):""],val:round2(n(r.suma)*n(r.curs)),sign:dinAvans(r)?"warnc":"neg",amt:money(n(r.suma))+" "+(r.valuta||"MDL")})});
  S.cheltuieli.forEach(function(r){var pt=pentruOf(r);rows.push({col:"cheltuieli",id:r.id,data:r.data,ts:r.ts,t:(r.mod==="Transfer"?T("tz_cont"):(r.platitDe||"—"))+" → "+(r.descriere||catLabel(r.categorie)||"—"),s:[shortDate(r.data),catLabel(r.categorie),pt==="Proiect"?r.proiect:(pt==="EHL"?T("pt_ehl"):T("pt_alte")),who(r)?T("by_lbl")+" "+who(r):""],val:n(r.suma),sign:"neg",amt:money(n(r.suma))+" MDL"})});
  S.chirii.forEach(function(r){rows.push({col:"chirii",id:r.id,data:r.dataInceput,ts:r.ts,t:(r.mod==="Transfer"?T("tz_cont"):(dinAvans(r)?r.platitDe:T("din_casa_ehl")))+" → "+T("a_chirie")+" · "+(r.locatia||"—"),s:[shortDate(r.dataInceput),r.chirias,who(r)?T("by_lbl")+" "+who(r):""],val:round2(chirieTotal(r)*n(r.curs)),sign:"neg",amt:money(chirieTotal(r))+" "+(r.valuta||"MDL")})});
  S.schimburi.forEach(function(r){rows.push({col:"schimburi",id:r.id,data:r.data,ts:r.ts,t:(r.persoana||"—")+" · "+T("a_schimb"),s:[shortDate(r.data),money(n(r.sumaDin))+" "+(r.valutaDin||"")+" → "+money(n(r.sumaIn))+" "+(r.valutaIn||""),r.nota,who(r)?T("by_lbl")+" "+who(r):""],val:round2(n(r.sumaIn)*rateAzi(r.valutaIn)),sign:"warnc",amt:money(n(r.sumaIn))+" "+(r.valutaIn||"MDL")})});
  S.imprumuturi.forEach(function(r){rows.push({col:"imprumuturi",id:r.id,data:r.data,ts:r.ts,t:T("a_impr")+" → "+(r.persoana||"—"),s:[shortDate(r.data),r.status==="Achitat"?T("achitat"):T("neachitat"),r.nota,who(r)?T("by_lbl")+" "+who(r):""],val:imprLei(r),sign:"warnc",amt:money(n(r.suma))+" "+esc(r.valuta||"MDL")})});
  if(!rows.length)return "";
  rows.sort(function(a,b){return String(b.data||"").localeCompare(String(a.data||""))||String(b.ts||"").localeCompare(String(a.ts||""))});
  return '<div class="sec sec-wide sec-last"><h2>'+esc(T("s_tranz"))+' <span class="cnt">'+rows.length+'</span></h2>'+rowsCardMore(rows.map(function(x){
    return '<button type="button" class="tap row" data-edit="'+x.col+'" data-id="'+esc(x.id)+'"><span class="l">'+esc(x.t)+'<span class="s">'+esc(x.s.filter(Boolean).join(" · "))+'</span></span><span class="r '+x.sign+'">'+esc(x.amt)+'</span></button>';
  }),30,true)+'<p class="hint" style="margin-top:8px">'+esc(T("s_tranz_h"))+'</p></div>';
}
/* The history of one record, under its form: every journal entry that names it — who created it and when, who
   changed which fields from what to what, who deleted it. Directors only (the journal is theirs). */
function loadRecHist(col,id){
  var box=$("#rec-hist");if(!box||!PB||!isDir)return;
  PB.collection("jurnal").getFullList({batch:500,requestKey:null,sort:"created",filter:'ref = "'+String(id).replace(/"/g,"")+'"'}).then(function(items){
    box=$("#rec-hist");if(!box||!sheetState||sheetState.id!==id)return;
    var skip={id:1,by:1,ts:1,created:1,updated:1,collectionId:1,collectionName:1,expand:1,codFondator:1,codEHL:1,din:1};
    var prev=null,rows=items.map(function(e){
      var d=e.data;if(typeof d==="string"){try{d=JSON.parse(d)}catch(x){d={}}}d=d||{};
      var what="";
      if(e.act==="edit"&&prev){var ch=[];Object.keys(d).forEach(function(k){if(skip[k])return;var a=prev[k],b=d[k];if(String(a==null?"":a)!==String(b==null?"":b))ch.push(k+": "+(a==null||a===""?"—":a)+" → "+(b==null||b===""?"—":b))});what=ch.length?ch.join("; "):T("j_nochange")}
      else if(e.act==="del")what=T("j_del");
      else what=T("j_add")+(d.suma!=null?" · "+money(n(d.suma))+" "+(d.valuta||"MDL"):"");
      if(e.act!=="del")prev=d;
      return '<div class="row"><span class="l">'+esc(what)+'<span class="s">'+esc(localTs(e.created)+(e.nume?" · "+e.nume:""))+'</span></span></div>';
    });
    box.innerHTML='<h2>'+esc(T("rec_hist"))+'</h2>'+(rows.length?'<div class="card rows">'+rows.join("")+'</div>':'<div class="card"><div class="empty">'+esc(T("rec_hist_none"))+'</div></div>');
  }).catch(function(){});
}
/* everything this user entered, newest first (the full list is on "Ale mele") */
function mineList(max){
  var all=[];
  COLS.forEach(function(c){if(!REGDEF[c]&&c!=="pontaj"&&c!=="angajati")return;S[c].forEach(function(r){if(ME&&r.by===ME&&!(c==="angajati"&&r.status==="Inactiv"))all.push({c:c,r:r})})});
  if(!all.length)return "";
  all.sort(function(a,b){return String(b.r.ts||"").localeCompare(String(a.r.ts||""))});
  return '<div class="sec sec-wide sec-last"><h2>'+esc(T("mine_t"))+' <span class="cnt">'+all.length+'</span></h2><div class="card rows">'+all.slice(0,max).map(function(x){
    var def=REGDEF[x.c],main=def?def.main(x.r):(x.r.nume||x.r.angajat||"—"),amt=def?def.amt(x.r):"",meta=def?def.meta(x.r):(x.r.luna?monthName(x.r.luna):"");
    return '<button type="button" class="tap row" data-edit="'+x.c+'" data-id="'+esc(x.r.id)+'"><span class="l">'+esc(main)+'<span class="s">'+esc([T(FORMS[x.c]?FORMS[x.c].title:""),meta].filter(Boolean).join(" · "))+'</span></span><span class="r">'+amt+'</span></button>';
  }).join("")+'</div>'+(all.length>max?'<button type="button" class="btn ghost" data-view="mine" style="margin-top:10px">'+esc(T("nav_mine"))+' ('+all.length+')</button>':'')+'</div>';
}
function vPanou(){return vPanouOp()} /* everyone's "Panou" is his own account; the firm-wide view is the EHL tab */
function vPanouEHL(){
  if(!isDir)return vPanouOp();
  var C=calc(),h=statusNote();
  h+=vOverview();
  h+='<div class="dash-grid">';
  h+='<div class="sec sec-wide"><div class="tiles">'
    +tile(T("t_total"),money(C.totalFirma),"MDL","",1,"wallet")
    +tile(T("t_casa"),money(C.casaMDL),"MDL","",0,"cash",casaPeValute(C))
    +tile(T("t_cont"),money(C.contMDL),"MDL",C.contMDL<0?"neg":"",0,"bank")
    +tile(T("t_incasari"),money(C.incTotal),"MDL","pos",0,"inArrow")
    +tile(T("t_cheltuieli"),money(C.cheltTotal),"MDL","neg",0,"outArrow")
    +'</div></div>';

  /* the account is below zero: how much has to be put on it, and the payments that took it there */
  var cd=contDeficit(C);
  if(cd)h+='<div class="sec sec-wide sec-cont"><h2>'+esc(T("s_cont_minus"))+'</h2>'+statCard([[T("l_cont_achitat"),money(cd.lipsa)+' <span class="u">MDL</span>',"neg"]],null,cd.rows.map(function(x){
    return '<button type="button" class="tap row" data-edit="'+x.col+'" data-id="'+esc(x.id)+'"><span class="l">'+esc(x.t)+'<span class="s">'+esc([shortDate(x.data),x.s].filter(Boolean).join(" · "))+'</span></span><span class="r neg">'+money(x.val)+'</span></button>';
  }).join(""))+'<p class="hint" style="margin-top:8px">'+esc(T("cont_minus_h"))+'</p></div>';

  /* a report of its own, right under the totals: what the firm owes each founder for the money he put in */
  if(C.fond.length)h+='<div class="sec sec-wide sec-fond"><h2>'+esc(T("s_fond"))+'</h2>'+statCard([
    [T("l_fond_dat"),money(C.fondDatorie)+' <span class="u">MDL</span>',C.fondDatorie>0?"warnc":""],[T("l_fond_primit"),money(C.fondPrimit)],[T("l_restituit"),money(C.fondRest),"pos"]
  ],C.fondPrimit>0?C.fondRest/C.fondPrimit*100:null,C.fond.map(function(f){
    return r2(f.nume,money(f.datorie),T("l_primit")+" "+money(f.primit)+" · "+T("l_restituit")+" "+money(f.restituit),f.datorie>0?"warnc":"pos",0,"user","var(--s5)");
  }).join(""))+'<p class="hint" style="margin-top:8px">'+esc(T("fond_h"))+'</p></div>';

  h+='<div class="sec"><h2>'+esc(T("s_bani"))+'</h2>'+rowsCard([
    r2(T("l_num"),money(C.incNumMDL),null,"",0,"cash","var(--pos)"),r2(T("l_tr"),money(C.incTrMDL),null,"",0,"cardIc","var(--pos)"),
    r2(T("l_fond_primit"),money(C.fondPrimit),null,"",0,"user","var(--s5)"),
    r2(T("l_chnum"),money(C.cheltNum),null,"",0,"cash","var(--neg)"),r2(T("l_chtr"),money(C.cheltTr),null,"",0,"cardIc","var(--neg)"),
    r2(T("l_salplatit"),money(C.salPlatitMDL),null,"",0,"users","var(--s1)"),r2(T("l_avans"),money(C.avansMDL),null,"",0,"send","var(--s6)"),
    r2(T("l_depus"),money(C.depusMDL),null,"",0,"bank","var(--s3)"),r2(T("l_chirii"),money(C.chiriiMDL),null,"",0,"home","var(--s4)"),
    r2(T("l_justif"),money(C.colabRamas),null,C.colabRamas>0?"warnc":"",0,"clock","var(--warn)"),
    r2(T("t_total"),money(C.totalFirma),null,"",1,"wallet","var(--accent)")
  ])+'</div>';

  /* the administrators' accounts: what each director took from the EHL till, what he handed on or spent, what he still holds */
  if(C.dirs.length)h+='<div class="sec"><h2>'+esc(T("s_dirs"))+'</h2><div class="card rows">'+C.dirs.map(function(x){return colabRow(x)}).join("")+'</div><p class="hint" style="margin-top:8px">'+esc(T("s_dirs_h"))+'</p></div>';
  if(C.colab.length)h+='<div class="sec"><h2>'+esc(T("s_colab"))+'</h2><div class="card rows">'+C.colab.map(function(x){return colabRow(x)}).join("")+'</div></div>';
  /* every expense the collaborators recorded, newest first: the director sees them all without opening the registers */
  var byColab=function(r){var u=S.utilizatori.filter(function(x){return x.id===r.by})[0];return !!(u&&u.rol!=="Director")};
  var colabExp=S.cheltuieli.filter(byColab).map(function(r){var pt=pentruOf(r);return {col:"cheltuieli",id:r.id,data:r.data,ts:r.ts,t:r.descriere||catLabel(r.categorie)||"—",s:[shortDate(r.data),byName(r),catLabel(r.categorie),pt==="Proiect"?r.proiect:(pt==="EHL"?T("pt_ehl"):T("pt_alte")),r.mod==="Transfer"?T("transfer"):T("numerar")],val:n(r.suma)}})
    .concat(S.chirii.filter(byColab).map(function(r){return {col:"chirii",id:r.id,data:r.dataInceput,ts:r.ts,t:T("a_chirie")+" · "+(r.locatia||"—"),s:[shortDate(r.dataInceput),byName(r),r.chirias,r.mod==="Transfer"?T("transfer"):T("numerar")],val:round2(chirieTotal(r)*n(r.curs))}}))
    .sort(function(a,b){return String(b.data).localeCompare(String(a.data))||String(b.ts||"").localeCompare(String(a.ts||""))});
  if(colabExp.length)h+='<div class="sec"><h2>'+esc(T("s_colab_exp"))+' <span class="cnt">'+colabExp.length+'</span></h2>'+rowsCardMore(colabExp.map(function(x){
    return '<button type="button" class="tap row" data-edit="'+x.col+'" data-id="'+esc(x.id)+'"><span class="l">'+esc(x.t)+'<span class="s">'+esc(x.s.filter(Boolean).join(" · "))+'</span></span><span class="r neg">'+money(x.val)+'</span></button>';
  }),30,true)+'</div>'; /* the first thirty at once, the rest behind the button */
  /* money taken from the bank by transfer: who paid, how much; a tap lists what it was spent on */
  if(C.trPers.length)h+='<div class="sec"><h2>'+esc(T("s_tr"))+'</h2><div class="card rows">'+C.trPers.map(function(x){
    return '<button type="button" class="tap row person" data-colab="'+esc(x.nume)+'"><span class="av" style="--c:'+toneOf(x.nume)+'">'+esc(initials(x.nume))+'</span><span class="l"><span class="nm-row">'+esc(x.nume)+'</span></span>'
      +'<span class="r neg">'+money(x.val)+'</span><span class="pm">'+esc(T("n_rec").replace("{n}",x.n))+'</span></button>';
  }).join("")+r2(T("l_total"),money(C.cheltTr),null,"neg",1)+'</div><p class="hint" style="margin-top:8px">'+esc(T("tr_h"))+'</p></div>';

  if(C.perClient.length)h+='<div class="sec"><h2>'+esc(T("s_client"))+'</h2>'+rowsCardMore(C.perClient.map(function(x){
    return r2(x.nume,money(x.sold),T("t_incasari")+" "+money(x.inc)+" · "+T("t_cheltuieli")+" "+money(x.chelt),x.sold<0?"neg":"pos");
  }),5,true)+'</div>';

  /* the categories (salaries among them) are in the expenses frame on top; no second list here */
  /* expenses by what they were for: projects, the firm itself, other */
  if(C.cheltTotal>0){var mxp=Math.max.apply(null,C.perPentru.map(function(x){return x.val}));
    h+='<div class="sec"><h2>'+esc(T("s_pentru"))+'</h2>'+rowsCard(C.perPentru.map(function(x){
      return barRow(T(x.k==="Proiect"?"pt_proiecte":(x.k==="EHL"?"pt_ehl":"pt_alte")),x.val,mxp,x.k==="Proiect"?"var(--s1)":(x.k==="EHL"?"var(--s3)":"var(--muted)"),x.k==="Proiect"?"folder":(x.k==="EHL"?"wallet":"dots"));
    }))+'</div>';}
  h+='<div class="sec"><h2>'+esc(T("s_proiecte"))+'</h2>';
  if(!C.proiecte.length){
    h+='<div class="card"><div class="empty"><b>'+esc(T("proj_none"))+'</b>'+esc(T("proj_none_d"))+'</div></div>';
  }else{
    h+='<div class="card rows">'+moreRows(C.proiecte.map(function(p){
      var over=p.buget>0&&p.chelt>p.buget;
      var sub=[p.client,p.resp.length?p.resp.join(", "):T("p_niciunul"),p.status!=="Activ"?(p.status==="Pauză"?T("st_pauza"):T("st_final")):""].filter(Boolean).join(" · ");
      var bar=p.buget>0?'<span class="bar-wrap"><span class="bar-fill" style="width:'+Math.max(2,Math.round(p.pct))+'%;background:'+(over?"var(--neg)":"var(--accent)")+'"></span></span>':"";
      var right=p.buget>0?money(p.rest):money(p.chelt);
      var note=p.buget>0?(T("p_cheltuit")+" "+money(p.chelt)+" / "+money(p.buget)):(T("p_cheltuit")+" "+money(p.chelt)+" · "+T("p_incasat")+" "+money(p.inc));
      /* the contract and the client's payments: cash and transfer apart, and what is still to come */
      var pay=p.contractEUR>0
        ?[T("f_contract")+" "+money(p.contractEUR)+" EUR",T("p_cash")+" "+money(p.incCashEur)+" / "+money(p.contractCash)+" EUR",T("p_tr")+" "+money(p.incTrEur)+" / "+money(p.contractTransfer)+" EUR",p.aditEur>0?T("f_aditional")+" "+money(p.aditEur)+" EUR":"",T("p_ramas")+" "+money(p.ramasEur)+" EUR"].filter(Boolean).join(" · ")
        :((p.contract||p.adaug||p.incCash||p.incTr)?[p.contract?T("f_contract")+" "+money(p.contract):"",p.adaug?T("p_adaug")+" "+money(p.adaug):"",T("p_cash")+" "+money(p.incCash),T("p_tr")+" "+money(p.incTr),(p.contract||p.adaug)?T("p_ramas")+" "+money(p.ramasContract):""].filter(Boolean).join(" · "):"");
      return '<button type="button" class="tap row wrap" data-edit="proiecte" data-id="'+esc(p.id)+'">'
        +'<span class="l">'+esc(p.nume)+'<span class="s">'+esc(sub)+'</span><span class="s">'+esc(note)+'</span>'+(pay?'<span class="s">'+esc(pay)+'</span>':'')+'</span>'
        +'<span class="r '+(over?"neg":(p.buget>0?"pos":""))+'">'+right+'</span>'+bar+'</button>';
    }),5,true)+'</div>';
  }
  h+='</div>';
  if(C.perProiect.length){var mp=C.perProiect[0].val;
    h+='<div class="sec"><h2>'+esc(T("p_alte"))+'</h2>'+rowsCardMore(C.perProiect.map(function(x){return barRow(x.nume,x.val,mp)}))+'</div>';}

  if(C.contracte.length)h+='<div class="sec"><h2>'+esc(T("s_contr"))+'</h2>'+statCard([
    [T("l_valcontr"),money(C.contrVal)],[T("l_incas"),money(C.contrInc),"pos"],
    [T("l_ramas"),money(C.contrRamas),C.contrRamas>0?"warnc":""],[T("l_procent"),fmt(C.contrPct,1)+"%"]
  ],C.contrPct)+'</div>';

  /* salaries are a category of the expenses frame on top; their month-by-month card stays on the Salarii register tab */

  if(S.imprumuturi.length)h+='<div class="sec"><h2>'+esc(T("s_impr"))+'</h2>'+statCard([
    [T("l_imprtot"),money(C.imprTotal)],[T("l_restituit"),money(C.imprRestituit),"pos"],
    [T("l_derecup"),money(C.imprRamas),C.imprRamas>0?"warnc":"",C.imprNeachitate+" ×"],[T("l_restante"),String(C.imprRestante),C.imprRestante?"neg":"pos"]
  ],C.imprTotal>0?C.imprRestituit/C.imprTotal*100:null)+'</div>';

  if(C.chiriiMDL)h+='<div class="sec"><h2>'+esc(T("s_chirii"))+'</h2>'+statCard([[T("l_total"),money(C.chiriiMDL)+' <span class="u">MDL</span>']])+'</div>';
  h+=vTranzactii(); /* last on purpose: it grows all year long */
  h+='</div>';
  return h;
}

function vGate(){
  if(noCfg)return '<div class="sec"><div class="card pad"><h2 style="margin:0 0 6px;font-size:18px">'+esc(T("setup_t"))+'</h2><p class="hint" style="margin:0">'+esc(T("setup_h"))+'</p></div></div>';
  if(authErr)return '<div class="sec"><div class="note">'+esc(T("auth_err"))+'<br><small>'+esc(authErr)+'</small></div></div>';
  return vPin()+installNote();
}
function vPin(){
  var locked=needGate();
  if(locked&&GATE.step==="setparola"){
    return '<div class="sec"><div class="card pad"><h2 style="margin:0 0 6px;font-size:18px">'+esc(T("pw_set_t"))+'</h2>'
     +'<p class="hint" style="margin:0 0 12px">'+esc(T("pw_set_h"))+'</p>'
     +'<form id="spf"><label><span>'+esc(T("f_parola"))+'</span><input type="password" name="p1" autocomplete="new-password" minlength="8"></label>'
     +'<label><span>'+esc(T("f_parola2"))+'</span><input type="password" name="p2" autocomplete="new-password" minlength="8"></label>'
     +'<p class="err" id="pinerr"'+(gateErr?"":" hidden")+'>'+esc(gateErr)+'</p>'
     +'<button class="btn" type="submit"'+(gateBusy?" disabled":"")+'>'+esc(gateBusy?T("saving"):T("save"))+'</button>'
     +'<button class="btn ghost" type="button" id="gateback">'+esc(T("pw_other"))+'</button></form></div></div>';
  }
  if(locked&&GATE.step==="parola"){
    return '<div class="sec"><div class="card pad"><h2 style="margin:0 0 6px;font-size:18px">'+esc(T("pw_t"))+(GATE.nume?' · '+esc(GATE.nume):'')+'</h2>'
     +'<p class="hint" style="margin:0 0 12px">'+esc(T(GATE.weekly?"pw_week":"pw_h"))+'</p>'
     +'<form id="pwf"><label><span>'+esc(T("f_parola"))+'</span><input type="password" name="p" autocomplete="current-password"'+(gateBusy?" disabled":"")+'></label>'
     +'<p class="err" id="pinerr"'+(gateErr?"":" hidden")+'>'+esc(gateErr)+'</p>'
     +'<button class="btn" type="submit"'+(gateBusy?" disabled":"")+'>'+esc(gateBusy?T("saving"):T("pin_ok"))+'</button>'
     +'<button class="btn ghost" type="button" id="gateback">'+esc(T("pw_other"))+'</button></form></div></div>';
  }
  var relock=locked&&!!GATE.relock;
  var ttl=relock?T("relock_t")+(GATE.nume?" · "+GATE.nume:""):T(locked?"gate_t":"pin_t");
  var hint=relock?T(GATE.weekly?"relock_week":"relock_h"):T(locked?"gate_h":"pin_h");
  var h='<div class="sec"><div class="card pad"><h2 style="margin:0 0 6px;font-size:18px">'+esc(ttl)+'</h2>'
   +'<p class="hint" style="margin:0 0 12px">'+esc(hint)+'</p>'
   +'<form id="pinf"><label><span>'+esc(T("f_cod"))+'</span><input type="password" inputmode="numeric" id="pinv" autocomplete="off"'+(gateBusy?" disabled":"")+'></label>'
   +'<p class="err" id="pinerr"'+(gateErr?"":" hidden")+'>'+esc(gateErr||T("gate_bad"))+'</p>'
   +'<button class="btn" type="submit"'+(gateBusy?" disabled":"")+'>'+esc(gateBusy?T("saving"):T("pin_ok"))+'</button>'
   +(relock?'<button class="btn ghost" type="button" id="gateother">'+esc(T("logout"))+'</button>':'')+'</form></div></div>';
  if(!locked)h+='<div class="sec"><div class="note">'+esc(T("pin_as"))+'</div></div>';
  return h;
}
function vUsers(){
  var h='<div class="sec"><div class="sec-h"><h2>'+esc(T("r_user"))+'</h2><div class="sec-act"><button class="btn sm ghost exit-top" id="exitdir" type="button">'+icon("users")+esc(T("logout"))+'</button><button class="btn sm danger" id="resetAll" type="button" title="'+esc(T("reset_h"))+'">'+icon("trash")+esc(T("reset_btn"))+'</button>'+(ehlMode()?'<button class="btn sm" type="button" data-form="utilizatori">'+icon("userplus")+esc(T("a_user"))+'</button>':'')+'</div></div>'
    +(ehlMode()?'':'<p class="hint" style="margin:-4px 0 10px">'+esc(T("u_ehl_only"))+'</p>');
  /* only the active users here; the deactivated ones wait in the archive (vArhiva), nothing of theirs is lost */
  var act=S.utilizatori.filter(function(u){return u.status!=="Inactiv"});
  if(!act.length){
    h+='<div class="card"><div class="empty"><b>'+esc(T("u_none"))+'</b>'+esc(T("u_none_d"))+'</div></div>';
  }else{
    /* a person per row: initials in their colour, the role as a tag, the access code in a mono chip */
    h+='<div class="card rows">'+act.slice().sort(function(a,b){return String(a.nume).localeCompare(String(b.nume))}).map(function(u){
      var dir=u.rol==="Director";
      /* the row opens the card; a collaborator also has a button that puts him in the archive at once (he loses access the same moment) */
      return '<div class="row user-row">'
        +'<button type="button" class="tap urow-main" data-edit="utilizatori" data-id="'+esc(u.id)+'">'
        +'<span class="av" style="--c:'+toneOf(u.nume)+'">'+esc(initials(u.nume))+'</span>'
        +'<span class="l"><span class="nm-row">'+esc(u.nume)+'<span class="tagc '+(dir?"acc":"mut")+'">'+esc(dir?T("rol_dir"):T("rol_op"))+'</span></span></span>'
        +'<span class="code">'+esc(u.cod)+'</span></button>'
        +(dir?'':'<button type="button" class="btn sm ghost" data-deact-user="'+esc(u.id)+'" title="'+esc(T("u_deact_h"))+'">'+esc(T("u_deact"))+'</button>')
        +'</div>';
    }).join("")+'</div>';
  }
  return h+'</div>';
}
/* the archive: deactivated users, each with a "restore" button; a tap on the row still opens the card */
function vArhiva(){
  var off=S.utilizatori.filter(function(u){return u.status==="Inactiv"}).sort(function(a,b){return String(a.nume).localeCompare(String(b.nume))});
  if(!off.length)return "";
  return '<div class="sec"><div class="sec-h"><h2>'+esc(T("arch_t"))+' <span class="cnt">'+off.length+'</span></h2></div><p class="hint" style="margin:0 0 8px">'+esc(T("arch_h"))+'</p><div class="card rows">'
    +off.map(function(u){
      var dir=u.rol==="Director";
      return '<div class="row user-row off"><span class="av" style="--c:'+toneOf(u.nume)+'">'+esc(initials(u.nume))+'</span>'
        +'<span class="l"><span class="nm-row">'+esc(u.nume)+'<span class="tagc '+(dir?"acc":"mut")+'">'+esc(dir?T("rol_dir"):T("rol_op"))+'</span><span class="tagc neg">'+esc(T("u_inactiv"))+'</span></span></span>'
        +'<button type="button" class="btn sm ghost" data-restore="'+esc(u.id)+'">'+esc(T("restore"))+'</button>'
        +'<button type="button" class="btn sm ghost" data-edit="utilizatori" data-id="'+esc(u.id)+'" aria-label="'+esc(T("edit"))+'">'+icon("gear")+'</button></div>';
    }).join("")+'</div></div>';
}

function vWho(){
  var me=meName(),list=oameni(),u=myUser();
  if(me)return '<div class="sec"><div class="card who-card"><span class="av" style="--c:'+toneOf(me)+'">'+esc(initials(me))+'</span>'
    +'<span class="who-t"><span class="who-k">'+esc(T("me_t"))+'</span><b>'+esc(me)+'</b>'+(u?'<span class="role'+(u.rol==="Director"?" on":"")+'">'+esc(u.rol==="Director"?T("rol_dir"):T("rol_op"))+'</span>':'')+'</span>'
    +'<button type="button" class="who-btn" id="mechg">'+icon("users")+esc(T("me_ch"))+'</button></div></div>';
  return "";
  if(!list.length)return '<div class="sec"><div class="note">'+esc(T("me_none"))+'</div></div>';
  return '<div class="sec"><div class="card pad"><form id="mef"><label><span>'+esc(T("me_pick"))+'</span>'
    +'<select name="nume">'+list.map(function(p){return '<option value="'+esc(p)+'">'+esc(p)+'</option>'}).join("")+'</select></label>'
    +'<p class="hint">'+esc(T("me_h"))+'</p><button class="btn" type="submit">'+esc(T("save"))+'</button></form></div></div>';
}
function vAdd(){
  var h=statusNote()+'<div class="add-layout"><div class="add-main">'+vWho()+vMyBalance();
  var order=["cheltuieli","schimburi","grafic","pontaj","chirii","angajati"]; /* client incomes, contracts, clients, till outflows and loans are the director's */
  /* the EHL account records the firm's money and its projects; an administrator records what he spends from his own account */
  if(isDir)order=ehlMode()?["incasari","iesiri","proiecte","utilizatori"]:["cheltuieli","iesiri","chirii","schimburi","imprumuturi","grafic","pontaj","angajati"]; /* users are made in the EHL account only */
  var desc={incasari:"a_inc_d",cheltuieli:"a_chelt_d",iesiri:"a_ies_d",chirii:"a_chirie_d",
    imprumuturi:"a_impr_d",schimburi:"a_schimb_d",contracte:"a_contr_d",pontaj:"a_pontaj_d",grafic:"a_grafic_d",angajati:"a_ang_d",proiecte:"a_proj_d",utilizatori:"a_user_d"};
  h+='<div class="sec"><h2>'+esc(T("add_t"))+'</h2><div class="grid2">'+order.map(function(k,i){
    return '<button type="button" class="act'+(i<2?" primary":"")+'" data-form="'+k+'">'
      +'<span class="m">'+icon(FORMS[k].icon)+'</span>'
      +'<span class="t">'+esc(T(FORMS[k].title))+'</span>'
      +'<span class="d2">'+esc(T(desc[k]))+'</span></button>';
  }).join("")+'</div></div>';
  h+='</div><aside class="add-side">';
  h+=installNote();
  if(!isDir)h+='<div class="sec"><button class="btn ghost" id="exitdir" type="button">'+esc(T("logout"))+'</button></div>';
  h+='</aside></div>';
  return h;
}

var REGDEF={
 incasari:{t:"r_inc",cols:[["data","f_data"],["client","f_client"],["suma","f_suma","n"],["mod","f_mod"]],
   sub:function(r){return [r.proiect,r.descriere,r.confirmat?T("confirmat")+" "+r.confirmat:""].filter(Boolean).join(" · ")},
   main:function(r){return r.client||"—"},amt:function(r){return money(n(r.suma))+" "+curBadge(r.valuta||"MDL",false)},
   cls:function(){return "pos"},meta:function(r){return r.data+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 cheltuieli:{t:"r_chelt",main:function(r){return catLabel(r.categorie)||"—"},
   sub:function(r){var pt=pentruOf(r);return [r.descriere,r.client,pt==="Proiect"?r.proiect:(pt==="EHL"?T("pt_ehl"):T("pt_alte")),(r.mod!=="Transfer"&&r.sursa==="Proprii")?T("src_proprii_short"):""].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" MDL"},cls:function(){return "neg"},
   meta:function(r){return r.data+" · "+(r.platitDe||"")+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 iesiri:{t:"r_ies",main:function(r){var m={"Depus pe cont":"d_depus","Dat persoanei":"d_pers",Salarii:"d_sal","Împrumut":"d_impr","Restituire fondator":"d_rest",Alte:"d_alte"};return T(m[r.destinatie]||"d_alte")},
   sub:function(r){return [r.persoana,r.luna?monthName(r.luna):"",r.nota,dinAvans(r)?T("din_avans")+" "+r.platitDe:""].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" "+curBadge(r.valuta||"MDL",false)},cls:function(){return "warnc"},
   meta:function(r){return r.data}},
 chirii:{t:"r_chirii",main:function(r){return r.locatia||"—"},
   sub:function(r){return [r.chirias,r.nota,dinAvans(r)?T("din_avans")+" "+r.platitDe:""].filter(Boolean).join(" · ")},
   amt:function(r){return money(chirieTotal(r))+" "+curBadge(r.valuta||"MDL",false)},cls:function(){return "neg"},
   meta:function(r){return r.dataInceput+(r.dataSfarsit?" → "+r.dataSfarsit:"")+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 contracte:{t:"r_contr",main:function(r){return r.client||"—"},sub:function(r){return r.nota||""},
   amt:function(r){return money(n(r.sumaContract))+" MDL"},cls:function(){return ""},meta:function(){return ""}},
 proiecte:{t:"r_proj",main:function(r){return r.nume||"—"},
   sub:function(r){var pi=projInc(r.nume);return [r.client,respList(r).join(", ")||T("p_niciunul"),n(r.contractEUR)?T("f_contract")+" "+money(n(r.contractEUR))+" EUR":(n(r.sumaContract)?T("f_contract")+" "+money(n(r.sumaContract)):""),n(r.adaugator)?T("p_adaug")+" "+money(n(r.adaugator)):"",(pi.cash||pi.tr)?T("p_cash")+" "+money(pi.cash)+", "+T("p_tr")+" "+money(pi.tr):""].filter(Boolean).join(" · ")},
   amt:function(r){return n(r.buget)?money(n(r.buget))+" MDL":"—"},
   cls:function(r){return r.status==="Finalizat"?"":"pos"},
   meta:function(r){return r.status==="Finalizat"?T("st_final"):(r.status==="Pauză"?T("st_pauza"):T("st_activ"))}},
 schimburi:{t:"r_schimb",main:function(r){return (r.persoana||"—")+" · "+money(n(r.sumaDin))+" "+(r.valutaDin||"")+" → "+(r.valutaIn||"")},
   sub:function(r){return [r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.sumaIn))+" "+curBadge(r.valutaIn||"MDL",false)},cls:function(){return "warnc"},
   meta:function(r){return r.data}},
 imprumuturi:{t:"r_impr",main:function(r){return r.persoana||"—"},
   sub:function(r){return [r.status==="Achitat"?T("achitat"):T("neachitat"),r.termen?T("f_termen")+" "+r.termen:"",r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" "+curBadge(r.valuta||"MDL",false)},cls:function(r){return r.status==="Achitat"?"pos":"warnc"},
   meta:function(r){return r.data}}
};
/* table view of the registers: the title of the main column, an icon per record, the "who and how" cell and the amount in lei */
var DEST_IC={"Depus pe cont":["bank","var(--s3)"],"Dat persoanei":["send","var(--s6)"],Salarii:["users","var(--s1)"],"Împrumut":["clock","var(--s4)"],"Restituire fondator":["user","var(--s5)"],Alte:["dots","var(--muted)"]};
var REGTBL={
 incasari:{th:"f_client",ic:function(){return ["inArrow","var(--pos)"]},how:function(r){return [r.mod==="Numerar"?T("numerar"):T("transfer"),""]},mdl:function(r){return n(r.suma)*n(r.curs)}},
 cheltuieli:{th:"f_categ",ic:function(r){return [catIcon(r.categorie),"var(--s"+(catSlot(r.categorie)+1)+")"]},how:function(r){return [r.mod==="Numerar"?T("numerar"):T("transfer"),r.platitDe||""]},mdl:function(r){return n(r.suma)}},
 iesiri:{th:"f_dest",ic:function(r){return DEST_IC[r.destinatie]||DEST_IC.Alte},how:function(r){return ["",r.persoana||""]},mdl:function(r){return n(r.suma)*n(r.curs)}},
 chirii:{th:"f_loc",ic:function(){return ["home","var(--s4)"]},how:function(r){return [r.mod==="Numerar"?T("numerar"):T("transfer"),r.chirias||""]},mdl:function(r){return chirieTotal(r)*n(r.curs)}},
 proiecte:{th:"f_proiect",ic:function(){return ["folder","var(--s1)"]},how:function(r){return [REGDEF.proiecte.meta(r),""]},mdl:null},
 schimburi:{th:"f_pers",ic:function(){return ["globe","var(--warn)"]},how:function(r){return [money(n(r.sumaDin))+" "+(r.valutaDin||""),""]},mdl:function(r){return round2(n(r.sumaIn)*rateAzi(r.valutaIn))}},
 imprumuturi:{th:"f_pers",ic:function(r){return ["clock",r.status==="Achitat"?"var(--pos)":"var(--warn)"]},how:function(r){return [r.status==="Achitat"?T("achitat"):T("neachitat"),(r.valuta&&r.valuta!=="MDL")?money(imprLei(r))+" MDL":""]},mdl:imprLei}
};
var REG_IC={incasari:"inArrow",cheltuieli:"outArrow",iesiri:"send",proiecte:"folder",chirii:"home",contracte:"file",imprumuturi:"clock",schimburi:"globe",salarii:"users",jurnal:"list"};
function regLabel(k){return k==="salarii"?T("r_sal"):(k==="jurnal"?T("r_jur"):T(REGDEF[k].t))}
var REG_TABS=["incasari","cheltuieli","iesiri","proiecte","chirii","imprumuturi","schimburi","salarii","jurnal"]; /* contracts are part of the projects */
function openRegPick(){
  var m=$("#menu");if(!m)return;
  /* a dropdown that opens straight from the button, its width, over everything */
  var btn=$("#regmore"),r=btn?btn.getBoundingClientRect():{left:16,bottom:120,width:300};
  var st='left:'+Math.round(r.left)+'px;top:'+Math.round(r.bottom+6)+'px;width:'+Math.round(r.width)+'px;max-height:calc(100vh - '+Math.round(r.bottom+6)+'px - 84px)';
  if(btn)btn.classList.add("open");
  m.innerHTML='<div class="menu-bg lite" data-menu-close="1"></div><div class="pick-p" role="dialog" aria-label="'+esc(T("nav_reg"))+'" style="'+st+'"><div class="pick-g">'
    +REG_TABS.map(function(k){var n=REGDEF[k]&&S[k]?S[k].length:0;return '<button type="button" class="pick-i" data-tab="'+k+'"'+(regTab===k?' aria-pressed="true"':'')+'>'+icon(REG_IC[k])+'<span>'+esc(regLabel(k))+'</span>'+(n?'<span class="cnt">'+n+'</span>':'')+'</button>'}).join("")+'</div></div>';
  m.hidden=false;document.body.classList.add("menu-open");
}
function shortDate(d){var p=String(d||"").split("-");return p.length===3?p[2]+"."+p[1]+"."+p[0]:String(d||"")}
/* months of the register as groups; a click on the month row folds its records smoothly (remembered per tab and month) */
var REGCLOSED={};
function regTable(tab,list,all){
  all=all||list;
  var t=REGTBL[tab],def=REGDEF[tab],h='<div class="card tbl-card"><table class="tbl"><thead><tr><th>'+esc(T("f_data"))+'</th><th>'+esc(T(t.th))+'</th><th>'+esc(T("th_det"))+'</th><th>'+esc(T("th_how"))+'</th><th class="n">'+esc(T("f_suma"))+'</th></tr></thead>';
  var groups=[],cur=null;
  list.forEach(function(r){var m=ymOf(r)||"—";if(!cur||cur.m!==m){cur={m:m,rows:[]};groups.push(cur)}cur.rows.push(r)});
  groups.forEach(function(g){
    var inM=all.filter(function(r){return (ymOf(r)||"—")===g.m}),tot=t.mdl?round2(inM.reduce(function(a,r){return a+t.mdl(r)},0)):null,key=tab+":"+g.m;
    h+='<tbody class="g'+(REGCLOSED[key]?" closed":"")+'"><tr class="grp" data-grp="'+esc(key)+'"><td colspan="4">'+icon("chevR")+esc(g.m==="—"?"—":monthName(g.m))+' <span class="grp-n">'+esc(T("n_rec").replace("{n}",inM.length))+'</span></td><td class="n">'+(tot!=null?money(tot)+' <span class="u">MDL</span>':'')+'</td></tr>';
    g.rows.forEach(function(r){
      var ic=t.ic(r),how=t.how(r);
      h+='<tr class="tr" data-edit="'+tab+'" data-id="'+esc(r.id)+'"><td class="t-date"><div class="cell">'+esc(shortDate(dateOf(r)))+'</div></td>'
        +'<td><div class="cell"><span class="t-main" style="--c:'+ic[1]+'"><span class="ic-badge tint">'+icon(ic[0])+'</span>'+esc(def.main(r))+'</span></div></td>'
        +'<td class="t-sub"><div class="cell">'+esc(def.sub(r))+'</div></td>'
        +'<td class="t-how"><div class="cell">'+(how[0]?'<span class="pill-m">'+esc(how[0])+'</span>':'')+esc(how[1])+(byLine(r)?'<small style="display:block;color:var(--muted)">'+esc(byLine(r))+'</small>':'')+'</div></td>'
        +'<td class="n amt '+def.cls(r)+'"><div class="cell">'+def.amt(r)+'</div></td></tr>';
    });
    h+='</tbody>';
  });
  return h+'</table></div>';
}
function dateOf(r){return r.data||r.dataInceput||r.luna||r.ts||""}
function vReg(){
  if(!isDir)return vPin();
  var tabs=REG_TABS;
  var h=statusNote();
  /* phones: one button naming the open journal; it pops up the list of all journals */
  var rsN=REGDEF[regTab]&&S[regTab]?S[regTab].length:0;
  h+='<div class="sec regsw"><button type="button" class="rs-sel" id="regmore" aria-haspopup="dialog">'+icon(REG_IC[regTab])+'<span class="rs-l">'+esc(regLabel(regTab))+'</span>'+(rsN?'<span class="cnt">'+rsN+'</span>':'')+'<span class="rs-ch">'+icon("chevR")+'</span></button></div>';
  h+='<div class="sec"><div class="segbar">'+tabs.map(function(k){
    var lbl=k==="salarii"?T("r_sal"):(k==="jurnal"?T("r_jur"):T(REGDEF[k].t)),cnt=REGDEF[k]&&S[k]?S[k].length:null;
    return '<button type="button" class="seg-b" data-tab="'+k+'"'+(regTab===k?' aria-pressed="true"':'')+'>'+icon(REG_IC[k])+esc(lbl)+(cnt?'<span class="cnt">'+cnt+'</span>':'')+'</button>';
  }).join("")+'</div></div>';
  if(regTab==="salarii")return h+vSalarii();
  if(regTab==="jurnal")return h+vJurnal();
  var def=REGDEF[regTab];
  var list=S[regTab].slice().sort(function(a,b){return String(dateOf(b)).localeCompare(String(dateOf(a)))});
  if(regFilter&&regFilter.col===regTab){
    list=list.filter(function(r){return (!regFilter.luna||ymOf(r)===regFilter.luna)&&(!regFilter.categorie||sameP(r.categorie,regFilter.categorie)||sameP(catMain(r.categorie),regFilter.categorie))});
    h+='<div class="sec"><div class="filterbar">'+esc([catLabel(regFilter.categorie),regFilter.luna?monthName(regFilter.luna):T("ov_all")].filter(Boolean).join(" · "))
      +' <button type="button" class="chip" data-clearfilter="1">'+icon("x")+esc(T("filt_clear"))+'</button></div></div>';
  }
  if(!list.length)return h+'<div class="sec"><div class="card"><div class="empty"><b>'+esc(T("nothing"))+'</b>'+esc(T("nothing_d"))+'</div></div></div>';
  if(regTab==="contracte"){
    var C=calc();
    h+='<div class="sec"><div class="card rows">'+C.contracte.map(function(x){
      return '<button type="button" class="tap row" data-edit="contracte" data-id="'+esc(x.id)+'">'
        +'<span class="l">'+esc(x.client)+'<span class="s">'+T("l_incas")+" "+money(x.incCash+x.incTr)+" · "+T("l_ramas")+" "+money(x.ramas)+'</span></span>'
        +'<span class="r '+(x.ramas>0?"warnc":"pos")+'">'+money(x.val)+'</span></button>';
    }).join("")+'</div></div>';
    return h;
  }
  /* 15 records a page */
  var full=list,pages=Math.max(1,Math.ceil(full.length/REG_PG)),pg=Math.min(Math.max(0,REGPAGE[regTab]||0),pages-1);
  REGPAGE[regTab]=pg;list=full.slice(pg*REG_PG,pg*REG_PG+REG_PG);
  if(REGTBL[regTab])h+='<div class="sec">'+regTable(regTab,list,full)+'</div>';
  h+='<div class="sec reg-rows"><div class="card rows">'+list.map(function(r){
    return '<button type="button" class="tap row" data-edit="'+regTab+'" data-id="'+esc(r.id)+'">'
      +'<span class="l">'+esc(def.main(r))+'<span class="s">'+esc([def.meta(r),def.sub(r),byLine(r)].filter(Boolean).join(" · "))+'</span></span>'
      +'<span class="r '+def.cls(r)+'">'+def.amt(r)+'</span></button>';
  }).join("")+'</div></div>';
  if(pages>1)h+=pager(pg,pages,full.length);
  return h;
}
var REG_PG=15,REGPAGE={};
/* prev, page numbers (first, last and those around the current one; the rest fold into "…"), next, and "16–30 of 68" */
function pager(pg,pages,n){
  var nums=[],i;for(i=0;i<pages;i++){if(i===0||i===pages-1||Math.abs(i-pg)<=1)nums.push(i);else if(nums[nums.length-1]!=="…")nums.push("…")}
  return '<div class="sec pager"><button type="button" class="pg-b" data-page="'+(pg-1)+'"'+(pg?'':' disabled')+' aria-label="'+esc(T("pg_prev"))+'">'+icon("chevL")+'</button>'
    +nums.map(function(x){return x==="…"?'<span class="pg-gap">…</span>':'<button type="button" class="pg-b'+(x===pg?' on':'')+'" data-page="'+x+'"'+(x===pg?' aria-current="page"':'')+'>'+(x+1)+'</button>'}).join("")
    +'<button type="button" class="pg-b" data-page="'+(pg+1)+'"'+(pg<pages-1?'':' disabled')+' aria-label="'+esc(T("pg_next"))+'">'+icon("chevR")+'</button>'
    +'<span class="pg-of">'+esc(T("pg_of").replace("{a}",pg*REG_PG+1).replace("{b}",Math.min(n,pg*REG_PG+REG_PG)).replace("{n}",n))+'</span></div>';
}
function vSalarii(){
  var C=calc(),h="";
  if(C.salLuni.length)h+='<div class="sec"><h2>'+esc(T("s_sal"))+'</h2>'+rowsCard(C.salLuni.map(function(m){
    return r2(monthName(m.luna),money(m.rest),T("l_castigat")+" "+money(m.castigat)+" · "+T("l_plata")+" "+money(m.platit),m.rest>0?"warnc":"pos");
  }))+'</div>';
  if(C.pontaj.length){
    h+='<div class="sec"><h2>'+esc(T("a_pontaj"))+'</h2><div class="card rows">'
    +C.pontaj.slice().sort(function(a,b){return String(b.luna).localeCompare(String(a.luna))}).map(function(p){
      return '<button type="button" class="tap row" data-edit="pontaj" data-id="'+esc(p.id)+'">'
        +'<span class="l">'+esc(p.angajat)+'<span class="s">'+esc(monthName(p.luna))+" · "+T("f_z1")+": "+p.z1+" = "+money(p.s1)+" · "+T("f_z2")+": "+p.z2+" = "+money(p.s2)+(p.extra?" · "+T("f_extra")+" "+money(p.extra):"")+" · "+money(p.pretZi)+"/"+(lang==="ru"?"день":"zi")+'</span></span>'
        +'<span class="r">'+money(p.total)+'</span></button>';
    }).join("")+'</div></div>';
  }
  var actA=S.angajati.filter(function(a){return a.status!=="Inactiv"}),offA=S.angajati.filter(function(a){return a.status==="Inactiv"});
  h+='<div class="sec"><div class="sec-h"><h2>'+esc(T("a_ang"))+'</h2><div class="sec-act"><button class="btn sm" type="button" data-form="angajati">'+icon("userplus")+esc(T("a_ang"))+'</button></div></div></div>';
  if(actA.length)h+='<div class="sec" style="margin-top:-14px"><div class="card rows">'
    +actA.map(function(a){
      return '<button type="button" class="tap row" data-edit="angajati" data-id="'+esc(a.id)+'">'
        +'<span class="l">'+esc(a.nume)+'<span class="s">'+esc(T("activ"))+'</span></span>'
        +'<span class="r">'+money(salariuLa(a.nume,today()))+'</span></button>';
    }).join("")+'</div></div>';
  if(offA.length)h+='<div class="sec"><h2>'+esc(T("arch_ang"))+' <span class="cnt">'+offA.length+'</span></h2><p class="hint" style="margin:0 0 8px">'+esc(T("arch_ang_h"))+'</p><div class="card rows">'
    +offA.map(function(a){
      return '<div class="row user-row off"><span class="l"><span class="nm-row">'+esc(a.nume)+'<span class="tagc neg">'+esc(T("inactiv"))+'</span></span></span>'
        +(a.by===ME?'<button type="button" class="btn sm ghost" data-restore-ang="'+esc(a.id)+'">'+esc(T("restore"))+'</button>':'')
        +'<button type="button" class="btn sm ghost" data-edit="angajati" data-id="'+esc(a.id)+'" aria-label="'+esc(T("edit"))+'">'+icon("gear")+'</button></div>';
    }).join("")+'</div></div>';
  if(!h)h='<div class="sec"><div class="card"><div class="empty"><b>'+esc(T("nothing"))+'</b>'+esc(T("nothing_d"))+'</div></div></div>';
  return h;
}

function jurLabel(e){
  var acts={add:"j_add",edit:"j_edit",del:"j_del"};
  var colT=FORMS[e.col]?T(FORMS[e.col].title):e.col;
  return T(acts[e.act]||"j_edit")+" · "+colT;
}
function jurSum(e){
  var d=e.data||{},def=REGDEF[e.col];
  var main=def?def.main(d):(d.nume||d.angajat||d.client||"");
  /* plain text: it is escaped on screen and written to Excel, so the amount carries the currency code, not a badge */
  var amt=e.col==="chirii"?money(chirieTotal(d))+" "+(d.valuta||"MDL"):(d.suma!=null?money(n(d.suma))+" "+(d.valuta||"MDL"):(def?def.amt(d):""));
  return [main,amt].filter(Boolean).join(" — ");
}
function vJurnal(){
  var h='<div class="sec"><div class="card pad"><form id="jurf"><div class="pair">'
    +'<label><span>'+esc(T("f_luna"))+'</span><input type="month" name="luna" value="'+esc(JUR.luna)+'"></label>'
    +'<label><span>&nbsp;</span><button class="btn" type="submit">'+esc(T("j_load"))+'</button></label>'
    +'</div><p class="hint">'+esc(T("j_h"))+'</p></form></div></div>';
  if(JUR.loading)return h+'<div class="sec"><div class="note">'+esc(T("j_loading"))+'</div></div>';
  if(JUR.rows===null)return h;
  if(!JUR.rows.length)return h+'<div class="sec"><div class="card"><div class="empty">'+esc(T("j_empty"))+'</div></div></div>';
  var byDay={},order=[];
  JUR.rows.forEach(function(e){var d=String(e.ts||"").slice(0,10);if(!byDay[d]){byDay[d]=[];order.push(d)}byDay[d].push(e)});
  h+=order.map(function(d){
    return '<div class="sec"><h2>'+esc(d)+'</h2><div class="card rows">'+byDay[d].map(function(e){
      var cls=e.act==="del"?"neg":(e.act==="add"?"pos":"warnc");
      return '<div class="row"><span class="l">'+esc(jurSum(e)||"—")
        +'<span class="s">'+esc(jurLabel(e))+(e.nume?" · "+esc(e.nume):"")+'</span></span>'
        +'<span class="r '+cls+'" style="font-size:12px">'+esc(String(e.ts||"").slice(11,16))+'</span></div>';
    }).join("")+'</div></div>';
  }).join("");
  h+='<div class="sec"><button class="btn ghost" id="expbtn" type="button">'+esc(T("j_exp"))+'</button><p class="hint" style="margin-top:8px">'+esc(T("j_exp_h"))+'</p></div>';
  return h;
}
function vMine(){
  var h=statusNote(),all=[];
  COLS.forEach(function(c){
    if(!REGDEF[c]&&c!=="pontaj"&&c!=="angajati")return;
    S[c].forEach(function(r){if(ME&&r.by===ME&&!(c==="angajati"&&r.status==="Inactiv"))all.push({c:c,r:r})});
  });
  all.sort(function(a,b){return String(b.r.ts||"").localeCompare(String(a.r.ts||""))});
  if(!all.length)return h+'<div class="sec"><div class="card"><div class="empty"><b>'+esc(T("mine_t"))+'</b>'+esc(T("mine_e"))+'</div></div></div>';
  h+='<div class="sec"><h2>'+esc(T("mine_t"))+'</h2><div class="card rows">'+all.slice(0,60).map(function(x){
    var def=REGDEF[x.c];
    var main=def?def.main(x.r):(x.r.nume||x.r.angajat||"—");
    var amt=def?def.amt(x.r):"";
    var meta=def?def.meta(x.r):(x.r.luna?monthName(x.r.luna):"");
    return '<button type="button" class="tap row" data-edit="'+x.c+'" data-id="'+esc(x.r.id)+'">'
      +'<span class="l">'+esc(main)+'<span class="s">'+esc([T(FORMS[x.c]?FORMS[x.c].title:""),meta].filter(Boolean).join(" · "))+'</span></span>'
      +'<span class="r">'+amt+'</span></button>';
  }).join("")+'</div></div>';
  return h;
}

/* categories as chips: x deletes on a second tap (saved at once); a new one is added through the field under them */
function catBase(){var c=cfg().categorii;return (c&&c.length?c:DEF_CFG.categorii).slice()}
function catChips(){
  return '<div class="cat-prev" id="catlist">'+catBase().map(function(k,i){
    return '<span class="cat-chip ed" style="--c:var(--s'+(catSlot(k)+1)+')">'+icon(catIcon(k))+esc(catLabel(k))
      +'<button type="button" class="cat-x" data-catdel="'+i+'" aria-label="'+esc(T("del"))+'">'+icon("x")+'</button></span>';
  }).join("")+'</div>'
    /* a new one is added like a currency: a dashed field with a plus, then Save */
    +'<form id="catadd" class="cat-form"><label class="cg-cell cg-new"><span class="cg-b">'+icon("plus")+'</span><input name="nc" autocomplete="off" aria-label="'+esc(T("cat_add"))+'" placeholder="'+esc(T("cat_add"))+'"></label>'+setSave()+'</form>';
}
function catSave(list){saveCfg({categorii:list}).then(function(){toast(T("saved"));render()}).catch(function(){toast(T("offline"))})}
/* a setting card: icon, title and explanation on top, then the form */
function setCard(ic,title,hint,body){
  return '<div class="sec"><div class="card set-card"><div class="set-h"><span class="ic-badge tint" style="--c:var(--accent)">'+icon(ic)+'</span><div><b>'+esc(title)+'</b>'+(hint?'<p>'+esc(hint)+'</p>':'')+'</div></div>'+body+'</div></div>';
}
function setSave(id,label,ic){return '<div class="set-act"><button class="btn sm" type="submit"'+(id?' id="'+id+'"':'')+'>'+(ic?icon(ic):'')+esc(label||T("save"))+'</button></div>'}
function vSet(){
  if(!isDir)return vPin();
  var c=cfg(),h='<div class="set-grid">'+vUsers();
  /* currencies: badge inside the code field, the rate beside it, a last row to add one */
  h+=setCard("cash",T("set_val"),T("set_val_h"),'<form id="valf"><div class="cur-grid"><span class="cg-h">'+esc(T("cod"))+'</span><span class="cg-h">'+esc(T("f_curs"))+'</span>'
    +valute().map(function(v,i){
      return '<label class="cg-cell"><span class="cg-b">'+curBadge(v.cod,false)+'</span><input name="cod'+i+'" aria-label="'+esc(T("cod"))+'" value="'+esc(v.cod)+'"'+(v.cod==="MDL"?' readonly':'')+'></label>'
        +'<input name="curs'+i+'" aria-label="'+esc(T("f_curs"))+'" type="number" step="0.0001" value="'+esc(v.curs)+'"'+(v.cod==="MDL"?' readonly':'')+'>';
    }).join("")
    +'<label class="cg-cell cg-new"><span class="cg-b">'+icon("plus")+'</span><input name="newcod" aria-label="'+esc(T("cod"))+'" placeholder="RON"></label>'
    +'<input name="newcurs" aria-label="'+esc(T("f_curs"))+'" type="number" step="0.0001" placeholder="4.05"></div>'+setSave()+'</form>');

  /* the cashier setting is gone: in the EHL model the till is the directors' and every payer is an account */
    +'<datalist id="dl-pers">'+persoane().map(function(p){return '<option value="'+esc(p)+'">'}).join("")+'</datalist>';

  if(PAROLA_DIR)h+=setCard("lock",T("set_pw"),T("set_pw_h"),'<form id="pwchg">'
    +'<label><span>'+esc(T("f_parola_veche"))+'</span><input type="password" name="veche" autocomplete="current-password"></label>'
    +'<div class="pair"><label><span>'+esc(T("f_parola_noua"))+'</span><input type="password" name="noua" autocomplete="new-password" minlength="8"></label>'
    +'<label><span>'+esc(T("f_parola2"))+'</span><input type="password" name="noua2" autocomplete="new-password" minlength="8"></label></div>'+setSave()+'</form>');

  /* categories: how they look on the dashboard, then the list to edit (in the interface language; saved under the stored names) */
  h+=setCard("tag",T("set_cat"),T("set_cat_h"),catChips());

  h+=setCard("file",T("exp_t"),T("j_exp_h"),'<form id="expf">'
    +'<div class="pair exp-row"><label><span>'+esc(T("f_luna"))+'</span><input type="month" name="luna" value="'+esc(JUR.luna)+'"></label>'
    +'<label class="cb exp-cb"><input type="checkbox" name="doar"><span>'+esc(T("exp_luna"))+'</span></label></div>'+setSave("expsub",T("exp_btn"),"down")+'</form>');
  h+=vArhiva();
  h+=installNote();
  /* switching user: in the users header on wide screens, full width at the very bottom on phones */
  h+='<div class="sec sec-full exit-bottom"><button class="btn ghost logout" id="exitdir" type="button">'+icon("users")+esc(T("logout"))+'</button></div>';
  h+='</div>';
  return h;
}

/* ---------------- sheet / forms ---------------- */
var sheetState=null;
function openForm(col,id){
  var def=FORMS[col];if(!def)return;
  if(col==="utilizatori"&&!id&&!ehlMode()){toast(T("u_ehl_only"));return;} /* users are made in the EHL account only */
  var rec=id?S[col].filter(function(r){return r.id===id})[0]:null;
  var data={};
  def.fields().forEach(function(f){data[f.k]=rec?(rec[f.k]!=null?rec[f.k]:""):(f.def!=null?f.def:"")});
  if(rec&&col==="angajati"){data.salariu=salariuLa(rec.nume,today());data.dinSal=today();}
  if(col==="cheltuieli"){var full=data.categorie;data.categorie=catMain(full);data.subcat=catSub(full);if(rec)data.pentru=pentruOf(rec);}
  if(col==="pontaj")pontajDinGrafic(data);
  sheetState={col:col,id:id||null,data:data,err:""};
  sheetOpened();
  drawSheet();
}
/* The phone's back button / swipe closes the open form first, then steps back through views,
   and only then leaves the app. Each open sheet and each view change is a history entry. */
var HIST=typeof history!=="undefined"&&history.pushState?history:null;
function histPush(st){if(HIST){try{HIST.pushState(st,"")}catch(e){}}}
function sheetOpened(){if(HIST&&!(HIST.state&&HIST.state.sheet))histPush({v:view,sheet:true})}
function closeSheetNow(){sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";render();verApply()}
function closeSheet(){
  if(HIST&&HIST.state&&HIST.state.sheet){HIST.back();return;} /* popstate closes it */
  closeSheetNow();
}
window.addEventListener("popstate",function(e){
  var st=(e&&e.state)||{};
  if($("#sheet").innerHTML){closeSheetNow();}
  if(st.v&&st.v!==view&&!needGate()){view=st.v;render();}
});
/* the director's "delete the data": everything but the settings and the director accounts, after the access code */
var RESET={busy:false,err:""};
function openReset(){if(!isDir)return;RESET={busy:false,err:""};sheetState={col:"__reset",id:null,data:{},err:""};sheetOpened();drawReset();}
function drawReset(){
  var h='<div class="sheet"><div class="sheet-in"><div class="sheet-head"><h2>'+esc(T("reset_t"))+'</h2><button class="x" type="button" id="closeSheet" aria-label="'+esc(T("cancel"))+'">'+icon("x")+'</button></div>'
    +'<p class="hint">'+esc(T("reset_h"))+'</p><p class="hint">'+esc(T("reset_keep"))+'</p>'
    +'<form id="resetf"><label><span>'+esc(T("reset_cod"))+'</span><input name="cod" inputmode="numeric" autocomplete="off" required'+(RESET.busy?' disabled':'')+'></label>'
    +(RESET.err?'<p class="err">'+esc(RESET.err)+'</p>':'')
    +'<div class="form-act"><button class="btn danger" type="submit" style="flex:1"'+(RESET.busy?' disabled':'')+'>'+icon("trash")+'<span>'+esc(RESET.busy?T("reset_busy"):T("reset_go"))+'</span></button></div></form></div></div>';
  $("#sheet").innerHTML=h;
}
function doReset(cod){
  if(RESET.busy||!PB)return;
  RESET.busy=true;RESET.err="";drawReset();
  PB.send("/api/ehl/reset",{method:"POST",body:{cod:cod},requestKey:null}).then(function(){
    try{localStorage.removeItem("ehl.cache");localStorage.removeItem("ehl.queue");localStorage.removeItem("ehl.failed")}catch(e){}
    resetData();toast(T("reset_done"));setTimeout(function(){location.reload()},600);
  }).catch(function(e){RESET.busy=false;var srv=e&&e.response&&e.response.message;RESET.err=netErr(e)?T("offline"):(srv&&SRV_MSG[srv]?srvT(srv):T("save_err"));drawReset();});
}
function drawSheet(){
  if(!sheetState)return;
  if(sheetState.col==="__reset"){drawReset();return;}
  var st=sheetState,def=FORMS[st.col],fields=def.fields();
  var rec0=st.id?(S[st.col]||[]).filter(function(r){return r.id===st.id})[0]:null;
  var salPay=!!(rec0&&st.col==="cheltuieli"&&rec0.categorie==="Salarii"); /* a salary payment: the books are closed on it */
  var lockedOld=salPay||!!(rec0&&(rec0.by!==ME||(!isDir&&rec0.created&&Date.now()-Date.parse(String(rec0.created).replace(" ","T"))>EDIT_DAYS*86400000)));
  var body=fields.filter(function(f){
    if(f.showIf&&!f.showIf(st.data))return false;
    if(f.newOnly&&st.id&&st.col!=="angajati")return false;
    return true;
  }).map(function(f){return fieldHtml(f,st.data[f.k])});
  // group halves into pairs
  var out="",i=0;
  var vis=fields.filter(function(f){return (!f.showIf||f.showIf(st.data))&&!(f.newOnly&&st.id&&st.col!=="angajati")});
  while(i<vis.length){
    if(vis[i].half&&vis[i+1]&&vis[i+1].half){out+='<div class="pair">'+fieldHtml(vis[i],st.data[vis[i].k])+fieldHtml(vis[i+1],st.data[vis[i+1].k])+'</div>';i+=2;}
    else{out+=fieldHtml(vis[i],st.data[vis[i].k]);i++;}
  }
  var calcHtml="";
  /* totals side by side in one row */
  if(def.calc){var cv=def.calc(st.data);calcHtml='<div class="'+(cv.length>3?"calc-list":"calc-row")+'">'+cv.map(function(c){return '<div class="calcbox'+(c.cls?" "+c.cls:"")+'"><span>'+esc(c.l)+'</span><span class="num">'+esc(c.v)+'</span></div>'}).join("")+'</div>'}
  var lists={};
  fields.forEach(function(f){if(f.list&&f.list.length)lists[f.k]=f.k==="categorie"?uniq(f.list.map(catLabel)):f.list});
  var dls=Object.keys(lists).map(function(k){
    return '<datalist id="dl-'+k+'">'+lists[k].map(function(v){return '<option value="'+esc(v)+'">'}).join("")+'</datalist>';
  }).join("");
  $("#sheet").innerHTML='<div class="sheet"><div class="sheet-in"><div class="sheet-head"><h2>'+esc(T(def.title))+'</h2>'
    +'<button class="x" type="button" id="closeSheet" aria-label="'+esc(T("cancel"))+'">'+icon("x")+'</button></div>'
    +'<form id="recf" novalidate>'+out+calcHtml
    +(st.err?'<p class="err">'+esc(st.err)+'</p>':'')
    +'<div class="form-act"><button class="btn" type="submit" id="savebtn">'+esc(T("save"))+'</button>'
    +((st.id&&st.col==="angajati"&&rec0&&rec0.by===ME&&st.data.status!=="Inactiv")?'<button class="btn danger" type="button" id="deact" title="'+esc(T("ang_deact_h"))+'">'+icon("trash")+'<span>'+esc(T("ang_deact"))+'</span></button>':'')
    +((st.id&&isDir&&st.col!=="angajati"&&st.col!=="proiecte"&&rec0&&rec0.by===ME&&!salPay)?'<button class="btn danger" type="button" id="delbtn" aria-label="'+esc(T("del"))+'" title="'+esc(T("del"))+'">'+icon("trash")+'</button>':'')
    +'</div></form>'+(st.id&&isDir?'<div class="sec" id="rec-hist"><h2>'+esc(T("rec_hist"))+'</h2><div class="card"><div class="empty">'+esc(T("j_loading"))+'</div></div></div>':'')+dls+'</div></div>';
  if(st.id&&isDir)loadRecHist(st.col,st.id);
  document.body.style.overflow="hidden";
  if(lockedOld){var sb=$("#savebtn");if(sb){var nt=document.createElement("p");nt.className="note";nt.textContent=T("lock_old");sb.parentNode.replaceChild(nt,sb);}
    Array.prototype.forEach.call($("#recf").querySelectorAll("input,select,textarea,button[data-pick]"),function(el){el.disabled=true});}
  dpClose();enhanceDates($("#sheet"));
}
function fieldHtml(f,v){
  var lbl=esc(T(f.l)),id="fl-"+f.k;
  var locked=!!(f.lockIf&&sheetState&&f.lockIf(sheetState.data));
  var ro=!!(f.roIf&&sheetState&&f.roIf(sheetState.data));
  var hintOn=!f.hintIf||!!(sheetState&&f.hintIf(sheetState.data));
  if(locked){v="1";if(sheetState)sheetState.data[f.k]="1";}
  if(f.t==="checkbox"){
    return '<label class="cb" for="'+id+'"><input type="checkbox" id="'+id+'" data-k="'+f.k+'"'+(v?" checked":"")+'><span>'+lbl+(f.hint?'<br><small style="color:var(--muted)">'+esc(T(f.hint))+'</small>':'')+'</span></label>';
  }
  if(f.t==="multi"){
    var sel=String(v||"").split(",").map(function(s){return s.trim()}).filter(Boolean);
    if(!f.opts.length)return '<label><span>'+lbl+'</span><p class="hint">'+esc(T("me_none"))+'</p></label>';
    return '<label><span>'+lbl+'</span><div class="multi" data-multi="'+f.k+'">'
      +f.opts.map(function(o,i){
        var on=sel.some(function(s){return s.toLowerCase()===String(o).toLowerCase()});
        return '<button type="button" class="chip" data-pick="'+esc(o)+'" aria-pressed="'+(on?"true":"false")+'">'+esc(o)+'</button>';
      }).join("")+'</div></label>';
  }
  if(f.t==="select"){
    var opts=f.opts.slice();
    /* the bank account holds lei only: a transfer (or a deposit to the account) fixes the currency to MDL, rate 1 */
    var fix=!!(f.mdlIf&&sheetState&&f.mdlIf(sheetState.data));
    if(fix){v="MDL";sheetState.data[f.k]="MDL";sheetState.data.curs="1";}
    if(f.k==="valuta")lbl=curBadge(v||"MDL",false)+' '+lbl;
    if(v&&!opts.some(function(o){return String(o.v)===String(v)}))opts.unshift({v:v,l:v});
    if(f.allowEmpty)opts.unshift({v:"",l:"—"});
    return '<label for="'+id+'"><span>'+lbl+(f.req?" *":"")+'</span><select id="'+id+'" data-k="'+f.k+'"'+(fix?' disabled':'')+'>'
      +opts.map(function(o){return '<option value="'+esc(o.v)+'"'+(String(v)===String(o.v)?" selected":"")+'>'+esc(o.l)+'</option>'}).join("")
      +'</select></label>'+(f.hint?'<p class="hint">'+esc(T(f.hint))+'</p>':"");
  }
  if(f.k==="categorie")v=catLabel(v);
  var type=f.t==="number"?"number":(f.t==="date"?"date":(f.t==="month"?"month":(f.t==="pin"?"password":"text")));
  var extra=f.t==="number"?' inputmode="decimal" step="'+(f.step||"0.01")+'"':(f.t==="pin"?' inputmode="numeric" autocomplete="off"':"");
  var list=f.list&&f.list.length?' list="dl-'+f.k+'" autocomplete="off"':"";
  if(f.noFuture)extra+=' max="'+today()+'"';
  return '<label for="'+id+'"><span>'+lbl+(f.req?" *":"")+'</span><input type="'+type+'" id="'+id+'" data-k="'+f.k+'" value="'+esc(v)+'"'+extra+list+((locked||ro)?' readonly':'')+'></label>'
    +((f.hint&&hintOn)?'<p class="hint">'+esc(T(f.hint))+'</p>':"");
}
function submitForm(){
  var st=sheetState;if(!st)return;
  var def=FORMS[st.col],fields=def.fields();
  var miss=fields.filter(function(f){
    if(f.showIf&&!f.showIf(st.data))return false;
    if(f.newOnly&&st.id&&st.col!=="angajati")return false;
    return f.req&&!String(st.data[f.k]||"").trim();
  });
  if(miss.length){st.err=T("req");drawSheet();return;}
  var short=fields.filter(function(f){return f.minlen&&String(st.data[f.k]||"").trim().length<f.minlen});
  if(short.length){st.err=T("descr_short");drawSheet();return;}
  var fut=fields.filter(function(f){return f.noFuture&&String(st.data[f.k]||"")>today()});
  if(fut.length){st.err=T("date_future");drawSheet();return;}
  if(st.col==="proiecte"){
    var ceP=n(st.data.contractEUR),ccP=n(st.data.contractCash),ctP=n(st.data.contractTransfer);
    if(ceP>0&&round2(ccP+ctP)!==round2(ceP)){st.err=T("contract_split");drawSheet();return;}
  }
  if(st.col==="pontaj"){
    var z1=n(st.data.z1),z2=n(st.data.z2);
    if(!(graficOre(st.data.angajat,st.data.luna).n>0)&&!dPlin(st.data).complet&&(z1<0||z1>15||z2<0||z2>16)){st.err=T("pontaj_zile");drawSheet();return;}
    if(S.pontaj.some(function(r){return r.id!==st.id&&r.by===ME&&r.luna===st.data.luna&&sameP(r.angajat,st.data.angajat)})){st.err=T("pontaj_dup");drawSheet();return;}
    if(st.data.achitat&&!(pontajDue(dPlin(st.data))>0.004)){st.err=T("pontaj_nosal");drawSheet();return;}
  }
  /* the bank account holds lei only */
  /* (a deposit from the till may come from any currency shelf: the account receives suma × curs in lei) */
  var toCont=(st.col==="incasari"||st.col==="chirii")&&st.data.mod==="Transfer";
  if(toCont&&st.data.valuta&&st.data.valuta!=="MDL"){st.err=T("cont_lei");drawSheet();return;}
  if(isDir&&!isCasierMe()&&!st.id&&st.col==="iesiri"&&st.data.din!=="Avans"){
    /* money leaves the common EHL till: the director confirms with his EHL code (the server checks it again) */
    if(ehlMode())st.data.codEHL=ehlCod(); /* signed in with the EHL code: it goes along by itself */
    else{
      var ce=String(st.data.codEHL||"").trim();
      if(!myCodEHL()){st.err=T("codehl_none");drawSheet();return;}
      if(ce!==myCodEHL()){st.err=T("codehl_bad");drawSheet();return;}
    }
  }
  var lipsa=casaErr(st.col,st.data,st.id)||avansErr(st.col,st.data,st.id); /* the account has no such check: it may go below zero */
  if(lipsa){st.err=lipsa;drawSheet();return;}
  /* money from a founder: the founder's own code confirms it (the server checks it again) */
  /* a project's incomes never exceed its contract + additional: what the client agreed is all there is to collect */
  if(st.col==="incasari"&&String(st.data.proiect||"").trim()){
    var prL=S.proiecte.filter(function(p){return sameP(p.nume,st.data.proiect)})[0];
    if(prL&&n(prL.contractEUR)>0){
      var gotL=projIncEur(prL.nume),oldL=st.id?S.incasari.filter(function(r){return r.id===st.id})[0]:null;
      var leftL=round2(n(prL.contractEUR)+aditEur(prL)-gotL.cash-gotL.tr+(oldL&&sameP(oldL.proiect,prL.nume)?incEur(oldL):0));
      if(incEur(st.data)>leftL+0.005){st.err=T("inc_peste").replace("{x}",money(Math.max(0,leftL))+" EUR");drawSheet();return;}
      /* and within its part: cash against the cash part, transfer against the transfer part; the additional fits either, once */
      if(n(prL.contractCash)+n(prL.contractTransfer)>0){
        var isTr=st.data.mod==="Transfer",oldSame=oldL&&sameP(oldL.proiect,prL.nume),oldEur=oldSame?incEur(oldL):0,oldTr=oldSame&&oldL.mod==="Transfer";
        var paidMode=(isTr?gotL.tr:gotL.cash)-((oldTr===isTr)?oldEur:0),paidOther=(isTr?gotL.cash:gotL.tr)-((oldTr!==isTr)?oldEur:0);
        var cPart=n(isTr?prL.contractTransfer:prL.contractCash),cOther=n(isTr?prL.contractCash:prL.contractTransfer);
        var extraP=Math.max(0,aditEur(prL)-Math.max(0,paidOther-cOther)),leftP=round2(cPart+extraP-paidMode);
        if(incEur(st.data)>leftP+0.005){st.err=T(isTr?"inc_peste_tr":"inc_peste_cash").replace("{x}",money(Math.max(0,leftP))+" EUR");drawSheet();return;}
      }
    }
  }
  if(st.col==="incasari"){var fo=fondatorOf(st.data.client);if(fo&&String(st.data.codFondator||"").trim()!==String(fo.cod||"")){st.err=T("codfond_bad");drawSheet();return;}}
  if(st.col==="schimburi"){
    if((st.data.valutaDin||"")===(st.data.valutaIn||"")){st.err=T("sch_same");drawSheet();return;}
    if(!(n(st.data.sumaDin)>0)||!(n(st.data.sumaIn)>0)){st.err=T("req");drawSheet();return;}
    var oldX=st.id?S.schimburi.filter(function(r){return r.id===st.id})[0]:null,haveX=soldVal(meName(),st.data.valutaDin)+((oldX&&oldX.valutaDin===st.data.valutaDin)?n(oldX.sumaDin):0);
    if(n(st.data.sumaDin)>haveX+0.004){st.err=T("sch_lipsa");drawSheet();return;}
  }
  var btn=$("#savebtn");if(btn){btn.disabled=true;btn.textContent=T("saving")}
  var d=st.data,col=st.col,p;
  if(col==="cheltuieli"&&d.categorie)d.categorie=catRaw(d.categorie);
  if(col==="utilizatori"){
    var ub={nume:String(d.nume).trim(),rol:st.id?d.rol:"Operator",cod:String(d.cod).trim(),codEHL:d.rol==="Director"?String(d.codEHL||"").trim():"",status:d.status};
    if(!st.id)ub.ehlCod=ehlCod(); /* the EHL code proves the user is made from the EHL account; the server checks it */
    if(ub.codEHL&&!/^\d{4,8}$/.test(ub.codEHL)){st.err=T("codehl_fmt");if(btn){btn.disabled=false;btn.textContent=T("save")}drawSheet();return;}
    var dup=S.utilizatori.filter(function(u){return u.id!==st.id&&String(u.cod)===ub.cod})[0];
    if(dup||!/^\d{4,8}$/.test(ub.cod)){st.err=T("cod_bad");if(btn){btn.disabled=false;btn.textContent=T("save")}drawSheet();return;}
    var self=!!(ACCESS&&st.id===ACCESS.user.id);
    if(self&&(ub.status==="Inactiv"||ub.rol!=="Director")){st.err=T("self_lock");if(btn){btn.disabled=false;btn.textContent=T("save")}drawSheet();return;}
    var oldU=st.id?((S.utilizatori.filter(function(u){return u.id===st.id})[0]||{}).nume||""):"";
    p=saveDoc("utilizatori",ub,st.id).then(function(){
      if(st.id)return renamePerson(oldU,ub.nume);
      if(d.caAngajat){
        return saveDoc("angajati",{nume:ub.nume,dataInceput:today(),status:"Activ"}).then(function(){
          if(n(d.salariu)>0)return saveDoc("istoric",{angajat:ub.nume,salariu:n(d.salariu),dinData:today()});
        });
      }
    });
  }else if(col==="angajati"){
    var body={nume:String(d.nume).trim(),dataInceput:d.dataInceput,status:d.status};
    var oldA=st.id?((S.angajati.filter(function(a){return a.id===st.id})[0]||{}).nume||""):"";
    p=saveDoc("angajati",body,st.id).then(function(){return renamePerson(oldA,body.nume)}).then(function(){
      /* a new employee earns the salary from the start date; a changed salary counts from the chosen date,
         so the months before it keep the old one. A second change for the same date corrects that row. */
      var sal=n(d.salariu);
      if(!(sal>0)||!angajatMeu(body.nume))return;
      var hist=S.istoric.filter(function(h){return sameP(h.angajat,body.nume)});
      var din=(st.id&&hist.length)?(d.dinSal||today()):(d.dataInceput||today());
      if(hist.length&&sal===salariuLa(body.nume,din))return;
      var same=hist.filter(function(h){return h.dinData===din})[0];
      return saveDoc("istoric",{angajat:body.nume,salariu:sal,dinData:din},same?same.id:null);
    });
  }else if(col==="imprumuturi"){
    var ib={data:d.data,persoana:String(d.persoana).trim(),suma:n(d.suma),valuta:d.valuta||"MDL",curs:(d.valuta||"MDL")==="MDL"?1:(n(d.curs)||1),termen:d.termen,status:d.status,nota:d.nota};
    p=saveDoc("imprumuturi",ib,st.id).then(function(){
      if(!st.id&&d.dinCasa)return saveDoc("iesiri",{sursa:"Avans",platitDe:meName(),data:d.data,destinatie:"Împrumut",valuta:ib.valuta,curs:ib.curs,
        suma:n(d.suma),persoana:ib.persoana,nota:(lang==="ru"?"Заём":"Împrumut")+" — "+ib.persoana});
    });
  }else{
    var b={};fields.forEach(function(f){
      if(f.t==="checkbox")return;
      if(f.newOnly&&st.id)return;
      if(col==="pontaj"&&f.k==="suma")return; /* the sum paid now is not a column of the Salarii row */
      b[f.k]=(f.t==="number")?n(d[f.k]):String(d[f.k]==null?"":d[f.k]).trim();
    });
    if(col==="cheltuieli"){b.categorie=catJoin(catRaw(b.categorie),b.subcat);delete b.subcat;
      if(!st.id){b.platitDe=meName();b.sursa=isCasierMe()?"":"Avans";} /* the payer is the account itself (a director from his own account); the server sets the same */
      if(b.pentru!=="Proiect"){b.proiect="";b.client="";}} /* "EHL" and "Altele" carry no project and no client */
    if(b.valuta==="MDL"&&("curs" in b))b.curs=1; /* lei never carry a rate */
    if(col==="iesiri"){delete b.din;if(!st.id){if(ieseDinAvans(null,d)){b.sursa="Avans";b.platitDe=meName();delete b.codEHL}else{b.sursa="Casa";b.platitDe=""}}else delete b.codEHL}
    if(col==="chirii"&&!st.id){if(!isCasierMe()){b.sursa="Avans";b.platitDe=meName()}else{b.sursa="Casa";b.platitDe=""}} /* the server sets the same */
    if(col==="proiecte"&&!st.id)b.responsabili=meName(); /* the project belongs to the account that created it */
    if(col==="schimburi"&&!st.id)b.persoana=meName(); /* the exchange is the account's own; the server sets the same */
    p=saveDoc(col,b,st.id);
    if(col==="pontaj"){b.complet=!!d.complet;}
    if(col==="pontaj"&&d.achitat){
      var dueB=dPlin({angajat:b.angajat,luna:b.luna,z1:b.z1,z2:b.z2,extra:b.extra,complet:!!d.complet}),due=pontajDue(dueB),pay=n(d.suma)>0?Math.min(round2(n(d.suma)),due):due;
      if(pay>0.004)p=p.then(function(){return platesteSalariu(b.angajat,b.luna,pay)});
    }
  }
  p.then(function(){closeSheet();toast(T("saved"))})
   .catch(function(e){st.err=saveErr(e);drawSheet();if(!netErr(e))selfCheck()}); /* a refusal may mean this device was signed out elsewhere */
}
/* why a save or a delete did not go through: no connection, or the server's own reason when it is one of ours */
function saveErr(e){
  if(netErr(e)||(e&&e.code==="no_db"))return T("offline");
  var m=String((e&&e.response&&e.response.message)||"").trim();
  return SRV_MSG[m]?srvT(m):T("save_err");
}

/* ---------------- date / month picker for mouse-driven screens ----------------
   Phones keep their native pickers (they are good); on desktop the native ones are ugly,
   so every <input type="date|month"> is wrapped: the real input stays (hidden) and keeps the
   ISO value and all handlers, a readonly display shows dd.mm.yyyy and opens our popover. */
var COARSE=false;try{COARSE=window.matchMedia("(pointer: coarse)").matches}catch(e){}
function dpFormat(v,type){
  if(!v)return "";
  if(type==="month")return monthName(v);
  var p=String(v).split("-");return p.length===3?p[2]+"."+p[1]+"."+p[0]:v;
}
function enhanceDates(root){
  if(COARSE)return;
  (root||document).querySelectorAll('input[type="date"]:not([data-dp]),input[type="month"]:not([data-dp])').forEach(function(inp){
    inp.setAttribute("data-dp","1");
    var wrap=document.createElement("span");wrap.className="dp-wrap";
    inp.parentNode.insertBefore(wrap,inp);wrap.appendChild(inp);
    var show=document.createElement("input");show.type="text";show.readOnly=true;show.className="dp-show";
    show.placeholder=inp.type==="month"?"—":"—.—.—";show.value=dpFormat(inp.value,inp.type);
    show.setAttribute("aria-haspopup","dialog");
    wrap.appendChild(show);
    inp.classList.add("dp-real");inp.tabIndex=-1;
    show.addEventListener("click",function(){dpOpen(inp,show)});
    show.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "||e.key==="ArrowDown"){e.preventDefault();dpOpen(inp,show)}});
    inp.addEventListener("input",function(){show.value=dpFormat(inp.value,inp.type)});
  });
}
var DP={inp:null,show:null,y:0,m:0};
function dpEl(){var p=$("#dpop");if(!p){p=document.createElement("div");p.id="dpop";p.className="dpop";p.hidden=true;document.body.appendChild(p)}return p}
function dpOpen(inp,show){
  var v=inp.value||today();
  DP.inp=inp;DP.show=show;DP.y=parseInt(v.slice(0,4),10)||new Date().getFullYear();DP.m=parseInt(v.slice(5,7),10)||(new Date().getMonth()+1);
  dpRender();
  var p=dpEl();p.hidden=false;
  var r=show.getBoundingClientRect(),w=Math.min(300,window.innerWidth-16);
  p.style.width=w+"px";
  p.style.left=Math.max(8,Math.min(r.left,window.innerWidth-w-8))+"px";
  var top=r.bottom+6;if(top+360>window.innerHeight)top=Math.max(8,r.top-6-360);
  p.style.top=top+"px";
  var f=p.querySelector(".dp-sel")||p.querySelector(".dp-day");if(f)f.focus();
}
function dpClose(){var p=$("#dpop");if(p)p.hidden=true;DP.inp=null;DP.show=null}
function dpSet(v){
  if(!DP.inp)return;
  DP.inp.value=v;
  DP.inp.dispatchEvent(new Event("input",{bubbles:true}));
  DP.inp.dispatchEvent(new Event("change",{bubbles:true}));
  if(DP.show)DP.show.value=dpFormat(v,DP.inp.type);
  dpClose();
}
function dpRender(){
  var p=dpEl(),isMonth=DP.inp.type==="month",cur=DP.inp.value||"",td=today();
  var names=lang==="ru"?["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]:["Lu","Ma","Mi","Jo","Vi","Sâ","Du"];
  var h='<div class="dp-head"><button type="button" class="dp-nav" data-dpnav="-1" aria-label="prev">'+icon("chevL")+'</button>'
    +'<span class="dp-title">'+esc(isMonth?String(DP.y):monthName(DP.y+"-"+p2(DP.m)))+'</span>'
    +'<button type="button" class="dp-nav" data-dpnav="1" aria-label="next">'+icon("chevR")+'</button></div>';
  if(isMonth){
    h+='<div class="dp-months">';
    for(var mm=1;mm<=12;mm++){var ym=DP.y+"-"+p2(mm);
      h+='<button type="button" class="dp-day dp-mon'+(ym===cur?" dp-sel":"")+(ym===td.slice(0,7)?" dp-today":"")+'" data-dpv="'+ym+'">'+esc(monthName(ym).split(" ")[0].slice(0,3))+'</button>';}
    h+='</div>';
  }else{
    h+='<div class="dp-grid">'+names.map(function(n){return '<span class="dp-wd">'+n+'</span>'}).join("");
    var first=new Date(DP.y,DP.m-1,1),lead=(first.getDay()+6)%7,days=new Date(DP.y,DP.m,0).getDate(),prevDays=new Date(DP.y,DP.m-1,0).getDate();
    var cells=[];
    for(var i=lead-1;i>=0;i--)cells.push({d:prevDays-i,off:-1});
    for(var d=1;d<=days;d++)cells.push({d:d,off:0});
    while(cells.length%7)cells.push({d:cells.length-lead-days+1,off:1});
    cells.forEach(function(c){
      var y=DP.y,m=DP.m+c.off;if(m<1){m=12;y--}if(m>12){m=1;y++}
      var iso=y+"-"+p2(m)+"-"+p2(c.d),dis=!!(DP.inp.max&&iso>DP.inp.max);
      h+='<button type="button" class="dp-day'+(c.off?" dp-off":"")+(iso===cur?" dp-sel":"")+(iso===td?" dp-today":"")+'" data-dpv="'+iso+'"'+(dis?' disabled':'')+'>'+c.d+'</button>';
    });
    h+='</div>';
  }
  h+='<div class="dp-foot"><button type="button" class="dp-btn" data-dpv="">'+esc(lang==="ru"?"Очистить":"Șterge")+'</button>'
    +'<button type="button" class="dp-btn dp-az" data-dpv="'+(isMonth?td.slice(0,7):td)+'">'+esc(lang==="ru"?"Сегодня":"Azi")+'</button></div>';
  p.innerHTML=h;
}
document.addEventListener("click",function(e){
  var p=$("#dpop");if(!p||p.hidden)return;
  var t=e.target;
  if(p.contains(t)){
    var nav=t.closest("[data-dpnav]");
    if(nav){var k=parseInt(nav.getAttribute("data-dpnav"),10);if(DP.inp.type==="month")DP.y+=k;else{DP.m+=k;if(DP.m<1){DP.m=12;DP.y--}if(DP.m>12){DP.m=1;DP.y++}}dpRender();return;}
    var v=t.closest("[data-dpv]");if(v){dpSet(v.getAttribute("data-dpv"));return;}
    return;
  }
  if(DP.show&&(t===DP.show||DP.show.contains(t)))return;
  dpClose();
},true);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&document.body.classList.contains("menu-open")){closeMenu();return;}});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){var p=$("#dpop");if(p&&!p.hidden){dpClose();e.stopPropagation()}}},true);
window.addEventListener("resize",dpClose);
/* the cash-flow chart is drawn for the current width class; redraw when the window crosses it */
if(WIDE_MQ){if(WIDE_MQ.addEventListener)WIDE_MQ.addEventListener("change",render);else if(WIDE_MQ.addListener)WIDE_MQ.addListener(render);}
/* Pointing at a category (list row, legend, slice) lights its slice and puts its share and name in the middle of the ring. */
var ovHot=null,ovSvg=null;
function ovHL(cat){
  var svg=$(".ov .donut");if(!svg)return;
  if(cat===ovHot&&svg===ovSvg)return;ovHot=cat;ovSvg=svg;
  var hit=null;
  Array.prototype.forEach.call(svg.querySelectorAll(".seg"),function(s){var on=cat!==null&&s.getAttribute("data-cat")===cat;s.classList.toggle("on",on);if(on)hit=s});  svg.classList.toggle("hl",!!hit);
  var m=$(".mid",svg),m2=$(".mid2",svg);if(!m||!m2)return;
  if(m.dataset.t==null){m.dataset.t=m.textContent;m2.dataset.t=m2.textContent;m.dataset.y=m.getAttribute("y");m2.dataset.y=m2.getAttribute("y")}
  m.textContent=hit?hit.getAttribute("data-pct"):m.dataset.t;
  m2.classList.toggle("nm",!!hit);
  /* the name in sentence case, wrapped at spaces onto two lines when long; the figure moves up to make room */
  var lines=hit?ovWrap(hit.getAttribute("data-label")||hit.getAttribute("data-cat"),15):[m2.dataset.t];
  while(m2.firstChild)m2.removeChild(m2.firstChild);
  lines.forEach(function(t,i){var ts=document.createElementNS("http://www.w3.org/2000/svg","tspan");ts.setAttribute("x",m2.getAttribute("x"));if(i)ts.setAttribute("dy","1.25em");ts.textContent=t;m2.appendChild(ts)});
  var two=lines.length>1;
  m.setAttribute("y",two?+m.dataset.y-8:m.dataset.y);m2.setAttribute("y",two?+m2.dataset.y-6:m2.dataset.y);
}
/* at most two lines of up to max characters, split at spaces; whatever does not fit ends in an ellipsis */
function ovWrap(s,max){
  var words=String(s||"").split(/\s+/).filter(Boolean),out=[""];
  words.forEach(function(w){var cur=out[out.length-1];if(!cur||(cur+" "+w).length<=max)out[out.length-1]=cur?cur+" "+w:w;else out.push(w)});
  if(out.length>2)out=[out[0],out.slice(1).join(" ")];
  return out.map(function(l){return l.length>max?l.slice(0,max-1)+"…":l});
}
function ovCatOf(t){var el=t&&t.closest?t.closest(".ov [data-cat]"):null;var c=el?el.getAttribute("data-cat"):"";return c?c:null}
document.addEventListener("mouseover",function(e){ovHL(ovCatOf(e.target))});
document.addEventListener("focusin",function(e){ovHL(ovCatOf(e.target))});
/* zoom is off on phones by the owner's choice: iOS Safari ignores user-scalable=no, so pinch gestures are cancelled here */
document.addEventListener("gesturestart",function(e){e.preventDefault()});
document.addEventListener("touchmove",function(e){if(e.touches&&e.touches.length>1)e.preventDefault()},{passive:false});
/* the brand is a div acting as a link: Enter or Space opens it too */
document.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target&&e.target.matches&&e.target.matches(".brand[data-view]")){e.preventDefault();e.target.click()}});
document.addEventListener("scroll",function(e){var p=$("#dpop");if(p&&!p.hidden&&!(e.target&&e.target.closest&&e.target.closest("#dpop")))dpClose()},true);

/* ---------------- events ---------------- */
document.addEventListener("click",function(ev){
  var t=ev.target;
  var lb=t.closest&&t.closest("[data-lang]");
  if(lb){lang=lb.dataset.lang;try{localStorage.setItem("ehl.lang",lang)}catch(e){}render();if(sheetState)drawSheet();return;}
  var nv=t.closest&&t.closest("[data-view]");
  /* another view starts at the top of the page */
  if(nv){var nvNew=nv.dataset.view!==view;if(nvNew){view=nv.dataset.view;histPush({v:view});}render();if(nvNew)window.scrollTo(0,0);return;}
  var fb=t.closest&&t.closest("[data-form]");
  if(fb){if(fb.dataset.form==="grafic"){openGrafic();return;}openForm(fb.dataset.form);return;}
  var gs=t.closest&&t.closest("[data-grset]");
  if(gs){var gsa=gs.getAttribute("data-gra"),gsd=gs.getAttribute("data-grd"),gsw=n(gs.getAttribute("data-grset")),gsc=grRec(gsa,gsd);grSet(gsa,gsd,(gsc&&n(gsc.ore)===gsw)?0:gsw);return;}
  var gmd=t.closest&&t.closest("[data-grmode]");
  if(gmd){GR.mode=gmd.getAttribute("data-grmode")==="zi"?"zi":"ang";drawGrafic();return;}
  var ga=t.closest&&t.closest("[data-grafic]");
  if(ga){openGrafic(ga.getAttribute("data-grafic"),OV.luna||curMonth());return;}
  var cb=t.closest&&t.closest("[data-colab]");
  if(cb){openColab(cb.getAttribute("data-colab"));return;}
  var eb=t.closest&&t.closest("[data-edit]");
  if(eb){openForm(eb.dataset.edit,eb.dataset.id);return;}
  if(t.closest&&t.closest("#regmore")){if(document.body.classList.contains("menu-open"))closeMenu();else openRegPick();return;}
  if(t.closest&&t.closest(".pick-i"))closeMenu();
  var tb=t.closest&&t.closest("[data-tab]");
  if(tb){var tbNew=tb.dataset.tab!==regTab;regTab=tb.dataset.tab;render();if(tbNew)window.scrollTo(0,0);return;}
  var pk=t.closest&&t.closest("[data-pick]");
  if(pk&&sheetState){
    var wrap=pk.parentNode,key=wrap.dataset.multi;
    var on=pk.getAttribute("aria-pressed")==="true";
    pk.setAttribute("aria-pressed",on?"false":"true");
    var picked=[];
    wrap.querySelectorAll('[data-pick]').forEach(function(b){if(b.getAttribute("aria-pressed")==="true")picked.push(b.dataset.pick)});
    sheetState.data[key]=picked.join(", ");
    return;
  }
  if(t.closest&&t.closest("#mechg")){logout();return;}
  if(t.closest&&t.closest("#closeSheet")){closeSheet();return;}
  /* a click on the dimmed backdrop around a form window closes it */
  if(t.classList&&t.classList.contains("sheet")){closeSheet();return;}
  if(t.closest&&t.closest("#deact")){
    var db=t.closest("#deact");
    if(db.dataset.armed==="1"){
      var oldA=sheetState.id,nmA=sheetState.data.nume;
      saveDoc("angajati",{nume:String(nmA).trim(),dataInceput:sheetState.data.dataInceput,status:"Inactiv"},oldA).then(function(){closeSheet();toast(T("ang_deact_done"))})
        .catch(function(e){if(!sheetState)return;sheetState.err=saveErr(e);drawSheet()});
    }else{db.dataset.armed="1";db.innerHTML=icon("trash")+'<span>'+esc(T("ang_deact_yes"))+'</span>';}
    return;
  }
  if(t.closest&&t.closest("#delbtn")){
    var b=t.closest("#delbtn");
    if(b.dataset.armed==="1"){
      delDoc(sheetState.col,sheetState.id).then(function(){closeSheet();toast(T("deleted"))})
        .catch(function(e){if(!sheetState)return;sheetState.err=saveErr(e);drawSheet()});
    }else{b.dataset.armed="1";b.innerHTML=icon("trash")+'<span>'+esc(T("del_yes"))+'</span>';}
    return;
  }
  if(t.closest&&t.closest("#burger")){openMenu();return;}
  if(t.closest&&t.closest("[data-menu-close]")){closeMenu();return;}
  var gt=t.closest&&t.closest("[data-goto]");
  if(gt){var bl=dashBlocks()[+gt.getAttribute("data-goto")];closeMenu();if(bl)bl.el.scrollIntoView({behavior:"smooth",block:"start"});return;}
  var cd=t.closest&&t.closest("[data-catdel]");
  if(cd){var chip=cd.closest(".cat-chip");if(!chip.classList.contains("arm")){Array.prototype.forEach.call(document.querySelectorAll(".cat-chip.arm"),function(x){x.classList.remove("arm")});chip.classList.add("arm");setTimeout(function(){chip.classList.remove("arm")},3000);return;}
    var cl=catBase();cl.splice(+cd.getAttribute("data-catdel"),1);catSave(cl);return;}
  var pb=t.closest&&t.closest("[data-page]");
  if(pb){if(!pb.disabled){REGPAGE[regTab]=+pb.getAttribute("data-page");render();var sc=$(".tbl-card")||$(".reg-rows");if(sc)window.scrollTo(0,Math.max(0,sc.getBoundingClientRect().top+window.scrollY-90));}return;}
  var gr=t.closest&&t.closest("[data-grp]");
  if(gr){var tb=gr.closest("tbody"),gk=gr.getAttribute("data-grp");if(tb){if(tb.classList.toggle("closed"))REGCLOSED[gk]=1;else delete REGCLOSED[gk];}return;}
  var mb=t.closest&&t.closest("[data-more]");
  if(mb){var mc=mb.closest(".card");if(mc){var mo=mc.classList.toggle("open");if(mc.classList.contains("ov-exp"))OV.more=mo;}return;}
  var ol=t.closest&&t.closest("[data-ovluna]");
  if(ol){OV.luna=ol.getAttribute("data-ovluna")||"";render();return;}
  var dc=t.closest&&t.closest("[data-cat]");
  if(dc&&!isDir)return; /* the registers are the director's */
  if(dc){var dcat=dc.getAttribute("data-cat")||"";
    if(sameP(dcat,OV_CHIRIE)&&!S.cheltuieli.some(function(r){return sameP(catMain(r.categorie),OV_CHIRIE)})){regFilter={col:"chirii",categorie:"",luna:OV.luna};REGPAGE.chirii=0;regTab="chirii";} /* the rents slice opens the rents register */
    else{regFilter={col:"cheltuieli",categorie:dcat,luna:OV.luna};REGPAGE.cheltuieli=0;regTab="cheltuieli";}
    if(view!=="reg"){view="reg";histPush({v:view});}render();return;}
  if(t.closest&&t.closest("[data-clearfilter]")){regFilter=null;REGPAGE[regTab]=0;render();return;}
  var ra=t.closest&&t.closest("[data-restore-ang]");
  if(ra){ra.disabled=true;saveDoc("angajati",{status:"Activ"},ra.getAttribute("data-restore-ang")).then(function(){toast(T("restored"));render()}).catch(function(e){toast(saveErr(e));render()});return;}
  var du=t.closest&&t.closest("[data-deact-user]");
  if(du){du.disabled=true;saveDoc("utilizatori",{status:"Inactiv"},du.getAttribute("data-deact-user")).then(function(){toast(T("u_deact_done"));render()}).catch(function(e){toast(saveErr(e));render()});return;}
  var fb=t.closest&&t.closest("[data-fold]");if(fb){var fk=fb.getAttribute("data-fold");FOLD[fk]=!FOLD[fk];render();return;} /* a folding block opens or closes */
  var rs=t.closest&&t.closest("[data-restore]");
  if(rs){rs.disabled=true;saveDoc("utilizatori",{status:"Activ"},rs.getAttribute("data-restore")).then(function(){toast(T("restored"));render()}).catch(function(e){toast(saveErr(e));render()});return;}
  var rf=t.closest&&t.closest("[data-retry]");
  if(rf){retryFailed(parseInt(rf.getAttribute("data-retry"),10));return;}
  var df=t.closest&&t.closest("[data-dropfailed]");
  if(df){if(df.dataset.armed==="1"){dropFailed(parseInt(df.getAttribute("data-dropfailed"),10))}else{df.dataset.armed="1";df.textContent=T("del_yes")}return;}
  if(t.closest&&t.closest("#expbtn")){exportRun(JUR.luna,false);return;}
  if(t.closest&&t.closest("#exitdir")){try{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}catch(e){}logout();return;}
  if(t.closest&&t.closest("#resetAll")){openReset();return;}
  if(t.closest&&t.closest("#gateback")){GATE={step:"cod"};gateErr="";render();return;}
  if(t.closest&&t.closest("#gateother")){try{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}catch(e){}GATE={step:"cod"};logout();return;}
  if(t.closest&&t.closest("#installbtn")&&installEvt){var ev2=installEvt;installEvt=null;ev2.prompt();render();return;}
});
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();installEvt=e;if(!sheetState)render()});
window.addEventListener("appinstalled",function(){installEvt=null;if(!sheetState)render()});
document.addEventListener("input",function(ev){
  var el=ev.target;
  if(!sheetState||!el.dataset||!el.dataset.k)return;
  var k=el.dataset.k;
  sheetState.data[k]=(el.type==="checkbox")?el.checked:el.value;
  if(k==="curs"&&sheetState.data.valuta==="MDL"){sheetState.data.curs="1";el.value="1";}
  var def=FORMS[sheetState.col];
  if(def&&def.calc){
    var box=document.querySelectorAll(".calcbox");
    var vals=def.calc(sheetState.data);
    box.forEach(function(b,i){if(vals[i])b.lastElementChild.textContent=vals[i].v});
  }
});
document.addEventListener("change",function(ev){
  var el=ev.target;
  if(el.dataset&&el.dataset.gr){grChange(el);return;}
  if(!sheetState||!el.dataset||!el.dataset.k)return;
  var k=el.dataset.k;
  sheetState.data[k]=(el.type==="checkbox")?el.checked:el.value;
  if(k==="valuta"){sheetState.data.curs=String(cursAzi(el.value));drawSheet();return;}
  if(k==="proiect"){var pj=S.proiecte.filter(function(p){return sameP(p.nume,el.value)})[0];if(pj&&pj.client){sheetState.data.client=pj.client;drawSheet();}return;}
  if(sheetState.col==="proiecte"&&(k==="contractEUR"||k==="contractCash")){var pd=sheetState.data;pd.contractTransfer=String(Math.max(0,round2(n(pd.contractEUR)-n(pd.contractCash))));drawSheet();return;} /* the transfer part is what is left of the contract */
  if(sheetState.col==="iesiri"&&isDir&&!sheetState.id&&(k==="persoana"||k==="destinatie")){
    /* to a director, to the bank, a loan, back to a founder or "other": from the EHL till; to a collaborator or a salary: from my account */
    var dd=sheetState.data,toPerson=dd.destinatie==="Dat persoanei"&&String(dd.persoana||"").trim()&&!fondatorOf(dd.persoana);
    dd.din=(toPerson||dd.destinatie==="Salarii")?"Avans":"Casa";drawSheet();return;
  }
  if(k==="din"&&sheetState.col==="iesiri"&&el.value!=="Avans"&&DEST_CASA.indexOf(sheetState.data.destinatie)<0)sheetState.data.destinatie="Dat persoanei"; /* from the till only the allowed destinations */
  if(k==="destinatie"||k==="mod"||k==="categorie"||k==="client"||k==="pentru"||k==="din"||el.type==="checkbox"){drawSheet();return;}
  if(sheetState.col==="pontaj"&&(k==="angajat"||k==="luna")){
    if(!sheetState.id){var exP=S.pontaj.filter(function(r){return r.luna===sheetState.data.luna&&sameP(r.angajat,sheetState.data.angajat)})[0];if(exP){openForm("pontaj",exP.id);return;}}
    pontajDinGrafic(sheetState.data);
  }
  if(k==="angajat"||k==="luna"||(sheetState.col==="pontaj"&&(k==="z1"||k==="z2"||k==="extra"||k==="achitat"||k==="complet"))||(sheetState.col==="angajati"&&(k==="salariu"||k==="dinSal"))){var def=FORMS[sheetState.col];if(def&&def.calc)drawSheet();} /* the days decide whether the "Achitat" box is offered */
});
document.addEventListener("submit",function(ev){
  var f=ev.target;ev.preventDefault();
  if(f.id==="recf"){submitForm();return;}
  if(f.id==="resetf"){doReset(String(f.elements["cod"].value||"").trim());return;}
  var gateFail=function(e,dflt){
    gateBusy=false;
    if(e&&e.stack&&!e.status&&!e.code){try{console.error("sign-in failed inside the app:",e.stack||e)}catch(x){}} /* a bug, not a wrong code: keep it visible */
    var srv=e&&e.response&&e.response.message;
    gateErr=netErr(e)?T("offline"):(((e&&e.status===429)||(e&&e.status===400))&&srv?srvT(srv):dflt);
    render();
  };
  if(f.id==="pinf"){
    var v=$("#pinv").value.trim();
    if(!v||gateBusy){$("#pinerr").hidden=false;return;}
    if(GATE.relock){
      /* lock screen: compared with the code of the signed-in user (or the remembered director code), no server round trip */
      var want=LOCKED&&ACCESS?((ehlMode()&&ehlCod())||String(ACCESS.user.cod||"")):String(GATE.cod||""); /* the code this session was opened with */
      if(want&&v===want){
        if(LOCKED){unlockScreen();return;}
        GATE={step:"parola",cod:v,weekly:!!GATE.weekly,nume:GATE.nume};gateErr="";render();return;
      }
      gateErr=T("gate_bad");render();return;
    }
    gateBusy=true;gateErr="";render();
    login(v).then(function(){gateBusy=false;render()}).catch(function(e){gateFail(e,T("gate_bad"))});
    return;
  }
  if(f.id==="pwf"){
    var pw=f.elements["p"].value;
    if(!pw||gateBusy)return;
    gateBusy=true;gateErr="";render();
    login(GATE.cod,pw).then(function(){gateBusy=false;render()}).catch(function(e){gateFail(e,T("pw_bad"))});
    return;
  }
  if(f.id==="spf"){
    var p1=f.elements["p1"].value,p2=f.elements["p2"].value;
    if(gateBusy)return;
    if(p1.length<8){gateErr=T("pw_short");render();return;}
    if(p1!==p2){gateErr=T("pw_mismatch");render();return;}
    gateBusy=true;gateErr="";render();
    login(GATE.cod,"",p1).then(function(){gateBusy=false;toast(T("pw_saved"));render()}).catch(function(e){gateFail(e,T("gate_bad"))});
    return;
  }
  if(f.id==="pwchg"){
    var ve=f.elements["veche"].value,no=f.elements["noua"].value,no2=f.elements["noua2"].value;
    if(no.length<8){toast(T("pw_short"));return;}
    if(no!==no2){toast(T("pw_mismatch"));return;}
    PB.send("/api/ehl/password",{method:"POST",body:{veche:ve,noua:no},requestKey:null})
      .then(function(res){
        if(res&&res.token){PB.authStore.save(res.token,PB.authStore.record||PB.authStore.model);try{localStorage.setItem("ehl.exp",String(res.expires||0))}catch(e){}}
        f.reset();toast(T("pw_saved"));
      })
      .catch(function(e){var srv=e&&e.response&&e.response.message;toast(netErr(e)?T("offline"):(srv?srvT(srv):T("pw_bad")))});
    return;
  }
  if(f.id==="valf"){
    var arr=[],i=0;
    while(f.elements["cod"+i]){var cod=f.elements["cod"+i].value.trim().toUpperCase();
      if(cod)arr.push({cod:cod,curs:cod==="MDL"?1:n(f.elements["curs"+i].value)||1});i++;}
    var nc=f.elements["newcod"].value.trim().toUpperCase();
    if(nc&&!arr.some(function(x){return x.cod===nc}))arr.push({cod:nc,curs:n(f.elements["newcurs"].value)||1});
    /* a currency that rows were entered in must stay in the list, or its shelf drops out of the till */
    var gone=uniq(S.incasari.concat(S.iesiri,S.chirii).map(function(r){return r.valuta})).filter(function(v){return !arr.some(function(x){return x.cod===v.toUpperCase()})})[0];
    if(gone){toast(T("val_used").replace("{v}",gone));return;}
    saveCfg({valute:arr}).then(function(){toast(T("saved"));render()}).catch(function(){toast(T("offline"))});
    return;
  }
  if(f.id==="expf"){exportRun(f.elements["luna"].value||curMonth(),f.elements["doar"].checked);return;}
  if(f.id==="jurf"){JUR.luna=f.elements["luna"].value||curMonth();loadJurnal();return;}
  if(f.id==="mef"){
    var nm=f.elements["nume"].value.trim();
    if(!nm)return;
    render();toast(T("saved"));return;
  }
  if(f.id==="casf"){saveCfg({casier:f.elements["casier"].value.trim()}).then(function(){toast(T("saved"));render()}).catch(function(){toast(T("offline"))});return;}
  if(f.id==="catadd"){var nv2=catRaw(f.elements["nc"].value.trim());if(!nv2){render();return;}var cl2=catBase();if(!cl2.some(function(x){return sameP(x,nv2)}))cl2.push(nv2);catSave(cl2);return;}
  if(f.id==="catf"){var list=uniq(f.elements["cat"].value.split("\n").map(function(s){return catRaw(s.trim())}).filter(Boolean));
    saveCfg({categorii:list}).then(function(){toast(T("saved"));render()}).catch(function(){toast(T("offline"))});return;}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&sheetState)closeSheet()});

/* ---------------- boot ---------------- */
if(HIST){try{HIST.replaceState({v:view},"")}catch(e){}}
render();
(function boot(){
  verCheck(); /* remembers the version this page was loaded with */
  if(!window.PocketBase){noCfg=true;render();return;}
  try{
    PB=new PocketBase(String(window.PB_URL||"").replace(/\/+$/,"")||window.location.origin);
    PB.autoCancellation(false);
  }catch(e){authErr=String(e&&e.message||e);render();return;}
  online=navigator.onLine!==false;
  var rec=PB.authStore.record||PB.authStore.model;
  if(PB.authStore.isValid&&rec&&rec.id){
    enter(rec);
    if(lockDue())lockScreen(); /* the code is asked again when the last entry is older than LOCK_AFTER */
    /* confirm the session with the server: a deactivated user or an expired director week ends it */
    selfCheck();
  }else{
    var sc="";try{sc=localStorage.getItem("ehl.cod")||""}catch(e){}
    /* a code remembered by the old password flow is dropped while the password is off: the plain code screen follows */
    if(sc&&!PAROLA_DIR){try{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}catch(e){}sc="";}
    if(sc)GATE={step:"cod",relock:true,weekly:!!sessionExp(),cod:sc};
    render();
  }
  window.addEventListener("online",function(){selfCheck()});
  if(navigator.serviceWorker&&navigator.serviceWorker.register){
    window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").catch(function(){})});
  }
})();
})();