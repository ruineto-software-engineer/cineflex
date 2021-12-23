import { Fragment, useState } from "react";

export default function InfoSeat(props) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [inputCondition, setInputCondition] = useState("");
  const [buttonCondition, setButtonCondition] = useState("");
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
    if(window.confirm("Você realmente deseja confirmar esta reserva?")){
      setInputCondition("disabled-input");
      setButtonCondition("disabled-button");

      setInputInfo({ idAssento: '', nome: "", cpf: "" });
      props.seatStage({
        ids: [ ...props.seatValue.ids ],
        compradores: [
          ...props.seatValue.compradores,
          inputInfo
        ]
      });
    }
  }

  return(
    <Fragment>
      <div className="form-group-container">
        <p className="form-group-title">Assento {props.seatNumber}</p>

        <FromGroup inputSituation={inputCondition} buttonSituation={buttonCondition} nameValue={name} 
                   nameStage={handleName} cpfValue={cpf} cpfStage={handleCPF} buttonStage={handleSendInfoSeat}
        />
      </div>
    </Fragment>
  );
}

function FromGroup(props) {
  return(
    <Fragment>
        <div className="form-group">
          <label className='form-label'>Nome do comprador:</label>
          <input value={props.nameValue} onChange={props.nameStage} type="text" className={`form-control ${props.inputSituation}`} placeholder="Digite seu nome..." />
        </div>

        <div className="form-group">
          <label className='form-label'>CPF do comprador:</label>
          <input value={props.cpfValue} onChange={props.cpfStage} type="text" className={`form-control ${props.inputSituation}`} maxLength="14" placeholder="Digite seu CPF..." />
        </div>

        <button onClick={props.buttonStage} type="button" className={`form-button-confirm ${props.buttonSituation}`}>Confirmar reserva</button>     
    </Fragment>
  );
}