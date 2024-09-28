import { serve } from "bun";
import { Database } from "bun:sqlite";
import { getTokenFromRequest, generateToken, SECRET_KEY } from "./logUtils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function tryLogInLegal(db: Database) {
  const server = serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);

      // Login endpoint
      if (url.pathname === "/login" && req.method === "POST") {
        const { REGON, password } = await req.json();

        // Query the database for the user
        const row : any = db
          .query("SELECT * FROM legalEntities WHERE REGON = ? AND password = ?")
          .get(REGON, password);

        if (row && bcrypt.compareSync(password, row.password)) {
          // If user found, create a JWT and send it as a cookie
          const token = generateToken(REGON);
          return new Response("Logged in successfully", {
            headers: {
              "Set-Cookie": `token=${token}; HttpOnly; Max-Age=604800; Path=/`, // Cookie expires in 7 days
              "Content-Type": "text/plain",
            },
          });
        } else {
          return new Response("Invalid credentials", { status: 401 });
        }
      }

      // Protected endpoint
      if (url.pathname === "/protected" && req.method === "GET") {
        const token = getTokenFromRequest(req);

        if (!token) {
          return new Response("Access denied", { status: 401 });
        }

        try {
          const payload = jwt.verify(token, SECRET_KEY) as { REGON: string };
          return new Response(`Welcome back, ${payload.REGON}`, {
            status: 200,
          });
        } catch {
          return new Response("Invalid token", { status: 401 });
        }
      }

      // Logout endpoint (clears the token cookie)
      if (url.pathname === "/logout" && req.method === "POST") {
        return new Response("Logged out", {
          headers: {
            "Set-Cookie": `token=; HttpOnly; Max-Age=0; Path=/`,
            "Content-Type": "text/plain",
          },
        });
      }

      return new Response("Not found", { status: 404 });
    },
  });

  console.log(`Server running at http://localhost:${server.port}`);
}

export { tryLogInLegal };