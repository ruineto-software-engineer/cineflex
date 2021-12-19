import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SuccessScreen(props) {
  const [movieSection, setMovieSection] = useState();

  useEffect(() => {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${props.successObject.sectionID}/seats`);
    
    promisse.then((response) => {
      setMovieSection(response.data);
    });
  },[props.successObject.sectionID]);

  if(movieSection === undefined){
    return(
      <Fragment>
        <div className="loading-screen">
          <img className="loading-screen-gif" alt="loading.gif" src={props.loading} />
        </div>
      </Fragment>
    );    
  }

  return(
    <Fragment>
      <main className="main-container">
        <div className="main-title-container">
          <h2 className="main-title-success">
            Pedido feito
            <br />
            com sucesso!
          </h2>
        </div>

        <div className="movie-section-flex">
          <div className="movie-section-content">
            <div className="movie-section">
              <p className="movie-section-title">Filme e sessão</p>
              <div className="movie-section-container-subtitle">
                <p className="movie-section-subtitle">{movieSection.movie.title}</p>
                <p className="movie-section-subtitle">{movieSection.day.date} {movieSection.name}</p>
              </div>
            </div>
              
            <div className="movie-section">
              <p className="movie-section-title">Ingressos</p>
              {props.successObject.ids.map((id) => {
                return(
                  <p className="movie-section-subtitle" key={id}>Assento {id}</p>
                );
              })}
            </div>
              
            <div className="movie-section">
              <p className="movie-section-title">Comprador</p>
              <p className="movie-section-subtitle">Nome: {props.successObject.name}</p>
              <p className="movie-section-subtitle">CPF: {props.successObject.cpf}</p>
            </div>
          </div>

          <Link to='/'>
            <button className="movie-section-button">Voltar pra Home</button>
          </Link>
        </div>
      </main>
    </Fragment>
  );
}