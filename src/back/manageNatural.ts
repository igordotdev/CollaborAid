import { serve } from "bun";
import { Database } from "bun:sqlite";

function startNaturalTable(db: Database) {
  // db.run("DROP TABLE IF EXISTS naturalEntities");

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

  // Define the common CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Helper function to build dynamic queries
  function buildQuery(
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

  // Define the server
  serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url, `http://${req.headers.get("host")}`);

      if (req.method === "OPTIONS") {
        // Handle preflight requests for CORS
        return new Response(null, { headers: corsHeaders });
      }

      try {
        if (req.method === "GET" && url.pathname === "/api/naturalEntities") {
          const filters = {
            firstName: url.searchParams.get("fistName"),
            lastName: url.searchParams.get("lastName"),
            age: url.searchParams.get("age"),
            email: url.searchParams.get("email"),
            city: url.searchParams.get("city"),
          };

          const { query, params } = buildQuery(
            "SELECT * FROM naturalEntities",
            filters
          );
          const users = db.query(query).all(...params);
          return new Response(JSON.stringify(users), { headers: corsHeaders });
        } else if (
          req.method === "POST" &&
          url.pathname === "/api/naturalEntities"
        ) {
          // Ensure that the request body is in JSON format
          const { firstName, lastName, age, email, city, password } = await req.json(); // Adjust based on your new form

          // Insert user into the database
          db.run(
            "INSERT INTO naturalEntities (firstName, lastName, age, email, city, password) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, lastName, age, email, city, password]
          );
          return new Response("User added successfully", {
            status: 201,
            headers: corsHeaders,
          });
        } else if (
          req.method === "DELETE" &&
          url.pathname.startsWith("/api/naturalEntities/")
        ) {
          const userId = Number(url.pathname.split("/")[3]);
          db.run("DELETE FROM naturalEntities WHERE id = ?", [userId]);
          return new Response("User deleted successfully", {
            status: 200,
            headers: corsHeaders,
          });
        } else {
          return new Response("Not Found", {
            status: 404,
            headers: corsHeaders,
          });
        }
      } catch (error) {
        console.error("Error handling request:", error);
        return new Response("Internal Server Error", {
          status: 500,
          headers: corsHeaders,
        });
      }
    },
  });

  console.log("Server running on http://localhost:3000");
};

export { startNaturalTable };
