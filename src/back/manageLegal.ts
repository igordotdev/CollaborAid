import { Database } from "bun:sqlite";
import { queryDatabase } from "./queryDatabase"

function buildQueryLegal(
    baseQuery: string,
    filters: Record<string, any>
  ): { query: string; params: any[] } {
    const params: any[] = [];
    const conditions: string[] = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === "name" || key === "address" || key === "scopeOfActivities" || key === "mainValuesAndObjectives" || key === "latestProjects") {
          conditions.push(`${key} LIKE ?`);
          params.push(`%${value}%`);
        } else if (key === "NIP" || key === "REGON" || key === "contactNumber") {
          conditions.push(`${key} = ?`);
          params.push(Number(value));
        } else {
          conditions.push(`${key} = ?`);
          params.push(value);
        }
      }
    }

    const query =
      conditions.length > 0
        ? `${baseQuery} WHERE ${conditions.join(" AND ")}`
        : baseQuery;
    return { query, params };
  }

function startLegalTable(db: Database) {
//comment this out later!!!
  db.run("DROP TABLE IF EXISTS legalEntities");

  // Create the users table if it doesn't exist
  if (
    !db
      .query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='legalEntities'"
      )
      .all()[0]
  ) {
    db.run(`
    CREATE TABLE legalEntities (
      NIP INTEGER,
      REGON INTEGER PRIMARY KEY,
      name TEXT,
      legalForm TEXT,
      address TEXT,
      dateOfStart DATE,
      scopeOfActivities TEXT,
      mainValuesAndObjectives TEXT,
      latestProjects TEXT,
      contactNumber INTEGER,
      contactEmail TEXT,
      password TEXT
    );
  `);
    db.run(`INSERT INTO legalEntities (NIP, REGON, name, legalForm, address, dateOfStart, ScopeOfActivities, mainValuesAndObjectives, latestProjects, contactNumber, contactEmail) VALUES
    ('1234567890', '123456789', 'Fundacja Rozwoju Społecznego', 'Fundacja', 'ul. Nowa 15, 00-001 Warszawa', '2015-03-01', 'Edukacja, integracja społeczna', 'Wspieranie inicjatyw edukacyjnych, budowanie relacji międzyludzkich', 'Organizacja konkursu matematycznego dla dzieci z ubogich rodzin', '123 456 789', 'kontakt@frs.org.pl'),
('0987654321', '987654321', 'Stowarzyszenie Pomocy Rodzinie', 'Stowarzyszenie', 'ul. Stara 4, 00-002 Warszawa', '2012-05-15', 'Pomoc społeczna, wsparcie rodzin', 'Poprawa jakości życia rodzin w trudnej sytuacji życiowej', 'Prowadzenie świetlicy socjoterapeutycznej', '234 567 890', 'info@spr.org.pl'),
('1122334455', '112233445', 'Koalicja na Rzecz Ochrony Środowiska', 'Koalicja', 'ul. Zielona 7, 00-003 Warszawa', '2018-07-23', 'Ochrona środowiska, edukacja ekologiczna', 'Zwiększenie świadomości ekologicznej społeczeństwa', 'Kampania edukacyjna dotycząca recyklingu plastiku', '345 678 901', 'kontakt@kros.org.pl'),
('2233445566', '223344556', 'Fundacja Dobrego Samopoczucia', 'Fundacja', 'ul. Słoneczna 12, 00-004 Warszawa', '2020-09-10', 'Wsparcie psychologiczne', 'Pomoc psychologiczna i emocjonalna dla osób w kryzysie', 'Warsztaty redukcji stresu i lęku', '456 789 012', 'info@fds.org.pl'),
('3344556677', '334455667', 'Fundacja Zdrowie dla Wszystkich', 'Fundacja', 'ul. Zdrowa 18, 00-005 Warszawa', '2010-11-28', 'Ochrona zdrowia, profilaktyka zdrowotna', 'Promowanie zdrowego trybu życia', 'Bezpłatne badania profilaktyczne dla seniorów', '567 890 123', 'kontakt@fzdw.org.pl'),
('4455667788', '445566778', 'Stowarzyszenie Sportu Młodzieżowego', 'Stowarzyszenie', 'ul. Sportowa 25, 00-006 Warszawa', '2016-02-16', 'Promocja sportu wśród młodzieży', 'Aktywizacja fizyczna młodzieży szkolnej', 'Turnieje piłki nożnej i siatkowej dla młodzieży', '678 901 234', 'info@ssm.org.pl'),
('5566778899', '556677889', 'Koalicja na Rzecz Równości', 'Koalicja', 'ul. Równa 30, 00-007 Warszawa', '2019-06-05', 'Prawa człowieka, równość', 'Promowanie równości płci i praw człowieka', 'Kampania społeczna na rzecz równości płci', '789 012 345', 'kontakt@krr.org.pl'),
('6677889900', '667788990', 'Fundacja Rozwoju Kultury', 'Fundacja', 'ul. Kulturalna 35, 00-008 Warszawa', '2017-10-15', 'Kultura, sztuka, promocja artystów', 'Wsparcie młodych artystów i promocja kultury', 'Wystawa sztuki młodych twórców', '890 123 456', 'info@frk.org.pl'),
('7788990011', '778899001', 'Fundacja Przyszłości Technologii', 'Fundacja', 'ul. Technologiczna 40, 00-009 Warszawa', '2014-12-20', 'Nowe technologie, edukacja', 'Edukacja w zakresie nowych technologii', 'Kursy programowania dla młodzieży', '901 234 567', 'kontakt@fpt.org.pl'),
('8899001122', '889900112', 'Stowarzyszenie Aktywni Seniorzy', 'Stowarzyszenie', 'ul. Senioralna 45, 00-010 Warszawa', '2013-08-30', 'Aktywizacja seniorów, zdrowie', 'Wsparcie seniorów w aktywnym trybie życia', 'Zajęcia rekreacyjne dla seniorów', '012 345 678', 'info@sas.org.pl'),
('9900112233', '990011223', 'Koalicja na Rzecz Osób Niepełnosprawnych', 'Koalicja', 'ul. Wspólna 50, 00-011 Warszawa', '2011-04-12', 'Wsparcie osób niepełnosprawnych', 'Integracja społeczna osób niepełnosprawnych', 'Program „Dostępna Praca”', '123 456 789', 'kontakt@kron.org.pl'),
('1011121314', '101112131', 'Fundacja Zdrowego Żywienia', 'Fundacja', 'ul. Smaczna 55, 00-012 Warszawa', '2015-05-25', 'Edukacja żywieniowa', 'Promowanie zdrowych nawyków żywieniowych', 'Warsztaty zdrowego gotowania', '234 567 890', 'info@fzz.org.pl'),
('1112131415', '111213141', 'Stowarzyszenie Pomocy Zwierzętom', 'Stowarzyszenie', 'ul. Zwierzęca 60, 00-013 Warszawa', '2019-09-09', 'Ochrona zwierząt, adopcja', 'Opieka nad bezdomnymi zwierzętami', 'Program adopcji zwierząt', '345 678 901', 'kontakt@spz.org.pl'),
('1213141516', '121314151', 'Fundacja dla Dzieci i Młodzieży', 'Fundacja', 'ul. Młodzieżowa 65, 00-014 Warszawa', '2012-11-19', 'Edukacja, wsparcie młodzieży', 'Wsparcie edukacyjne i rozwój młodzieży', 'Program „Nauka bez Granic”', '456 789 012', 'info@fdm.org.pl'),
('1314151617', '131415161', 'Stowarzyszenie Inicjatyw Społecznych', 'Stowarzyszenie', 'ul. Inicjatywna 70, 00-015 Warszawa', '2017-04-17', 'Społeczność lokalna', 'Budowanie lokalnej społeczności', 'Projekt „Nasza Przestrzeń”', '567 890 123', 'kontakt@sis.org.pl'),
('1415161718', '141516171', 'Fundacja Wsparcia Rodziny', 'Fundacja', 'ul. Rodzinna 75, 00-016 Warszawa', '2018-08-24', 'Wsparcie rodzin', 'Pomoc rodzinom w trudnej sytuacji życiowej', 'Warsztaty rodzinne', '678 901 234', 'info@fwr.org.pl'),
('1516171819', '151617181', 'Koalicja na Rzecz Edukacji', 'Koalicja', 'ul. Edukacyjna 80, 00-017 Warszawa', '2014-03-13', 'Edukacja', 'Podnoszenie jakości edukacji w Polsce', 'Program „Edukacja Jutra”', '789 012 345', 'kontakt@kres.org.pl'),
('1617181920', '161718192', 'Fundacja Rozwoju Regionu', 'Fundacja', 'ul. Regionalna 85, 00-018 Warszawa', '2016-12-28', 'Rozwój lokalny', 'Wspieranie rozwoju regionalnego', 'Projekt „Silna Lokalna Społeczność”', '890 123 456', 'info@frr.org.pl'),
('1718192021', '171819201', 'Stowarzyszenie Kultury i Sztuki', 'Stowarzyszenie', 'ul. Artystyczna 90, 00-019 Warszawa', '2013-01-11', 'Promocja kultury', 'Promowanie sztuki i kultury', 'Festiwal „Sztuka Młodych”', '901 234 567', 'kontakt@sks.org.pl'),
('1819202122', '181920212', 'Koalicja na Rzecz Zrównoważonego Rozwoju', 'Koalicja', 'ul. Rozwoju 95, 00-020 Warszawa', '2017-05-04', 'Zrównoważony rozwój, ochrona środowiska', 'Ochrona zasobów naturalnych i zrównoważony rozwój', 'Projekt „Zielona Energia”', '012 345 678', 'info@krzr.org.pl'),
('2223334445', '222333444', 'TechSolutions Sp. z o.o.', 'Spółka z ograniczoną odpowiedzialnością', 'ul. Techniczna 5, 00-021 Warszawa', '2016-03-21', 'Doradztwo technologiczne, IT', 'Innowacje technologiczne w biznesie', 'Projektowanie aplikacji mobilnych dla branży finansowej', '111 222 333', 'biuro@techsolutions.pl'),
('3334445556', '333444555', 'MebleX S.A.', 'Spółka akcyjna', 'ul. Meblowa 10, 00-022 Warszawa', '2012-08-14', 'Produkcja i sprzedaż mebli', 'Tworzenie wysokiej jakości mebli', 'Nowa linia mebli biurowych premium', '222 333 444', 'kontakt@meblex.pl'),
('4445556667', '444555666', 'Budex Sp. j.', 'Spółka jawna', 'ul. Budowlana 15, 00-023 Warszawa', '2018-05-10', 'Usługi budowlane', 'Profesjonalne usługi budowlane i remontowe', 'Renowacja zabytkowej kamienicy w centrum Warszawy', '333 444 555', 'biuro@budex.pl'),
('5556667778', '555666777', 'AutoSerwis sp.k.', 'Spółka komandytowa', 'ul. Mechaniczna 20, 00-024 Warszawa', '2014-11-22', 'Naprawa samochodów, serwis pojazdów', 'Profesjonalny serwis pojazdów mechanicznych', 'Otworzenie nowego punktu serwisowego w Warszawie', '444 555 666', 'serwis@autoservis.pl'),
('6667778889', '666777888', 'GreenEnergy S.A.', 'Spółka akcyjna', 'ul. Energetyczna 25, 00-025 Warszawa', '2017-09-05', 'Energetyka odnawialna', 'Promowanie zrównoważonych źródeł energii', 'Budowa farmy wiatrowej na Mazurach', '555 666 777', 'kontakt@greenenergy.pl'),
('7778889990', '777888999', 'ABC Logistic sp.k.', 'Spółka komandytowa', 'ul. Logistyczna 30, 00-026 Warszawa', '2019-06-12', 'Usługi logistyczne, transport', 'Efektywne zarządzanie łańcuchem dostaw', 'Wdrożenie nowego systemu zarządzania transportem', '666 777 888', 'logistyka@abclogistic.pl'),
('8889990001', '888999000', 'Jan Kowalski Consulting', 'Jednoosobowa działalność gospodarcza', 'ul. Konsultacyjna 35, 00-027 Warszawa', '2015-02-18', 'Doradztwo biznesowe', 'Pomoc w rozwoju i strategii biznesowej', 'Przeprowadzenie audytów strategicznych w 5 firmach z branży IT', '777 888 999', 'kontakt@jankowalski.com'),
('9990001112', '999000111', 'Małgorzata Nowak Fotografia', 'Jednoosobowa działalność gospodarcza', 'ul. Artystyczna 40, 00-028 Warszawa', '2016-04-07', 'Usługi fotograficzne', 'Profesjonalne sesje fotograficzne', 'Organizacja wystawy fotograficznej „Warszawa w Obiektywie”', '888 999 000', 'kontakt@mnfotografia.com'),
('0001112223', '000111222', 'Kancelaria Prawna Nowak & Partnerzy', 'Spółka partnerska', 'ul. Prawnicza 45, 00-029 Warszawa', '2012-11-29', 'Usługi prawne', 'Rzetelna i profesjonalna pomoc prawna', 'Obsługa prawna dużych firm z branży budowlanej', '999 000 111', 'biuro@nowak-partnerzy.pl'),
('1112223334', '111222333', 'Maria Kowalska Tłumaczenia', 'Jednoosobowa działalność gospodarcza', 'ul. Tłumaczy 50, 00-030 Warszawa', '2018-02-10', 'Usługi tłumaczeniowe', 'Tłumaczenia dokumentów i tekstów specjalistycznych', 'Tłumaczenie dokumentacji medycznej dla międzynarodowej firmy', '000 111 222', 'kontakt@kowalskatlumaczenia.pl'),
('2112223334', '211222333', 'FuturaTech Sp. z o.o.', 'Spółka z ograniczoną odpowiedzialnością', 'ul. Innowacyjna 12, 00-031 Warszawa', '2020-05-15', 'Nowe technologie, startupy', 'Innowacje technologiczne i startupowe', 'Wdrożenie platformy automatyzacji procesów w firmach', '111 333 555', 'kontakt@futuratech.pl'),
('3212345678', '321234567', 'HealthCare Solutions S.A.', 'Spółka akcyjna', 'ul. Zdrowotna 22, 00-032 Warszawa', '2017-07-20', 'Ochrona zdrowia, IT', 'Wsparcie technologiczne sektora zdrowia', 'Implementacja systemu telemedycyny w szpitalach', '222 444 666', 'kontakt@healthcare.pl'),
('4323456789', '432345678', 'Marek Nowicki Biuro Rachunkowe', 'Jednoosobowa działalność gospodarcza', 'ul. Księgowa 33, 00-033 Warszawa', '2014-03-12', 'Usługi księgowe', 'Rzetelna i profesjonalna obsługa księgowa', 'Obsługa księgowa małych firm rodzinnych', '333 555 777', 'biuro@nowickirachunki.pl'),
('5434567890', '543456789', 'PolBuild Sp. z o.o.', 'Spółka z ograniczoną odpowiedzialnością', 'ul. Budowlana 44, 00-034 Warszawa', '2013-10-08', 'Budownictwo', 'Profesjonalne usługi budowlane', 'Budowa osiedla mieszkaniowego na przedmieściach Warszawy', '444 666 888', 'kontakt@polbuild.pl'),
('6545678901', '654567890', 'EkoPrzem S.A.', 'Spółka akcyjna', 'ul. Przemysłowa 55, 00-035 Warszawa', '2016-06-27', 'Przemysł, ochrona środowiska', 'Zrównoważona produkcja przemysłowa', 'Opracowanie technologii redukcji emisji CO2', '555 777 999', 'kontakt@ekoprzem.pl'),
('7656789012', '765678901', 'B2B Consulting Sp. j.', 'Spółka jawna', 'ul. Biznesowa 66, 00-036 Warszawa', '2018-09-15', 'Doradztwo biznesowe', 'Wsparcie firm w rozwoju i strategii', 'Realizacja projektów restrukturyzacji dla dużych firm', '666 888 000', 'biuro@b2bconsulting.pl'),
('8767890123', '876789012', 'Logistics Partners sp.k.', 'Spółka komandytowa', 'ul. Logistyczna 77, 00-037 Warszawa', '2017-11-03', 'Logistyka, transport', 'Efektywne zarządzanie transportem i magazynowaniem', 'Optymalizacja procesów logistycznych w dużych przedsiębiorstwach', '777 999 111', 'kontakt@logisticspartners.pl'),
('9878901234', '987890123', 'StalPol S.A.', 'Spółka akcyjna', 'ul. Stalowa 88, 00-038 Warszawa', '2015-01-18', 'Przemysł stalowy', 'Produkcja wysokiej jakości wyrobów stalowych', 'Wdrożenie nowych procesów produkcyjnych dla zbrojeń', '888 000 222', 'info@stalpol.pl');`);
  }

  // Helper function to build dynamic queries
  

  queryDatabase(db, 3000);

  console.log("Server running on http://localhost:3000");
};

export { startLegalTable, buildQueryLegal };
