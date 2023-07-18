import { useHistory } from "react-router-dom";
import React from "react";
import styles from "./Styles/Landing.module.css";

export default function LandingPage() {
  const history = useHistory();
  return (
    <div className={styles.LandingPage}>
      <h1 className={styles.landingH1}>Welcome to my VideoGame page</h1>

      <button
        onClick={() => history.push("/home")}
        className={styles.homeButton}
      >
        Home
      </button>
    </div>
  );
}
