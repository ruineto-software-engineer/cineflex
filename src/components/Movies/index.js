import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Topbar from "../Topbar";
import Movie from "./Movie";

export default function Movies() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");

    promisse.then((response) => {
      setMovies(response.data);
    });
  }, []);

  if(movies === undefined){
    return(
      <Fragment>
        <div className="loading-screen">
          <img className="loading-screen-gif" alt="loading.gif" src="./assets/gif/loading.gif"/>
        </div>
      </Fragment>
    );
  }

  const moviesReader = movies.map((movie) => {
    return (
      <Link key={movie.id} to={`/movie-section/${movie.id}`}>
        <Movie id={movie.id} posterURL={movie.posterURL} />
      </Link>
    );
  });

  return(
    <Fragment>
      <main className="main-container">
        <Topbar />

        <div className="main-title-container">
          <h2 className="main-title">Selecione o filme</h2>
        </div>

        <div className="movies-container">
          <div className="movies-content">
            { moviesReader }
          </div>
        </div>
      </main>
    </Fragment>
  );
}