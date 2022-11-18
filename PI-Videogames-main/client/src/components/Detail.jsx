import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetailState, detailVideogame } from "../redux/Actions";
import Loading from "./Loading";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailVideogames = useSelector((state) => state.detail);
  const history=useHistory()

  useEffect(() => {
    dispatch(detailVideogame(id));
  }, [dispatch, id]);
 
  function handleRefresh(event){
    event.preventDefault();
    dispatch(cleanDetailState())//limpia el estado del detalle
    history.push("/home")//navega al home
  }
  return (
    <div>
        <button onClick={handleRefresh}>Back</button>
      {detailVideogames.name ? (
        <div>
          <h1>Name: {detailVideogames.name}</h1>
          <img
            src={detailVideogames.background_image}
            alt="Image not found"
            width="550px"
            height="350px"
          />
          <h2>Genres: {detailVideogames.genres.map((e) => e.name + " ")}</h2>
          <h2>Description: {detailVideogames.description_raw}</h2>
          <h2>Released: {detailVideogames.released}</h2>
          <h2>Rating: {detailVideogames.rating}</h2>
          <h2>
            Platforms:{" "}
            {detailVideogames.platforms.map((e) => e.platform.name + " ")}
          </h2>
        </div>
      ): <Loading/>}
    </div>
  );
}
