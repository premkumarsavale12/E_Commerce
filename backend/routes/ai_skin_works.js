const express = require("express");
const router = express.Router();
const AiSkinWorks = require("../model/AiSkinWorks");
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


// GET the first entry (for UI compatibility)
router.get("/", async (req, res) => {
    try {
        const data = await AiSkinWorks.findOne();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET all items
router.get("/all", async (req, res) => {
    try {
        const data = await AiSkinWorks.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//  for single item by id
router.get("/:id", async (req, res) => {
    try {
        const data = await AiSkinWorks.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// for add new entry 
router.post("/add", async (req, res) => {


    try {
        const { Heading, SubHeading, Description, Concerns } = req.body;
        const newData = new AiSkinWorks({ Heading, SubHeading, Description, Concerns });
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// for put update

router.put("/:id", async (req, res) => {

    try {
        const { Heading, SubHeading, Description, Concerns } = req.body;
        const updatedData = await AiSkinWorks.findByIdAndUpdate(
            req.params.id,
            { Heading, SubHeading, Description, Concerns },
            { new: true, runValidators: true }
        );
        if (!updatedData) return res.status(404).json({ message: "Data not found" });
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// for delete 
router.delete("/:id", async (req, res) => {

    try {
        const deletedData = await AiSkinWorks.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: "Data not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

