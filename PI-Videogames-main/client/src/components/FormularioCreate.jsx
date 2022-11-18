import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllGenres, getAllVideoGames, postVideogame } from "../redux/Actions";

export default function FormularioCreate() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const platforms= useSelector((state)=> state.platforms)
  const [inputCreate, setInputCreate]=useState({
    name:"",
    description:"",
    released:"",
    rating:"",
    genres:[],
    platforms: [],
  })

  useEffect(() => {
    dispatch(getAllVideoGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  function handleCreate(event){
    event.preventDefault();
    dispatch(postVideogame(inputCreate))
  }
  
  function handleInput(event){
   setInputCreate({
    ...inputCreate,
    [event.target.name]: event.target.value
   })
  }

  function handleGenres(event){
    setInputCreate({
     ...inputCreate,
     genres: [...new Set([...inputCreate.genres, event.target.value])],
    })
   }

   function handlePlatforms(event){
    setInputCreate({
     ...inputCreate,
     platforms: [...new Set([...inputCreate.platforms, event.target.value])],
    })
   }
  return (
    <form onSubmit={handleCreate}>
      <Link to="/home">
        <button>Back</button>
      </Link>

      <h1>Formulario VideoGames</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={inputCreate?.name} onChange={handleInput} name="name"></input>
      </div>

      <div>
        <label>Description: </label>
        {/* <textarea></textarea> */}
        <input type="text" value={inputCreate?.description} onChange={handleInput} name="description"></input>
      </div>

      <div>
        <label>Released: </label>
        <input type="text" value={inputCreate?.released} onChange={handleInput} name="released"></input>
      </div>

      <div>
        <label>Rating: </label>
        <input type="number" value={inputCreate?.rating} onChange={handleInput} name="rating"></input>
      </div>

      <div>
        <label>Genres: </label>
        <select defaultValue="default" onChange={handleGenres}>
          <option value="default" disabled>
            Select Genres
          </option>
          {allGenres?.map((e) => (
            <option value={e.name}>{e.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Platforms: </label>
        <select defaultValue="default"  onChange={handlePlatforms}>
          <option value="default" disabled>
            Select Platforms
          </option>
          {platforms?.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </div>

      <br></br>

      <div>
        <button type="submit">Create VideoGame</button>
      </div>
    </form>
  );
}
