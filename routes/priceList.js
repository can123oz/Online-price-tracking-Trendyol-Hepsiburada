const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const PriceList = require("../Models/priceHistory");

router.get("/", async (req, res) => {
    const priceHistory = await PriceList.find({}, null, { sort: { createDate: -1 }});
    res.json({ status: true, body: priceHistory });
});

module.exports = router;