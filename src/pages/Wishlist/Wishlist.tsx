import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Wishlist.module.scss";
import MovieTile from "../../component/MovieTile/MovieTile";
import Popup from "../../component/Popup/Popup";
import { User } from "../Register/interface";
import { Movie } from "../../component/MovieTile/interface";

const Wishlist = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [detailedMovie, setDetailedMovie] = useState<any>({} as any);
  const [movieList, setMovieList] = useState<String[]>([""]);
  const [movieListObj, setMovieListObj] = useState<Movie[]>([]);

  useEffect(() => {
    const authToken: string | null =
      window.sessionStorage.getItem("auth-token");
    if (authToken) {
      axios
        .get("https://movie-web-api-182.herokuapp.com/api/books/get", {
          headers: {
            "auth-token": authToken,
          },
        })
        .then((res) => setMovieListObj(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const deleteWishlist = (event: any) => {
    const authToken: string | null =
      window.sessionStorage.getItem("auth-token");
    if (authToken) {
      axios
        .patch(
          `https://movie-web-api-182.herokuapp.com/api/books/delete/${event.target.id}`,
          {},
          {
            headers: {
              "auth-token": authToken,
            },
          }
        )
        .then((res) => {
          alert(`Movie has been removed from wishlist.`);
          window.location.reload();
        })
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

  return (
    <div className={styles.List}>
      <h1>Your Wishlist</h1>
      {movieListObj.length > 0 ? (
        movieListObj.map((movie) => (
          <MovieTile
            props={movie}
            wishlisthandler={deleteWishlist}
            buttonname="Delete from wishlist"
            detailedhandler={detailedhandler}
          />
        ))
      ) : (
        <h3>No Wishlist yet.</h3>
      )}
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

export default Wishlist;
