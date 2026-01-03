const express = require("express")
const router = express.Router();

const {getData} = require("../controller/rateLimitController")
const rateLimiter = require("../middleware/rateLimitMiddleware")

router.get("/data",rateLimiter,getData)

module.exports = router;