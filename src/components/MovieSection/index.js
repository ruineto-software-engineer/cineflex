import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
            <Link key={currentMovieShowTimes.id} to={`/section-details/${currentMovieShowTimes.id}`}>
              <button className='current-movie-show-times-button'>
                { currentMovieShowTimes.name }
              </button>
            </Link>
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

        <Bottombar title={movieSection.title} posterURL={movieSection.posterURL} weekday={undefined} showtime={undefined} />
      </main>
    </Fragment>
  );
}