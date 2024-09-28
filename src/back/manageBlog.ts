import { Database } from "bun:sqlite";

function startBlogTable(db: Database) {
  //comment this out later
  db.run("DROP TABLE IF EXISTS blogPosts");

  // Create the users table if it doesn't exist
  if (
    !db
      .query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='blogPosts'"
      )
      .all()[0]
  ) {
    db.run(`
      CREATE TABLE blogPosts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        authorNatural INTEGER,
        authorLegal INTEGER,
        FOREIGN KEY (authorNatural) REFERENCES naturalEntities(id),
        FOREIGN KEY (authorLegal) REFERENCES legalEntities(REGON),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL
      );
    `);
    db.run(`INSERT INTO blogPosts (authorNatural, authorLegal, title, content, date) VALUES
      (1, NULL, 'First Post', 'This is the first post', '2021-10-01'),
    (NULL, 123456789, 'Second Post', 'This is the second post', '2021-10-02');`);
  }
  console.log("Server running on http://localhost:3000");
}

export { startBlogTable };
