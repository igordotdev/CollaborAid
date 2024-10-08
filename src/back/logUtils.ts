import jwt from "jsonwebtoken";

// HARDCODED! Normally would not be saved in the source code and not in the repo
// This is just for the sake of simplicity for the hackathon :P
const SECRET_KEY = "3Fg$6!8mQ^c2nDj3*8Zl$kEr@1B8!dC2s8Pj$5Fq@9LmZ";

export function verifyToken(req: Request): Response | undefined {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Verify the token
    jwt.verify(token, SECRET_KEY);
    return undefined; // Return undefined if verification is successful
  } catch (error) {
    return new Response("Forbidden", { status: 403 });
  }
}

function generateToken(username: string) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "7d" });
}

function getTokenFromRequest(req: Request) {
  const cookies = req.headers.get("cookie") || "";
  const tokenCookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

export { generateToken };
export { getTokenFromRequest };
export { SECRET_KEY };
