import React from "react";
import styles from "./Styles/Paginado.module.css"

export default function Paginado({ gamesPerPage, allVideogames, paginado, currentPage }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {//math.ceil redondea para arriba
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="paginado">
                {pageNumber?.map(number => (
                    <button className={number === currentPage ? styles.pagActual : styles.pagOther} 
                    onClick={() => paginado(number)} key={number}>{number}</button>
                ))}
            </ul>
        </nav>

    )
}