import { serve } from "bun";
import { Database } from "bun:sqlite";

// Initialize SQLite database
const db = new Database("mydb.sqlite");

// Create the users table if it doesn't exist
db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);"
);

// Define the common CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url, 'http://${req.headers.get("host")}');

    if (req.method === "OPTIONS") {
      // Handle preflight requests for CORS
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    if (req.method === "GET" && url.pathname === "/api/users") {
      // GET: Fetch filtered users based on query parameters
      const nameFilter = url.searchParams.get("name");
      const ageFilter = url.searchParams.get("age");

      let query = "SELECT * FROM users";
      const params = [];
      if (nameFilter || ageFilter) {
        const conditions = [];
        if (nameFilter) {
          conditions.push("name LIKE ?");
          params.push(`%${nameFilter}%`);
        }
        if (ageFilter) {
          conditions.push("age = ?");
          params.push(Number(ageFilter));
        }
        query += " WHERE " + conditions.join(" AND ");
      }

      const users = db.query(query).all(...params);
      return new Response(JSON.stringify(users), {
        headers: corsHeaders,
      });
    } else if (req.method === "POST" && url.pathname === "/api/users") {
      // POST: Add a new user
      const { name, age } = await req.json();
      db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age]);
      return new Response("User added successfully", {
        status: 201,
        headers: corsHeaders,
      });
    } else if (
      req.method === "DELETE" &&
      url.pathname.startsWith("/api/users/")
    ) {
      // DELETE: Delete a user by ID
      const userId = Number(url.pathname.split("/")[3]);
      db.run("DELETE FROM users WHERE id = ?", [userId]);
      return new Response("User deleted successfully", {
        status: 200,
        headers: corsHeaders,
      });
    } else {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }
  },
});
console.log("Server running on http://localhost:3000");
