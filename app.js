(function(){
"use strict";

/* ---------------- i18n ---------------- */
var I18N={
ro:{
 app:"Casieria EHL",director:"Director",angajat:"Operator",oaspete:"Vizitator",
 nav_panou:"Panou",nav_add:"Adaugă",nav_reg:"Registre",nav_set:"Setări",nav_mine:"Ale mele",
 // dashboard
 t_total:"Banii firmei",t_casa:"În casă",t_cont:"Pe cont",t_colab:"La colaboratori",
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
 a_impr:"Împrumut",a_impr_d:"Bani dați cu termen",
 a_contr:"Contract",a_contr_d:"Sumă și plan de încasare",
 a_pontaj:"Pontaj",a_pontaj_d:"Zile lucrate pe lună",
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
 req:"Completați câmpurile obligatorii.",
 // registers
 r_inc:"Încasări",r_chelt:"Cheltuieli",r_ies:"Ieșiri din casă",r_chirii:"Chirii",
 r_contr:"Contracte",r_sal:"Salarii",r_impr:"Împrumuturi",
 mine_t:"Ce am introdus eu",mine_e:"Nu ați introdus încă nimic.",
 nothing:"Nimic încă",nothing_d:"Apăsați „Adaugă” ca să începeți.",
 // settings
 set_val:"Valute și cursuri",set_val_h:"Cursul de azi. Se folosește pentru soldul casei, nu pentru rândurile deja introduse.",
 set_cas:"Casierul",set_cas_h:"Banii dați casierului nu sunt socotiți ieșire din casă.",
 set_cat:"Categorii de cheltuieli",set_cat_h:"Câte una pe rând.",
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
 me_t:"Eu sunt",me_h:"Alegeți-vă numele. Proiectele dvs. și câmpul „Plătit de” se completează singure.",
 me_ch:"Schimbă",me_pick:"Alegeți numele",me_none:"Nicio persoană în listă. Directorul adaugă angajații.",
 proj_none:"Niciun proiect încă",proj_none_d:"Directorul creează proiectele și le dă responsabili.",
 r_jur:"Istoric",j_h:"Fiecare adăugare, modificare și ștergere rămâne aici, cu autorul, ora și valorile de atunci.",
 j_load:"Arată luna",j_loading:"Se caută…",j_empty:"Nicio operațiune în luna aceasta.",
 j_add:"Adăugat",j_edit:"Modificat",j_del:"Șters",j_by:"de",
 j_exp:"Descarcă Excel",j_exp_h:"Un fișier .xlsx gata de citit: panou, toate registrele și istoricul, fiecare pe foaia lui, cu filtre și totaluri.",
 exported:"Descărcat",exp_no:"Descărcarea nu este disponibilă aici.",exp_work:"Se pregătește…",
 exp_t:"Export Excel",exp_tot:"Toate datele",exp_luna:"Doar luna aleasă",exp_btn:"Descarcă .xlsx",
 a_user:"Utilizator",a_user_d:"Acces pentru un angajat nou",r_user:"Utilizatori",
 f_rol:"Rol",rol_op:"Operator",rol_dir:"Director",f_cod:"Cod de acces",
 f_cod_h:"Patru cifre pe care i le dați angajatului. Cu ele intră în aplicație de pe telefonul lui.",
 also_ang:"Îl trec și la angajați, cu salariu",
 gate_t:"Cod de acces",gate_h:"Introduceți codul primit de la director. La prima pornire a aplicației, codul introdus devine codul directorului.",gate_bad:"Cod greșit sau utilizator dezactivat.",
 u_none:"Niciun utilizator încă",u_none_d:"Adăugați primul utilizator ca angajații să poată intra cu codul lor.",
 logout:"Schimbă utilizatorul",u_inactiv:"Dezactivat",
 setup_t:"Aplicația nu este configurată",setup_h:"Biblioteca serverului nu s-a încărcat. Reîncărcați pagina; dacă persistă, verificați fișierul vendor/pocketbase.umd.js.",
 auth_err:"Nu se poate conecta la server.",
 offline_note:"Fără conexiune. Puteți introduce date, se trimit când revine internetul.",
 pending:"{n} înregistrări așteaptă trimiterea la server.",
 first_pin:"Prima pornire: acest cod a devenit codul directorului. Schimbați-vă numele în Setări → Utilizatori.",
 install:"Instalează pe telefon",cod_bad:"Codul trebuie să aibă 4–8 cifre și să nu fie folosit deja.",
 self_lock:"Nu vă puteți dezactiva sau retrograda propriul cont.",
 pw_t:"Parola directorului",pw_h:"Pe un telefon nou directorul confirmă parola. Apoi se cere din nou o dată pe săptămână.",
 pw_week:"A trecut o săptămână de la ultima confirmare. Introduceți parola ca să continuați.",
 pw_set_t:"Setați parola directorului",pw_set_h:"Codul rămâne pentru intrare. Parola se cere pe fiecare telefon nou și o dată pe săptămână. Minim 8 caractere.",
 f_parola:"Parola",f_parola2:"Repetați parola",f_parola_veche:"Parola actuală",f_parola_noua:"Parola nouă",
 pw_short:"Parola trebuie să aibă cel puțin 8 caractere.",pw_mismatch:"Parolele nu coincid.",pw_bad:"Parolă greșită.",
 pw_saved:"Parola a fost salvată.",pw_other:"Alt cod",set_pw:"Parola directorului",set_pw_h:"Se cere pe fiecare telefon nou și o dată pe săptămână."
},
ru:{
 app:"Касса EHL",director:"Директор",angajat:"Оператор",oaspete:"Гость",
 nav_panou:"Сводка",nav_add:"Добавить",nav_reg:"Журналы",nav_set:"Настройки",nav_mine:"Мои записи",
 t_total:"Деньги фирмы",t_casa:"В кассе",t_cont:"На счету",t_colab:"У сотрудников",
 t_incasari:"Поступления",t_cheltuieli:"Расходы",
 s_bani:"Сводка по деньгам",s_casa:"Касса по валютам",s_colab:"Отчёт по сотрудникам",
 s_client:"Сальдо по клиентам",s_proiect:"Расходы по проектам",s_categ:"Расходы по категориям",
 s_contr:"Договоры",s_sal:"Зарплаты",s_impr:"Займы",s_chirii:"Аренда",
 l_num:"Поступило наличными",l_tr:"Поступило переводом",l_chnum:"Расходы наличными",l_chtr:"Расходы переводом",
 l_salplatit:"Выплачено зарплат",l_avans:"Выдано авансов",l_depus:"Внесено на счёт",l_chirii:"Оплачено аренды",
 l_castigat:"Начислено",l_plata:"Выплачено",l_rest:"Остаток к выплате",l_imprtot:"Выдано займов",
 l_restituit:"Возвращено",l_derecup:"К возврату",l_restante:"Просрочено",l_nrcontr:"Договоров",
 l_valcontr:"Сумма договоров",l_incas:"Получено",l_ramas:"Остаток",l_procent:"Процент получен",
 l_primit:"Получил",l_cheltuit:"Потратил",l_inmana:"Осталось на руках",l_justif:"Не отчитались",
 l_total:"Итого",l_azi:"по курсу на сегодня",l_impr:"Займы из кассы",l_alte:"Прочие выдачи",
 add_t:"Что записываем?",
 a_inc:"Поступление",a_inc_d:"Деньги от клиента",
 a_chelt:"Расход",a_chelt_d:"Потраченные деньги, в леях",
 a_ies:"Выдача из кассы",a_ies_d:"Аванс, внесение, зарплата",
 a_chirie:"Аренда / проживание",a_chirie_d:"Оплата локации",
 a_impr:"Займ",a_impr_d:"Деньги в долг со сроком",
 a_contr:"Договор",a_contr_d:"Сумма и план поступлений",
 a_pontaj:"Табель",a_pontaj_d:"Отработанные дни за месяц",
 a_ang:"Сотрудник",a_ang_d:"Имя, оклад, статус",
 f_data:"Дата",f_client:"Клиент",f_proiect:"Проект",f_descr:"Описание",f_valuta:"Валюта",
 f_curs:"Курс на дату",f_suma:"Сумма",f_sumamdl:"Сумма (MDL)",f_mod:"Способ",f_categ:"Категория",
 f_platit:"Кто платил",f_dest:"Назначение",f_pers:"Человек",f_nota:"Примечание",f_luna:"Месяц",
 f_loc:"Локация",f_chirias:"Арендатор",f_di:"Дата начала",f_ds:"Дата окончания",
 f_chirie:"Аренда",f_gaj:"Залог",f_comun:"Коммунальные",f_avarii:"Ущерб",
 f_termen:"Срок",f_status:"Статус",f_contract:"Сумма договора",f_decash:"К получению наличными",
 f_ang:"Сотрудник",f_an:"Год",f_z1:"Дни 1–15",f_z2:"Дни 16–конец",
 f_nume:"Имя",f_start:"Дата начала работы",f_salariu:"Оклад в месяц (MDL)",
 numerar:"Наличные",transfer:"Перевод",activ:"Активен",inactiv:"Неактивен",
 neachitat:"Не погашен",achitat:"Погашен",
 d_depus:"Внесено на счёт",d_pers:"Выдано человеку",d_sal:"Зарплата",d_impr:"Займ",d_alte:"Прочее",
 save:"Сохранить",saving:"Сохраняю…",del:"Удалить",del_q:"Точно удалить?",del_yes:"Да, удалить",cancel:"Отмена",
 saved:"Сохранено",deleted:"Удалено",edit:"Изменить",
 eq:"Эквивалент MDL",tot:"Итого",
 impr_cash:"Деньги вышли из кассы сейчас",impr_cash_h:"Автоматически создаст и выдачу из кассы, чтобы касса не была завышена.",
 req:"Заполните обязательные поля.",
 r_inc:"Поступления",r_chelt:"Расходы",r_ies:"Выдачи из кассы",r_chirii:"Аренда",
 r_contr:"Договоры",r_sal:"Зарплаты",r_impr:"Займы",
 mine_t:"Что внёс я",mine_e:"Вы ещё ничего не вносили.",
 nothing:"Пока пусто",nothing_d:"Нажмите «Добавить», чтобы начать.",
 set_val:"Валюты и курсы",set_val_h:"Курс на сегодня. Используется для остатка кассы, но не для уже внесённых строк.",
 set_cas:"Кассир",set_cas_h:"Деньги, выданные кассиру, не считаются выходом из кассы.",
 set_cat:"Категории расходов",set_cat_h:"По одной в строке.",
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
 ord_2:"Деньги физически вышли из кассы (аванс, внесение, зарплата, займ) → Выдача из кассы.",
 ord_3:"Деньги потратили → Расход, в леях, с верным «Кто платил».",
 ord_4:"Имя клиента должно быть написано одинаково везде.",
 a_proj:"Проект",a_proj_d:"Название, ответственные, бюджет",
 r_proj:"Проекты",s_proiecte:"Активные проекты",
 f_resp:"Ответственные",f_buget:"Бюджет (MDL)",
 st_activ:"Активен",st_pauza:"На паузе",st_final:"Завершён",
 p_buget:"Бюджет",p_cheltuit:"Потрачено",p_incasat:"Получено",p_rest:"Остаток бюджета",
 p_resp:"Ответственные",p_niciunul:"Без ответственного",p_depasit:"Бюджет превышен",
 p_alte:"Прочие проекты (без карточки)",
 me_t:"Я —",me_h:"Выберите своё имя. Ваши проекты и поле «Кто платил» подставятся сами.",
 me_ch:"Сменить",me_pick:"Выберите имя",me_none:"В списке никого нет. Директор добавляет сотрудников.",
 proj_none:"Проектов пока нет",proj_none_d:"Директор создаёт проекты и назначает ответственных.",
 r_jur:"История",j_h:"Каждое добавление, изменение и удаление остаётся здесь — с автором, временем и значениями на тот момент.",
 j_load:"Показать месяц",j_loading:"Ищу…",j_empty:"В этом месяце операций не было.",
 j_add:"Добавлено",j_edit:"Изменено",j_del:"Удалено",j_by:"—",
 j_exp:"Скачать Excel",j_exp_h:"Готовый .xlsx: сводка, все журналы и история — каждый на своём листе, с фильтрами и итогами.",
 exported:"Скачано",exp_no:"Скачивание здесь недоступно.",exp_work:"Готовлю файл…",
 exp_t:"Выгрузка в Excel",exp_tot:"Все данные",exp_luna:"Только выбранный месяц",exp_btn:"Скачать .xlsx",
 a_user:"Пользователь",a_user_d:"Доступ новому сотруднику",r_user:"Пользователи",
 f_rol:"Роль",rol_op:"Оператор",rol_dir:"Директор",f_cod:"Код доступа",
 f_cod_h:"Четыре цифры, которые вы даёте сотруднику. По ним он входит со своего телефона.",
 also_ang:"Добавить и в сотрудники, с окладом",
 gate_t:"Код доступа",gate_h:"Введите код, который дал директор. При самом первом запуске введённый код становится кодом директора.",gate_bad:"Неверный код или пользователь отключён.",
 u_none:"Пользователей пока нет",u_none_d:"Добавьте первого, чтобы сотрудники входили по своему коду.",
 logout:"Сменить пользователя",u_inactiv:"Отключён",
 setup_t:"Приложение не настроено",setup_h:"Не загрузилась библиотека сервера. Обновите страницу; если повторяется, проверьте файл vendor/pocketbase.umd.js.",
 auth_err:"Не удаётся подключиться к серверу.",
 offline_note:"Нет связи. Вносить можно, данные отправятся, когда появится интернет.",
 pending:"{n} записей ждут отправки на сервер.",
 first_pin:"Первый запуск: этот код стал кодом директора. Поменяйте имя в Настройки → Пользователи.",
 install:"Установить на телефон",cod_bad:"Код должен быть из 4–8 цифр и не повторять другой.",
 self_lock:"Нельзя отключить или понизить собственную учётную запись.",
 pw_t:"Пароль директора",pw_h:"На новом телефоне директор подтверждает пароль. Дальше он запрашивается раз в неделю.",
 pw_week:"Прошла неделя с последнего подтверждения. Введите пароль, чтобы продолжить.",
 pw_set_t:"Задайте пароль директора",pw_set_h:"Код остаётся для входа. Пароль спрашивается на каждом новом телефоне и раз в неделю. Минимум 8 символов.",
 f_parola:"Пароль",f_parola2:"Повторите пароль",f_parola_veche:"Текущий пароль",f_parola_noua:"Новый пароль",
 pw_short:"Пароль должен быть не короче 8 символов.",pw_mismatch:"Пароли не совпадают.",pw_bad:"Неверный пароль.",
 pw_saved:"Пароль сохранён.",pw_other:"Другой код",set_pw:"Пароль директора",set_pw_h:"Запрашивается на каждом новом телефоне и раз в неделю."
}};
var lang="ro";
try{var sl=localStorage.getItem("ehl.lang"); if(sl==="ro"||sl==="ru") lang=sl;}catch(e){}
function T(k){var d=I18N[lang];return (d&&d[k])||I18N.ro[k]||k;}

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
function toast(msg){var w=$("#toasts");var el=document.createElement("div");el.className="toast";el.textContent=msg;w.appendChild(el);setTimeout(function(){el.remove()},2200)}
function monthName(ym){if(!ym)return"";var p=ym.split("-");var names=lang==="ru"?["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"]:["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];var i=parseInt(p[1],10)-1;return (names[i]||"")+" "+p[0]}
function workdays(ym){ // Mon-Sat
  if(!ym||ym.length<7)return 0;
  var y=parseInt(ym.slice(0,4),10),m=parseInt(ym.slice(5,7),10);
  if(!y||!m)return 0;
  var dim=new Date(y,m,0).getDate(),c=0;
  for(var i=1;i<=dim;i++){if(new Date(y,m-1,i).getDay()!==0)c++;}
  return c;
}
function monthEnd(ym){var y=parseInt(ym.slice(0,4),10),m=parseInt(ym.slice(5,7),10);return ym+"-"+p2(new Date(y,m,0).getDate())}

/* ---------------- state ---------------- */
var DEF_CFG={valute:[{cod:"MDL",curs:1},{cod:"EUR",curs:20.22},{cod:"USD",curs:17.5}],casier:"",
  categorii:["Materiale","Transport","Combustibil","Unelte","Birou","Taxe","Reparații","Diverse"],pin:"1234"};
var S={cfg:null,incasari:[],cheltuieli:[],iesiri:[],chirii:[],contracte:[],angajati:[],istoric:[],pontaj:[],imprumuturi:[],proiecte:[],utilizatori:[]};
var COLS=["incasari","cheltuieli","iesiri","chirii","contracte","angajati","istoric","pontaj","imprumuturi","proiecte","utilizatori"];
var DATA_COLS=["incasari","cheltuieli","iesiri","chirii","contracte","angajati","istoric","pontaj","imprumuturi","proiecte"];
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
function clienti(){return uniq(S.incasari.map(function(r){return r.client}).concat(S.cheltuieli.map(function(r){return r.client}),S.contracte.map(function(r){return r.client})))}
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
function unsubAll(){subs.forEach(function(u){try{u()}catch(e){}});subs=[];if(PB){try{PB.realtime.unsubscribe()}catch(e){}}}
function resetData(){COLS.forEach(function(c){S[c]=[]});S.cfg=null;loaded={};stale=false;dbErr=false;if(loadTimer){clearTimeout(loadTimer);loadTimer=null}}
function logout(msg){
  unsubAll();resetData();
  ACCESS=null;ME=null;isDir=false;sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";
  if(PB)PB.authStore.clear();
  try{localStorage.removeItem("ehl.cache")}catch(e){}
  gateErr=msg||"";view="add";render();
}
function needGate(){return !ACCESS}
function userOf(r){return {id:r.id,nume:r.nume||"",rol:r.rol||"Operator",cod:r.cod||"",status:r.status||"Activ",parolaSetata:!!r.parolaSetata}}
function enter(user){
  ACCESS={user:userOf(user)};ME=user.id;gateErr="";GATE={step:"cod"};
  isDir=computeDir();view=isDir?"panou":"add";
  subscribe();
}
/* Gate steps: "cod" (everyone) -> for directors "setparola" (first time) or "parola" (new phone, or weekly). */
var GATE={step:"cod"};
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
    try{
      if(res.record&&res.record.rol==="Director"){localStorage.setItem("ehl.cod",cod);localStorage.setItem("ehl.exp",String(res.expires||0))}
      else{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}
    }catch(e){}
    enter(res.record);
    if(res.first||GATE.first)toast(T("first_pin"));
    return res;
  });
}
/* a director's week is over: keep the code, ask for the password again */
function sessionExpired(){
  var cod="";try{cod=localStorage.getItem("ehl.cod")||""}catch(e){}
  logout("");
  GATE=cod?{step:"parola",cod:cod,weekly:true}:{step:"cod"};
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
  ["valute","categorii"].forEach(function(k){if(typeof o[k]==="string"){try{o[k]=JSON.parse(o[k])}catch(e){o[k]=null}}});
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
    if(isDir&&e.status===401){sessionExpired();return true;}
    logout(T("gate_bad"));return true;
  }
  return false;
}
/* List rules filter instead of refusing, so a deactivated user just sees empty lists;
   the only reliable signal is our own user record disappearing (404) or the token refresh failing. */
