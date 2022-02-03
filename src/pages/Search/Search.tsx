import React, { useState, FC, useEffect } from "react";
import styles from "./Search.module.scss";
import { IMovieTile, Movie } from "./interface";
import axios from "axios";
import Popup from "../../component/Popup/Popup";

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

const SearchMovies = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [detailedMovie, setDetailedMovie] = useState<any>({} as any);

  const addWishlist = (event: any) => {
    const bookAray = [event.target.id];
    const authToken: string | null =
      window.sessionStorage.getItem("auth-token");
    if (authToken) {
      axios
        .patch(
          "https://movie-web-api-182.herokuapp.com/api/books/add",
          { books: bookAray },
          {
            headers: {
              "auth-token": authToken,
            },
          }
        )
        .then((res) => alert(`Movie has been added to wishlist.`))
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    } else {
      alert("Please login first.");
    }
  };

  const detailedhandler = (event: any) => {
    setIsPopup(true);
    axios
      .get(`http://www.omdbapi.com/?apikey=1bee8ffd&i=${event.target.id}`)
      .then((res) => setDetailedMovie(res.data));
  };

  const params = new URLSearchParams(window.location.search);
  const searchname = params.get("name");

  const [listMovie, setListMovie] = useState<Movie[]>([]);
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?apikey=1bee8ffd&s=${searchname}`)
      .then((res) => setListMovie(res.data.Search));
  });

  return (
    <div className={styles.List}>
      <h1>Searching {params.get("name")}</h1>
      {listMovie.map((movie) => {
        return (
          <MovieTile
            props={movie}
            wishlisthandler={addWishlist}
            buttonname="Add to wishlist"
            detailedhandler={detailedhandler}
          />
        );
      })}
      <Popup trigger={isPopup} setTrigger={() => setIsPopup(false)}>
        <div className={styles.Detail}>
          <img src={detailedMovie["Poster"]} />
          <table>
            {Object.keys(detailedMovie).map((key) => {
              if (
                key !== "Production" &&
                key !== "Poster" &&
                key !== "Response" &&
                key !== "Ratings" &&
                key !== "Website" &&
                key !== "imdbRating" &&
                key !== "imdbVotes" &&
                key !== "imdbID"
              ) {
                return (
                  <tr>
                    <td>{key}</td>
                    <td>:</td>
                    <td>{detailedMovie[key]}</td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      </Popup>
    </div>
  );
};

export default SearchMovies;
