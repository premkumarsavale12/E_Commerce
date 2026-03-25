const express = require("express");
const router = express.Router();
const Hero = require('../model/hero_section');
const auth = require('../middleware/authMiddleware'); // Import middleware


// for get all (Public)
router.get("/all", async (req, res) => {
    try {
        const hero = await Hero.find();
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for get id (Public)
router.get("/:id", async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for post (Protected)
router.post("/add", auth, async (req, res) => {
    try {
        const herodata = await Hero.create(req.body);
        res.status(201).json(herodata);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// for delete (Protected)
router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedata = await Hero.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Deleted SuccessFully... " });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for update (Protected)
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

