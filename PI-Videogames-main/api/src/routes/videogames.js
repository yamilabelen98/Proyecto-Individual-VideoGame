require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { getInfoTotal, postGame } = require("./controllers");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const apiInfo = await getInfoTotal();
    if (name) {
      const nameFilter = apiInfo.filter((videogames) =>
        videogames.name.toLowerCase().includes(name.toLocaleLowerCase())
      );

      nameFilter.length
        ? res.status(200).send(nameFilter.slice(0, 15))
        : res.status(404).send("Games name not found");
    } else {
      res.status(200).json(apiInfo);
    }
  } catch (error) {
    res.status(404).json("error en query name", error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length < 5) {
    try {
      const urlInfo = await axios
        .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then((el) => el.data);
      console.log(urlInfo);
      if (urlInfo === undefined) {
        return res.status(404).send("not found");
      } else {
        return res.status(200).send(urlInfo);
      }
    } catch (error) {
      return res.status(400).send(error?.response?.data?.detail);
    }
  } else {
    try {
      const sendVideogame = await Videogame.findByPk(id, { include: Genre });

      return res.status(200).send(sendVideogame);
    } catch (err) {
      console.log(err);
      return res.status(404).send("not found");
    }
  }
});
router.post("/", async (req, res) => {
  try {
    const objGame = req.body;
    console.log(objGame, "lo que recibe el back");
    const newGame = await postGame(objGame);
    res.status(200).send(newGame);
  } catch (error) {
    res.status(400).json("Error en ruta Post", error);
  }
});

module.exports = router;
