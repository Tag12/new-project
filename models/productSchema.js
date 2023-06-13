const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true, },
    price: { type: String, required: true, },
    sellerName: { type: String, required: true, }
});

const product = new mongoose.model("product_details", productSchema);

module.exports = product;
