import { Fragment } from "react";

export default function InfoSeat(props) {
  function handleName(e){
    props.seatStage({
      ...props.seatValue,
      idAssento: props.seatNumber,
      nome: e.target.value
    });
  }

  function handleCPF(e){
    props.seatStage({
      ...props.seatValue,
      idAssento: props.seatNumber,
      cpf: e.target.value
    });
  }

  return(
    <Fragment>
      <div className="form-group-container">
        <p className="form-group-title">Assento {props.seatNumber}</p>
        <div className="form-group">
          <label className='form-label'>Nome do comprador:</label>
          <input onChange={handleName} type="text" className="form-control" placeholder="Digite seu nome..." />
        </div>
        <div className="form-group">
          <label className='form-label'>CPF do comprador:</label>
          <input onChange={handleCPF} type="text" className="form-control" maxLength="14" placeholder="Digite seu CPF..." />
        </div>
      </div>
    </Fragment>
  );
}