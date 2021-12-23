import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Bottombar from '../Bars/Bottombar';
import Seat from './Seat';
import InfoSeat from './InfoSeat';
import DefaultSeat from './DefaultSeat';

export default function SectionDetails(props) {
  const { idSection } = useParams();
  const navigate = useNavigate();
  const [sectionDetais, setSectionDetais] = useState();
  const [reserveSeats, setReserveSeats] = useState({ids: [], compradores: []});
  const [buttonOpacity, setButtonOpacity] = useState('');
  const [idSeatInfo, setIdSeatInfo] = useState(0);
  const [seatNumberName, setSeatNumberName] = useState(0);
  
  useEffect(() => {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSection}/seats`);
  
    promisse.then((response) => {
      setSectionDetais(response.data);
    });
  }, [idSection]);

  useEffect(() => {
    if(reserveSeats.ids.length === 0){
      setButtonOpacity('opacity-button');
    }else{
      setButtonOpacity('');
    }
  }, [reserveSeats.ids]);

  useEffect(() => {
    if(idSeatInfo !== 0){
      setIdSeatInfo(0);
    }
  }, [idSeatInfo]);

  if(sectionDetais === undefined){
    return(
      <Fragment>
        <div className="loading-screen">
          <img className="loading-screen-gif" alt="loading.gif" src={props.loading} />
        </div>
      </Fragment>
    );    
  }

  function handleSeat(idSeat, addArray){
    if(addArray === undefined){
      return;
    }

    if(addArray){
      setReserveSeats(
        { ids: [ ...reserveSeats.ids, idSeat ], 
          compradores: [ ...reserveSeats.compradores ]
        }
      );
    }else{
      const objectReader = reserveSeats.compradores.filter((comprador) => { return comprador.idAssento === idSeat; });

      if(objectReader.length === 1){
        setReserveSeats(
          { ids: reserveSeats.ids.filter((idSeatCurrent) => { return idSeatCurrent !== idSeat; }), 
            compradores: reserveSeats.compradores.filter((comprador) => { return comprador.idAssento !== idSeat; })
          }
        );
      }else{
        setReserveSeats(
          { ids: reserveSeats.ids.filter((idSeatCurrent) => { return idSeatCurrent !== idSeat; }), 
            compradores: reserveSeats.compradores.filter((comprador) => { return comprador.idAssento !== idSeat; })
          }
        );
      }
    }
  }

  function numberSeatValidation(currentSeat) {
    if(currentSeat < 10){
      let newCurrentSeat = "0" + currentSeat
      return newCurrentSeat;
    }else{
      return currentSeat;
    }
  }

  const sectionDetaisReader = sectionDetais.seats.map((currentSeat) => {
    return (
      <Fragment key={currentSeat.id}>
        {currentSeat.isAvailable ?
          idSeatInfo === currentSeat.id ?
            <DefaultSeat classSeat='current-seat-available' name={numberSeatValidation(currentSeat.name)}
              seatState={reserveSeats} id={currentSeat.id} handle={handleSeat}
              idSeatSetStage={setIdSeatInfo}
            />
          :
            <Seat classSeat='current-seat-available' name={numberSeatValidation(currentSeat.name)} 
              seatState={reserveSeats} id={currentSeat.id} handle={handleSeat}
              stageNumberSeat={setSeatNumberName}
            />
        :
          <Seat classSeat='current-seat-unavailable' name={numberSeatValidation(currentSeat.name)} />
        }
      </Fragment>
    );
  });

  const reserveSeatsReader = reserveSeats.ids.map((reserveSeat) => {
    return(
      <Fragment key={reserveSeat}>
        <InfoSeat seatNumber={reserveSeat} seatNumberStage={seatNumberName} 
          stageNumberSeat={setSeatNumberName} seatValue={reserveSeats} 
          seatStage={setReserveSeats} idSeatSetStage={setIdSeatInfo}
        />
      </Fragment>
    );
  });

  function sendObject() {
    if(reserveSeats.ids.length !== 0 || reserveSeats.compradores.length !== 0){
      if(window.confirm("Você confirma todas as seleções feitas?")){
        if(reserveSeats.ids.length === reserveSeats.compradores.length){
          props.sendSuccesObject(reserveSeats, idSection, '');
          const promisse = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, reserveSeats);
          promisse.then(() => navigate('/success-screen'));
          promisse.catch(() => window.location.reload(true));
        }else{
          alert(`Por gentileza, reveja os campos dos assentos selecionados, existem alguns assentos que estão vazios, ou que não foram confirmados.`);
          return;
        }
      }
    }else{
      alert("Por gentileza, selecione os assentos desejados para continuar.");
      return;
    }
  }

  return(
    <Fragment>
      <main className="main-container">
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
          { reserveSeats.ids.length === 0 ?
            <p className='form-info'>Por gentileza, selecione os assentos desejados.</p>
            :
            <Fragment>
              {reserveSeatsReader}
            </Fragment>
          }

          <button onClick={() => sendObject()} type="button" className={`form-button ${buttonOpacity}`}>Reservar assento(s)</button>
        </form>

        <Bottombar title={sectionDetais.movie.title} posterURL={sectionDetais.movie.posterURL} weekday={sectionDetais.day.weekday} showtime={sectionDetais.name} />
      </main>
    </Fragment>
  );
}