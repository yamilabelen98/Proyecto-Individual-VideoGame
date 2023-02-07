const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: {},
  platforms: [],
  loading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_VIDEOGAMES":
      let platforms = [];
      action?.payload?.map((e) => (platforms = [...platforms, ...e.platforms]));
      return {
        ...state,
        loading: false,
        videogames: action.payload,
        allVideogames: action.payload,
        platforms: Array.from(new Set(platforms)),
      };
    case "GET_ALL_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "SEARCH_VIDEOGAME":
      return {
        ...state,
        loading: false,
        videogames: action.payload,
      };
    case "DETAIL_VIDEOGAME":
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case "CLEAN_DETAIL_STATE":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_GENRE":
      const allGenres = state.allVideogames;
      const genresFiltered =
        action.payload === "All Videogames"
          ? allGenres
          : allGenres?.filter((el) => el.genres.includes(action.payload));
      return {
        ...state,
        videogames: genresFiltered,
      };
    case "FILTER_CREATED":
      const allStateVideogame = state.allVideogames;
      const statusFiltered =
        action.payload === "created"
          ? allStateVideogame.filter((e) => e?.createdInDb)
          : allStateVideogame.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : statusFiltered,
      };
    case "ORDER":
      let sortedGame;
      const allVideogames = [...state.videogames];

      if (action.payload === "asc") {
        sortedGame = allVideogames.sort(function (a, b) {
          //comparo ambos valores
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "desc") {
        sortedGame = allVideogames.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        videogames: sortedGame,
      };
    case "RATING":
      let sortedGameR;
      const allVideogames2 = [...state.videogames];

      if (action.payload === "Rating-") {
        sortedGameR = allVideogames2.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (b.rating > a.rating) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "Rating+") {
        sortedGameR = allVideogames2.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        videogames: sortedGameR,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "LOADING":
      return {
        loading: true,
      };
    default:
      return state;
  }
}

export default rootReducer;
