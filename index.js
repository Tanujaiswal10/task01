require("dotenv").config()
const express = require("express")
const app = express();

const connectToDb = require("./config/db")

const dataRoutes = require("./route/rateLimiterRoute")

app.use("/",dataRoutes);

connectToDb;

app.listen(3000,()=>{
    console.log("Server running at port 3000");
});