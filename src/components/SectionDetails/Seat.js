import { useState } from 'react';

export default function Seat(props) {
  const [clickedSeat, setClickedSeat] = useState(props.classSeat);

  function chosenSeat(selectedSeat, valueClickedSeat) {
    if(selectedSeat === `current-seat-available`){
      if(valueClickedSeat === `current-seat-selected`){
        props.handle(props.id, '', false);
        setClickedSeat(`current-seat-available`);
      }else{
        props.handle(props.id, '', true);
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