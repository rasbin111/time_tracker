import Database from "better-sqlite3"

exports.db = Database("../database.db", {verbose: console.log})