const { Router } = require('express');
const { Genre } = require("../db");
const { genreDb } = require('./controllers');


const router= Router()

router.get("/", async (req,res)=>{
    const infoGenreDb= await Genre.findAll()
    res.status(200).send(infoGenreDb)
})


module.exports = router;