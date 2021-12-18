import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../Topbar';
import Bottombar from '../Bottombar';
import Seat from './Seat';

export default function SectionDetails() {
  const { idSection } = useParams();
  const [sectionDetais, setSectionDetais] = useState();
  const [reserveSeats, setReserveSeats] = useState({ids: []});
  const [reserveName, setReserveName] = useState('');
  const [reserveCPF, setReserveCPF] = useState('');
  
  useEffect(() => {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSection}/seats`);
  
    promisse.then((response) => {
      setSectionDetais(response.data);
    });
  }, [idSection]);

  if(sectionDetais === undefined){
    return(
      <Fragment>
        <div className="loading-screen">
          Carregando ...
          {/* <img className="loading-screen-gif" alt="loading.gif" src="./assets/img/loading.gif" /> */}
        </div>
      </Fragment>
    );    
  }

  function handleSeat(idSeat, newArrayIds, addArray){
    if(addArray){
      setReserveSeats(newArrayIds = { ids: [ ...reserveSeats.ids, idSeat ]});
    }else{
      setReserveSeats(newArrayIds = { ids: reserveSeats.ids.filter((idSeatCurrent) => {
        return idSeatCurrent !== idSeat;
      })});
    }
  }

  function handleName(e){
    setReserveName(e.target.value);
  }

  function handleCPF(e){
    setReserveCPF(e.target.value);
  }

  const sectionDetaisReader = sectionDetais.seats.map((currentSeat) => {
    return (
      <Fragment key={currentSeat.id}>
        {currentSeat.isAvailable ?
          <Seat classSeat='current-seat-available' name={currentSeat.name} id={currentSeat.id} handle={handleSeat} />
        :
          <Seat classSeat='current-seat-unavailable' name={currentSeat.name} />
        }
      </Fragment>
    );
  });

  function sendObject(finalObject) {
    setReserveSeats(finalObject = {
      ...reserveSeats,
      ['name']: reserveName,
      ['cpf']: reserveCPF
    });

    const promisse = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, reserveSeats);
    promisse.then((response) => {
      console.log(response.status);
    });
  }

  console.log(reserveSeats);

  return(
    <Fragment>
      <main className="main-container">
        <Topbar />

        <div className="main-title-container">
          <h2 className="main-title">Selecione o(s) assento(s)</h2>
        </div>

        <div className='seats-container'>
          <div className='seats-content'>
            { sectionDetaisReader }
          </div>
        </div>

        <div className='seats-subtitle-container'>
          <div className='seats-subtitle-content'>
            <div className='seat-subtitle'>
              <div className='seat-subtitle-selected'></div>
              <p className='seat-subtitle-title'>Selecionado</p>
            </div>

            <div className='seat-subtitle'>
              <div className='seat-subtitle-available'></div>
              <p className='seat-subtitle-title'>Disponível</p>
            </div>

            <div className='seat-subtitle'>
              <div className='seat-subtitle-unavailable'></div>
              <p className='seat-subtitle-title'>Indisponível</p>
            </div>
          </div>
        </div>

        <form className='form'>
          <div className="form-group">
            <label className='form-label'>Nome do comprador:</label>
            <input onChange={handleName} type="text" className="form-control" placeholder="Digite seu nome..." />
          </div>
          <div className="form-group">
            <label className='form-label'>CPF do comprador:</label>
            <input onChange={handleCPF}  type="text" className="form-control" placeholder="Digite seu CPF..." />
          </div>

          <Link to='/success-screen'>
            <button onClick={() => sendObject()} type="button" className="form-button">Reservar assento(s)</button>
          </Link>
        </form>

        <Bottombar title={sectionDetais.movie.title} posterURL={sectionDetais.movie.posterURL} weekday={sectionDetais.day.weekday} showtime={sectionDetais.name} />
      </main>
    </Fragment>
  );
}