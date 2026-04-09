
const express = require("express");

const router = express.Router();


const skin_analysis = require("../model/skin_analysis");


const multer = require("multer");

// multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// for get all

router.get("/all", async (req, res) => {


    try {

        const data = await skin_analysis.find();
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.messgae });

    }

});

//for get id 

router.get("/:id", async (req, res) => {

    try {

        const data = await skin_analysis.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
})


// for add 

router.post("/add", upload.single("Image"), async (req, res) => {

    try {

        const savedata = await skin_analysis.create({
            Image: req.file ? req.file.filename : null,
            Heading: req.body.Heading,
            Paragraph: req.body.Paragraph
        });

        res.status(201).json(savedata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
})

// for delete 

router.delete("/:id", async (req, res) => {

    try {


        const deletedata = await skin_analysis.findByIdAndDelete(req.param.id);
        res.json("Deleted Data ");
        if (!deletedata) return res.status(404).json({ message: "Not Foud item" });
    }

    catch (err) {

        res.status(500).json({ message: err.message });
    }

})

//for update 

router.put("/:id", upload.single("Image"), async (req, res) => {

    try {

        const updateddata = await skin_analysis.findByIdAndUpdate(
            req.param.id,
            {

                Image: req.body.Image,
                Heading: req.body.Heading,
                Paragraph: req.body.Paragraph,
                ...(req.file && { Image: req.file.filename })

            },

            { new: true }

        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" });

        res.json(updateddata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

})

module.exports = router;
