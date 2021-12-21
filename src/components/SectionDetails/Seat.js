import { useState } from 'react';

export default function Seat(props) {
  const [clickedSeat, setClickedSeat] = useState(props.classSeat);

  function chosenSeat(selectedSeat, valueClickedSeat) {
    if(selectedSeat === `current-seat-available`){
      if(valueClickedSeat === `current-seat-selected`){
        const objectReader = props.seatState.compradores.filter((comprador) => { return comprador.idAssento === props.id; });
        console.log(objectReader);

        if(objectReader.length === 0){
          props.handle(props.id, false);
          setClickedSeat(`current-seat-available`);
        }else{
          if(window.confirm("Você realmente deseja desmarcar este assento?")){
            console.log("Condição 1");
            props.handle(props.id, false);
            setClickedSeat(`current-seat-available`);
          }else{
            console.log("Condição 2");
            props.handle(props.id, undefined);
            setClickedSeat(`current-seat-selected`);
          }
        }
      }else{
        props.handle(props.id, true);
        setClickedSeat(`current-seat-selected`);
      }
    }else{
      alert('Esse assento não está disponível');
    }
  }

  return(
    <div onClick={() => chosenSeat(props.classSeat, clickedSeat)} className={clickedSeat}>
      { props.name }
    </div>      
  );
}