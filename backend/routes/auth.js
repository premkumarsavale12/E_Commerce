
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
 
// signUp 

router.post("/signup", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "Signup Successfully " })

    } 
    catch (err) {

        console.log(err);
        res.status(500).send("Server Error");
    } 
});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });

        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        //  GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login Sucessful",
            token
        })

    }


    catch (err) {

        console.log(err);
        res.status(500).send("Server Error...")

    }
})

router.get("/all", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    }
    catch (err) {

        console.log(err);
        res.status(500).send("Server Error...");

    }

})


module.exports = router