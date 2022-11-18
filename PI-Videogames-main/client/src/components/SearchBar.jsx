import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchVideogame } from "../redux/Actions";


export default function SearchBar ({setCurrentPage}){
    const dispatch= useDispatch()

    const [searchInput, setSearchInput] = useState("")
    
    function handleSearchInput(e) {
        e.preventDefault();
        setSearchInput(e.target.value);//lo que coloca el usuario, lo guarda en el estado local (search imput)
      }
      function handleSearch(e) {
        e.preventDefault();
        dispatch(searchVideogame(searchInput));
        setCurrentPage(1)
        setSearchInput("");//limpia el estado local mediante el value del imput
      }
    
    return(
        <div>
          <input onChange={e => handleSearchInput(e)} value={searchInput} type="search" placeholder='Search VideoGames'/>
          <button onClick={e => handleSearch(e)}>Buscar</button>
        </div>
    )
}