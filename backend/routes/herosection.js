const express = require("express");
const router = express.Router();
const Hero = require('../model/hero_section');
const auth = require('../middleware/authMiddleware'); // Import middleware
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get("/all", async (req, res) => {
    try {
        const hero = await Hero.find();
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/add", auth, upload.single("Image"), async (req, res) => {
    try {
        const herodata = await Hero.create({
            Heading: req.body.Heading,
            Sub_Heading: req.body.Sub_Heading,
            Description: req.body.Description,
            Sub_Description: req.body.Sub_Description,
            Button: req.body.Button,
            Image: req.file.filename
        });

        res.status(201).json(herodata);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedata = await Hero.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Deleted SuccessFully... " });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/:id", auth, async (req, res) => {
    try {
        const updateddata = await Hero.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updateddata) return res.status(404).json({ message: "Not Found" });
        res.json(updateddata);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

