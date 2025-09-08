import { db } from "./db_mgr.js";

export const getNames = () => {
    const query = "select * from users";
    let stmt = db.prepare(query)
    let res = stmt.all()
    return res;
}
