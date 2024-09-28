import { Database } from "bun:sqlite";
import { startLegalTable } from "./manageLegal";
import { startNaturalTable } from "./manageNatural";
import { startBlogTable } from "./manageBlog";
import { setEndpointDatabase } from "./queryDatabase";

initDatabase();

function initDatabase() {
  // Initialize SQLite database
  const db = new Database("mydb.sqlite");

  startLegalTable(db);
  startNaturalTable(db);
  startBlogTable(db);
  setEndpointDatabase(db);
}

export { initDatabase };