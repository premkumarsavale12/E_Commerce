const express = require("express");
const router = express.Router();
const footer = require("../model/footerSchema");
const auth = require('../middleware/authMiddleware'); // Import middleware

// for all (Public)
router.get("/all", async (req, res) => {
    try {
        const data = await footer.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//for id (Public)
router.get("/:id", async (req, res) => {
    try {
        const data = await footer.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for post (Protected)
router.post("/add", auth, async (req, res) => {
    try {
        const footerdata = await footer.create(req.body);
        res.status(201).json(footerdata);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// for delete (Protected)
router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedata = await footer.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Deleted SuccessFully...." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for update (Protected)
router.put("/:id", auth, async (req, res) => {
    try {
        const updateddata = await footer.findByIdAndUpdate(
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