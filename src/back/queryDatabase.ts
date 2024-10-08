import { serve } from "bun";
import { Database } from "bun:sqlite";
import { buildQueryNatural } from "./manageNatural";
import { buildQueryLegal } from "./manageLegal";
import { generateToken, SECRET_KEY } from "./logUtils";
import jwt from "jsonwebtoken";

// Define the common CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

//this code is unreadable but I dont have time to refactor it
//and its my first time doing backend
function setEndpointDatabase(db: Database) {
  // Define the server
  serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);

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

          const { query, params } = buildQueryNatural(
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
          const { firstName, lastName, age, email, city, password } =
            await req.json(); // Adjust based on your new form
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
        } else if (
          req.method === "GET" &&
          url.pathname === "/api/legalEntities"
        ) {
          const filters = {
            NIP: url.searchParams.get("NIP"),
            REGON: url.searchParams.get("REGON"),
            name: url.searchParams.get("name"),
            legalForm: url.searchParams.get("legalForm"),
            address: url.searchParams.get("address"),
            dateOfStart: url.searchParams.get("dateOfStart"),
            scopeOfActivities: url.searchParams.get("scopeOfActivities"),
            mainValuesAndObjectives: url.searchParams.get(
              "mainValuesAndObjectives"
            ),
            latestProjects: url.searchParams.get("latestProjects"),
            contactNumber: url.searchParams.get("contactNumber"),
            contactEmail: url.searchParams.get("contactEmail"),
            compatibility: url.searchParams.get("compatibility"),
          };

          const { query, params } = buildQueryLegal(
            "SELECT * FROM legalEntities",
            filters
          );
          const users = db.query(query).all(...params);
          return new Response(JSON.stringify(users), { headers: corsHeaders });
        } else if (
          req.method === "POST" &&
          url.pathname === "/api/legalEntities"
        ) {
          // Ensure that the request body is in JSON format
          const {
            NIP,
            REGON,
            name,
            legalForm,
            address,
            dateOfStart,
            ScopeOfActivities,
            mainValuesAndObjectives,
            latestProjects,
            contactNumber,
            contactEmail,
            password,
            compatibility
          } = await req.json(); // Adjust based on your new form
          // Insert user into the database
          db.run(
            "INSERT INTO legalEntities (NIP, REGON, name, legalForm, address, dateOfStart, ScopeOfActivities, mainValuesAndObjectives, latestProjects, contactNumber, contactEmail, password, compatibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              NIP,
              REGON,
              name,
              legalForm,
              address,
              dateOfStart,
              ScopeOfActivities,
              mainValuesAndObjectives,
              latestProjects,
              contactNumber,
              contactEmail,
              password,
              compatibility
            ]
          );
          return new Response("Company/NGO added successfully", {
            status: 201,
            headers: corsHeaders,
          });
        } else if (
          req.method === "DELETE" &&
          url.pathname.startsWith("/api/legalEntities/")
        ) {
          const REGONid = Number(url.pathname.split("/")[3]);
          db.run("DELETE FROM legalEntities WHERE REGON = ?", [REGONid]);
          return new Response("User deleted successfully", {
            status: 200,
            headers: corsHeaders,
          });
        } else if (req.method === "GET" && url.pathname === "/api/blogPosts") {
          const posts = db.query("SELECT * FROM blogPosts").all();
          return new Response(JSON.stringify(posts), { headers: corsHeaders });
        } else if (req.method === "POST" && url.pathname === "/api/login") {
          // Ensure that the request body is in JSON format
          try {
            const { email, password } = await req.json(); // Adjust based on your new form
            const user = db.run(
              "SELECT * FROM naturalEntities WHERE email = ? AND password = ?",
              [email, password]
            );
            if (!user) {
              return new Response("Invalid email or password", { status: 401 });
            }

            // Generate a JWT token upon successful authentication
            const token = generateToken(email);

            // Set the token in the response cookies (adjust as necessary for your frontend)
            return new Response(
              JSON.stringify({ message: "Login successful" }),
              {
                status: 200,
                headers: {
                  "Content-Type": "application/json",
                  "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`, // 7 days expiration
                },
              }
            );
          } catch (error) {
            console.error("Login error:", error);
            return new Response("Internal Server Error", { status: 500 });
          }
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
}

export { setEndpointDatabase };