function selfCheck(){
  if(!PB||!ACCESS||!online)return Promise.resolve();
  if(expiryCheck())return Promise.resolve();
  return PB.collection("utilizatori").getOne(ACCESS.user.id,{requestKey:null}).then(function(u){
    S.utilizatori=S.utilizatori.filter(function(x){return x.id!==u.id}).concat([norm(u)]);checkSelf();
  }).catch(function(e){if(e&&(e.status===404||e.status===401||e.status===403))logout(T("gate_bad"))});
}
setInterval(selfCheck,3*60*1000);
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")selfCheck()});
function subscribe(){
  unsubAll();resetData();
  if(!PB||!ACCESS)return;
  loadCache();
  loadTimer=setTimeout(function(){stale=true;render()},10000);
  var cols=DATA_COLS.filter(function(c){return isDir||c!=="istoric"});
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
    PB.collection(col).subscribe("*",function(ev){applyEvent(col,ev)},{requestKey:null}).then(function(un){subs.push(un)}).catch(function(){});
  });
  if(isDir){
    PB.collection("utilizatori").getFullList({batch:500,requestKey:null}).then(function(items){S.utilizatori=items.map(norm);saveCache();checkSelf()}).catch(authErrOf);
    PB.collection("utilizatori").subscribe("*",function(ev){applyEvent("utilizatori",ev);checkSelf()},{requestKey:null}).then(function(un){subs.push(un)}).catch(function(){});
  }else{
    PB.collection("utilizatori").getOne(ME,{requestKey:null}).then(function(u){S.utilizatori=[norm(u)];saveCache();checkSelf()})
      .catch(function(e){if(e&&e.status===404){logout(T("gate_bad"));return}authErrOf(e)});
    PB.collection("utilizatori").subscribe(ME,function(ev){applyEvent("utilizatori",ev);checkSelf()},{requestKey:null}).then(function(un){subs.push(un)}).catch(function(){});
  }
  PB.collection("config").getFullList({requestKey:null}).then(function(items){if(items[0])S.cfg=normCfg(items[0]);saveCache();if(!sheetState)render()}).catch(authErrOf);
  PB.collection("config").subscribe("*",function(ev){if(ev.action!=="delete")S.cfg=normCfg(ev.record);saveCache();if(!sheetState)render()},{requestKey:null}).then(function(un){subs.push(un)}).catch(function(){});
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
  if(was!==isDir){view=isDir?"panou":"add";subscribe();return;}
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
  try{QUEUE=JSON.parse(localStorage.getItem("ehl.queue")||"[]")}catch(e){QUEUE=[]}
  if(!(QUEUE instanceof Array))QUEUE=[];
}
function saveQueue(){try{localStorage.setItem("ehl.queue",JSON.stringify(QUEUE))}catch(e){}}
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
     /* refused by the server (rule or validation): drop it, keep the rest moving */
     QUEUE.shift();saveQueue();saveCache();toast(T("nowrite"));
     if(QUEUE.length)flushQueue();else render();
   });
}
window.addEventListener("online",function(){online=true;dbErr=false;if(ACCESS){if(!loaded.incasari)subscribe();else flushQueue()}render()});
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
function persoane(){return uniq(S.iesiri.map(function(r){return r.persoana}).concat(S.cheltuieli.map(function(r){return r.platitDe}),S.angajati.map(function(r){return r.nume}),S.imprumuturi.map(function(r){return r.persoana})))}
function categorii(){var c=cfg().categorii;return uniq((c&&c.length?c:DEF_CFG.categorii).concat(S.cheltuieli.map(function(r){return r.categorie})))}
function angajatiActivi(){return S.angajati.filter(function(a){return a.status!=="Inactiv"}).map(function(a){return a.nume})}

