const express = require("express");
const router = express.Router();

const hair = require("../model/hair");

// for get all 

router.get("/all", async (req, res) => {

    try {

        const data = await hair.find();
        res.json(data);
    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
});

// for get  by id 

router.get("/:id", async (req, res) => {

    try {

        const data = await hair.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }
});

// for add 
router.post("/:id", async (req, res) => {

    try {
        const savedata = await hair.create(req.body);
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

        const deletedata = await hair.findByIdAndDelete(req.params.id);
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
        const updateddata = await hair.findByIdAndUpdate(
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
