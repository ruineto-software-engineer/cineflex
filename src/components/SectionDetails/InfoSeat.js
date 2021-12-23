import { Fragment, useState } from "react";

export default function InfoSeat(props) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [inputInfo, setInputInfo] = useState({ idAssento: '', nome: "", cpf: "" });

  function handleName(e){
    setName(e.target.value);
    setInputInfo({
      ...inputInfo,
      idAssento: props.seatNumber,
      nome: e.target.value
    });
  }

  function handleCPF(e){
    setCpf(e.target.value);
    setInputInfo({
      ...inputInfo,
      idAssento: props.seatNumber,
      cpf: e.target.value
    });
  }

  function handleSendInfoSeat() {
    setInputInfo({ idAssento: '', nome: "", cpf: "" });
    props.seatStage({
      ids: [ ...props.seatValue.ids ],
      compradores: [
        ...props.seatValue.compradores,
        inputInfo
      ]
    });
  }

  return(
    <Fragment>
      <div className="form-group-container">
        <p className="form-group-title">Assento {props.seatNumber}</p>

        <div className="form-group">
          <label className='form-label'>Nome do comprador:</label>
          <input value={name} onChange={handleName} type="text" className="form-control" placeholder="Digite seu nome..." />
        </div>

        <div className="form-group">
          <label className='form-label'>CPF do comprador:</label>
          <input value={cpf} onChange={handleCPF} type="text" className="form-control" maxLength="14" placeholder="Digite seu CPF..." />
        </div>

        <button onClick={handleSendInfoSeat} type="button" className="form-button-confirm">Confirmar reserva</button>
      </div>
    </Fragment>
  );
}