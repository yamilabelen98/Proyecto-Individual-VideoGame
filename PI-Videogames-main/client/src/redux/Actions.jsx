import axios from "axios";
import NotFound from "../components/NotFound";

export function getAllVideoGames() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_ALL_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/genres");
    return dispatch({
      type: "GET_ALL_GENRES",
      payload: json.data,
    });
  };
}

export function searchVideogame(name, history) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "SEARCH_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      if (error) history.push("/notfound");
    }
  };
}

export function detailVideogame(id, history) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "DETAIL_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      history.push("/notfound");
    }
  };
}

export function cleanDetailState() {
  return {
    type: "CLEAN_DETAIL_STATE",
    payload: [],
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_GENRE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function order(payload) {
  return {
    type: "ORDER",
    payload,
  };
}

export function rating(payload) {
  return {
    type: "RATING",
    payload,
  };
}

export function postVideogame(payload) {
  return async function () {
    var response = await axios.post(
      "http://localhost:3001/videogames",
      payload
    );
    return {
      type: "POST_VIDEOGAME",
      payload: response,
    };
  };
}

export function loading() {
  return {
    type: "LOADING",
  };
}
