const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../Models/product");

//product list
router.get("/", async (req,res) => {
    const productList = await Product.find({}, null , {sort : { createDate : -1 }});
    res.json({status: true, body : productList }); 
});

//product save
router.post("/", async (req, res) => {
    const {
        hepsiburadaUrl, trendyolUrl, title, emailList
    } = req.body;

    const product = new Product ({
        _id: mongoose.Types.ObjectId(),
        hepsiburadaUrl, trendyolUrl, title, emailList,
        hepsiburadaLastPrice : 0, 
        trendyolLastPrice : 0,
        lastCheckDate : new Date(0), 
        enabled : true, 
        createDate : new Date(), 
    });
    await product.save();
    res.json({status: true , body: product._id });
});

router.put("/:id", async (req, res) => {
    const {
        hepsiburadaUrl, trendyolUrl, title, emailList, enabled
    } = req.body;
    await Product.findByIdAndUpdate({ 
        _id : req.params.id,
    },{ hepsiburadaUrl, trendyolUrl, title, emailList, enabled});
    res.json({status: true, body: {} });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);
    res.json({status: true, body: id });
});

module.exports = router;