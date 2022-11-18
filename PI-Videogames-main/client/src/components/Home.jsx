import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  getAllVideoGames,
  order,
  rating,
} from "../redux/Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Loading from "./Loading";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./Styles/Home.module.css";


export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const loadingGame = useSelector((state) => state.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames?.slice(indexOfFirstGame, indexOfLastGame);
  console.log(currentGames);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllVideoGames());
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
  function handleClick(event) {
    event.preventDefault();
    dispatch(getAllVideoGames());
  }

  function handleGames() {
    if (
      currentGames?.length > 0 &&
      currentGames[0] === "Games name not found"
    ) {
      return "Games name not found"
    } else if (!currentGames?.length > 0 && loadingGame) {
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
  
  return (
    <div className={styles.homeImage}>
      <Link to="/CreateVideoGame">Crear VideoGame</Link>
      <h1>VideoGames</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload All VideoGame
      </button>
      <SearchBar setCurrentPage={setCurrentPage} />
      <div>
        <select
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
          defaultValue="default"
          onChange={(event) => handleFilterRating(event)}
        >
          <option value="default" disabled>
            Order Rating
          </option>
          <option value="Rating+">Rating+</option>
          <option value="Rating-">Rating-</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>
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