/* ---------------- calculations (mirrors the workbook) ---------------- */
function calc(){
  var C={},vals=valute().map(function(v){return v.cod});
  var sum=function(arr,f){var t=0;arr.forEach(function(r){t+=f(r)||0});return t};

  C.vals=vals;
  C.intratNum={};C.intratTr={};
  C.iesDepus={};C.iesPers={};C.iesSal={};C.iesChirii={};C.iesImpr={};C.iesAlte={};C.iesCheltCasier={};
  vals.forEach(function(v){
    C.intratNum[v]=sum(S.incasari,function(r){return r.mod==="Numerar"&&r.valuta===v?n(r.suma):0});
    C.intratTr[v]=sum(S.incasari,function(r){return r.mod==="Transfer"&&r.valuta===v?n(r.suma):0});
    C.iesDepus[v]=sum(S.iesiri,function(r){return r.destinatie==="Depus pe cont"&&r.valuta===v?n(r.suma):0});
    C.iesPers[v]=sum(S.iesiri,function(r){return r.destinatie==="Dat persoanei"&&r.valuta===v&&!(casier()&&sameP(r.persoana,casier()))?n(r.suma):0});
    C.iesSal[v]=sum(S.iesiri,function(r){return r.destinatie==="Salarii"&&r.valuta===v?n(r.suma):0});
    C.iesImpr[v]=sum(S.iesiri,function(r){return r.destinatie==="Împrumut"&&r.valuta===v?n(r.suma):0});
    C.iesAlte[v]=sum(S.iesiri,function(r){return r.destinatie==="Alte"&&r.valuta===v?n(r.suma):0});
    C.iesChirii[v]=sum(S.chirii,function(r){return r.mod==="Numerar"&&r.valuta===v?chirieTotal(r):0});
    C.iesCheltCasier[v]=(v==="MDL")?sum(S.cheltuieli,function(r){return r.mod==="Numerar"&&casier()&&sameP(r.platitDe,casier())?n(r.suma):0}):0;
  });
  C.iesTotal={};C.ramas={};C.ramasMDL={};C.casaMDL=0;
  vals.forEach(function(v){
    C.iesTotal[v]=C.iesDepus[v]+C.iesPers[v]+C.iesSal[v]+C.iesChirii[v]+C.iesImpr[v]+C.iesAlte[v]+C.iesCheltCasier[v];
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
  C.salPlatitMDL=sum(S.iesiri,function(r){return r.destinatie==="Salarii"?n(r.suma)*n(r.curs):0});
  C.avansMDL=sum(S.iesiri,function(r){return r.destinatie==="Dat persoanei"&&!(casier()&&sameP(r.persoana,casier()))?n(r.suma)*n(r.curs):0});
  C.chiriiMDL=sum(S.chirii,function(r){return chirieTotal(r)*n(r.curs)});
  C.chiriiTrMDL=sum(S.chirii,function(r){return r.mod==="Transfer"?chirieTotal(r)*n(r.curs):0});

  C.contMDL=C.incTrMDL+C.depusMDL-C.cheltTr-C.chiriiTrMDL;

  // collaborators
  var names=uniq(S.iesiri.filter(function(r){return r.destinatie==="Dat persoanei"}).map(function(r){return r.persoana})
    .concat(S.cheltuieli.filter(function(r){return r.mod==="Numerar"}).map(function(r){return r.platitDe})))
    .filter(function(p){return !(casier()&&sameP(p,casier()))});
  C.colab=names.map(function(p){
    var primit=sum(S.iesiri,function(r){return r.destinatie==="Dat persoanei"&&sameP(r.persoana,p)?n(r.suma)*n(r.curs):0});
    var chn=sum(S.cheltuieli,function(r){return r.mod==="Numerar"&&sameP(r.platitDe,p)?n(r.suma):0});
    var cht=sum(S.cheltuieli,function(r){return r.mod==="Transfer"&&sameP(r.platitDe,p)?n(r.suma):0});
    return {nume:p,primit:primit,cheltuit:chn,ramas:primit-chn,transfer:cht};
  }).filter(function(x){return x.primit||x.cheltuit||x.transfer});
  C.colabRamas=sum(C.colab,function(x){return x.ramas});
  C.totalFirma=C.casaMDL+C.contMDL+C.colabRamas;

  // per client / project / category
  C.perClient=clienti().map(function(cl){
    var inc=sum(S.incasari,function(r){return sameP(r.client,cl)?n(r.suma)*n(r.curs):0});
    var ch=sum(S.cheltuieli,function(r){return sameP(r.client,cl)?n(r.suma):0});
    return {nume:cl,inc:inc,chelt:ch,sold:inc-ch};
  }).filter(function(x){return x.inc||x.chelt}).sort(function(a,b){return b.inc-a.inc});
  C.proiecte=S.proiecte.map(function(p){
    var inc=sum(S.incasari,function(r){return sameP(r.proiect,p.nume)?n(r.suma)*n(r.curs):0});
    var ch=sum(S.cheltuieli,function(r){return sameP(r.proiect,p.nume)?n(r.suma):0});
    var bg=n(p.buget);
    return {id:p.id,nume:p.nume,client:p.client||"",status:p.status||"Activ",resp:respList(p),
      buget:bg,inc:inc,chelt:ch,rest:bg-ch,pct:bg>0?Math.min(100,ch/bg*100):0};
  }).sort(function(a,b){return (a.status==="Finalizat"?1:0)-(b.status==="Finalizat"?1:0)||b.chelt-a.chelt});
  var defNames=S.proiecte.map(function(p){return String(p.nume||"").trim().toLowerCase()});
  C.perProiect=proiecteNume().map(function(p){
    return {nume:p,val:sum(S.cheltuieli,function(r){return sameP(r.proiect,p)?n(r.suma):0})};
  }).filter(function(x){return x.val>0&&defNames.indexOf(x.nume.toLowerCase())<0}).sort(function(a,b){return b.val-a.val});
  C.perCateg=categorii().map(function(c){
    return {nume:c,val:sum(S.cheltuieli,function(r){return sameP(r.categorie,c)?n(r.suma):0})};
  }).filter(function(x){return x.val>0}).sort(function(a,b){return b.val-a.val});

  // contracts
  C.contracte=S.contracte.map(function(k){
    var cash=sum(S.incasari,function(r){return sameP(r.client,k.client)&&r.mod==="Numerar"?n(r.suma)*n(r.curs):0});
    var tr=sum(S.incasari,function(r){return sameP(r.client,k.client)&&r.mod==="Transfer"?n(r.suma)*n(r.curs):0});
    var val=n(k.sumaContract),dcash=n(k.deIncasatCash);
    return {id:k.id,client:k.client,val:val,deCash:dcash,deTr:val-dcash,incCash:cash,incTr:tr,
      ramas:val-cash-tr,ramasCash:dcash-cash,ramasTr:(val-dcash)-tr};
  });
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
    return {id:p.id,luna:ym,angajat:p.angajat,z1:z1,z2:z2,wd:wd,sal:sal,pretZi:pz,
      s1:z1*pz,s2:z2*pz,total:(z1+z2)*pz};
  });
  var luni=uniq(C.pontaj.map(function(p){return p.luna}).concat(S.iesiri.filter(function(r){return r.destinatie==="Salarii"}).map(function(r){return r.luna})));
  C.salLuni=luni.map(function(l){
    var cas=sum(C.pontaj,function(p){return p.luna===l?p.total:0});
    var pl=sum(S.iesiri,function(r){return r.destinatie==="Salarii"&&r.luna===l?n(r.suma)*n(r.curs):0});
    return {luna:l,castigat:cas,platit:pl,rest:cas-pl};
  }).sort(function(a,b){return b.luna.localeCompare(a.luna)});
  C.salCastigat=sum(C.salLuni,function(x){return x.castigat});
  C.salPlatit=sum(C.salLuni,function(x){return x.platit});
  C.salRest=C.salCastigat-C.salPlatit;

  // loans
  C.imprTotal=sum(S.imprumuturi,function(r){return n(r.suma)});
  C.imprRestituit=sum(S.imprumuturi,function(r){return r.status==="Achitat"?n(r.suma):0});
  C.imprRamas=C.imprTotal-C.imprRestituit;
  var td=today();
  C.imprRestante=S.imprumuturi.filter(function(r){return r.status!=="Achitat"&&r.termen&&r.termen<td}).length;
  C.imprNeachitate=S.imprumuturi.filter(function(r){return r.status!=="Achitat"}).length;
  C.imprPers=uniq(S.imprumuturi.map(function(r){return r.persoana})).map(function(p){
    return {nume:p,total:sum(S.imprumuturi,function(r){return sameP(r.persoana,p)?n(r.suma):0}),
      ramas:sum(S.imprumuturi,function(r){return sameP(r.persoana,p)&&r.status!=="Achitat"?n(r.suma):0})};
  }).filter(function(x){return x.total>0});

  return C;
}
function chirieTotal(r){return n(r.chirie)+n(r.gaj)+n(r.comunale)+n(r.avarii)}
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

