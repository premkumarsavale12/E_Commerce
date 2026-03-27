const express = require("express");
const router = express.Router();

const lip = require("../model/lip");

// for get all 

router.get("/all", async (req, res) => {

    try {

        const data = await lip.find();
        res.json(data);
    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
});

// for get  by id 

router.get("/:id", async (req, res) => {

    try {

        const data = await lip.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
});

// for add 
router.post("/:id", async (req, res) => {

    try {
        const savedata = await lip.create(req.body);
        res.status(201).json(savedata);

    }
    catch (err) {
        console.log(err);

        res.status(500).json({ message: err.message });

    }
});

// for delete....

router.delete("/:id", async (req, res) => {

    try {

        const deletedata = await lip.findByIdAndDelete(req.params.id);
        res.json("Deleted SuccessFully....");

        if (!deletedata) return res.status(404).json({ message: "Not Found item" });
    }

    catch (err) {

        console.log(err);

        res.status(500).json({ message: err.message });
    }
})

// for update  

router.put("/:id", async (req, res) => {

    try {
        const updateddata = await lip.findByIdAndUpdate(
            req.params.id,
            req.body,
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
