require('dotenv').config();
const axios = require("axios")
const {
    API_KEY
} = process.env;
const { Videogame, Genre } = require("../db")


const getApiInfo = async () => {
    let allGames = [];
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    try {
      for (let i = 0; i < 5; i++) {
        let info = await axios.get(apiUrl);
        info.data.results.map((g) => {
          allGames.push({
            id: g.id,
            name: g.name,
            background_image: g.background_image,
            released: g.released,
            rating: g.rating,
            platforms: g.platforms.map((p) => p.platform.name),
            genres: g.genres.map((g) => g.name),
          });
        });
        apiUrl = info.data.next;
      }
      return allGames;
    } catch (error) {
      console.log("error en getApiInfo", error);
    }
  };

const getDbInfo = async () => {
    try {
        const dbInfo = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
        return dbInfo
    } catch (error) {
        console.log("error in function getDbInfo", error)
    }
}

const getInfoTotal = async () => {
    try {
        const infoApi = await getApiInfo();
        const dataBase = await getDbInfo();
        const allGames = [...infoApi, ...dataBase];
        return allGames;
    } catch (error) {
        console.log("error in function getInfoTotal", error)
    }
}

const genreDb = async () => {
    try {
        const infoApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then(response => response.data)
        const nombres= infoApi.results.map(el => {return el.name})
        
        nombres.forEach(e => {
            Genre.findOrCreate({where: {name: e}})
        });
        const generos= Genre.findAll()
        return generos
    } catch (error) {
        console.log("error in function genreDb", error)
    }
}

const postGame= async(objGame)=>{
    try {
        const {name, description, released, rating, platforms, background_image, genres}= objGame;
        const game= {name, description, released, rating, platforms, background_image, genres}
        const gameCreated= await Videogame.create(game)
        genres.map(async (e)=>{
            let genre= await Genre.findAll({
                where: {name:e},
            });
            gameCreated.addGenre(genre);
        })
    } catch (error) {
        console.log("error en post/game", error);
    }
}

module.exports = { getApiInfo, getInfoTotal, genreDb, postGame }