/* ---------------- form definitions ---------------- */
function opt(list){return list.map(function(v){return typeof v==="string"?{v:v,l:v}:v})}
var FORMS={
 incasari:{title:"a_inc",icon:"↓",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"client",t:"text",l:"f_client",req:1,list:clienti()},
   fProiect(),
   {k:"descriere",t:"text",l:"f_descr"},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1"},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"}
 ]},calc:function(d){return [{l:T("eq"),v:money(n(d.suma)*n(d.curs))+" MDL"}]}},

 cheltuieli:{title:"a_chelt",icon:"↑",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"suma",t:"number",l:"f_sumamdl",req:1,step:"0.01"},
   {k:"categorie",t:"text",l:"f_categ",req:1,list:categorii()},
   {k:"descriere",t:"text",l:"f_descr"},
   {k:"client",t:"text",l:"f_client",list:clienti()},
   fProiect(),
   {k:"platitDe",t:"text",l:"f_platit",req:1,list:oameni(),def:meName()||casier()},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"}
 ]}},

 iesiri:{title:"a_ies",icon:"→",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"destinatie",t:"select",l:"f_dest",req:1,opts:[
     {v:"Dat persoanei",l:T("d_pers")},{v:"Depus pe cont",l:T("d_depus")},
     {v:"Salarii",l:T("d_sal")},{v:"Împrumut",l:T("d_impr")},{v:"Alte",l:T("d_alte")}],def:"Dat persoanei"},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1"},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"},
   {k:"persoana",t:"text",l:"f_pers",list:persoane()},
   {k:"luna",t:"month",l:"f_luna",def:curMonth(),showIf:function(d){return d.destinatie==="Salarii"}},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){return [{l:T("eq"),v:money(n(d.suma)*n(d.curs))+" MDL"}]}},

 chirii:{title:"a_chirie",icon:"⌂",fields:function(){return[
   {k:"dataInceput",t:"date",l:"f_di",req:1,half:1,def:today()},
   {k:"dataSfarsit",t:"date",l:"f_ds",half:1},
   {k:"locatia",t:"text",l:"f_loc",req:1},
   {k:"chirias",t:"text",l:"f_chirias",list:persoane()},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1"},
   {k:"chirie",t:"number",l:"f_chirie",half:1,step:"0.01"},
   {k:"gaj",t:"number",l:"f_gaj",half:1,step:"0.01"},
   {k:"comunale",t:"number",l:"f_comun",half:1,step:"0.01"},
   {k:"avarii",t:"number",l:"f_avarii",half:1,step:"0.01"},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){var t=n(d.chirie)+n(d.gaj)+n(d.comunale)+n(d.avarii);
   return [{l:T("tot"),v:money(t)+" "+(d.valuta||"")},{l:T("eq"),v:money(t*n(d.curs))+" MDL"}]}},

 imprumuturi:{title:"a_impr",icon:"◷",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"persoana",t:"text",l:"f_pers",req:1,list:persoane()},
   {k:"suma",t:"number",l:"f_sumamdl",req:1,step:"0.01"},
   {k:"termen",t:"date",l:"f_termen"},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Neachitat",l:T("neachitat")},{v:"Achitat",l:T("achitat")}],def:"Neachitat"},
   {k:"dinCasa",t:"checkbox",l:"impr_cash",hint:"impr_cash_h",newOnly:1},
   {k:"nota",t:"text",l:"f_nota"}
 ]}},

 contracte:{title:"a_contr",icon:"§",fields:function(){return[
   {k:"client",t:"text",l:"f_client",req:1,list:clienti()},
   {k:"sumaContract",t:"number",l:"f_contract",req:1,step:"0.01"},
   {k:"deIncasatCash",t:"number",l:"f_decash",step:"0.01",def:"0"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){return [{l:T("f_decash"),v:money(n(d.deIncasatCash))},{l:T("transfer"),v:money(n(d.sumaContract)-n(d.deIncasatCash))}]}},

 pontaj:{title:"a_pontaj",icon:"▦",fields:function(){return[
   {k:"luna",t:"month",l:"f_luna",req:1,def:curMonth()},
   {k:"angajat",t:"text",l:"f_ang",req:1,list:angajatiActivi().length?angajatiActivi():persoane()},
   {k:"z1",t:"number",l:"f_z1",half:1,step:"1",def:"0"},
   {k:"z2",t:"number",l:"f_z2",half:1,step:"1",def:"0"}
 ]},calc:function(d){var wd=workdays(d.luna),sal=salariuLa(d.angajat,d.luna?monthEnd(d.luna):today()),pz=wd?sal/wd:0;
   var out=[{l:(lang==="ru"?"Раб. дней":"Zile lucr."),v:String(wd)}];
   if(isDir)out.push({l:T("tot"),v:money((n(d.z1)+n(d.z2))*pz)+" MDL"}); /* operators cannot read salaries */
   return out}},

 utilizatori:{title:"a_user",icon:"◉",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"rol",t:"select",l:"f_rol",req:1,opts:[{v:"Operator",l:T("rol_op")},{v:"Director",l:T("rol_dir")}],def:"Operator"},
   {k:"cod",t:"text",l:"f_cod",req:1,hint:"f_cod_h",def:codNou()},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("activ")},{v:"Inactiv",l:T("u_inactiv")}],def:"Activ"},
   {k:"caAngajat",t:"checkbox",l:"also_ang",newOnly:1},
   {k:"salariu",t:"number",l:"f_salariu",step:"0.01",def:"0",showIf:function(d){return !!d.caAngajat}}
 ]}},

 proiecte:{title:"a_proj",icon:"◆",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"client",t:"text",l:"f_client",list:clienti()},
   {k:"responsabili",t:"multi",l:"f_resp",opts:oameni()},
   {k:"buget",t:"number",l:"f_buget",step:"0.01",def:"0"},
   {k:"dataInceput",t:"date",l:"f_di",half:1,def:today()},
   {k:"termen",t:"date",l:"f_termen",half:1},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("st_activ")},{v:"Pauză",l:T("st_pauza")},{v:"Finalizat",l:T("st_final")}],def:"Activ"},
   {k:"nota",t:"text",l:"f_nota"}
 ]}},

 angajati:{title:"a_ang",icon:"☺",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"dataInceput",t:"date",l:"f_start",def:today()},
   {k:"salariu",t:"number",l:"f_salariu",req:1,step:"0.01",newOnly:1},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("activ")},{v:"Inactiv",l:T("inactiv")}],def:"Activ"}
 ]}}
};

/* ---------------- db layer ---------------- */
/* Writes go straight to the server when online; otherwise they are applied locally and queued (see flushQueue).
   The audit trail is one jurnal record per change; the server forbids editing or deleting it. */
