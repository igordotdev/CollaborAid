import { Database } from "bun:sqlite";
import { getTokenFromRequest, generateToken, SECRET_KEY } from "./logUtils";
import jwt from "jsonwebtoken";

export async function login(db: Database, req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    // Query the database for the user
    const user = db.query("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);

    if (!user) {
      return new Response("Invalid email or password", { status: 401 });
    }

    // Generate a JWT token upon successful authentication
    const token = jwt.sign({ username: user.email, id: user.id }, SECRET_KEY, { expiresIn: "7d" });

    // Set the token in the response cookies (adjust as necessary for your frontend)
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`, // 7 days expiration
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
