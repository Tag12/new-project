const express = require("express");
// const product_details = require("../models/productSchema");
const userDetails= require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// router.post("/user", (req, res) => {
//     const { name, email, passwordHash } = req.body;

//     try {
//         const newUser = new user_details({ name, email, passwordHash });
//         newUser.save();

//         res.status(200).json("User added successfully");
//     } catch (error) {
//         res.status(500).json({ error: "Error occured while adding user" });
//     }
// })


router.post("/users/login", async (req, res) => {
    const user = await userDetails.findOne({ email: req.body.email });

    const secret = process.env.secret;

    if (!user) {
        return res.status(400).send('User not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user._id,
            },
            secret,
            { expiresIn: '1d' }
        )
        //    res.json("User authenticated");
        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send('password is wrong!');
    }
})


router.post("/users/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const users = await userDetails.findOne({ email: req.body.email })

    if (users) {
        return res.json("User already exists");
    }

    try {
        const newUser = new userDetails({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
        });
        newUser.save();

        // res.status(200).json("User added successfully");

        res.send(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error occured while adding user" });
    }
})



module.exports = router;
