
const express = require("express");

const router = express.Router();

const baby_care = require("../model/baby_care");

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

        const data = await baby_care.find();
        res.json(data);
    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// for get id  

router.get("/:id", async (req, res) => {

    try {

        const data = await baby_care.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});


//for add  

router.post("/add", upload.single("Image"), async (req, res) => {

    try {

        const savedata = await baby_care.create({
            Image: req.file ? req.file.filename : null,
            Image_Name: req.body.Image_Name,
            Image_Description: req.body.Image_Description,
            Price: req.body.Price,
            Button: req.body.Button

        });

        res.status(201).json(savedata);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// for delete 

router.delete("/:id", async (req, res) => {

    try {


        const deletedata = await baby_care.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully ....");
        if (!deletedata) return res.status(404).json({ message: "Not Foud item" });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});


// for updated  

router.put("/:id", upload.single("Image"), async (req, res) => {

    try {

        const updateddata = await baby_care.findByIdAndUpdate(
            req.params.id,
            {
                Image_Name: req.body.Image_Name,
                Image_Description: req.body.Image_Description,
                Price: req.body.Price,
                Button: req.body.Button,
                ...(req.file && { Image: req.file.filename })

            },

            { new: true }

        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" });

        res.json(updateddata);

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }


});


module.exports = router;
