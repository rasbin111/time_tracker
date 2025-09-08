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
    return res2
}
