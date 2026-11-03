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
 set_cat:"Categorii de cheltuieli",set_cat_h:"Scrieți una nouă în câmpul de jos; × o șterge (de două ori). Înregistrările vechi își păstrează categoria.",cat_add:"Adaugă categorie",cat_ph:"Denumire",
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
 a_user:"Utilizator",a_user_d:"Acces pentru un angajat nou",r_user:"Utilizatori",
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
 ov_more:"Detalii",ov_all_s:"Toate",per_lbl:"Perioada",menu_t:"Salt rapid",menu_a:"Meniu",s_totals:"Totaluri"
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
 l_valcontr:"Сумма договоров",l_incas:"Получено",l_ramas:"Остаток",l_procent:"Процент получения",
 l_primit:"Получил",l_cheltuit:"Потратил",l_inmana:"Осталось на руках",l_justif:"Под отчётом у сотрудников",
 l_total:"Итого",l_azi:"по курсу на сегодня",l_impr:"Займы из кассы",l_alte:"Прочие выдачи",
 add_t:"Что записываем?",
 a_inc:"Поступление",a_inc_d:"Деньги от клиента",
 a_chelt:"Расход",a_chelt_d:"Потраченные деньги, в леях",
 a_ies:"Выдача из кассы",a_ies_d:"Аванс, внесение, зарплата",
 a_chirie:"Аренда / проживание",a_chirie_d:"Оплата жилья или помещения",
 a_impr:"Заём",a_impr_d:"Деньги в долг со сроком",
 a_contr:"Договор",a_contr_d:"Сумма и план поступлений",
 a_pontaj:"Табель",a_pontaj_d:"Отработанные дни за месяц",
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
 req:"Заполните обязательные поля.",
 r_inc:"Поступления",r_chelt:"Расходы",r_ies:"Выдачи из кассы",r_chirii:"Аренда",
 r_contr:"Договоры",r_sal:"Зарплаты",r_impr:"Займы",
 mine_t:"Мои записи",mine_e:"Вы ещё ничего не вносили.",
 nothing:"Пока пусто",nothing_d:"Нажмите «Добавить», чтобы начать.",
 set_val:"Валюты и курсы",set_val_h:"Курс на сегодня. Используется для остатка кассы, но не для уже внесённых строк.",
 set_cas:"Кассир",set_cas_h:"Деньги, выданные кассиру, не считаются выходом из кассы.",
 set_cat:"Категории расходов",set_cat_h:"Новую впишите в поле ниже; «×» — удалить (два нажатия). Старые записи сохраняют свою категорию.",cat_add:"Добавить категорию",cat_ph:"Название",
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
 a_user:"Пользователь",a_user_d:"Доступ новому сотруднику",r_user:"Пользователи",
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
 ov_more:"Подробнее",ov_all_s:"Все",per_lbl:"Период",menu_t:"Быстрый переход",menu_a:"Меню",s_totals:"Итоги"
}};
var lang="ro";
try{var sl=localStorage.getItem("ehl.lang"); if(sl==="ro"||sl==="ru") lang=sl;}catch(e){}
function T(k){var d=I18N[lang];return (d&&d[k])||I18N.ro[k]||k;}
/* the server answers in Romanian; known messages are shown in the interface language */
var SRV_MSG={"Cod invalid.":"srv_cod","Prea multe încercări. Așteptați 15 minute.":"srv_many","Cod greșit sau utilizator dezactivat.":"srv_bad_user","Parola trebuie să aibă cel puțin 8 caractere.":"srv_pw8","Parolă greșită.":"srv_pw_bad","Doar directorul are parolă.":"srv_pw_dir","Parola nouă trebuie să aibă cel puțin 8 caractere.":"srv_pw_new8","Parola actuală este greșită.":"srv_pw_cur","Codul trebuie să aibă 4–8 cifre.":"srv_cod48","Nu vă puteți dezactiva sau retrograda propriul cont.":"srv_self_lock","Nu vă puteți șterge propriul cont.":"srv_self_del","Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).":"srv_descr"};
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
  ACCESS=null;ME=null;isDir=false;LOCKED=false;sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";
  if(PB)PB.authStore.clear();
  try{localStorage.removeItem("ehl.cache")}catch(e){}
  gateErr=msg||"";view="add";render();
}
function needGate(){return !ACCESS||LOCKED}
function userOf(r){return {id:r.id,nume:r.nume||"",rol:r.rol||"Operator",cod:r.cod||"",status:r.status||"Activ",parolaSetata:!!r.parolaSetata}}
function enter(user){
  ACCESS={user:userOf(user)};ME=user.id;gateErr="";GATE={step:"cod"};
  isDir=computeDir();view=isDir?"panou":"add";
  subscribe();
}
/* Gate steps: "cod" (everyone) -> for directors "setparola" (first time) or "parola" (new phone, or weekly). */
var GATE={step:"cod"};
/* Lock screen: the access code is asked again on every start of the app and after it sat in the background
   for LOCK_AFTER; the session itself (token, data, offline queue) stays, only the screen is covered. */
