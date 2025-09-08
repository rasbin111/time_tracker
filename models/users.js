import { db } from "./db_mgr.js";

export const getNames = () => {
    const query = "select * from users";
    let stmt = db.prepare(query)
    let res = stmt.all()
    return res;
}

export const createUser = () => {
    const query = "INSERT INTO users (name) VALUES ('User');"
    const stmt = db.prepare(query)
    const res = stmt.run()
    return res;
}

export const login = (name, password) => {
    const query = `SELECT * FROM users WHERE name='${name}' AND password='${password}';`
    const stmt = db.prepare(query)
    const res = stmt.get()
    return res;
}
