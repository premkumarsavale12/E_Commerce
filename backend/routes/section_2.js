const express = require("express");
const router = express.Router();
const Section = require("../model/section_2");
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
        const data = await Section.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const data = await Section.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "Not Found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.post("/add", upload.single("Image"), async (req, res) => {
    try {
        const savedata = await Section.create({
            Heading: req.body.Heading,
            Sub_Heading: req.body.Sub_Heading,
            Description: req.body.Description,
            Sub_Description: req.body.Sub_Description,
            Button: req.body.Button,
            Image: req.file ? req.file.filename : null
        });

        res.status(201).json(savedata);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deleteddata = await Section.findByIdAndDelete(req.params.id);

        if (!deleteddata) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "Deleted Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.put("/:id", upload.single("Image"), async (req, res) => {
    try {
        const updateddata = await Section.findByIdAndUpdate(
            req.params.id,
            {
                Heading: req.body.Heading,
                Sub_Heading: req.body.Sub_Heading,
                Description: req.body.Description,
                Sub_Description: req.body.Sub_Description,
                Button: req.body.Button,
                ...(req.file && { Image: req.file.filename })
            },
            { new: true }
        );

        if (!updateddata) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json(updateddata);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