var JUR={luna:curMonth(),rows:null,loading:false};
function clean(data){
  var skip={id:1,by:1,ts:1,created:1,updated:1,collectionId:1,collectionName:1,expand:1};
  var body={};for(var k in data){if(data[k]!==undefined&&!skip[k])body[k]=data[k]}return body;
}
function localWrite(op){
  if(op.op==="create"){var rec=norm(op.data);rec.id=op.id;rec.by=ME||"";rec.created=new Date().toISOString();rec.ts=rec.created;S[op.col]=(S[op.col]||[]).concat([rec]);}
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
  var e={act:act,col:col,ref:ref,nume:meName()||"",data:data||{}};
  if(online&&!QUEUE.length){
    return PB.collection("jurnal").create(e,{requestKey:null}).then(function(){})
      .catch(function(x){if(netErr(x)){online=false;return localWrite({op:"create",col:"jurnal",id:"tmp"+uid(),data:e}).then(function(){})}});
  }
  return localWrite({op:"create",col:"jurnal",id:"tmp"+uid(),data:e}).then(function(){});
}
function saveDoc(col,data,id){
  if(!PB||!ACCESS)return Promise.reject({code:"no_db"});
  var body=clean(data),p;
  if(col==="utilizatori"&&!id){var pw="x"+uid()+uid();body.password=pw;body.passwordConfirm=pw;}
  var queued=function(){return localWrite({op:id?"update":"create",col:col,id:id||("tmp"+uid()),data:body})};
  if(online&&!QUEUE.length&&!isTmp(id)){
    p=(id?PB.collection(col).update(id,body,{requestKey:null}):PB.collection(col).create(body,{requestKey:null}))
      .then(function(rec){applyEvent(col,{action:id?"update":"create",record:rec});return rec.id})
      .catch(function(e){if(netErr(e)){online=false;return queued()}throw e});
  }else p=queued();
  return p.then(function(rid){
    var copy=clean(body);delete copy.password;delete copy.passwordConfirm;copy.id=rid;
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
  var from=luna+"-01 00:00:00",to=monthEnd(luna)+" 23:59:59";
  return PB.collection("jurnal").getFullList({batch:1000,requestKey:null,sort:"-created",
      filter:'created >= "'+from+'" && created <= "'+to+'"'})
    .then(function(items){return items.map(function(e){var o=norm(e);o.ts=o.created;
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
    cols4(T("f_pers"),T("l_primit"),T("l_cheltuit"),T("l_inmana"),1);
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
    C.perCateg.forEach(function(x){kv(x.nume,x.val)});
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
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_categ"),k:"categorie",w:18},
    {h:T("f_descr"),k:"descriere",w:30},{h:T("f_client"),k:"client",w:22},{h:T("f_proiect"),k:"proiect",w:20},
    {h:T("f_sumamdl"),k:"suma",w:15,fmt:FMT_M},{h:T("f_platit"),k:"platitDe",w:20},{h:T("f_mod"),k:"mod",w:12}],
    ch.map(function(r){return {data:xd(r.data),categorie:r.categorie,descriere:r.descriere,client:r.client,
      proiect:r.proiect,suma:n(r.suma),platitDe:r.platitDe,mod:r.mod==="Numerar"?T("numerar"):T("transfer")}}),
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
    {h:T("f_status"),k:"status",w:13},{h:T("p_buget"),k:"buget",w:15,fmt:FMT_M},
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
      {h:(lang==="ru"?"Цена дня":"Preț zi"),k:"pz",w:13,fmt:FMT_M},{h:T("tot"),k:"total",w:15,fmt:FMT_M}],
      C.pontaj.map(function(p){return {luna:monthName(p.luna),angajat:p.angajat,z1:p.z1,z2:p.z2,wd:p.wd,pz:p.pretZi,total:p.total}}),
      {luna:T("l_total"),total:C.salCastigat});
  }

  if(S.imprumuturi.length)wsAdd(wb,T("r_impr"),[
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_pers"),k:"persoana",w:24},
    {h:T("f_sumamdl"),k:"suma",w:15,fmt:FMT_M},{h:T("f_termen"),k:"termen",w:12,fmt:FMT_D},
    {h:T("f_status"),k:"status",w:14},{h:T("f_nota"),k:"nota",w:28}],
    S.imprumuturi.map(function(r){return {data:xd(r.data),persoana:r.persoana,suma:n(r.suma),
      termen:xd(r.termen),status:r.status==="Achitat"?T("achitat"):T("neachitat"),nota:r.nota}}),
    {data:T("l_total"),suma:C.imprTotal});

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
  $("#ttl").textContent=T("app");
  $("#role").textContent=!ACCESS?T("oaspete"):(isDir?T("director"):T("angajat"));
  $("#role").className="pill"+(isDir?" on":"");
  document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.lang===lang?"true":"false")});
  renderNav();
  var h="";
  if(needGate())h=vGate();
  else if(view==="panou")h=vPanou();
  else if(view==="add")h=vAdd();
  else if(view==="reg")h=vReg();
  else if(view==="mine")h=vMine();
  else if(view==="set")h=vSet();
  app.innerHTML=h;
  app.scrollTop=0;
}
function renderNav(){
  if(needGate()){$("#nav").innerHTML="";return;}
  var items=isDir
    ?[["panou","◧",T("nav_panou")],["add","＋",T("nav_add")],["reg","☰",T("nav_reg")],["set","⚙",T("nav_set")]]
    :[["add","＋",T("nav_add")],["mine","☰",T("nav_mine")],["panou","🔒",T("nav_panou")]];
  $("#nav").innerHTML=items.map(function(it){
    return '<button type="button" data-view="'+it[0]+'"'+(view===it[0]?' aria-current="page"':'')+'><span class="ic">'+it[1]+'</span><span class="lb">'+esc(it[2])+'</span></button>';
  }).join("");
}
function installNote(){
  if(!installEvt||window.matchMedia("(display-mode: standalone)").matches)return "";
  return '<div class="sec"><button class="btn ghost" id="installbtn" type="button">'+esc(T("install"))+'</button></div>';
}
function statusNote(){
  var h="";
  if(!online)h+='<div class="note">'+esc(T("offline_note"))+'</div>';
  if(QUEUE.length)h+='<div class="note">'+esc(T("pending").replace("{n}",String(QUEUE.length)))+'</div>';
  if(online&&dbErr)h+='<div class="note">'+esc(T("offline"))+'</div>';
  else if(online&&!loaded.incasari&&!S.incasari.length)h+='<div class="note">'+esc(T("loading"))+'</div>';
  else if(online&&stale)h+='<div class="note">'+esc(T("stale"))+'</div>';
  return h;
}
function tile(k,v,u,cls,big){
  return '<div class="tile'+(big?" big":"")+'"><span class="k">'+esc(k)+'</span><span class="v '+(cls||"")+'">'+v+(u?'<span class="u">'+esc(u)+'</span>':'')+'</span></div>';
}
function rowsCard(rows){
  if(!rows.length)return '<div class="card"><div class="empty">'+esc(T("nothing"))+'</div></div>';
  return '<div class="card rows">'+rows.join("")+'</div>';
}
function r2(l,v,sub,cls,tot){
  return '<div class="row'+(tot?" tot":"")+'"><span class="l">'+esc(l)+(sub?'<span class="s">'+esc(sub)+'</span>':'')+'</span><span class="r '+(cls||"")+'">'+v+'</span></div>';
}
function barRow(l,v,max){
  var pct=max>0?Math.max(2,Math.round(v/max*100)):0;
  return '<div class="row"><span class="l">'+esc(l)+'<span class="bar-wrap"><span class="bar-fill" style="width:'+pct+'%"></span></span></span><span class="r">'+money(v)+'</span></div>';
}

