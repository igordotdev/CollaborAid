import { Database } from "bun:sqlite";
import { startLegalTable } from "./manageLegal";
import { startNaturalTable } from "./manageNatural";

// Initialize SQLite database
const db = new Database("mydb.sqlite");

startLegalTable(db);
startNaturalTable(db);