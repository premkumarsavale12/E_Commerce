
const express = require("express");

const router = express.Router();

const Hero = require('../model/hero_section');
 
// for get all 
router.get("/all", async (req, res) => {

    try {

        const hero = await Hero.find(); 
        res.json(hero);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// for get id 

router.get("/:id", async (req, res) => {

    try {

        const hero = await Hero.findById(req.params.id);
        res.json(hero);

    }

    catch (err) {

        res.status(500).json({ message: err.message });


    }


});

//  for post  
router.post("/add", async (req, res) => {

    try {

        const herodata = await Hero.create(req.body);

        res.status(201).json(herodata);

    }

    catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });

    }

});


// for delete 

router.delete("/:id", async (req, res) => {

    try {
        const deletedata = await Hero.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted SuccessFully... " })

        if (!deletedata) return res.status(404).json({ message: " not Found " });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});


// for update 

router.put("/:id", async (req, res) => {

    try {

        const updateddata = await Hero.findByIdAndUpdate(

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
