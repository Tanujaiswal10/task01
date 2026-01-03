const db = require("../config/db")

const findByUserAndIp = async (userId, ip) =>{
    const [rows] = await db.query(
        "Select * from rate_limits Where user_id = ? And ip_address = ?",
        [userId,ip]
    )
    return rows[0]
}

const create = async (userId, ip) =>{
    const [rows] = await db.query(
        "Insert Into rate_limits (user_id, ip_address, request_count, window_start) Values (?,?,1,NOW())",
        [userId,ip]
    )
    return rows[0]
}


const updateCount = async(id,count) =>{
        await db.query(
        "Update rate_limits SET request_count = ? Where id =?",
        [count,id]
    )
}

const resetWindow = async(id) =>{
    await db.query(
        "Update rate_limits SET request_count = 1, window_start = NOW() Where id =?",
        [id]
    )
}

module.exports = {
    findByUserAndIp,
    create,
    updateCount,
    resetWindow
}