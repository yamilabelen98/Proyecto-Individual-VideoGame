import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Styles/Form.module.css";
import {
  getAllGenres,
  getAllVideoGames,
  postVideogame,
} from "../redux/Actions";
import validate from "./Validate";

export default function FormularioCreate() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const [inputCreate, setInputCreate] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getAllVideoGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(inputCreate, allVideogames));
  }, [inputCreate]);

  function handleCreate(event) {
    event.preventDefault();
    setErrors(validate(inputCreate, allVideogames));
    let error = validate(inputCreate, allVideogames);
    if (Object.values(error).length !== 0) {
      alert("Complete todos los campos por favor");
    } else {
      dispatch(postVideogame(inputCreate, allVideogames));
      alert("The VideoGame has been created ");
      setInputCreate({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      history.push("/home");
    }
  }

  function handleInput(event) {
    setInputCreate({
      ...inputCreate,
      [event.target.name]: event.target.value,
    });
    // setErrors(
    //   validate(
    //     {
    //       ...inputCreate,
    //       [event.target.name]: event.target.value,
    //     },
    //     allVideogames
    //   )
    // );
  }

  function handleGenres(event) {
    setInputCreate({
      ...inputCreate,
      genres: [...new Set([...inputCreate.genres, event.target.value])],
    });
    // setErrors(
    //   validate(
    //     {
    //       ...inputCreate,
    //       [event.target.name]: event.target.value,
    //     },
    //     allVideogames
    //   )
    // );
  }

  function handlePlatforms(event) {
    setInputCreate({
      ...inputCreate,
      platforms: [...new Set([...inputCreate.platforms, event.target.value])],
    });
    // setErrors(
    //   validate(
    //     {
    //       ...inputCreate,
    //       [event.target.name]: event.target.value,
    //     },
    //     allVideogames
    //   )
    // );
  }

  const handleDeleteGenres = (event) => {
    setInputCreate({
      ...inputCreate,
      genres: inputCreate.genres.filter((el) => el !== event.target.value),
    });
  };

  const handleDeletePlatforms = (event) => {
    setInputCreate({
      ...inputCreate,
      platforms: inputCreate.platforms.filter(
        (el) => el !== event.target.value
      ),
    });
  };

  const handleReturn = () => {
    history.push("/home");
  };
  return (
    <div className={styles.imageForm}>
      <button className={styles.returnButton} onClick={handleReturn}>
        Back
      </button>
      <form onSubmit={handleCreate} id="formulario" className={styles.realForm}>
        <p className={styles.title}>Formulario VideoGames</p>
        <div>
          <label className={styles.divs} for="name" form="formulario">
            Name:{" "}
            <input
              id="name"
              type="text"
              required
              value={inputCreate?.name}
              placeholder="Insert your game's name here..."
              onChange={handleInput}
              name="name"
            ></input>
          </label>
          {errors.name && <p className={styles.hs}>{errors.name}</p>}
        </div>

        <div>
          <label className={styles.divs} for="image" form="formulario">
            Image:
            <input
              type="text"
              id="image"
              required
              value={inputCreate.image}
              placeholder="Insert your game's image URL here..."
              onChange={handleInput}
              name="image"
            />
          </label>
          {errors.image && <p className={styles.hs}>{errors.image}</p>}
        </div>

        <div>
          <label className={styles.divs} for="description" form="formulario">
            Description:
            {/* <input
            type="text"
            value={inputCreate?.description}
            onChange={handleInput}
            name="description"
          ></input> */}
            <textarea
              className={styles.textArea}
              id="description"
              type="text"
              form="formulario"
              placeholder="Insert your game's description here..."
              value={inputCreate?.description}
              required
              minLength={0}
              maxLength={2000}
              name="description"
              rows="5"
              onChange={handleInput}
            />
          </label>
          {errors.description && (
            <p className={styles.hs}>{errors.description}</p>
          )}
        </div>

        <div>
          <label className={styles.divs} for="released" form="formulario">
            Released:
            <input
              type="date"
              id="released"
              required
              value={inputCreate?.released}
              onChange={handleInput}
              name="released"
            ></input>
          </label>
          {errors.released && <p className={styles.hs}>{errors.released}</p>}
        </div>

        <div>
          <label className={styles.divs} for="rating" form="formulario">
            Rating:
            <input
              type="number"
              id="rating"
              required
              min="0"
              max="5"
              value={inputCreate?.rating}
              onChange={handleInput}
              placeholder="Insert your game's rating here..."
              name="rating"
            ></input>
          </label>
          {errors.rating && <p className={styles.hs}>{errors.rating}</p>}
        </div>

        <div>
          <label className={styles.divs} for="genres" form="formulario">
            Genres:{" "}
            <select id="genres" defaultValue="default" onChange={handleGenres}>
              <option value="default" disabled>
                Select Genres
              </option>
              {allGenres?.map((e) => (
                <option value={e.name}>{e.name}</option>
              ))}
            </select>
            <div className={styles.map}>
              {inputCreate.genres.map((g) => (
                <div key={g.id} className={styles.genres}>
                  <div>
                    <h4>{g}</h4>
                  </div>
                  <button value={g} onClick={handleDeleteGenres}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </label>
          {errors.genres && <p className={styles.hs}>{errors.genres}</p>}
        </div>

        <div>
          <label className={styles.divs} for="platforms" form="formulario">
            Platforms:{" "}
            <select
              id="platforms"
              defaultValue="default"
              onChange={handlePlatforms}
            >
              <option value="default" disabled>
                Select Platforms
              </option>
              {platforms?.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </select>
            <div className={styles.map}>
              {inputCreate.platforms.map((p) => (
                <div key={p.id} className={styles.platforms}>
                  <div>
                    <h4>{p}</h4>
                  </div>
                  <button value={p} onClick={handleDeletePlatforms}>
                    x
                  </button>
                </div>
              ))}
            </div>
          </label>
          {errors.platforms && <p className={styles.hs}>{errors.platforms}</p>}
        </div>
        <br></br>
        <button type="submit" className={styles.create}>
          Create VideoGame
        </button>
      </form>
    </div>
  );
}
