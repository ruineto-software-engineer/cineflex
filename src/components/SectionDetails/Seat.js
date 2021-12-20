import { useState } from 'react';

export default function Seat(props) {
  const [clickedSeat, setClickedSeat] = useState(props.classSeat);

  function chosenSeat(selectedSeat, valueClickedSeat, valueConfirm) {
    console.log(props.confirmStage, valueClickedSeat, selectedSeat);

    if(selectedSeat === `current-seat-available`){
      if(valueClickedSeat === `current-seat-selected`){
        const objectReader = props.seatState.compradores.filter((comprador) => { return comprador.idAssento === props.id; });
        console.log(objectReader);

        props.handle(props.id, false);
        if(objectReader.length === 0){
          setClickedSeat(`current-seat-available`);
        }else{
          if(valueConfirm === true){
            console.log("Condição 1 props.confirmStage === true && objectReader.length === 1");
            setClickedSeat(`current-seat-available`);
          }else{
            console.log("Condição 1 props.confirmStage === true && objectReader.length === 1");
            setClickedSeat(`current-seat-selected`);
          }
        }
      }else{
        props.handle(props.id, true);
        props.setCofirmStage(false);
        setClickedSeat(`current-seat-selected`);
      }
    }else{
      alert('Esse assento não está disponível');
    }
  }

  return(
    <div onClick={() => chosenSeat(props.classSeat, clickedSeat, props.confirmStage)} className={/* clickedSeat */
           
      props.confirmStage ?
        `current-seat-available`
      :
        clickedSeat 
      
    }>
      { props.name }
    </div>      
  );
}