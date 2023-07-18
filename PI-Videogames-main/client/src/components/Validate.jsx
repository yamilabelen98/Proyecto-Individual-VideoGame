export default function validate(inputCreate, allVideogames) {
  let errors = {};
  let RegExpression = /^[a-zA-Z\s]*$/;
  let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

  if (!inputCreate.name.trim()) {
    errors.name = "A name is required";
  } else if (allVideogames.indexOf(inputCreate.name) !== -1) {
    errors.name = "A VideoGame with that name is already existing";
  } else if (!RegExpression.test(inputCreate.name)) {
    errors.name = "Numbers or special characters are not allowed";
  } else if (!inputCreate.image || !validateUrl.test(inputCreate.image)) {
    errors.image = "This is not a valid URL";
  } else if (
    inputCreate.description === "number" ||
    inputCreate.description.length < 10 ||
    inputCreate.description.trim() === ""
  ) {
    errors.description = "Enter a correct description";
  } else if (inputCreate.released.trim() === "") {
    errors.released = "Enter a date";
  } else if (inputCreate.released < "1950 - 01- 01") {
    errors.released = "The date cannot be less than 1950 - 01- 01";
  } else if (
    inputCreate.rating === "" ||
    inputCreate.rating < 1 ||
    inputCreate.rating > 5
  ) {
    errors.rating = "Enter a rating between 1 and 5";
  } else if (inputCreate.genres.length === 0) {
    errors.genres = "Select one or more genres";
  } else if (inputCreate.genres.length > 10) {
    errors.genres = "Only up to 10 genres";
  } else if (inputCreate.platforms.length === 0) {
    errors.platforms = "Select one or more platforms";
  } else if (inputCreate.platforms.length > 10) {
    errors.platforms = "Only up to 10 platforms";
  }
  return errors;
}
