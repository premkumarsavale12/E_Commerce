const express = require("express");
const router = express.Router();
const Category = require("../model/Category");
const multer = require("multer");

//multer setup 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);


    }
})

const upload = multer({ storage: storage });

// for get all
router.get("/all", async (req, res) => {

    try {
        const data = await Category.find()
        res.json(data);

    }
    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message })
    }

})

// for id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Category.findById(req.params.id);
        res.json(data);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
});

// for add data 

router.post("/add", upload.single("Image"), async (req, res) => {

    try {
        const savedata = await Category.create({

            Image: req.file ? req.file.filename : null,
            Text: req.body.Text,
        });

        res.status(201).json(savedata);
    }
    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// for delete

router.delete("/:id", async (req, res) => {

    const deletedata = await Category.findByIdAndDelete(req.params.id);
    if (!deletedata) {
        return res.status(404).json({ message: "Not Found" });
    }
    res.json({ message: "Deleted SuccessFully..." });

});

// for  update 

router.put("/:id ", upload.single("Image"), async (req, res) => {

    try {
        const updateddata = await Category.findByIdAndUpdate(

            req.params.id,
            {
                Text: req.body.Text,
                ...(req.file && { Image: req.file.filename })
            },
            { new: true }
        );

        if (!updateddata) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json(updateddata);
    }
    catch (err) {
        res.status(500).json({ message: err.message });


    }
})

module.exports = router;
