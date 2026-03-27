
const express = require("express")

const router = express.Router();

const Collection = require("../model/collection");


// for get all  

router.get("/all", async (req, res) => {

    try {

        const data = await Collection.find();

        res.json(data);

    }

    catch (err) {

        res.status(500).json({ message: err.message })
    }

});

// for id 


router.get("/:id", async (req, res) => {

    try {

        const data = await Collection.findById(req.params.id);
        res.json(data);

    }


    catch (err) {
        res.status(500).json({ message: err.message });


    }

});

// for post 

router.post("/add", async (req, res) => {

    try {
        const savedata = await Collection.create(req.body);
        res.status(201).json(savedata)
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });


    }

});


// for delete 

router.delete("/:id", async (req, res) => {

    try {

        const deletedata = await Collection.findByIdAndDelete(req.params.id);

        if (!deletedata) return res.status(404).json({ message: "Shop item not found" })

        res.json("Deleted Successfully ")
    }

    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }


});

// for put

router.put("/:id", async (req, res) => {

    try {

        const updateddata = await Collection.findByIdAndUpdate(
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


})

module.exports = router;
