import { update_times_in_string } from "../utils/add_time_string.js"
import { db } from "./db_mgr.js"

export const getTimeTracker = () => {
    const query = "select * from time_trackers"
    const stmt = db.prepare(query)
    const res = stmt.all()
    return res
}

export const postTimeTracker = (user, session_title, total_time_per_day, total_time_tracked, time_from, time_to, active_time) => {
    const query = `INSERT INTO time_trackers (total_time_per_day, total_time_tracked, user)
                    VALUES (${total_time_per_day}, ${total_time_tracked}, ${user});`
    const query2 = `INSERT INTO user_sessions (session_title, time_from, time_to, active_time, time_tracker_id)
                    VALUES ('${session_title} ${time_from}', '${time_to}', ${active_time}, (SELECT id FROM time_trackers WHERE user=${user} ORDER BY id DESC LIMIT 1));`
    const stmt = db.prepare(query)
    const res = stmt.run()

    const stmt2 = db.prepare(query2)
    const res2 = stmt2.run()

    const user_total_time_tracked = `select total_time_tracked from users where id = ${user}`
    const stmt1 = db.prepare(user_total_time_tracked)
    const res1 = stmt1.get()

    const updated_total_time = update_times_in_string(res1.total_time_tracked, total_time_tracked)
    
    const update_user_query = `UPDATE users SET total_time_tracked = '${updated_total_time}' WHERE id = ${user};`
    const stmt3 = db.prepare(update_user_query)
    stmt3.run()
    return res2
}
