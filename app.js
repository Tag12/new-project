const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

// const product_details = require("./models/productSchema.js");
// const user_details = require("./models/userSchema.js");
const productRouter = require("./routes/product");
const userRouter = require("./routes/users");
const app = express();
const PORT = 4000;
const authJwt = require("./helpers/jwt");

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(authJwt());

// .name=="UnauthorizedError"

// app.use((err, req, res, next) => {
//     if (err) {
//         return res.status(500).json({ message: "User is not authorized" });
//     }
// });


const mongoURI = "mongodb+srv://tag12340000:Tag12345@cluster0.6rdnx9r.mongodb.net/nodeProject";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})