
const express = require("express");

const router = express.Router();

const skin_insight = require("../model/skin_insights");

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

        const data = await skin_insight.find();
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// for get id 

router.get("/:id", async (req, res) => {


    try {

        const data = await skin_insight.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

//for add 


router.post("/add", upload.single("Image"), async (req, res) => {

    try {

        const savedata = await skin_insight.create({


            Image: req.file ? req.file.filename : null,
            Heading: req.body.Heading,
            Description: req.body.Description,
            Button: req.body.Button,
            Paragraph: req.body.Paragraph

        });

        res.status(201).json(savedata);
    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

})

//for deleted 

router.delete("/:id", async (req, res) => {


    try {
        const deletedata = await skin_insight.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully...");

        if (!deletedata) return res.status(404).json({ message: "Not Found Item " });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }


});

// for updated 

router.put("/:id", upload.single("Image"), async (req, res) => {

    try {

        const updateddata = await skin_insight.findByIdAndUpdate(

            req.params.id,

            {

                Heading: req.body.Heading,
                Description: req.body.Description,
                Button: req.body.Button,
                Paragraph: req.body.Paragraph,
                ...(req.file && { Image: req.file.filename })

            },

            { new: true }

        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" });

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }

})

module.exports = router;

