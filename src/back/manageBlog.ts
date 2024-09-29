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

  if (!tableExists.length) {
    // Correct the SQL statement
    db.run(`
      CREATE TABLE blogPosts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        authorNatural INTEGER,
        authorLegal INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (authorLegal) REFERENCES legalEntities(REGON)
      );
    `);

    // Insert some initial data into the table
    db.run(`
      INSERT INTO blogPosts (authorLegal, title, content, date) VALUES
      (123456788, 'First Post', 'This is the first post', '2021-10-01'),
      (123456789, 'Second Post', 'This is the second post', '2021-10-02');
    `);
  }
  console.log("Server running on http://localhost:3000");
}

export { startBlogTable };
