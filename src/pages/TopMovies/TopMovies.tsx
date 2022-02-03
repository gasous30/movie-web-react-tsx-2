import { useState } from "react";
import styles from "./TopMovies.module.scss";
import axios from "axios";
import Popup from "../../component/Popup/Popup";
import MovieTile from "../../component/MovieTile/MovieTile";

let topRatedMovies = [
  {
    Title: "The Shawshank Redemption",
    Year: "1994",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "142 min",
    Genre: "Drama",
    Director: "Frank Darabont",
    Writer: "Stephen King, Frank Darabont",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 7 Oscars. 21 wins & 43 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.3/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "91%",
      },
      {
        Source: "Metacritic",
        Value: "80/100",
      },
    ],
    Metascore: "80",
    imdbRating: "9.3",
    imdbVotes: "2,523,987",
    imdbID: "tt0111161",
    Type: "movie",
    DVD: "21 Dec 1999",
    BoxOffice: "$28,699,976",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Godfather",
    Year: "1972",
    Rated: "R",
    Released: "24 Mar 1972",
    Runtime: "175 min",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    Writer: "Mario Puzo, Francis Ford Coppola",
    Actors: "Marlon Brando, Al Pacino, James Caan",
    Plot: "The Godfather follows Vito Corleone, Don of the Corleone family, as he passes the mantle to his unwilling son, Michael.",
    Language: "English, Italian, Latin",
    Country: "United States",
    Awards: "Won 3 Oscars. 31 wins & 30 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.2/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "97%",
      },
      {
        Source: "Metacritic",
        Value: "100/100",
      },
    ],
    Metascore: "100",
    imdbRating: "9.2",
    imdbVotes: "1,742,506",
    imdbID: "tt0068646",
    Type: "movie",
    DVD: "11 May 2004",
    BoxOffice: "$134,966,411",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Godfather: Part II",
    Year: "1974",
    Rated: "R",
    Released: "18 Dec 1974",
    Runtime: "202 min",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    Writer: "Francis Ford Coppola, Mario Puzo",
    Actors: "Al Pacino, Robert De Niro, Robert Duvall",
    Plot: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    Language: "English, Italian, Spanish, Latin, Sicilian",
    Country: "United States",
    Awards: "Won 6 Oscars. 17 wins & 20 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.0/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "96%",
      },
      {
        Source: "Metacritic",
        Value: "90/100",
      },
    ],
    Metascore: "90",
    imdbRating: "9.0",
    imdbVotes: "1,208,928",
    imdbID: "tt0071562",
    Type: "movie",
    DVD: "24 May 2005",
    BoxOffice: "$47,834,595",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Dark Knight",
    Year: "2008",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Runtime: "152 min",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Language: "English, Mandarin",
    Country: "United States, United Kingdom",
    Awards: "Won 2 Oscars. 159 wins & 163 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.0/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "94%",
      },
      {
        Source: "Metacritic",
        Value: "84/100",
      },
    ],
    Metascore: "84",
    imdbRating: "9.0",
    imdbVotes: "2,480,928",
    imdbID: "tt0468569",
    Type: "movie",
    DVD: "09 Dec 2008",
    BoxOffice: "$534,858,444",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "12 Angry Men",
    Year: "1957",
    Rated: "Approved",
    Released: "10 Apr 1957",
    Runtime: "96 min",
    Genre: "Crime, Drama",
    Director: "Sidney Lumet",
    Writer: "Reginald Rose",
    Actors: "Henry Fonda, Lee J. Cobb, Martin Balsam",
    Plot: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 3 Oscars. 17 wins & 13 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.0/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "100%",
      },
      {
        Source: "Metacritic",
        Value: "96/100",
      },
    ],
    Metascore: "96",
    imdbRating: "9.0",
    imdbVotes: "745,346",
    imdbID: "tt0050083",
    Type: "movie",
    DVD: "04 Mar 2008",
    BoxOffice: "N/A",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Schindler's List",
    Year: "1993",
    Rated: "R",
    Released: "04 Feb 1994",
    Runtime: "195 min",
    Genre: "Biography, Drama, History",
    Director: "Steven Spielberg",
    Writer: "Thomas Keneally, Steven Zaillian",
    Actors: "Liam Neeson, Ralph Fiennes, Ben Kingsley",
    Plot: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    Language: "English, Hebrew, German, Polish, Latin",
    Country: "United States",
    Awards: "Won 7 Oscars. 91 wins & 49 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.9/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "98%",
      },
      {
        Source: "Metacritic",
        Value: "94/100",
      },
    ],
    Metascore: "94",
    imdbRating: "8.9",
    imdbVotes: "1,292,883",
    imdbID: "tt0108052",
    Type: "movie",
    DVD: "12 Feb 2008",
    BoxOffice: "$96,898,818",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Lord of the Rings: The Return of the King",
    Year: "2003",
    Rated: "PG-13",
    Released: "17 Dec 2003",
    Runtime: "201 min",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    Writer: "J.R.R. Tolkien, Fran Walsh, Philippa Boyens",
    Actors: "Elijah Wood, Viggo Mortensen, Ian McKellen",
    Plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Language: "English, Quenya, Old English, Sindarin",
    Country: "New Zealand, United States",
    Awards: "Won 11 Oscars. 209 wins & 124 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.9/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "93%",
      },
      {
        Source: "Metacritic",
        Value: "94/100",
      },
    ],
    Metascore: "94",
    imdbRating: "8.9",
    imdbVotes: "1,746,241",
    imdbID: "tt0167260",
    Type: "movie",
    DVD: "25 May 2004",
    BoxOffice: "$377,845,905",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "Pulp Fiction",
    Year: "1994",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "154 min",
    Genre: "Crime, Drama",
    Director: "Quentin Tarantino",
    Writer: "Quentin Tarantino, Roger Avary",
    Actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
    Plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    Language: "English, Spanish, French",
    Country: "United States",
    Awards: "Won 1 Oscar. 70 wins & 75 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.9/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "92%",
      },
      {
        Source: "Metacritic",
        Value: "94/100",
      },
    ],
    Metascore: "94",
    imdbRating: "8.9",
    imdbVotes: "1,949,605",
    imdbID: "tt0110912",
    Type: "movie",
    DVD: "20 Aug 2002",
    BoxOffice: "$107,928,762",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Good, the Bad and the Ugly",
    Year: "1966",
    Rated: "R",
    Released: "29 Dec 1967",
    Runtime: "178 min",
    Genre: "Adventure, Western",
    Director: "Sergio Leone",
    Writer: "Luciano Vincenzoni, Sergio Leone, Agenore Incrocci",
    Actors: "Clint Eastwood, Eli Wallach, Lee Van Cleef",
    Plot: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    Language: "Italian",
    Country: "Italy, Spain, West Germany",
    Awards: "3 wins & 6 nominations",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.8/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "97%",
      },
      {
        Source: "Metacritic",
        Value: "90/100",
      },
    ],
    Metascore: "90",
    imdbRating: "8.8",
    imdbVotes: "731,473",
    imdbID: "tt0060196",
    Type: "movie",
    DVD: "07 Nov 2006",
    BoxOffice: "$25,100,000",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Year: "2001",
    Rated: "PG-13",
    Released: "19 Dec 2001",
    Runtime: "178 min",
    Genre: "Action, Adventure, Drama",
    Director: "Peter Jackson",
    Writer: "J.R.R. Tolkien, Fran Walsh, Philippa Boyens",
    Actors: "Elijah Wood, Ian McKellen, Orlando Bloom",
    Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    Language: "English, Sindarin",
    Country: "New Zealand, United States",
    Awards: "Won 4 Oscars. 121 wins & 126 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.8/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "92%",
      },
      {
        Source: "Metacritic",
        Value: "92/100",
      },
    ],
    Metascore: "92",
    imdbRating: "8.8",
    imdbVotes: "1,767,565",
    imdbID: "tt0120737",
    Type: "movie",
    DVD: "06 Aug 2002",
    BoxOffice: "$315,710,750",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  },
];

const TopMovies = () => {
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

  return (
    <div className={styles.List}>
      <h1>Top 10 Rated Movies</h1>
      {topRatedMovies.map((movie) => {
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
          <img src={detailedMovie["Poster"]} alt={detailedMovie["Title"]} />
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

export default TopMovies;
