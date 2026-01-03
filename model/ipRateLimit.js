const db = require('../config/db')
const { route } = require('../route/rateLimiterRoute')

const findIp = async(ip) =>{
    const [rows] = await db.query(
        "Select * from ip_rate_limits Where ip_address = ?",
        [ip]
    )
    return rows[0]
}

const createIp = async(ip) =>{
    await db.query (
        "Insert into ip_rate_limits (ip_address, request_count, window_start) Values (?, 1,NOW())",
        [ip]
    )
}


const UpdateIp = async(id,count) =>{
    await db.query(
        "Update ip_rate_limits SET request_count = ? Where id = ?",
        [count,id]
    )
}

const resetIp = async(id) =>{
    await db.query(
        "Update ip_rate_limits SET request_count = 1, window_start = NOW() Where id = ?",
        [id]
    )
}

module.exports = {
    findIp,
    createIp,
    UpdateIp,
    resetIp
}