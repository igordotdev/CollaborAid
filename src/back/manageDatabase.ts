import { Database } from "bun:sqlite";
import { startLegalTable } from "./manageLegal";
import { startNaturalTable } from "./manageNatural";
import { startBlogTable } from "./manageBlog";
import { setEndpointDatabase } from "./queryDatabase";
import { login } from "./logNatural"

initDatabase();

function initDatabase() {
  // Initialize SQLite database
  const db = new Database();
  startLegalTable(db);
  startNaturalTable(db);
  startBlogTable(db);
  setEndpointDatabase(db);
}

export { initDatabase };