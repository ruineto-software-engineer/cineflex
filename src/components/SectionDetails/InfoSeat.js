import { Fragment, useState } from "react";

export default function InfoSeat(props) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [inputCondition, setInputCondition] = useState("");
  const [confirmButtonCondition, setConfirmButtonCondition] = useState("");
  const [editButtonCondition, setEditButtonCondition] = useState("disabled-button");
  const [inputInfo, setInputInfo] = useState({ idAssento: '', nome: "", cpf: "" });
  const [indexBuyer, setIndexBuyer] = useState(null);
  const [edited, setEdited] = useState(false);

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

  function handleEdit() {
    setInputCondition("");
    setConfirmButtonCondition("");
    for (let i = 0; i < props.seatValue.compradores.length; i++) {
      const element = props.seatValue.compradores[i].idAssento;
      if(props.seatNumber === element){
        setIndexBuyer(i);
      }
    }

    setEdited(true);
    setInputInfo({ idAssento: props.seatNumber, nome: name, cpf: cpf });
  }

  function handleSendInfoSeat() {
    if(window.confirm("Você realmente deseja confirmar esta reserva?")){
      if(edited === false){
        setInputCondition("disabled-input");
        setConfirmButtonCondition("disabled-button");
        setEditButtonCondition("");
  
        setInputInfo({ idAssento: '', nome: "", cpf: "" });
        props.seatStage({
          ids: [ ...props.seatValue.ids ],
          compradores: [
            ...props.seatValue.compradores,
            inputInfo
          ]
        });
      }else{
        setInputCondition("disabled-input");
        setConfirmButtonCondition("disabled-button");
        setEditButtonCondition("");

        props.seatStage({
          ids: [ ...props.seatValue.ids ],
          compradores: props.seatValue.compradores.map((comprador, index) => {
            if(comprador.idAssento === props.seatNumber){
              return props.seatValue.compradores[indexBuyer] = inputInfo;
            }else{
              return props.seatValue.compradores[index];
            }
          })
        });
      }
    }
  }

  return(
    <Fragment>
      <div className="form-group-container">
        <p className="form-group-title">Assento {props.seatNumber}</p>

        <FromGroup inputSituation={inputCondition} confirmButtonSituation={confirmButtonCondition}
          editButtonSituation={editButtonCondition} nameValue={name} nameStage={handleName} cpfValue={cpf} 
          cpfStage={handleCPF} buttonStage={handleSendInfoSeat} editAction={handleEdit}
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

        <div className="form-group-buttons-container">
          <button onClick={props.buttonStage} type="button" className={`form-button-confirm ${props.confirmButtonSituation}`}>
            Confirmar <ion-icon name="checkmark-circle"></ion-icon>
          </button>
          <button onClick={props.editAction} type="button" className={`form-button-edit ${props.editButtonSituation}`}>
            Editar <ion-icon name="create-outline"></ion-icon>
          </button>   
        </div>
    </Fragment>
  );
}