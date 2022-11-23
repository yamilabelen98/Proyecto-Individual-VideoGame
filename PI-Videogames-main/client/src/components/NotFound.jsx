import React from "react";
import { useHistory } from "react-router-dom";
import img from "../img/404.gif";
import styles from "./Styles/NotFound.module.css";

export default function NotFound() {
  const history = useHistory();
  const handleBack = () => {
    history.push("/home");
  };
  return (
    <div className={styles.elbody}>
      <img src={img} alt="404 Not Found" width="600px" />
      <button onClick={handleBack} className={styles.Back}>
        Home
      </button>
    </div>
  );
}
