const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hepsiburadaUrl: {
        type: String,
        required: true,
    },
    trendyolUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required:true,
    },
    hepsiburadaLastPrice: {
        type: Number,
        required: true,
    },
    trendyolLastPrice: {
        type: Number,
        required: true,
    },
    lastCheckDate: {
        type: Date,
        required:true,
    },
    enabled: {
        type: Boolean,
        required: true,
    },
    emailList: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);