const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("campaigns.db");
module.exports = db;
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        budget REAL,
        start_date TEXT,
        end_date TEXT,
        status TEXT
    )`);
});
