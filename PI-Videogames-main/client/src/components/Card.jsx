import React from "react";
import styles from "../components/Styles/Card.module.css";

export default function Card({ Img, Name, Genres }) {
  return (
    <div>
      <div className={styles.hcards}>
        <h2 className={styles.titulo}>{Name}</h2>
        <img className={styles.imagen} src={Img} alt="img not found" />
        <h3 className={styles.p}>Genres: {Genres.join(" ")}</h3>
      </div>
    </div>
  );
}
