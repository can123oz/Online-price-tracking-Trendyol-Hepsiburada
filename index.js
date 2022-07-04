const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const CronJob = require("cron").CronJob;

mongoose.connect("mongodb://127.0.0.1/bot");

app.get("/", (req,res) => {
    res.json({status:true});
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/product", require("./routes/poduct"));
app.use("/pricehistory", require("./routes/priceList"));


const job = new CronJob("*/10 * * * * *" , () => require("./Service/check-price").run(), 
null, true, "Europe/Istanbul");

app.listen(8080);