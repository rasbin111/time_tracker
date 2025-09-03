const db = await window.electronAPI.db;

exports.getNames = () => {
    const query = "select * from users";
    let stmt = db.prepare(query)
    let res = stmt.all()
    return res;
}