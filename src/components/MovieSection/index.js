import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../Topbar';
import Bottombar from '../Bottombar';

export default function MovieSection() {
  const { idMovie } = useParams();
  const [movieSection, setMovieSection] = useState();

  useEffect(() => {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`);
    
    promisse.then((response) => {
      setMovieSection(response.data);
    });
  }, [idMovie]);


  if(movieSection === undefined){
    return(
      <Fragment>
        <div className="loading-screen">
          Carregando ...
          {/* <img className="loading-screen-gif" alt="loading.gif" src="./assets/img/loading.gif" /> */}
        </div>
      </Fragment>
    );
  }

  const movieSectionReader = movieSection.days.map((currentMovieWeekday) => {
    return (
      <div className='current-movie' key={currentMovieWeekday.id}>
        <p className='current-movie-weekday'>
          { `${currentMovieWeekday.weekday} - ${currentMovieWeekday.date}` }
        </p>

        {currentMovieWeekday.showtimes.map((currentMovieShowTimes) => {
          return (
            <button className='current-movie-show-times-button' key={currentMovieShowTimes.id}>
              { currentMovieShowTimes.name }
            </button>
          );
        })}
      </div>
    );
  });

  return(
    <Fragment>
      <main className="main-container">
        <Topbar />

        <div className="main-title-container">
          <h2 className="main-title">Selecione o horário</h2>
        </div>

        <div className='movie-section-container'>
          { movieSectionReader }
        </div>

        <Bottombar title={movieSection.title} posterURL={movieSection.posterURL} />
      </main>
    </Fragment>
  );
}