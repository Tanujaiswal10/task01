const {checkRateLimit} = require("../service/rateLimitService")

module.exports = async(req,res,next) =>{
    const userId = req.headers.userid;
    if(!userId)
    {
        return res.status(400).json({message:"UserId header is missing"})
    }

    const ip = req.headers["x-forwaded-for"]?.split(",")[0] || req.ip;
    const allowed = await checkRateLimit(userId,ip)

    if(!allowed)
    {
        return res.status(429).json({message:"Rate limit exceeded"})
    }

    next();
}