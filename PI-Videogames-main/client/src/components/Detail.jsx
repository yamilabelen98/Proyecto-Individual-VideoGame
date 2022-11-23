import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetailState, detailVideogame } from "../redux/Actions";
import Loading from "./Loading";
import styles from "./Styles/Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailVideogames = useSelector((state) => state.detail);
  const history = useHistory();
  console.log(detailVideogames);
  useEffect(() => {
    dispatch(detailVideogame(id, history));
  }, [dispatch, id]);

  function handleRefresh(event) {
    event.preventDefault();
    dispatch(cleanDetailState()); //limpia el estado del detalle
    history.push("/home"); //navega al home
  }
  return (
    <div className={styles.imageDetail}>
      <button onClick={handleRefresh} className={styles.Back}>
        Back
      </button>
      {detailVideogames && detailVideogames.name ? (
        <div className={styles.DetailDiv}>
          <img
            className={styles.imagen}
            src={
              detailVideogames.background_image
                ? detailVideogames.background_image
                : null
            }
            alt="Not found"
          />
          <div className={styles.divTexto}>
            <h1>Name: {detailVideogames.name}</h1>
            <h2>Genres: {detailVideogames.genres?.map((e) => e.name + " ")}</h2>
            <h2>
              Description:{" "}
              {detailVideogames.createdInDb
                ? detailVideogames.description
                : detailVideogames.description_raw}
            </h2>
            <h2>Released: {detailVideogames.released}</h2>
            <h2>Rating: {detailVideogames.rating}</h2>
            <h2>
              Platforms:{" "}
              {detailVideogames.createdInDb
                ? detailVideogames.platforms.map((e) => e + " ")
                : detailVideogames.platforms.map((e) => e.platform.name + " ")}
            </h2>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
