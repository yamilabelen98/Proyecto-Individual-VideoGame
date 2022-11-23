import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchVideogame } from "../redux/Actions";
import style from "./Styles/Search.module.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(e) {
    e.preventDefault();
    setSearchInput(e.target.value); //lo que coloca el usuario, lo guarda en el estado local (search imput)
  }
  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchVideogame(searchInput, history));
    setCurrentPage(1);
    setSearchInput(""); //limpia el estado local mediante el value del imput
  }

  return (
    <div className={style.search}>
      <input
        className={style.input}
        onChange={(e) => handleSearchInput(e)}
        value={searchInput}
        type="search"
        placeholder="Search VideoGames"
      />
      <button className={style.button} onClick={(e) => handleSearch(e)}>
        Buscar
      </button>
    </div>
  );
}
