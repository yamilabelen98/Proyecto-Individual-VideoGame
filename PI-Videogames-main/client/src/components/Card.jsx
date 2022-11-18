import React from "react";

export default function Card({ Img, Name, Genres }) {
  console.log(Genres, "YOOO")
  return (
    <div>
      <h2>{Name}</h2>
      <img src={Img} alt="" width="300px" height="250px" />
      <h3>Genres: {Genres.join(" ")}</h3>
    </div>
  );
}