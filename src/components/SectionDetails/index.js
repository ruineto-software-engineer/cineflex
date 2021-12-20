import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Bottombar from '../Bars/Bottombar';
import Seat from './Seat';
import InfoSeat from './InfoSeat';

export default function SectionDetails(props) {
  const { idSection } = useParams();
  const [sectionDetais, setSectionDetais] = useState();
  const [reserveSeats, setReserveSeats] = useState({ids: [], compradores: []});
  const [inputInfo, setInputInfo] = useState({ idAssento: '', nome: "", cpf: "" });
  const [confirm, setConfirm] = useState(false);
  
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
          <img className="loading-screen-gif" alt="loading.gif" src={props.loading} />
        </div>
      </Fragment>
    );    
  }

  function handleSeat(idSeat, addArray){
    if(addArray){
      setReserveSeats(
        { ids: [ ...reserveSeats.ids, idSeat ], 
          compradores: [ ...reserveSeats.compradores ]
        }
      );
    }else{
      const objectReader = reserveSeats.compradores.filter((comprador) => { return comprador.idAssento === idSeat; });
      console.log(objectReader);

      if(objectReader.length === 1){
        if(window.confirm("Você realmente deseja desmarcar este assento?")){
          setConfirm(true);
          setReserveSeats(
            { ids: reserveSeats.ids.filter((idSeatCurrent) => { return idSeatCurrent !== idSeat; }), 
              compradores: reserveSeats.compradores.filter((comprador) => { return comprador.idAssento !== idSeat; })
            }
          );
        }else{
          setConfirm(false);
        }
      }else{
        setReserveSeats(
          { ids: reserveSeats.ids.filter((idSeatCurrent) => { return idSeatCurrent !== idSeat; }), 
            compradores: reserveSeats.compradores.filter((comprador) => { return comprador.idAssento !== idSeat; })
          }
        );
      }
    }
  }

  const sectionDetaisReader = sectionDetais.seats.map((currentSeat) => {
    return (
      <Fragment key={currentSeat.id}>
        {currentSeat.isAvailable ?
          <Seat classSeat='current-seat-available' name={currentSeat.name} confirmStage={confirm} 
                setCofirmStage={setConfirm} seatState={reserveSeats} id={currentSeat.id} handle={handleSeat} />
        :
          <Seat classSeat='current-seat-unavailable' name={currentSeat.name} />
        }
      </Fragment>
    );
  });
  
  if(inputInfo.idAssento !== '' && inputInfo.nome !== '' && inputInfo.cpf.length === 14){
    setInputInfo({ idAssento: '', nome: "", cpf: "" });
    setReserveSeats({
      ids: [ ...reserveSeats.ids ],
      compradores: [
        ...reserveSeats.compradores,
        inputInfo
      ]
    });
  }

  const reserveSeatsReader = reserveSeats.ids.map((reserveSeat) => {
    return(
      <Fragment key={reserveSeat}>
        <InfoSeat seatNumber={reserveSeat} seatValue={inputInfo} seatStage={setInputInfo} />
      </Fragment>
    );
  });

  function sendObject() {
    props.sendSuccesObject(reserveSeats, idSection, '');
    axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, reserveSeats);
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

          {/*           
            <div className="form-group-container">
              <div className="form-group">
                <label className='form-label'>Nome do comprador:</label>
                <input onChange={handleName} type="text" className="form-control" placeholder="Digite seu nome..." />
              </div>
              <div className="form-group">
                <label className='form-label'>CPF do comprador:</label>
                <input onChange={handleCPF} type="text" className="form-control" placeholder="Digite seu CPF..." />
              </div>
            </div>
          */}

          { reserveSeats.ids.length === 0 ?
            <p className='form-info'>Por gentileza, selecione os assentos desejados.</p>
            :
            <Fragment>
              {reserveSeatsReader}

              <Link to='/success-screen'>
                <button onClick={() => sendObject()} type="button" className="form-button">Reservar assento(s)</button>
              </Link>
            </Fragment>
          }

        </form>

        <Bottombar title={sectionDetais.movie.title} posterURL={sectionDetais.movie.posterURL} weekday={sectionDetais.day.weekday} showtime={sectionDetais.name} />
      </main>
    </Fragment>
  );
}