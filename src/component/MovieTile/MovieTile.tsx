import { IMovieTile } from "./interface";
import { FC } from "react";
import styles from "./MovieTile.module.scss";

const MovieTile: FC<IMovieTile> = ({
  props,
  wishlisthandler,
  buttonname,
  detailedhandler,
}) => {
  return (
    <div key={props.imdbID} className={styles.MovieTile}>
      <img src={props.Poster} alt={props.Title}></img>
      <div className={styles.TextContainer}>
        <p className={styles.Title}>{props.Title}</p>
        <p className={styles.Rated}>{props.Rated}</p>
        <p className={styles.Year}>{props.Year}</p>
        <p className={styles.Plot}>{props.Plot}</p>
      </div>
      <div className={styles.ButtonContainer}>
        <a id={props.imdbID} onClick={wishlisthandler}>
          {buttonname}
        </a>
        <a id={props.imdbID} onClick={detailedhandler}>
          Detail Movie
        </a>
      </div>
    </div>
  );
};

export default MovieTile;
