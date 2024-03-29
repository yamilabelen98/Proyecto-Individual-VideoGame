import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  filterCreated,
  getAllGenres,
  getAllVideoGames,
  order,
  rating,
} from "../redux/Actions";
import { Link, useHistory } from "react-router-dom";
import Card from "./Card";
import Loading from "./Loading";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./Styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const loadingGame = useSelector((state) => state.loading);
  const allGenres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames?.slice(indexOfFirstGame, indexOfLastGame);
  const history = useHistory();

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllVideoGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  function handleFilter(event) {
    event.preventDefault();
    dispatch(order(event.target.value));
  }
  function handleFilterRating(event) {
    event.preventDefault();
    dispatch(rating(event.target.value));
  }
  function handleFilterCreated(event) {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
  }
  function handleFilterGenre(event) {
    event.preventDefault();
    dispatch(filterByGenre(event.target.value));
  }
  function handleClick(event) {
    event.preventDefault();
    dispatch(getAllVideoGames());
  }

  function handleGames() {
    if (!currentGames?.length > 0 && loadingGame) {
      return <Loading />;
    } else if (currentGames?.length > 0 && !loadingGame) {
      return currentGames?.map((e) => {
        return (
          <div key={e.id} className={styles.cards}>
            <Link to={"/detail/" + e.id}>
              <Card Name={e.name} Genres={e.genres} Img={e.background_image} />
            </Link>
          </div>
        );
      });
    }
  }

  const handleCreated = () => {
    history.push("/CreateVideoGame");
  };

  return (
    <div className={styles.homeImage}>
      <button className={styles.created} onClick={handleCreated}>
        Create Your VideoGame
      </button>
      <div className={styles.titulo}>
        <p>VideoGames</p>
      </div>

      <button
        className={styles.reload}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload All VideoGames
      </button>
      <div className={styles.cosas}>
        <SearchBar setCurrentPage={setCurrentPage} />
        <div className={styles.order}>
          <select
            className={styles.item}
            defaultValue="default"
            onChange={(event) => handleFilter(event)}
          >
            <option value="default" disabled>
              Order Alphabetical
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
          <select
            className={styles.item}
            defaultValue="default"
            onChange={(event) => handleFilterRating(event)}
          >
            <option value="default" disabled>
              Order Rating
            </option>
            <option value="Rating+">Rating+</option>
            <option value="Rating-">Rating-</option>
          </select>
          <select
            className={styles.item}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="api">Existing</option>
          </select>
          <select
            className={styles.item}
            onChange={(event) => handleFilterGenre(event)}
          >
            <option value="All Videogames">All Genres</option>
            {allGenres?.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
        </div>
      </div>
      <Paginado
        gamesPerPage={gamesPerPage}
        allVideogames={allVideogames?.length}
        paginado={paginado}
        currentPage={currentPage}
      />
      {handleGames()}
    </div>
  );
}