function vPanou(){
  if(!isDir)return vPin();
  var C=calc(),h=statusNote();
  h+='<div class="sec"><div class="tiles">'
    +tile(T("t_total"),money(C.totalFirma),"MDL","",1)
    +tile(T("t_casa"),money(C.casaMDL),"MDL")
    +tile(T("t_cont"),money(C.contMDL),"MDL",C.contMDL<0?"neg":"")
    +tile(T("t_incasari"),money(C.incTotal),"MDL","pos")
    +tile(T("t_cheltuieli"),money(C.cheltTotal),"MDL","neg")
    +'</div></div>';

  h+='<div class="sec"><h2>'+esc(T("s_bani"))+'</h2>'+rowsCard([
    r2(T("l_num"),money(C.incNumMDL)),r2(T("l_tr"),money(C.incTrMDL)),
    r2(T("l_chnum"),money(C.cheltNum)),r2(T("l_chtr"),money(C.cheltTr)),
    r2(T("l_salplatit"),money(C.salPlatitMDL)),r2(T("l_avans"),money(C.avansMDL)),
    r2(T("l_depus"),money(C.depusMDL)),r2(T("l_chirii"),money(C.chiriiMDL)),
    r2(T("l_justif"),money(C.colabRamas),null,C.colabRamas>0?"warnc":""),
    r2(T("t_total"),money(C.totalFirma),null,"",1)
  ])+'</div>';

  var cv=C.vals.filter(function(v){return C.intratNum[v]||C.iesTotal[v]||C.ramas[v]});
  if(cv.length)h+='<div class="sec"><h2>'+esc(T("s_casa"))+'</h2>'+rowsCard(cv.map(function(v){
    return r2(v,money(C.ramas[v]),money(C.ramasMDL[v])+" MDL · "+T("l_azi"),C.ramas[v]<0?"neg":"");
  }).concat([r2(T("l_total"),money(C.casaMDL)+" MDL",null,"",1)]))+'</div>';

  if(C.colab.length)h+='<div class="sec"><h2>'+esc(T("s_colab"))+'</h2>'+rowsCard(C.colab.map(function(x){
    return r2(x.nume,money(x.ramas),T("l_primit")+" "+money(x.primit)+" · "+T("l_cheltuit")+" "+money(x.cheltuit),x.ramas>0?"warnc":"pos");
  }))+'</div>';

  if(C.perClient.length)h+='<div class="sec"><h2>'+esc(T("s_client"))+'</h2>'+rowsCard(C.perClient.slice(0,14).map(function(x){
    return r2(x.nume,money(x.sold),T("t_incasari")+" "+money(x.inc)+" · "+T("t_cheltuieli")+" "+money(x.chelt),x.sold<0?"neg":"pos");
  }))+'</div>';

  if(C.perCateg.length){var mx=C.perCateg[0].val;
    h+='<div class="sec"><h2>'+esc(T("s_categ"))+'</h2>'+rowsCard(C.perCateg.slice(0,12).map(function(x){return barRow(x.nume,x.val,mx)}))+'</div>';}
  h+='<div class="sec"><h2>'+esc(T("s_proiecte"))+'</h2>';
  if(!C.proiecte.length){
    h+='<div class="card"><div class="empty"><b>'+esc(T("proj_none"))+'</b>'+esc(T("proj_none_d"))+'</div></div>';
  }else{
    h+='<div class="card rows">'+C.proiecte.map(function(p){
      var over=p.buget>0&&p.chelt>p.buget;
      var sub=[p.client,p.resp.length?p.resp.join(", "):T("p_niciunul"),p.status!=="Activ"?(p.status==="Pauză"?T("st_pauza"):T("st_final")):""].filter(Boolean).join(" · ");
      var bar=p.buget>0?'<span class="bar-wrap"><span class="bar-fill" style="width:'+Math.max(2,Math.round(p.pct))+'%;background:'+(over?"var(--neg)":"var(--accent)")+'"></span></span>':"";
      var right=p.buget>0?money(p.rest):money(p.chelt);
      var note=p.buget>0?(T("p_cheltuit")+" "+money(p.chelt)+" / "+money(p.buget)):(T("p_cheltuit")+" "+money(p.chelt)+" · "+T("p_incasat")+" "+money(p.inc));
      return '<button type="button" class="tap row" data-edit="proiecte" data-id="'+esc(p.id)+'">'
        +'<span class="l">'+esc(p.nume)+'<span class="s">'+esc(sub)+'</span><span class="s">'+esc(note)+'</span>'+bar+'</span>'
        +'<span class="r '+(over?"neg":(p.buget>0?"pos":""))+'">'+right+'</span></button>';
    }).join("")+'</div>';
  }
  h+='</div>';
  if(C.perProiect.length){var mp=C.perProiect[0].val;
    h+='<div class="sec"><h2>'+esc(T("p_alte"))+'</h2>'+rowsCard(C.perProiect.slice(0,12).map(function(x){return barRow(x.nume,x.val,mp)}))+'</div>';}

  if(C.contracte.length)h+='<div class="sec"><h2>'+esc(T("s_contr"))+'</h2>'+rowsCard([
    r2(T("l_valcontr"),money(C.contrVal)),r2(T("l_incas"),money(C.contrInc),null,"pos"),
    r2(T("l_ramas"),money(C.contrRamas),null,C.contrRamas>0?"warnc":""),
    r2(T("l_procent"),fmt(C.contrPct,1)+"%",null,"",1)
  ])+'</div>';

  if(C.salLuni.length)h+='<div class="sec"><h2>'+esc(T("s_sal"))+'</h2>'+rowsCard([
    r2(T("l_castigat"),money(C.salCastigat)),r2(T("l_plata"),money(C.salPlatit)),
    r2(T("l_rest"),money(C.salRest),null,C.salRest>0?"warnc":"pos",1)
  ].concat(C.salLuni.slice(0,4).map(function(m){
    return r2(monthName(m.luna),money(m.rest),T("l_castigat")+" "+money(m.castigat)+" · "+T("l_plata")+" "+money(m.platit),m.rest>0?"warnc":"");
  })))+'</div>';

  if(S.imprumuturi.length)h+='<div class="sec"><h2>'+esc(T("s_impr"))+'</h2>'+rowsCard([
    r2(T("l_imprtot"),money(C.imprTotal)),r2(T("l_restituit"),money(C.imprRestituit),null,"pos"),
    r2(T("l_derecup"),money(C.imprRamas),C.imprNeachitate+" ×",C.imprRamas>0?"warnc":""),
    r2(T("l_restante"),String(C.imprRestante),null,C.imprRestante?"neg":"pos")
  ])+'</div>';

  if(C.chiriiMDL)h+='<div class="sec"><h2>'+esc(T("s_chirii"))+'</h2>'+rowsCard([r2(T("l_total"),money(C.chiriiMDL)+" MDL")])+'</div>';
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
  var h='<div class="sec"><div class="card pad"><h2 style="margin:0 0 6px;font-size:18px">'+esc(T(locked?"gate_t":"pin_t"))+'</h2>'
   +'<p class="hint" style="margin:0 0 12px">'+esc(T(locked?"gate_h":"pin_h"))+'</p>'
   +'<form id="pinf"><label><span>'+esc(T("f_cod"))+'</span><input type="password" inputmode="numeric" id="pinv" autocomplete="off"'+(gateBusy?" disabled":"")+'></label>'
   +'<p class="err" id="pinerr"'+(gateErr?"":" hidden")+'>'+esc(gateErr||T("gate_bad"))+'</p>'
   +'<button class="btn" type="submit"'+(gateBusy?" disabled":"")+'>'+esc(gateBusy?T("saving"):T("pin_ok"))+'</button></form></div></div>';
  if(!locked)h+='<div class="sec"><div class="note">'+esc(T("pin_as"))+'</div></div>';
  return h;
}
function vUsers(){
  var h='<div class="sec"><h2>'+esc(T("r_user"))+'</h2>';
  if(!S.utilizatori.length){
    h+='<div class="card"><div class="empty"><b>'+esc(T("u_none"))+'</b>'+esc(T("u_none_d"))+'</div></div>';
  }else{
    h+='<div class="card rows">'+S.utilizatori.slice().sort(function(a,b){return String(a.nume).localeCompare(String(b.nume))}).map(function(u){
      var off=u.status==="Inactiv";
      return '<button type="button" class="tap row" data-edit="utilizatori" data-id="'+esc(u.id)+'">'
        +'<span class="l">'+esc(u.nume)+'<span class="s">'+esc((u.rol==="Director"?T("rol_dir"):T("rol_op"))+(off?" · "+T("u_inactiv"):""))+'</span></span>'
        +'<span class="r '+(off?"":"pos")+'" style="letter-spacing:.14em">'+esc(off?"—":u.cod)+'</span></button>';
    }).join("")+'</div>';
  }
  h+='<button class="btn ghost" style="margin-top:10px" type="button" data-form="utilizatori">+ '+esc(T("a_user"))+'</button></div>';
  return h;
}

function vWho(){
  var me=meName(),list=oameni(),u=myUser();
  if(me)return '<div class="sec"><div class="card pad who"><span class="k" style="font-family:var(--d);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">'+esc(T("me_t"))+'</span>'
    +'<span class="nm">'+esc(me)+(u?'<span class="s" style="display:block;font-size:12px;color:var(--muted);font-family:var(--b);font-weight:400">'+esc(u.rol==="Director"?T("rol_dir"):T("rol_op"))+'</span>':'')+'</span>'
    +'<button type="button" id="mechg">'+esc(T("me_ch"))+'</button></div></div>';
  return "";
  if(!list.length)return '<div class="sec"><div class="note">'+esc(T("me_none"))+'</div></div>';
  return '<div class="sec"><div class="card pad"><form id="mef"><label><span>'+esc(T("me_pick"))+'</span>'
    +'<select name="nume">'+list.map(function(p){return '<option value="'+esc(p)+'">'+esc(p)+'</option>'}).join("")+'</select></label>'
    +'<p class="hint">'+esc(T("me_h"))+'</p><button class="btn" type="submit">'+esc(T("save"))+'</button></form></div></div>';
}
function vAdd(){
  var h=statusNote()+vWho();
  var order=["incasari","cheltuieli","iesiri","chirii","imprumuturi","contracte","pontaj","angajati"];
  if(isDir)order=["incasari","cheltuieli","iesiri","proiecte","utilizatori","chirii","imprumuturi","contracte","pontaj","angajati"];
  var desc={incasari:"a_inc_d",cheltuieli:"a_chelt_d",iesiri:"a_ies_d",chirii:"a_chirie_d",
    imprumuturi:"a_impr_d",contracte:"a_contr_d",pontaj:"a_pontaj_d",angajati:"a_ang_d",proiecte:"a_proj_d",utilizatori:"a_user_d"};
  h+='<div class="sec"><h2>'+esc(T("add_t"))+'</h2><div class="grid2">'+order.map(function(k,i){
    return '<button type="button" class="act'+(i<2?" primary":"")+'" data-form="'+k+'">'
      +'<span class="m">'+FORMS[k].icon+'</span>'
      +'<span class="t">'+esc(T(FORMS[k].title))+'</span>'
      +'<span class="d2">'+esc(T(desc[k]))+'</span></button>';
  }).join("")+'</div></div>';
  h+='<div class="sec"><h2>'+esc(T("ord"))+'</h2><div class="card rows">'
    +r2("1",'',T("ord_1"))+r2("2",'',T("ord_2"))+r2("3",'',T("ord_3"))+r2("4",'',T("ord_4"))+'</div></div>';
  h+=installNote();
  if(!isDir)h+='<div class="sec"><button class="btn ghost" id="exitdir" type="button">'+esc(T("logout"))+'</button></div>';
  return h;
}

