const express = require("express");
const productDetails = require("../models/productSchema");
const router = express.Router();
// const jwt = require("jsonwebtoken");


router.get("/getProduct", async (req, res) => {

    try {
        const productList = await productDetails.find();

        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching the products" });
    }
})


router.post("/listProduct", (req, res) => {
    const { name, price, sellerName } = req.body;

    try {
        const newProduct = new productDetails({ name, price, sellerName });
        newProduct.save();

        res.status(200).json("Product added successfully");
    } catch (error) {
        res.status(500).json({ error: "Error occured while adding product" });
    }
})

module.exports = router;
