
const express = require("express");

const router = express.Router();

const Faq = require("../model/Faq");

// for get all 

router.get("/all", async (req, res) => {

    try {
        const data = await Faq.find();

        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }


});


// for get id 

router.get("/:id", async (req, res) => {

    try {

        const data = await Faq.findById(req.params.id);
        res.json(data);

    }
    catch (err) {
        res.status(500).json({ message: err.message });

    }

});


// for add

router.post("/add", async (req, res) => {
    try {
        const saveData = await Faq.create(req.body);
        res.status(201).json(saveData);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

})


router.delete("/:id", async (req, res) => {

    try {

        const deletedata = await Faq.findByIdAndDelete(req.params.id);

        res.json("Deleted SuccessFully... ")

        if (!deletedata) return res.status(404).json({ message: "Not Found " });


    }

    catch (err) {


        res.status(500).json({ message: err.message });

    }

})

router.put("/:id", async (req, res) => {

    try {

        const updateddata = await Faq.findByIdAndUpdate(
            req.params.id,
            req.body,

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

