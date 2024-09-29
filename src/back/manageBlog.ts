import { Database } from "bun:sqlite";

function startBlogTable(db: Database) {
  // Enable foreign key constraints (optional, depending on your SQLite version)
  db.run("PRAGMA foreign_keys = ON;");

  // Drop the table if it exists for development purposes (comment out later)
  db.run("DROP TABLE IF EXISTS blogPosts");

  // Check if the table exists
  const tableExists = db
    .query(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='blogPosts'"
    )
    .all();

  // if (!tableExists) {
  // Correct the SQL statement
  db.run(`
      CREATE TABLE blogPosts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        authorLegal INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL
      );
    `);

  // Insert some initial data into the table
  db.run(`
      INSERT INTO blogPosts (authorLegal, title, content, date) VALUES
      ('1617181920', 'Wsparcie dla Lokalnych Społeczności', 'Fundacja Rozwoju Regionu opisuje działania na rzecz rozwoju lokalnego, w tym projekt „Silna Lokalna Społeczność”, który ma na celu wspieranie lokalnych inicjatyw.', '2023-08-01'),
('1718192021', 'Kultura w Działaniu', 'Stowarzyszenie Kultury i Sztuki zaprasza na Festiwal „Sztuka Młodych”, który promuje młodych artystów i ich twórczość.', '2023-07-15'),
('1819202122', 'Zielona Energia dla Przyszłości', 'Koalicja na Rzecz Zrównoważonego Rozwoju przedstawia projekt „Zielona Energia”, który ma na celu ochronę zasobów naturalnych.', '2023-06-10'),
('2223334445', 'Innowacje Technologiczne w Biznesie', 'TechSolutions Sp. z o.o. dzieli się swoimi doświadczeniami w projektowaniu aplikacji mobilnych dla branży finansowej.', '2023-05-20'),
('3334445556', 'Meble na Miary Potrzeb Klientów', 'MebleX S.A. zaprasza do odkrywania nowej linii mebli biurowych premium, stworzonych z myślą o wysokiej jakości.', '2023-04-18'),
('4445556667', 'Renowacja Z Historią', 'Budex Sp. j. przedstawia projekt renowacji zabytkowej kamienicy w centrum Warszawy, łącząc tradycję z nowoczesnością.', '2023-03-25'),
('5556667778', 'Nowe Punkty Serwisowe w Warszawie', 'AutoSerwis sp.k. ogłasza otwarcie nowego punktu serwisowego, oferując profesjonalny serwis pojazdów mechanicznych.', '2023-02-12'),
('6667778889', 'Zrównoważone Źródła Energii', 'GreenEnergy S.A. bada rozwój farm wiatrowych na Mazurach, promując odnawialne źródła energii.', '2023-01-30'),
('7778889990', 'Logistyka dla Nowoczesnych Firm', 'ABC Logistic sp.k. opisuje wdrożenie nowego systemu zarządzania transportem w celu optymalizacji łańcucha dostaw.', '2022-12-15'),
('8889990001', 'Strategie Rozwoju dla Branży IT', 'Jan Kowalski Consulting oferuje audyty strategiczne dla firm IT, pomagając w ich rozwoju i osiąganiu celów.', '2022-11-10'),
('9990001112', 'Warszawa w Obiektywie', 'Małgorzata Nowak Fotografia zaprasza na wystawę „Warszawa w Obiektywie”, prezentującą piękno stolicy.', '2022-10-05'),
('0001112223', 'Profesjonalna Pomoc Prawna', 'Kancelaria Prawna Nowak & Partnerzy przedstawia swoje usługi prawne, w tym obsługę dużych firm budowlanych.', '2022-09-15'),
('1112223334', 'Tłumaczenia dla Biznesu', 'Maria Kowalska Tłumaczenia specjalizuje się w tłumaczeniach dokumentacji medycznej dla międzynarodowych firm.', '2022-08-20'),
('2112223334', 'Nowe Technologie w Startupach', 'FuturaTech Sp. z o.o. omawia innowacje technologiczne, które zmieniają sposób prowadzenia biznesu w startupach.', '2022-07-12');
`);

}
console.log("Server running on http://localhost:3000");
// }

export { startBlogTable };