var LOCKED=false,LOCKVIEW="",hiddenAt=0,LOCK_AFTER=10*60*1000;
function lockScreen(){
  if(!ACCESS||LOCKED)return;
  LOCKED=true;LOCKVIEW=view;gateErr="";
  if(sheetState||$("#sheet").innerHTML){sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";}
  GATE={step:"cod",relock:true,nume:ACCESS.user.nume};
  render();
}
function unlockScreen(){
  LOCKED=false;gateErr="";GATE={step:"cod"};
  view=LOCKVIEW||(isDir?"panou":"add");
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
document.addEventListener("visibilitychange",function(){
  if(document.visibilityState==="hidden"){hiddenAt=Date.now();return;}
  if(ACCESS&&!LOCKED&&hiddenAt&&Date.now()-hiddenAt>LOCK_AFTER)lockScreen();
  selfCheck();
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
    sub(col,"*",function(ev){applyEvent(col,ev)});
  });
  if(isDir){
    PB.collection("utilizatori").getFullList({batch:500,requestKey:null}).then(function(items){S.utilizatori=items.map(norm);saveCache();checkSelf()}).catch(authErrOf);
    sub("utilizatori","*",function(ev){applyEvent("utilizatori",ev);checkSelf()});
  }else{
    PB.collection("utilizatori").getOne(ME,{requestKey:null}).then(function(u){S.utilizatori=[norm(u)];saveCache();checkSelf()})
      .catch(function(e){if(e&&e.status===404){logout(T("gate_bad"));return}authErrOf(e)});
    sub("utilizatori",ME,function(ev){applyEvent("utilizatori",ev);checkSelf()});
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
  loadFailed();
}
function saveQueue(){try{localStorage.setItem("ehl.queue",JSON.stringify(QUEUE))}catch(e){}}
var FAILED=[];
function saveFailed(){try{localStorage.setItem("ehl.failed",JSON.stringify(FAILED))}catch(e){}}
function loadFailed(){try{FAILED=JSON.parse(localStorage.getItem("ehl.failed")||"[]")}catch(e){FAILED=[]}if(!(FAILED instanceof Array))FAILED=[]}
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
     /* refused by the server (rule or validation): park it where the user can see and retry it; nothing is ever dropped silently */
     var bad=QUEUE.shift();bad.err=(e&&e.response&&e.response.message)||String(e&&e.message||e);bad.at=new Date().toISOString();
     FAILED.push(bad);saveFailed();saveQueue();saveCache();toast(T("failed_toast"));
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
/* Expense categories are stored as typed (the defaults are Romanian). The common ones are shown in the interface
   language; catRaw maps what was typed in a form back to the stored name, so the data never splits in two. */
var CAT_RU={materiale:"Материалы",transport:"Транспорт",combustibil:"Топливо",unelte:"Инструменты",birou:"Офис",taxe:"Налоги",
 "reparații":"Ремонт",reparatii:"Ремонт",diverse:"Разное",salarii:"Зарплаты",chirie:"Аренда",chirii:"Аренда",
 comunale:"Коммунальные услуги","mâncare":"Питание",mancare:"Питание",telefon:"Связь",alte:"Прочее"};
var CAT_RO={};Object.keys(CAT_RU).forEach(function(k){var r=CAT_RU[k].toLowerCase();if(!CAT_RO[r])CAT_RO[r]=k.charAt(0).toUpperCase()+k.slice(1)});
function catLabel(c){var s=String(c==null?"":c),k=s.trim().toLowerCase();return (lang==="ru"?CAT_RU[k]:CAT_RO[k])||s}
function catRaw(v){var s=String(v||"").trim(),k=s.toLowerCase();if(!s)return s;
  var hit=categorii().filter(function(c){return String(c).trim().toLowerCase()===k})[0]||categorii().filter(function(c){return catLabel(c).toLowerCase()===k})[0];
  return hit||s}
function categorii(){var c=cfg().categorii;return uniq((c&&c.length?c:DEF_CFG.categorii).concat(S.cheltuieli.map(function(r){return r.categorie})))}
function angajatiActivi(){return S.angajati.filter(function(a){return a.status!=="Inactiv"}).map(function(a){return a.nume})}

/* ---------------- calculations (mirrors the workbook) ---------------- */
function calc(){
  var C={},vals=valute().map(function(v){return v.cod});
  var sum=function(arr,f){var t=0;arr.forEach(function(r){t+=f(r)||0});return round2(t)};

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
    var prop=sum(S.cheltuieli,function(r){return r.mod==="Numerar"&&r.sursa==="Proprii"&&sameP(r.platitDe,p)?n(r.suma):0});
    return {nume:p,primit:primit,cheltuit:chn,ramas:round2(primit-chn),transfer:cht,proprii:prop};
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
 [/asigur|страх|pază|охран|securit/i,"shield"],[/banc|банк|comision|комисс|card|карт/i,"cardIc"]
];
/* currency badge: symbol + fixed colour per currency, code printed beside it */
var CUR={MDL:{s:"L",c:"var(--accent)"},EUR:{s:"€",c:"var(--s1)"},USD:{s:"$",c:"var(--s7)"},RON:{s:"L",c:"var(--s4)"},GBP:{s:"£",c:"var(--s6)"},UAH:{s:"₴",c:"var(--s5)"},RUB:{s:"₽",c:"var(--s2)"}};
function curBadge(cod,withCode){var k=String(cod||"").toUpperCase(),d=CUR[k]||{s:k.slice(0,1)||"?",c:"var(--muted)"};
  return '<span class="cur" title="'+esc(k)+'"><span class="cur-b" style="background:'+d.c+'">'+esc(d.s)+'</span>'+(withCode!==false?'<span class="cur-c">'+esc(k)+'</span>':'')+'</span>'}
function catIcon(name){var s=String(name||"");for(var i=0;i<CAT_ICON_RULES.length;i++){if(CAT_ICON_RULES[i][0].test(s))return CAT_ICON_RULES[i][1]}return "tag"}
/* fixed categorical slot per category: by position in the settings list, so a colour follows its category */
function catSlot(name){var all=categorii();var i=-1;all.forEach(function(c,k){if(sameP(c,name))i=k});return i<0?6:(i%7)}

/* ---------------- form definitions ---------------- */
function opt(list){return list.map(function(v){return typeof v==="string"?{v:v,l:v}:v})}
var FORMS={
 incasari:{title:"a_inc",icon:"down",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"client",t:"text",l:"f_client",req:1,list:clienti()},
   fProiect(),
   {k:"descriere",t:"text",l:"f_descr"},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"}
 ]},calc:function(d){return [{l:T("eq"),v:money(n(d.suma)*n(d.curs))+" MDL"}]}},

 cheltuieli:{title:"a_chelt",icon:"up",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"suma",t:"number",l:"f_sumamdl",req:1,step:"0.01"},
   {k:"descriere",t:"text",l:"f_descr_req",req:1,hint:"f_descr_h",minlen:3},
   {k:"categorie",t:"text",l:"f_categ",req:1,list:categorii()},
   {k:"client",t:"text",l:"f_client",list:clienti()},
   fProiect(),
   {k:"platitDe",t:"text",l:"f_platit",req:1,list:oameni(),def:meName()||casier()},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"},
   {k:"sursa",t:"select",l:"src_t",req:1,opts:[{v:"Avans",l:T("src_avans")},{v:"Proprii",l:T("src_proprii")}],def:"Avans",hint:"src_h",showIf:function(d){return d.mod!=="Transfer"}}
 ]}},

 iesiri:{title:"a_ies",icon:"send",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"destinatie",t:"select",l:"f_dest",req:1,opts:[
     {v:"Dat persoanei",l:T("d_pers")},{v:"Depus pe cont",l:T("d_depus")},
     {v:"Salarii",l:T("d_sal")},{v:"Împrumut",l:T("d_impr")},{v:"Alte",l:T("d_alte")}],def:"Dat persoanei"},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"suma",t:"number",l:"f_suma",req:1,step:"0.01"},
   {k:"persoana",t:"text",l:"f_pers",list:persoane()},
   {k:"luna",t:"month",l:"f_luna",def:curMonth(),showIf:function(d){return d.destinatie==="Salarii"}},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){return [{l:T("eq"),v:money(n(d.suma)*n(d.curs))+" MDL"}]}},

 chirii:{title:"a_chirie",icon:"home",fields:function(){return[
   {k:"dataInceput",t:"date",l:"f_di",req:1,half:1,def:today()},
   {k:"dataSfarsit",t:"date",l:"f_ds",half:1},
   {k:"locatia",t:"text",l:"f_loc",req:1},
   {k:"chirias",t:"text",l:"f_chirias",list:persoane()},
   {k:"valuta",t:"select",l:"f_valuta",req:1,half:1,opts:opt(valute().map(function(v){return v.cod})),def:"MDL",onchg:"curs"},
   {k:"curs",t:"number",l:"f_curs",req:1,half:1,step:"0.0001",def:"1",lockIf:function(d){return d.valuta==="MDL"}},
   {k:"chirie",t:"number",l:"f_chirie",half:1,step:"0.01"},
   {k:"gaj",t:"number",l:"f_gaj",half:1,step:"0.01"},
   {k:"comunale",t:"number",l:"f_comun",half:1,step:"0.01"},
   {k:"avarii",t:"number",l:"f_avarii",half:1,step:"0.01"},
   {k:"mod",t:"select",l:"f_mod",req:1,opts:[{v:"Numerar",l:T("numerar")},{v:"Transfer",l:T("transfer")}],def:"Numerar"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){var t=n(d.chirie)+n(d.gaj)+n(d.comunale)+n(d.avarii);
   return [{l:T("tot"),v:money(t)+" "+(d.valuta||"")},{l:T("eq"),v:money(t*n(d.curs))+" MDL"}]}},

 imprumuturi:{title:"a_impr",icon:"clock",fields:function(){return[
   {k:"data",t:"date",l:"f_data",req:1,def:today()},
   {k:"persoana",t:"text",l:"f_pers",req:1,list:persoane()},
   {k:"suma",t:"number",l:"f_sumamdl",req:1,step:"0.01"},
   {k:"termen",t:"date",l:"f_termen"},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Neachitat",l:T("neachitat")},{v:"Achitat",l:T("achitat")}],def:"Neachitat"},
   {k:"dinCasa",t:"checkbox",l:"impr_cash",hint:"impr_cash_h",newOnly:1},
   {k:"nota",t:"text",l:"f_nota"}
 ]}},

 contracte:{title:"a_contr",icon:"file",fields:function(){return[
   {k:"client",t:"text",l:"f_client",req:1,list:clienti()},
   {k:"sumaContract",t:"number",l:"f_contract",req:1,step:"0.01"},
   {k:"deIncasatCash",t:"number",l:"f_decash",step:"0.01",def:"0"},
   {k:"nota",t:"text",l:"f_nota"}
 ]},calc:function(d){return [{l:T("f_decash"),v:money(n(d.deIncasatCash))},{l:T("transfer"),v:money(n(d.sumaContract)-n(d.deIncasatCash))}]}},

 pontaj:{title:"a_pontaj",icon:"calendar",fields:function(){return[
   {k:"luna",t:"month",l:"f_luna",req:1,def:curMonth()},
   {k:"angajat",t:"text",l:"f_ang",req:1,list:angajatiActivi().length?angajatiActivi():persoane()},
   {k:"z1",t:"number",l:"f_z1",half:1,step:"1",def:"0"},
   {k:"z2",t:"number",l:"f_z2",half:1,step:"1",def:"0"}
 ]},calc:function(d){var wd=workdays(d.luna),sal=salariuLa(d.angajat,d.luna?monthEnd(d.luna):today()),pz=wd?sal/wd:0;
   var out=[{l:(lang==="ru"?"Раб. дней":"Zile lucr."),v:String(wd)}];
   if(isDir)out.push({l:T("tot"),v:money((n(d.z1)+n(d.z2))*pz)+" MDL"}); /* operators cannot read salaries */
   return out}},

 utilizatori:{title:"a_user",icon:"userplus",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"rol",t:"select",l:"f_rol",req:1,opts:[{v:"Operator",l:T("rol_op")},{v:"Director",l:T("rol_dir")}],def:"Operator"},
   {k:"cod",t:"text",l:"f_cod",req:1,hint:"f_cod_h",def:codNou()},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("activ")},{v:"Inactiv",l:T("u_inactiv")}],def:"Activ"},
   {k:"caAngajat",t:"checkbox",l:"also_ang",newOnly:1},
   {k:"salariu",t:"number",l:"f_salariu",step:"0.01",def:"0",showIf:function(d){return !!d.caAngajat}}
 ]}},

 proiecte:{title:"a_proj",icon:"folder",fields:function(){return[
   {k:"nume",t:"text",l:"f_nume",req:1},
   {k:"client",t:"text",l:"f_client",list:clienti()},
   {k:"responsabili",t:"multi",l:"f_resp",opts:oameni()},
   {k:"buget",t:"number",l:"f_buget",step:"0.01",def:"0"},
   {k:"dataInceput",t:"date",l:"f_di",half:1,def:today()},
   {k:"termen",t:"date",l:"f_termen",half:1},
   {k:"status",t:"select",l:"f_status",req:1,opts:[{v:"Activ",l:T("st_activ")},{v:"Pauză",l:T("st_pauza")},{v:"Finalizat",l:T("st_final")}],def:"Activ"},
   {k:"nota",t:"text",l:"f_nota"}
 ]}},

 angajati:{title:"a_ang",icon:"user",fields:function(){return[
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
    {h:T("f_data"),k:"data",w:12,fmt:FMT_D},{h:T("f_categ"),k:"categorie",w:18},
    {h:T("f_descr"),k:"descriere",w:30},{h:T("f_client"),k:"client",w:22},{h:T("f_proiect"),k:"proiect",w:20},
    {h:T("f_sumamdl"),k:"suma",w:15,fmt:FMT_M},{h:T("f_platit"),k:"platitDe",w:20},{h:T("f_mod"),k:"mod",w:12},{h:T("src_t"),k:"sursa",w:16}],
    ch.map(function(r){return {data:xd(r.data),categorie:catLabel(r.categorie),descriere:r.descriere,client:r.client,
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
  document.body.classList.toggle("locked",needGate());
  $("#ttl").textContent=T("app");document.title=T("app");document.documentElement.lang=lang;
  $("#role").textContent=!ACCESS?T("oaspete"):(isDir?T("director"):T("angajat"));
  $("#role").className="role"+(isDir?" on":"");
  /* header: brand mark, and who is signed in (initials, name, role) */
  var lg=$("#logo");if(lg&&!lg.firstChild)lg.innerHTML=icon("wallet");
  var bgi=$("#burger");if(bgi&&!bgi.firstChild){bgi.innerHTML=icon("menu");bgi.setAttribute("aria-label",T("menu_a"));}
  /* the brand leads home: the dashboard for a director, "Add" for an operator; nothing while signed out */
  var br=$(".brand");if(br){if(ACCESS&&!needGate()){br.dataset.view=isDir?"panou":"add";br.setAttribute("role","link");br.tabIndex=0;}else{delete br.dataset.view;br.removeAttribute("role");br.removeAttribute("tabindex");}}
  var meBox=$("#me"),nm=meName();
  if(meBox){meBox.hidden=!ACCESS;$("#uname").textContent=nm;$("#av").textContent=initials(nm);}
  /* one button that names the other language */
  var lb=$("#langbtn");if(lb){var other=lang==="ru"?"ro":"ru";lb.dataset.lang=other;lb.innerHTML=icon("globe")+'<span>'+other.toUpperCase()+'</span>';lb.setAttribute("aria-label",other==="ru"?"Русский":"Română");}
  renderNav();
  var h="";
  if(needGate())h=vGate();
  else if(view==="panou")h=vPanou();
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
  if(view!=="panou"){view="panou";histPush({v:view});render();}
  if(!MENU_IC){MENU_IC={};[["ov_chelt","outArrow"],["ov_flux","chart"],["s_totals","wallet"],["s_bani","wallet"],["s_casa","cash"],["s_colab","users"],["s_client","user"],["s_categ","tag"],["s_proiecte","folder"],["p_alte","folder"],["s_contr","file"],["s_sal","users"],["s_impr","clock"],["s_chirii","home"]].forEach(function(p){MENU_IC[p[0]]=p[1]})}
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
    ?[["panou",icon("chart"),T("nav_panou")],["add",icon("plus"),T("nav_add")],["reg",icon("list"),T("nav_reg")],["set",icon("gear"),T("nav_set")]]
    :[["add",icon("plus"),T("nav_add")],["mine",icon("list"),T("nav_mine")],["panou",icon("lock"),T("nav_panou")]];
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
function statusNote(){
  var h=failedNote();
  if(!online)h+='<div class="note">'+esc(T("offline_note"))+'</div>';
  if(QUEUE.length)h+='<div class="note">'+esc(T("pending").replace("{n}",String(QUEUE.length)))+'</div>';
  if(online&&dbErr)h+='<div class="note">'+esc(T("offline"))+'</div>';
  else if(online&&!loaded.incasari&&!S.incasari.length)h+='<div class="note">'+esc(T("loading"))+'</div>';
  else if(online&&stale)h+='<div class="note">'+esc(T("stale"))+'</div>';
  return h;
}
/* a figure tile: icon and label on top, the amount below with its unit as quiet text */
function tile(k,v,u,cls,big,ic){
  var unit=u?'<span class="u">'+esc(u)+'</span>':'';
  return '<div class="tile'+(big?" big":"")+'"><span class="k">'+(ic?'<span class="t-ic '+(cls||"")+'">'+icon(ic)+'</span>':'')+esc(k)+'</span><span class="v '+(cls||"")+'">'+v+unit+'</span></div>';
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
function barRow(l,v,max,col,ic){
  var pct=max>0?Math.max(2,Math.round(v/max*100)):0;
  return '<div class="row wrap'+(ic?" ri":"")+'"'+(col?' style="--c:'+col+'"':'')+'>'+(ic?'<span class="ic-badge tint">'+icon(ic)+'</span>':'')+'<span class="l">'+esc(l)+'</span><span class="r">'+money(v)+'</span><span class="bar-wrap"><span class="bar-fill" style="width:'+pct+'%"></span></span></div>';
}

/* ---------------- overview (month picker, expenses by category, cash flow) ---------------- */
var OV={luna:curMonth()};
var regFilter=null; /* {col:"cheltuieli",categorie,luna} set by tapping a category in the overview */
function ymOf(r){return String(dateOf(r)||"").slice(0,7)}
function addMonths(ym,k){var y=parseInt(ym.slice(0,4),10),m=parseInt(ym.slice(5,7),10)-1+k;var d=new Date(y,m,1);return d.getFullYear()+"-"+p2(d.getMonth()+1)}
function monthsBack(n){var out=[],cur=curMonth();for(var i=n-1;i>=0;i--)out.push(addMonths(cur,-i));return out}
function shortMonth(ym){var nm=monthName(ym).split(" ")[0];return nm.slice(0,3)}
function round2(v){return Math.round((v||0)*100)/100}
function ovData(luna){
  var inM=function(r){return !luna||ymOf(r)===luna};
  var chelt=S.cheltuieli.filter(inM),inc=S.incasari.filter(inM);
  var byCat={};chelt.forEach(function(r){var k=String(r.categorie||"").trim()||"—";byCat[k]=round2((byCat[k]||0)+n(r.suma))});
  var cats=Object.keys(byCat).map(function(k){return {nume:k,val:byCat[k],slot:catSlot(k),icon:catIcon(k)}}).sort(function(a,b){return b.val-a.val});
  var total=round2(cats.reduce(function(a,c){return a+c.val},0));
  /* at most six named segments; the tail folds into "Alte" */
  if(cats.length>7){var head=cats.slice(0,6),tail=cats.slice(6);var rest=round2(tail.reduce(function(a,c){return a+c.val},0));
    head.push({nume:T("ov_alte"),val:rest,slot:6,icon:"dots",folded:tail.map(function(c){return catLabel(c.nume)})});cats=head;}
  var incTotal=round2(inc.reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0));
  var prevLuna=luna?addMonths(luna,-1):"";
  var prev=luna?round2(S.cheltuieli.filter(function(r){return ymOf(r)===prevLuna}).reduce(function(a,r){return a+n(r.suma)},0)):0;
  var months=monthsBack(6).map(function(m){
    return {luna:m,inc:round2(S.incasari.filter(function(r){return ymOf(r)===m}).reduce(function(a,r){return a+n(r.suma)*n(r.curs)},0)),
      out:round2(S.cheltuieli.filter(function(r){return ymOf(r)===m}).reduce(function(a,r){return a+n(r.suma)},0))};
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
  var h='<div class="sheet"><div class="sheet-in"><div class="sheet-head"><h2>'+esc(name)+'</h2><button class="x" type="button" id="closeSheet" aria-label="'+esc(T("cancel"))+'">'+icon("x")+'</button></div>';
  h+='<div class="tiles"><div class="tile big" style="background:'+(x.ramas<0?"var(--neg)":"var(--accent)")+'"><span class="k">'+esc(x.ramas<0?T("colab_owed"):T("colab_has"))+'</span><span class="v">'+money(Math.abs(x.ramas))+'<span class="u">MDL</span></span></div>'
    +tile(T("l_primit"),money(x.primit),"MDL")+tile(T("l_cheltuit"),money(x.cheltuit),"MDL")+'</div>';
  if(x.proprii)h+='<p class="note" style="margin-top:10px">'+esc(T("colab_proprii_h").replace("{s}",money(x.proprii)))+'</p>';
  h+='<div class="sec"><h2>'+esc(T("colab_spent"))+'</h2>'+(spent.length?'<div class="card rows">'+spent.map(function(r){
    return '<button type="button" class="tap row" data-edit="cheltuieli" data-id="'+esc(r.id)+'"><span class="l">'+esc(r.descriere||catLabel(r.categorie)||"—")+'<span class="s">'+esc([r.data,catLabel(r.categorie),r.proiect,r.sursa==="Proprii"?T("src_proprii_short"):""].filter(Boolean).join(" · "))+'</span></span><span class="r neg">'+money(n(r.suma))+'</span></button>';
  }).join("")+'</div>':'<div class="card"><div class="empty">'+esc(T("nothing"))+'</div></div>')+'</div>';
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
      return '<button type="button" class="tap row" data-cat="'+esc(c.nume)+'" style="--c:var(--s'+(c.slot+1)+')"'+(c.folded?' title="'+esc(catLabel(c.nume)+": "+c.folded.join(", "))+'"':'')+'><span class="ic-badge" style="color:var(--s'+(c.slot+1)+')">'+icon(c.icon)+'</span><span class="l">'+esc(catLabel(c.nume))+(c.folded?'<span class="s">'+esc(c.folded.join(", "))+'</span>':'')+'</span><span class="r">'+money(c.val)+'<span class="s">'+fmt(pct,1)+'%</span></span><span class="share"><i style="width:'+Math.max(2,pct).toFixed(1)+'%"></i></span></button>';
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

function vPanou(){
  if(!isDir)return vPin();
  var C=calc(),h=statusNote();
  h+=vOverview();
  h+='<div class="dash-grid">';
  h+='<div class="sec sec-wide"><div class="tiles">'
    +tile(T("t_total"),money(C.totalFirma),"MDL","",1,"wallet")
    +tile(T("t_casa"),money(C.casaMDL),"MDL","",0,"cash")
    +tile(T("t_cont"),money(C.contMDL),"MDL",C.contMDL<0?"neg":"",0,"bank")
    +tile(T("t_incasari"),money(C.incTotal),"MDL","pos",0,"inArrow")
    +tile(T("t_cheltuieli"),money(C.cheltTotal),"MDL","neg",0,"outArrow")
    +'</div></div>';

  h+='<div class="sec"><h2>'+esc(T("s_bani"))+'</h2>'+rowsCard([
    r2(T("l_num"),money(C.incNumMDL),null,"",0,"cash","var(--pos)"),r2(T("l_tr"),money(C.incTrMDL),null,"",0,"cardIc","var(--pos)"),
    r2(T("l_chnum"),money(C.cheltNum),null,"",0,"cash","var(--neg)"),r2(T("l_chtr"),money(C.cheltTr),null,"",0,"cardIc","var(--neg)"),
    r2(T("l_salplatit"),money(C.salPlatitMDL),null,"",0,"users","var(--s1)"),r2(T("l_avans"),money(C.avansMDL),null,"",0,"send","var(--s6)"),
    r2(T("l_depus"),money(C.depusMDL),null,"",0,"bank","var(--s3)"),r2(T("l_chirii"),money(C.chiriiMDL),null,"",0,"home","var(--s4)"),
    r2(T("l_justif"),money(C.colabRamas),null,C.colabRamas>0?"warnc":"",0,"clock","var(--warn)"),
    r2(T("t_total"),money(C.totalFirma),null,"",1,"wallet","var(--accent)")
  ])+'</div>';

  var cv=C.vals.filter(function(v){return C.intratNum[v]||C.iesTotal[v]||C.ramas[v]});
  if(cv.length)h+='<div class="sec sec-casa"><h2>'+esc(T("s_casa"))+'</h2>'+rowsCard(cv.map(function(v){
    return '<div class="row"><span class="l">'+curBadge(v)+'<span class="s">'+esc(money(C.ramasMDL[v])+" MDL · "+T("l_azi"))+'</span></span><span class="r '+(C.ramas[v]<0?"neg":"")+'">'+money(C.ramas[v])+'</span></div>';
  }).concat([r2(T("l_total"),money(C.casaMDL)+" MDL",null,"",1)]))+'</div>';

  if(C.colab.length)h+='<div class="sec"><h2>'+esc(T("s_colab"))+'</h2><div class="card rows">'+C.colab.map(function(x){return colabRow(x)}).join("")+'</div></div>';

  if(C.perClient.length)h+='<div class="sec"><h2>'+esc(T("s_client"))+'</h2>'+rowsCardMore(C.perClient.map(function(x){
    return r2(x.nume,money(x.sold),T("t_incasari")+" "+money(x.inc)+" · "+T("t_cheltuieli")+" "+money(x.chelt),x.sold<0?"neg":"pos");
  }),5,true)+'</div>';

  if(C.perCateg.length){var mx=C.perCateg[0].val;
    h+='<div class="sec"><h2>'+esc(T("s_categ"))+'</h2>'+rowsCardMore(C.perCateg.map(function(x){return barRow(catLabel(x.nume),x.val,mx,"var(--s"+(catSlot(x.nume)+1)+")",catIcon(x.nume))}),5,true)+'</div>';}
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
      return '<button type="button" class="tap row wrap" data-edit="proiecte" data-id="'+esc(p.id)+'">'
        +'<span class="l">'+esc(p.nume)+'<span class="s">'+esc(sub)+'</span><span class="s">'+esc(note)+'</span></span>'
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

  if(C.salLuni.length)h+='<div class="sec"><h2>'+esc(T("s_sal"))+'</h2>'+statCard([
    [T("l_castigat"),money(C.salCastigat)],[T("l_plata"),money(C.salPlatit)],
    [T("l_rest"),money(C.salRest),C.salRest>0?"warnc":"pos"]
  ],C.salCastigat>0?C.salPlatit/C.salCastigat*100:null,C.salLuni.slice(0,4).map(function(m){
    return r2(monthName(m.luna),money(m.rest),T("l_castigat")+" "+money(m.castigat)+" · "+T("l_plata")+" "+money(m.platit),m.rest>0?"warnc":"");
  }).join(""))+'</div>';

  if(S.imprumuturi.length)h+='<div class="sec"><h2>'+esc(T("s_impr"))+'</h2>'+statCard([
    [T("l_imprtot"),money(C.imprTotal)],[T("l_restituit"),money(C.imprRestituit),"pos"],
    [T("l_derecup"),money(C.imprRamas),C.imprRamas>0?"warnc":"",C.imprNeachitate+" ×"],[T("l_restante"),String(C.imprRestante),C.imprRestante?"neg":"pos"]
  ],C.imprTotal>0?C.imprRestituit/C.imprTotal*100:null)+'</div>';

  if(C.chiriiMDL)h+='<div class="sec"><h2>'+esc(T("s_chirii"))+'</h2>'+statCard([[T("l_total"),money(C.chiriiMDL)+' <span class="u">MDL</span>']])+'</div>';
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
  var h='<div class="sec"><div class="sec-h"><h2>'+esc(T("r_user"))+'</h2><div class="sec-act"><button class="btn sm ghost exit-top" id="exitdir" type="button">'+icon("users")+esc(T("logout"))+'</button><button class="btn sm" type="button" data-form="utilizatori">'+icon("userplus")+esc(T("a_user"))+'</button></div></div>';
  if(!S.utilizatori.length){
    h+='<div class="card"><div class="empty"><b>'+esc(T("u_none"))+'</b>'+esc(T("u_none_d"))+'</div></div>';
  }else{
    /* a person per row: initials in their colour, the role as a tag, the access code in a mono chip */
    h+='<div class="card rows">'+S.utilizatori.slice().sort(function(a,b){return String(a.nume).localeCompare(String(b.nume))}).map(function(u){
      var off=u.status==="Inactiv",dir=u.rol==="Director";
      return '<button type="button" class="tap row user-row'+(off?" off":"")+'" data-edit="utilizatori" data-id="'+esc(u.id)+'">'
        +'<span class="av" style="--c:'+toneOf(u.nume)+'">'+esc(initials(u.nume))+'</span>'
        +'<span class="l"><span class="nm-row">'+esc(u.nume)+'<span class="tagc '+(dir?"acc":"mut")+'">'+esc(dir?T("rol_dir"):T("rol_op"))+'</span>'+(off?'<span class="tagc neg">'+esc(T("u_inactiv"))+'</span>':'')+'</span></span>'
        +'<span class="code">'+esc(off?"—":u.cod)+'</span></button>';
    }).join("")+'</div>';
  }
  return h+'</div>';
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
  var order=["incasari","cheltuieli","iesiri","chirii","imprumuturi","contracte","pontaj","angajati"];
  if(isDir)order=["incasari","cheltuieli","iesiri","proiecte","utilizatori","chirii","imprumuturi","contracte","pontaj","angajati"];
  var desc={incasari:"a_inc_d",cheltuieli:"a_chelt_d",iesiri:"a_ies_d",chirii:"a_chirie_d",
    imprumuturi:"a_impr_d",contracte:"a_contr_d",pontaj:"a_pontaj_d",angajati:"a_ang_d",proiecte:"a_proj_d",utilizatori:"a_user_d"};
  h+='<div class="sec"><h2>'+esc(T("add_t"))+'</h2><div class="grid2">'+order.map(function(k,i){
    return '<button type="button" class="act'+(i<2?" primary":"")+'" data-form="'+k+'">'
      +'<span class="m">'+icon(FORMS[k].icon)+'</span>'
      +'<span class="t">'+esc(T(FORMS[k].title))+'</span>'
      +'<span class="d2">'+esc(T(desc[k]))+'</span></button>';
  }).join("")+'</div></div>';
  h+='</div><aside class="add-side">';
  h+='<div class="sec"><h2>'+esc(T("ord"))+'</h2><div class="card rows">'
    +[1,2,3,4].map(function(i){return '<div class="row step"><span class="num">'+i+'</span><span class="l">'+esc(T("ord_"+i))+'</span></div>'}).join("")+'</div></div>';
  h+=installNote();
  if(!isDir)h+='<div class="sec"><button class="btn ghost" id="exitdir" type="button">'+esc(T("logout"))+'</button></div>';
  h+='</aside></div>';
  return h;
}

var REGDEF={
 incasari:{t:"r_inc",cols:[["data","f_data"],["client","f_client"],["suma","f_suma","n"],["mod","f_mod"]],
   sub:function(r){return [r.proiect,r.descriere].filter(Boolean).join(" · ")},
   main:function(r){return r.client||"—"},amt:function(r){return money(n(r.suma))+" "+curBadge(r.valuta||"MDL",false)},
   cls:function(){return "pos"},meta:function(r){return r.data+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 cheltuieli:{t:"r_chelt",main:function(r){return catLabel(r.categorie)||"—"},
   sub:function(r){return [r.descriere,r.client,r.proiect,(r.mod!=="Transfer"&&r.sursa==="Proprii")?T("src_proprii_short"):""].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" MDL"},cls:function(){return "neg"},
   meta:function(r){return r.data+" · "+(r.platitDe||"")+" · "+(r.mod==="Numerar"?T("numerar"):T("transfer"))}},
 iesiri:{t:"r_ies",main:function(r){var m={"Depus pe cont":"d_depus","Dat persoanei":"d_pers",Salarii:"d_sal","Împrumut":"d_impr",Alte:"d_alte"};return T(m[r.destinatie]||"d_alte")},
   sub:function(r){return [r.persoana,r.luna?monthName(r.luna):"",r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(n(r.suma))+" "+curBadge(r.valuta||"MDL",false)},cls:function(){return "warnc"},
   meta:function(r){return r.data}},
 chirii:{t:"r_chirii",main:function(r){return r.locatia||"—"},
   sub:function(r){return [r.chirias,r.nota].filter(Boolean).join(" · ")},
   amt:function(r){return money(chirieTotal(r))+" "+curBadge(r.valuta||"MDL",false)},cls:function(){return "neg"},
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
/* table view of the registers: the title of the main column, an icon per record, the "who and how" cell and the amount in lei */
var DEST_IC={"Depus pe cont":["bank","var(--s3)"],"Dat persoanei":["send","var(--s6)"],Salarii:["users","var(--s1)"],"Împrumut":["clock","var(--s4)"],Alte:["dots","var(--muted)"]};
var REGTBL={
 incasari:{th:"f_client",ic:function(){return ["inArrow","var(--pos)"]},how:function(r){return [r.mod==="Numerar"?T("numerar"):T("transfer"),""]},mdl:function(r){return n(r.suma)*n(r.curs)}},
 cheltuieli:{th:"f_categ",ic:function(r){return [catIcon(r.categorie),"var(--s"+(catSlot(r.categorie)+1)+")"]},how:function(r){return [r.mod==="Numerar"?T("numerar"):T("transfer"),r.platitDe||""]},mdl:function(r){return n(r.suma)}},
 iesiri:{th:"f_dest",ic:function(r){return DEST_IC[r.destinatie]||DEST_IC.Alte},how:function(r){return ["",r.persoana||""]},mdl:function(r){return n(r.suma)*n(r.curs)}},
 chirii:{th:"f_loc",ic:function(){return ["home","var(--s4)"]},how:function(r){return [r.mod==="Numerar"?T("numerar"):T("transfer"),r.chirias||""]},mdl:function(r){return chirieTotal(r)*n(r.curs)}},
 proiecte:{th:"f_proiect",ic:function(){return ["folder","var(--s1)"]},how:function(r){return [REGDEF.proiecte.meta(r),""]},mdl:null},
 imprumuturi:{th:"f_pers",ic:function(r){return ["clock",r.status==="Achitat"?"var(--pos)":"var(--warn)"]},how:function(r){return [r.status==="Achitat"?T("achitat"):T("neachitat"),""]},mdl:function(r){return n(r.suma)}}
};
var REG_IC={incasari:"inArrow",cheltuieli:"outArrow",iesiri:"send",proiecte:"folder",chirii:"home",contracte:"file",imprumuturi:"clock",salarii:"users",jurnal:"list"};
function regLabel(k){return k==="salarii"?T("r_sal"):(k==="jurnal"?T("r_jur"):T(REGDEF[k].t))}
var REG_TABS=["incasari","cheltuieli","iesiri","proiecte","chirii","contracte","imprumuturi","salarii","jurnal"];
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
        +'<td class="t-how"><div class="cell">'+(how[0]?'<span class="pill-m">'+esc(how[0])+'</span>':'')+esc(how[1])+'</div></td>'
        +'<td class="n amt '+def.cls(r)+'"><div class="cell">'+def.amt(r)+'</div></td></tr>';
    });
    h+='</tbody>';
  });
  return h+'</table></div>';
}
function dateOf(r){return r.data||r.dataInceput||r.luna||r.ts||""}
function vReg(){
  if(!isDir)return vPin();
  var tabs=["incasari","cheltuieli","iesiri","proiecte","chirii","contracte","imprumuturi","salarii","jurnal"];
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
    list=list.filter(function(r){return (!regFilter.luna||ymOf(r)===regFilter.luna)&&(!regFilter.categorie||sameP(r.categorie,regFilter.categorie))});
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
      +'<span class="l">'+esc(def.main(r))+'<span class="s">'+esc([def.meta(r),def.sub(r)].filter(Boolean).join(" · "))+'</span></span>'
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

  h+=setCard("wallet",T("set_cas"),T("set_cas_h"),'<form id="casf"><label><span>'+esc(T("f_pers"))+'</span><input name="casier" value="'+esc(c.casier||"")+'" list="dl-pers"></label>'+setSave()+'</form>')
    +'<datalist id="dl-pers">'+persoane().map(function(p){return '<option value="'+esc(p)+'">'}).join("")+'</datalist>';

  h+=setCard("lock",T("set_pw"),T("set_pw_h"),'<form id="pwchg">'
    +'<label><span>'+esc(T("f_parola_veche"))+'</span><input type="password" name="veche" autocomplete="current-password"></label>'
    +'<div class="pair"><label><span>'+esc(T("f_parola_noua"))+'</span><input type="password" name="noua" autocomplete="new-password" minlength="8"></label>'
    +'<label><span>'+esc(T("f_parola2"))+'</span><input type="password" name="noua2" autocomplete="new-password" minlength="8"></label></div>'+setSave()+'</form>');

  /* categories: how they look on the dashboard, then the list to edit (in the interface language; saved under the stored names) */
  h+=setCard("tag",T("set_cat"),T("set_cat_h"),catChips());

  h+=setCard("file",T("exp_t"),T("j_exp_h"),'<form id="expf">'
    +'<div class="pair exp-row"><label><span>'+esc(T("f_luna"))+'</span><input type="month" name="luna" value="'+esc(JUR.luna)+'"></label>'
    +'<label class="cb exp-cb"><input type="checkbox" name="doar"><span>'+esc(T("exp_luna"))+'</span></label></div>'+setSave("expsub",T("exp_btn"),"down")+'</form>');
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
  var rec=id?S[col].filter(function(r){return r.id===id})[0]:null;
  var data={};
  def.fields().forEach(function(f){data[f.k]=rec?(rec[f.k]!=null?rec[f.k]:""):(f.def!=null?f.def:"")});
  if(rec&&col==="angajati")data.salariu=salariuLa(rec.nume,today());
  sheetState={col:col,id:id||null,data:data,err:""};
  sheetOpened();
  drawSheet();
}
/* The phone's back button / swipe closes the open form first, then steps back through views,
   and only then leaves the app. Each open sheet and each view change is a history entry. */
var HIST=typeof history!=="undefined"&&history.pushState?history:null;
function histPush(st){if(HIST){try{HIST.pushState(st,"")}catch(e){}}}
function sheetOpened(){if(HIST&&!(HIST.state&&HIST.state.sheet))histPush({v:view,sheet:true})}
function closeSheetNow(){sheetState=null;$("#sheet").innerHTML="";document.body.style.overflow="";render()}
function closeSheet(){
  if(HIST&&HIST.state&&HIST.state.sheet){HIST.back();return;} /* popstate closes it */
  closeSheetNow();
}
window.addEventListener("popstate",function(e){
  var st=(e&&e.state)||{};
  if($("#sheet").innerHTML){closeSheetNow();}
  if(st.v&&st.v!==view&&!needGate()){view=st.v;render();}
});
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
  /* totals side by side in one row */
  if(def.calc){calcHtml='<div class="calc-row">'+def.calc(st.data).map(function(c){return '<div class="calcbox"><span>'+esc(c.l)+'</span><span class="num">'+esc(c.v)+'</span></div>'}).join("")+'</div>'}
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
    +(st.id&&isDir?'<button class="btn danger" type="button" id="delbtn" aria-label="'+esc(T("del"))+'" title="'+esc(T("del"))+'">'+icon("trash")+'</button>':'')
    +'</div></form>'+dls+'</div></div>';
  document.body.style.overflow="hidden";
  dpClose();enhanceDates($("#sheet"));
}
function fieldHtml(f,v){
  var lbl=esc(T(f.l)),id="fl-"+f.k;
  var locked=!!(f.lockIf&&sheetState&&f.lockIf(sheetState.data));
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
    if(f.k==="valuta")lbl=curBadge(v||"MDL",false)+' '+lbl;
    if(v&&!opts.some(function(o){return String(o.v)===String(v)}))opts.unshift({v:v,l:v});
    if(f.allowEmpty)opts.unshift({v:"",l:"—"});
    return '<label for="'+id+'"><span>'+lbl+(f.req?" *":"")+'</span><select id="'+id+'" data-k="'+f.k+'">'
      +opts.map(function(o){return '<option value="'+esc(o.v)+'"'+(String(v)===String(o.v)?" selected":"")+'>'+esc(o.l)+'</option>'}).join("")
      +'</select></label>';
  }
  if(f.k==="categorie")v=catLabel(v);
  var type=f.t==="number"?"number":(f.t==="date"?"date":(f.t==="month"?"month":"text"));
  var extra=f.t==="number"?' inputmode="decimal" step="'+(f.step||"0.01")+'"':"";
  var list=f.list&&f.list.length?' list="dl-'+f.k+'" autocomplete="off"':"";
  return '<label for="'+id+'"><span>'+lbl+(f.req?" *":"")+'</span><input type="'+type+'" id="'+id+'" data-k="'+f.k+'" value="'+esc(v)+'"'+extra+list+(locked?' readonly':'')+'></label>'
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
  var short=fields.filter(function(f){return f.minlen&&String(st.data[f.k]||"").trim().length<f.minlen});
  if(short.length){st.err=T("descr_short");drawSheet();return;}
  var btn=$("#savebtn");if(btn){btn.disabled=true;btn.textContent=T("saving")}
  var d=st.data,col=st.col,p;
  if(col==="cheltuieli"&&d.categorie)d.categorie=catRaw(d.categorie);
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
        suma:n(d.suma),persoana:ib.persoana,nota:(lang==="ru"?"Заём":"Împrumut")+" — "+ib.persoana});
    });
  }else{
    var b={};fields.forEach(function(f){
      if(f.t==="checkbox")return;
      if(f.newOnly&&st.id)return;
      b[f.k]=(f.t==="number")?n(d[f.k]):String(d[f.k]==null?"":d[f.k]).trim();
    });
    if(b.valuta==="MDL"&&("curs" in b))b.curs=1; /* lei never carry a rate */
    p=saveDoc(col,b,st.id);
  }
  p.then(function(){closeSheet();toast(T("saved"))})
   .catch(function(e){st.err=(e&&e.code==="permission-denied")?T("nowrite"):(T("offline"));drawSheet()});
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
      var iso=y+"-"+p2(m)+"-"+p2(c.d);
      h+='<button type="button" class="dp-day'+(c.off?" dp-off":"")+(iso===cur?" dp-sel":"")+(iso===td?" dp-today":"")+'" data-dpv="'+iso+'">'+c.d+'</button>';
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
  if(fb){openForm(fb.dataset.form);return;}
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
  if(t.closest&&t.closest("#delbtn")){
    var b=t.closest("#delbtn");
    if(b.dataset.armed==="1"){
      delDoc(sheetState.col,sheetState.id).then(function(){closeSheet();toast(T("deleted"))})
        .catch(function(){sheetState.err=T("offline");drawSheet()});
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
  if(dc){regFilter={col:"cheltuieli",categorie:dc.getAttribute("data-cat")||"",luna:OV.luna};REGPAGE.cheltuieli=0;regTab="cheltuieli";if(view!=="reg"){view="reg";histPush({v:view});}render();return;}
  if(t.closest&&t.closest("[data-clearfilter]")){regFilter=null;REGPAGE[regTab]=0;render();return;}
  var rf=t.closest&&t.closest("[data-retry]");
  if(rf){retryFailed(parseInt(rf.getAttribute("data-retry"),10));return;}
  var df=t.closest&&t.closest("[data-dropfailed]");
  if(df){if(df.dataset.armed==="1"){dropFailed(parseInt(df.getAttribute("data-dropfailed"),10))}else{df.dataset.armed="1";df.textContent=T("del_yes")}return;}
  if(t.closest&&t.closest("#expbtn")){exportRun(JUR.luna,false);return;}
  if(t.closest&&t.closest("#exitdir")){try{localStorage.removeItem("ehl.cod");localStorage.removeItem("ehl.exp")}catch(e){}logout();return;}
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
  if(!sheetState||!el.dataset||!el.dataset.k)return;
  var k=el.dataset.k;
  sheetState.data[k]=(el.type==="checkbox")?el.checked:el.value;
  if(k==="valuta"){sheetState.data.curs=String(cursAzi(el.value));drawSheet();return;}
  if(k==="destinatie"||k==="mod"||el.type==="checkbox"){drawSheet();return;}
  if(k==="angajat"||k==="luna"){var def=FORMS[sheetState.col];if(def&&def.calc)drawSheet();}
});
document.addEventListener("submit",function(ev){
  var f=ev.target;ev.preventDefault();
  if(f.id==="recf"){submitForm();return;}
  var gateFail=function(e,dflt){
    gateBusy=false;
    var srv=e&&e.response&&e.response.message;
    gateErr=netErr(e)?T("offline"):(((e&&e.status===429)||(e&&e.status===400))&&srv?srvT(srv):dflt);
    render();
  };
  if(f.id==="pinf"){
    var v=$("#pinv").value.trim();
    if(!v||gateBusy){$("#pinerr").hidden=false;return;}
    if(GATE.relock){
      /* lock screen: compared with the code of the signed-in user (or the remembered director code), no server round trip */
      var want=LOCKED&&ACCESS?String(ACCESS.user.cod||""):String(GATE.cod||"");
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
  if(!window.PocketBase){noCfg=true;render();return;}
  try{
    PB=new PocketBase(String(window.PB_URL||"").replace(/\/+$/,"")||window.location.origin);
    PB.autoCancellation(false);
  }catch(e){authErr=String(e&&e.message||e);render();return;}
  online=navigator.onLine!==false;
  var rec=PB.authStore.record||PB.authStore.model;
  if(PB.authStore.isValid&&rec&&rec.id){
    enter(rec);
    lockScreen(); /* the code is asked again on every start */
    /* confirm the session with the server: a deactivated user or an expired director week ends it */
    selfCheck();
  }else{
    var sc="";try{sc=localStorage.getItem("ehl.cod")||""}catch(e){}
    if(sc)GATE={step:"cod",relock:true,weekly:!!sessionExp(),cod:sc};
    render();
  }
  window.addEventListener("online",function(){selfCheck()});
  if(navigator.serviceWorker&&navigator.serviceWorker.register){
    window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js").catch(function(){})});
  }
})();
})();