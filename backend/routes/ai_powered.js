
const express = require("express");

const router = express.Router();

const multer = require("multer");

const ai_powered = require("../model/Ai_Powered");



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

router.get("/", async (req, res) => {
    try {

        const data = await ai_powered.find();
        res.json(data);

    }

    catch (err) {

        res.status(500).return({ message: err.message })

    }

})

// for get id

router.get("/:id", async (req, res) => {

    try {

        const data = await ai_powered.findById(req.params.id);
        res.json(data);


    }
    catch (err) {

        res.status(500).json({ message: err.message });

    }
});

//for post 
router.post("/add", upload.single("Image"),  async (req, res) => {

    try {
        const savedata = await ai_powered.create({

            Heading: req.body.Heading,
            SubHeading: req.body.SubHeading,
            Paragraph: req.body.Paragraph,
            Button: req.body.Button,
            Image: req.file ? req.file.filename : null,

        });
          res.status(201).json(savedata);

    }
    catch (err) {
        console.log(err);

    }

});


router.delete("/:id ", async (req, res) => {

    try {

        const deletedata = await ai_powered.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully ....");
        if (!deletedata) return res.status(404).json({ message: "Not Foud item" });
    }
    catch (err) {

        res.status(500).json({ message: err.message });

    }

})

router.put("/:id", async (req, res) => {

    try {
        const updateddata = await ai_powered.findByIdAndUpdate(
            req.params.id,
            {
                Heading: req.body.Heading,
                SubHeading: req.body.SubHeading,
                Paragraph: req.body.Paragraph,
                Button: req.body.Button,
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
});


module.exports = router;  

