import jwt from "jsonwebtoken";

// HARDCODED! DO NOT USE IN PRODUCTION!
const SECRET_KEY = "3Fg$6!8mQ^c2nDj3*8Zl$kEr@1B8!dC2s8Pj$5Fq@9LmZ";

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
