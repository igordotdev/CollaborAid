import { Database } from "bun:sqlite";

// Helper function to build dynamic queries
function buildQueryNatural(
    baseQuery: string,
    filters: Record<string, any>
  ): { query: string; params: any[] } {
    const params: any[] = [];
    const conditions: string[] = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === "firstName" || key === "lastName" || key === "city") {
          conditions.push(`${key} LIKE ?`);
          params.push(`%${value}%`);
        } else if (key === "age") {
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

function startNaturalTable(db: Database) {
    //comment this out later
  db.run("DROP TABLE IF EXISTS naturalEntities");

  // Create the users table if it doesn't exist
  if (
    !db
      .query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='naturalEntities'"
      )
      .all()[0]
  ) {
    db.run(`
      CREATE TABLE naturalEntities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        age INTEGER,
        email TEXT,
        city TEXT,
        password TEXT
      );
    `);
    db.run(`INSERT INTO naturalEntities (firstName, lastName, age, email, city) VALUES
      ('John', 'Doe', 30, 'johndoe@gmail.com', 'New York'),
      ('Jane', 'Doe', 25, 'janedoe@latimes.com', 'Los Angeles');`);
  }
  console.log("Server running on http://localhost:3000");
};

export { startNaturalTable };
export { buildQueryNatural };
