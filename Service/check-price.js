const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const Product = require("../Models/product");
const PriceHistory = require("../Models/priceHistory");


const getProducts = async () => {
    return Product.find({ enabled:true });
}

const scrapeUrl = async (url, type) => {
    let price = 0;

    const httpResult = await axios.default.get(url);
    const $ = await cheerio.load(httpResult.data);
    if (type == 0) {
        const result = $(".price")[0];
        const idx = result.attributes.findIndex((query) => query.name === "content");
        price = Number(result.attributes[idx].value.replace(",","."));
    } else if (type == 1) {
        let result = $(".prc-dsc")[0].children[0].data;
        result = result.replace("TL","").trim().replace(",",".");
        result = Number(result);
        
        result = result.length <= 6
            ? result * 1000
            : result;
        price = result;
    }
    return price;
}

const run = async () => {
    console.log("check price is working ");
    const productList = await getProducts();

    await Promise.all(productList.map( async (item) => {
        const hepsiburadaPrice = await scrapeUrl(item.hepsiburadaUrl, 0);
        const trendyolPrice = await scrapeUrl(item.trendyolUrl, 1);

        console.log("trendyol price : " , trendyolPrice);
        console.log("hepsiburada price : " , hepsiburadaPrice);

        const priceLog = new PriceHistory({
            _id: mongoose.Types.ObjectId(),
            currentPriceHepsiburada: hepsiburadaPrice,
            currentPriceTrendyol: trendyolPrice,
            checkDate: new Date(),
            productId: item._id
        });
        await priceLog.save();

        if (item.hepsiburadaLastPrice !== hepsiburadaPrice || item.trendyolLastPrice !== trendyolPrice) {
            await Product.findByIdAndUpdate({ _id: item._id }, {
                hepsiburadaLastPrice: hepsiburadaPrice,
                trendyolLastPrice: trendyolPrice,
                lastCheckDate: new Date()
            });
        }    
    }))
    return;
}

exports.run = run;