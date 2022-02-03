import React from "react";

export interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Rated: string;
  Year: string;
  Plot: string;
}

export interface IMovieTile {
  props: Movie;
  wishlisthandler: React.MouseEventHandler<HTMLAnchorElement>;
  buttonname: string;
  detailedhandler: React.MouseEventHandler<HTMLAnchorElement>;
}
