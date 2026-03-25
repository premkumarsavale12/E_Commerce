const express = require("express");

const router = express.Router();

const Section = require("../model/section_2");

// for all 

router.get("/all", async (req, res) => {

    try {

        const data = await Section.find();
        res.json(data);

    }

    catch (err) {

        res.json(500).return({ message: err.message });

    }

})

// for id  

router.get("/:id ", async (req, res) => {

    try {

        const data = await Section.findById(req.params.id);
        res.json(data);

    }

    catch (err) {

        res.json(500).return({ message: err.message })

    }

})

// for  post 

router.post("/add", async (req, res) => {
    try {
        const savedata = await Section.create(req.body);
        res.status(201).json(savedata);


    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }

})

// for delete 


router.delete("/:id ", async (req, res) => {
    try {


        const deleteddata = await Section.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted SuccessFully...." });

        if (!deleteddata) return res.status(404).json({ message: "NOT fOUND.." });
    }
    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message })
    }

})


// for put 


router.put("\:id", async (req, res) => {

    try {

        const updateddata = await Section.findOneAndUpdate(
            req.params.id,
            red.body,
            { new: true }
        )
      
        if (!updateddata) return res.status(404).json({ message: "NOT fOUND.." });

    }


    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message })
    }


})

module.exports = router;
