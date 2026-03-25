const express = require("express");
const router = express.Router();
const Seller = require("../model/sellerproduct");
const auth = require('../middleware/authMiddleware'); // Import middleware

//for get all (Public)
router.get("/all", async (req, res) => {
    try {
        const data = await Seller.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for get id (Public)
router.get("/:id", async (req, res) => {
    try {
        const data = await Seller.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//for post (Protected)
router.post("/add", auth, async (req, res) => {
    try {
        const datasaved = await Seller.create(req.body);
        res.status(201).json(datasaved);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// for delete (Protected)
router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedata = await Seller.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Delete SuccessFully...." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for update (Protected)
router.put("/:id", auth, async (req, res) => {
    try {
        const updatedData = await Seller.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedData) return res.status(404).json({ message: "Not Found" });
        res.json(updatedData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

