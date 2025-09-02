const dbMgr = require('better-sqlite3')
const db = dbMgr("../database.db", {})

exports.db = db