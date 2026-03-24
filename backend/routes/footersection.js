const express = require("express");
const router = express.Router();

const footer = require("../model/footerSchema")

// for all 

router.get("/all", async (req, res) => {

    try {

        const data = await footer.find();
        res.json(data);
    }

    catch (err) {
        res.status(500).json({ message: err.message });

    }

});

//for id 

router.get("/:id", async (req, res) => {

    try {

        const data = await footer.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

})

router.post("/add", async (req, res) => {

    try {

        const footerdata = await footer.create(req.body);

        res.status(201).json(footerdata);

    }
    catch (err) {

        console.log(err)
        res.status(500).json({ message: err.message });

    }

});

router.delete("/:id", async (req, res) => {
    try {

        const deletedata = await footer.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted SuccessFully...." });

        if (!deletedata) return res.status(404).json({ message: "Not Found" });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

router.put("/:id", async (req, res) => {

    try {
        const updateddata = await footer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" })
        res.json(updateddata);

    }

    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

})


module.exports = router;