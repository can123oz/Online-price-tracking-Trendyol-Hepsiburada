const mongoose = require("mongoose");

const priceHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currentPriceHepsiburada: {
        type: Number,
        required: true,
    },
    currentPriceTrendyol: {
        type: Number,
        required: true,
    },
    productId: {
        type: String,
        required:true,
    },
    checkDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("PriceHistory", priceHistorySchema);