var REGDEF={
 incasari:{t:"r_inc",cols:[["data","f_data"],["client","f_client"],["suma","f_suma","n"],["mod","f_mod"]],
   sub:function(r){return [r.proiect,r.descriere].filter(Boolean).join(" · ")},
   main:function(r){return r.client||"—"},amt:function(r){return money(n(r.suma))+" "+(r.valuta||"")},
   cls:function(){return "pos"},meta:function(r){return r.data+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 cheltuieli:{t:"r_chelt",main:function(r){return r.categorie||"—"},
   sub:function(r){return [r.descriere,r.client,r.proiect].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" MDL"},cls:function(){return "neg"},
   meta:function(r){return r.data+" · "+(r.platitDe||"")+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 iesiri:{t:"r_ies",main:function(r){var m={"Depus pe cont":"d_depus","Dat persoanei":"d_pers",Salarii:"d_sal","Împrumut":"d_impr",Alte:"d_alte"};return T(m[r.destinatie]||"d_alte")},
   sub:function(r){return [r.persoana,r.luna?monthName(r.luna):"",r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" "+(r.valuta||"")},cls:function(){return "warnc"},
   meta:function(r){return r.data}},
 chirii:{t:"r_chirii",main:function(r){return r.locatia||"—"},
   sub:function(r){return [r.chirias,r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(chirieTotal(r))+" "+(r.valuta||"")},cls:function(){return "neg"},
   meta:function(r){return r.dataInceput+(r.dataSfarsit?" → "+r.dataSfarsit:"")+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 contracte:{t:"r_contr",main:function(r){return r.client||"—"},sub:function(r){return r.nota||""},
   amt:function(r){return money(n(r.sumaContract))+" MDL"},cls:function(){return ""},meta:function(){return ""}},
 proiecte:{t:"r_proj",main:function(r){return r.nume||"—"},
   sub:function(r){return [r.client,respList(r).join(", ")||T("p_niciunul")].filter(Boolean).join(" · ")},
   amt:function(r){return n(r.buget)?money(n(r.buget))+" MDL":"—"},
   cls:function(r){return r.status==="Finalizat"?"":"pos"},
   meta:function(r){return r.status==="Finalizat"?T("st_final"):(r.status==="Pauză"?T("st_pauza"):T("st_activ"))}},
 imprumuturi:{t:"r_impr",main:function(r){return r.persoana||"—"},
   sub:function(r){return [r.status==="Achitat"?T("achitat"):T("neachitat"),r.termen?T("f_termen")+" "+r.termen:"",r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" MDL"},cls:function(r){return r.status==="Achitat"?"pos":"warnc"},
   meta:function(r){return r.data}}
};
function dateOf(r){return r.data||r.dataInceput||r.luna||r.ts||""}
function vReg(){
  if(!isDir)return vPin();
  var tabs=["incasari","cheltuieli","iesiri","proiecte","chirii","contracte","imprumuturi","salarii","jurnal"];
  var h=statusNote();
  h+='<div class="sec"><div class="chips">'+tabs.map(function(k){
    var lbl=k==="salarii"?T("r_sal"):(k==="jurnal"?T("r_jur"):T(REGDEF[k].t));
    return '<button type="button" class="chip" data-tab="'+k+'"'+(regTab===k?' aria-pressed="true"':'')+'>'+esc(lbl)+'</button>';
  }).join("")+'</div></div>';
  if(regTab==="salarii")return h+vSalarii();
  if(regTab==="jurnal")return h+vJurnal();
  var def=REGDEF[regTab];
  var list=S[regTab].slice().sort(function(a,b){return String(dateOf(b)).localeCompare(String(dateOf(a)))});
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
  h+='<div class="sec"><div class="card rows">'+list.map(function(r){
    return '<button type="button" class="tap row" data-edit="'+regTab+'" data-id="'+esc(r.id)+'">'
      +'<span class="l">'+esc(def.main(r))+'<span class="s">'+esc([def.meta(r),def.sub(r)].filter(Boolean).join(" · "))+'</span></span>'
      +'<span class="r '+def.cls(r)+'">'+def.amt(r)+'</span></button>';
  }).join("")+'</div></div>';
  return h;
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
        +'<span class="l">'+esc(p.angajat)+'<span class="s">'+esc(monthName(p.luna))+" · "+(p.z1+p.z2)+" "+(lang==="ru"?"дн.":"zile")+" · "+money(p.pretZi)+"/"+(lang==="ru"?"день":"zi")+'</span></span>'
        +'<span class="r">'+money(p.total)+'</span></button>';
    }).join("")+'</div></div>';
  }
  if(S.angajati.length)h+='<div class="sec"><h2>'+esc(T("a_ang"))+'</h2><div class="card rows">'
    +S.angajati.map(function(a){
      return '<button type="button" class="tap row" data-edit="angajati" data-id="'+esc(a.id)+'">'
        +'<span class="l">'+esc(a.nume)+'<span class="s">'+esc(a.status==="Inactiv"?T("inactiv"):T("activ"))+'</span></span>'
        +'<span class="r">'+money(salariuLa(a.nume,today()))+'</span></button>';
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
  var amt=def?def.amt(d):(d.suma!=null?money(n(d.suma)):"");
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
    S[c].forEach(function(r){if(ME&&r.by===ME)all.push({c:c,r:r})});
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

function vSet(){
  if(!isDir)return vPin();
  var c=cfg(),h=vUsers();
  h+='<div class="sec"><h2>'+esc(T("set_val"))+'</h2><div class="card pad"><form id="valf">'
    +valute().map(function(v,i){
      return '<div class="pair"><label><span>'+esc(T("cod"))+'</span><input name="cod'+i+'" value="'+esc(v.cod)+'"'+(v.cod==="MDL"?' readonly':'')+'></label>'
        +'<label><span>'+esc(T("f_curs"))+'</span><input name="curs'+i+'" type="number" step="0.0001" value="'+esc(v.curs)+'"'+(v.cod==="MDL"?' readonly':'')+'></label></div>';
    }).join("")
    +'<div class="pair"><label><span>'+esc(T("cod"))+'</span><input name="newcod" placeholder="RON"></label>'
    +'<label><span>'+esc(T("f_curs"))+'</span><input name="newcurs" type="number" step="0.0001" placeholder="4.05"></label></div>'
    +'<p class="hint">'+esc(T("set_val_h"))+'</p><button class="btn" type="submit">'+esc(T("save"))+'</button></form></div></div>';

  h+='<div class="sec"><h2>'+esc(T("set_cas"))+'</h2><div class="card pad"><form id="casf">'
    +'<label><span>'+esc(T("f_pers"))+'</span><input name="casier" value="'+esc(c.casier||"")+'" list="dl-pers"></label>'
    +'<p class="hint">'+esc(T("set_cas_h"))+'</p><button class="btn" type="submit">'+esc(T("save"))+'</button></form></div></div>'
    +'<datalist id="dl-pers">'+persoane().map(function(p){return '<option value="'+esc(p)+'">'}).join("")+'</datalist>';

  h+='<div class="sec"><h2>'+esc(T("set_pw"))+'</h2><div class="card pad"><form id="pwchg">'
    +'<label><span>'+esc(T("f_parola_veche"))+'</span><input type="password" name="veche" autocomplete="current-password"></label>'
    +'<div class="pair"><label><span>'+esc(T("f_parola_noua"))+'</span><input type="password" name="noua" autocomplete="new-password" minlength="8"></label>'
    +'<label><span>'+esc(T("f_parola2"))+'</span><input type="password" name="noua2" autocomplete="new-password" minlength="8"></label></div>'
    +'<p class="hint">'+esc(T("set_pw_h"))+'</p><button class="btn" type="submit">'+esc(T("save"))+'</button></form></div></div>';

  h+='<div class="sec"><h2>'+esc(T("set_cat"))+'</h2><div class="card pad"><form id="catf">'
    +'<label><span>'+esc(T("f_categ"))+'</span><textarea name="cat" rows="7">'+esc((c.categorii||[]).join("\n"))+'</textarea></label>'
    +'<p class="hint">'+esc(T("set_cat_h"))+'</p><button class="btn" type="submit">'+esc(T("save"))+'</button></form></div></div>';


  h+='<div class="sec"><h2>'+esc(T("exp_t"))+'</h2><div class="card pad"><form id="expf">'
    +'<label><span>'+esc(T("f_luna"))+'</span><input type="month" name="luna" value="'+esc(JUR.luna)+'"></label>'
    +'<label class="cb"><input type="checkbox" name="doar"><span>'+esc(T("exp_luna"))+'</span></label>'
    +'<p class="hint">'+esc(T("j_exp_h"))+'</p>'
    +'<button class="btn" type="submit" id="expsub">'+esc(T("exp_btn"))+'</button></form></div></div>';
  h+='<div class="sec"><button class="btn ghost" id="exitdir" type="button">'+esc(T("logout"))+'</button></div>';
  return h;
}

/* ---------------- sheet / forms ---------------- */
var sheetState=null;
function openForm(col,id){
  var def=FORMS[col];if(!def)return;
  var rec=id?S[col].filter(function(r){return r.id===id})[0]:null;
  var data={};
  def.fields().forEach(function(f){data[f.k]=rec?(rec[f.k]!=null?rec[f.k]:""):(f.def!=null?f.def:"")});
  if(rec&&col==="angajati")data.salariu=salariuLa(rec.nume,today());
  sheetState={col:col,id:id||null,data:data,err:""};
  drawSheet();
}
function closeSheet(){sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";render()}
function drawSheet(){
  if(!sheetState)return;
  var st=sheetState,def=FORMS[st.col],fields=def.fields();
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
  if(def.calc){calcHtml=def.calc(st.data).map(function(c){return '<div class="calcbox"><span>'+esc(c.l)+'</span><span class="num">'+esc(c.v)+'</span></div>'}).join("")}
  var lists={};
  fields.forEach(function(f){if(f.list&&f.list.length)lists[f.k]=f.list});
  var dls=Object.keys(lists).map(function(k){
    return '<datalist id="dl-'+k+'">'+lists[k].map(function(v){return '<option value="'+esc(v)+'">'}).join("")+'</datalist>';
  }).join("");
  $("#sheet").innerHTML='<div class="sheet"><div class="sheet-head"><h2>'+esc(T(def.title))+'</h2>'
    +'<button class="x" type="button" id="closeSheet" aria-label="'+esc(T("cancel"))+'">✕</button></div>'
    +'<form id="recf" novalidate>'+out+calcHtml
    +(st.err?'<p class="err">'+esc(st.err)+'</p>':'')
    +'<button class="btn" type="submit" id="savebtn">'+esc(T("save"))+'</button>'
    +(st.id&&isDir?'<button class="btn danger" type="button" id="delbtn">'+esc(T("del"))+'</button>':'')
    +'</form>'+dls+'</div>';
  document.body.style.overflow="hidden";
}
function fieldHtml(f,v){
  var lbl=esc(T(f.l)),id="fl-"+f.k;
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
    if(v&&!opts.some(function(o){return String(o.v)===String(v)}))opts.unshift({v:v,l:v});
    if(f.allowEmpty)opts.unshift({v:"",l:"—"});
    return '<label for="'+id+'"><span>'+lbl+(f.req?" *":"")+'</span><select id="'+id+'" data-k="'+f.k+'">'
      +opts.map(function(o){return '<option value="'+esc(o.v)+'"'+(String(v)===String(o.v)?" selected":"")+'>'+esc(o.l)+'</option>'}).join("")
      +'</select></label>';
  }
  var type=f.t==="number"?"number":(f.t==="date"?"date":(f.t==="month"?"month":"text"));
  var extra=f.t==="number"?' inputmode="decimal" step="'+(f.step||"0.01")+'"':"";
  var list=f.list&&f.list.length?' list="dl-'+f.k+'" autocomplete="off"':"";
  return '<label for="'+id+'"><span>'+lbl+(f.req?" *":"")+'</span><input type="'+type+'" id="'+id+'" data-k="'+f.k+'" value="'+esc(v)+'"'+extra+list+'></label>'
    +(f.hint?'<p class="hint">'+esc(T(f.hint))+'</p>':"");
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
  var btn=$("#savebtn");if(btn){btn.disabled=true;btn.textContent=T("saving")}
  var d=st.data,col=st.col,p;
  if(col==="utilizatori"){
    var ub={nume:String(d.nume).trim(),rol:d.rol,cod:String(d.cod).trim(),status:d.status};
    var dup=S.utilizatori.filter(function(u){return u.id!==st.id&&String(u.cod)===ub.cod})[0];
    if(dup||!/^\d{4,8}$/.test(ub.cod)){st.err=T("cod_bad");if(btn){btn.disabled=false;btn.textContent=T("save")}drawSheet();return;}
    var self=!!(ACCESS&&st.id===ACCESS.user.id);
    if(self&&(ub.status==="Inactiv"||ub.rol!=="Director")){st.err=T("self_lock");if(btn){btn.disabled=false;btn.textContent=T("save")}drawSheet();return;}
    p=saveDoc("utilizatori",ub,st.id).then(function(){
      if(!st.id&&d.caAngajat){
        return saveDoc("angajati",{nume:ub.nume,dataInceput:today(),status:"Activ"}).then(function(){
          if(n(d.salariu)>0)return saveDoc("istoric",{angajat:ub.nume,salariu:n(d.salariu),dinData:today()});
        });
      }
    });
  }else if(col==="angajati"){
    var body={nume:String(d.nume).trim(),dataInceput:d.dataInceput,status:d.status};
    p=saveDoc("angajati",body,st.id).then(function(){
      if(n(d.salariu)>0){
        var exist=S.istoric.filter(function(h){return sameP(h.angajat,body.nume)&&n(h.salariu)===n(d.salariu)})[0];
        if(!exist)return saveDoc("istoric",{angajat:body.nume,salariu:n(d.salariu),dinData:d.dataInceput||today()});
      }
    });
  }else if(col==="imprumuturi"){
    var ib={data:d.data,persoana:String(d.persoana).trim(),suma:n(d.suma),termen:d.termen,status:d.status,nota:d.nota};
    p=saveDoc("imprumuturi",ib,st.id).then(function(){
      if(!st.id&&d.dinCasa)return saveDoc("iesiri",{data:d.data,destinatie:"Împrumut",valuta:"MDL",curs:1,
        suma:n(d.suma),persoana:ib.persoana,nota:(lang==="ru"?"Займ":"Împrumut")+" — "+ib.persoana});
    });
  }else{
    var b={};fields.forEach(function(f){
      if(f.t==="checkbox")return;
      if(f.newOnly&&st.id)return;
      b[f.k]=(f.t==="number")?n(d[f.k]):String(d[f.k]==null?"":d[f.k]).trim();
    });
    p=saveDoc(col,b,st.id);
  }
  p.then(function(){closeSheet();toast(T("saved"))})
   .catch(function(e){st.err=(e&&e.code==="permission-denied")?T("nowrite"):(T("offline"));drawSheet()});
}

/* ---------------- events ---------------- */
document.addEventListener("click",function(ev){
  var t=ev.target;
  var lb=t.closest&&t.closest("[data-lang]");
  if(lb){lang=lb.dataset.lang;try{localStorage.setItem("ehl.lang",lang)}catch(e){}render();if(sheetState)drawSheet();return;}
  var nv=t.closest&&t.closest("[data-view]");
  if(nv){view=nv.dataset.view;if(view==="panou"&&!isDir){} render();return;}
  var fb=t.closest&&t.closest("[data-form]");
  if(fb){openForm(fb.dataset.form);return;}
  var eb=t.closest&&t.closest("[data-edit]");
  if(eb){openForm(eb.dataset.edit,eb.dataset.id);return;}
  var tb=t.closest&&t.closest("[data-tab]");
  if(tb){regTab=tb.dataset.tab;render();return;}
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
  if(t.id==="mechg"){logout();return;}
  if(t.id==="closeSheet"){closeSheet();return;}
  if(t.id==="delbtn"){
    var b=t;
    if(b.dataset.armed==="1"){
      delDoc(sheetState.col,sheetState.id).then(function(){closeSheet();toast(T("deleted"))})
        .catch(function(){sheetState.err=T("offline");drawSheet()});
    }else{b.dataset.armed="1";b.textContent=T("del_yes")}
    return;
  }
  if(t.id==="expbtn"){exportRun(JUR.luna,false);return;}
  if(t.id==="exitdir"){try{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}catch(e){}logout();return;}
  if(t.id==="gateback"){GATE={step:"cod"};gateErr="";render();return;}
  if(t.id==="installbtn"&&installEvt){var ev2=installEvt;installEvt=null;ev2.prompt();render();return;}
});
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();installEvt=e;if(!sheetState)render()});
window.addEventListener("appinstalled",function(){installEvt=null;if(!sheetState)render()});
document.addEventListener("input",function(ev){
  var el=ev.target;
  if(!sheetState||!el.dataset||!el.dataset.k)return;
  var k=el.dataset.k;
  sheetState.data[k]=(el.type==="checkbox")?el.checked:el.value;
  var def=FORMS[sheetState.col];
  if(def&&def.calc){
    var box=document.querySelectorAll(".calcbox");
    var vals=def.calc(sheetState.data);
    box.forEach(function(b,i){if(vals[i])b.lastElementChild.textContent=vals[i].v});
  }
});
document.addEventListener("change",function(ev){
  var el=ev.target;
  if(!sheetState||!el.dataset||!el.dataset.k)return;
  var k=el.dataset.k;
  sheetState.data[k]=(el.type==="checkbox")?el.checked:el.value;
  if(k==="valuta"){sheetState.data.curs=String(cursAzi(el.value));drawSheet();return;}
  if(k==="destinatie"||el.type==="checkbox"){drawSheet();return;}
  if(k==="angajat"||k==="luna"){var def=FORMS[sheetState.col];if(def&&def.calc)drawSheet();}
});
document.addEventListener("submit",function(ev){
  var f=ev.target;ev.preventDefault();
  if(f.id==="recf"){submitForm();return;}
  var gateFail=function(e,dflt){
    gateBusy=false;
    var srv=e&&e.response&&e.response.message;
    gateErr=netErr(e)?T("offline"):(((e&&e.status===429)||(e&&e.status===400))&&srv?srv:dflt);
    render();
  };
  if(f.id==="pinf"){
    var v=$("#pinv").value.trim();
    if(!v||gateBusy){$("#pinerr").hidden=false;return;}
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
      .catch(function(e){var srv=e&&e.response&&e.response.message;toast(netErr(e)?T("offline"):(srv||T("pw_bad")))});
    return;
  }
  if(f.id==="valf"){
    var arr=[],i=0;
    while(f.elements["cod"+i]){var cod=f.elements["cod"+i].value.trim().toUpperCase();
      if(cod)arr.push({cod:cod,curs:cod==="MDL"?1:n(f.elements["curs"+i].value)||1});i++;}
    var nc=f.elements["newcod"].value.trim().toUpperCase();
    if(nc&&!arr.some(function(x){return x.cod===nc}))arr.push({cod:nc,curs:n(f.elements["newcurs"].value)||1});
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
  if(f.id==="catf"){var list=f.elements["cat"].value.split("\n").map(function(s){return s.trim()}).filter(Boolean);
    saveCfg({categorii:list}).then(function(){toast(T("saved"));render()}).catch(function(){toast(T("offline"))});return;}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&sheetState)closeSheet()});

/* ---------------- boot ---------------- */
render();
(function boot(){
  if(!window.PocketBase){noCfg=true;render();return;}
  try{
    PB=new PocketBase(String(window.PB_URL||"").replace(/\/+$/,"")||window.location.origin);
    PB.autoCancellation(false);
  }catch(e){authErr=String(e&&e.message||e);render();return;}
  online=navigator.onLine!==false;
  var rec=PB.authStore.record||PB.authStore.model;
  if(PB.authStore.isValid&&rec&&rec.id){
    enter(rec);
    /* confirm the session with the server: a deactivated user or an expired director week ends it */
    selfCheck();
  }else{
    var sc="";try{sc=localStorage.getItem("ehl.cod")||""}catch(e){}
    if(sc)GATE={step:"parola",cod:sc,weekly:!!sessionExp()};
    render();
  }
  window.addEventListener("online",function(){selfCheck()});
  if(navigator.serviceWorker&&navigator.serviceWorker.register){
    window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").catch(function(){})});
  }
})();
})();