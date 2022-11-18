const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogamesInfo =  require("./videogames.js")
const genre =  require("./genre.js")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesInfo)
router.use("/genres", genre)

module.exports = router;
