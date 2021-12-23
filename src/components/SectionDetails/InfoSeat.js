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

  function handleDelete() {
    if(window.confirm("Você realmente deseja deletar esta reserva?")){
      props.idSeatSetStage(props.seatNumber);
      props.seatStage(
        {
          ids: props.seatValue.ids.filter((idSeatCurrent) => { return idSeatCurrent !== props.seatNumber }),
          compradores: props.seatValue.compradores.filter((comprador) => { return comprador.idAssento !== props.seatNumber })
        }
      );
    }else{
      return;
    }
  }

  function handleEdit() {
    if(window.confirm("Você realmente deseja editar esta reserva?")){
      setInputCondition("");
      setEditButtonCondition("disabled-button");
      setConfirmButtonCondition("");
      for (let i = 0; i < props.seatValue.compradores.length; i++) {
        const element = props.seatValue.compradores[i].idAssento;
        if(props.seatNumber === element){
          setIndexBuyer(i);
        }
      }
  
      setEdited(true);
      setInputInfo({ idAssento: props.seatNumber, nome: name, cpf: cpf });
    }else{
      return;
    }
  }

  function handleConfirm() {
    if(inputInfo.idAssento === '' || inputInfo.nome === '' || inputInfo.cpf === ''){
      alert("Você não pode confirmar uma reserva sem antes preencher os dados.");
      return;
    }

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
          cpfStage={handleCPF} confirmAction={handleConfirm} editAction={handleEdit} deleteAction={handleDelete}
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
          <button onClick={props.confirmAction} type="button" className={`form-button-confirm ${props.confirmButtonSituation}`}>
            Confirmar <ion-icon name="checkmark-circle"></ion-icon>
          </button>
          <button onClick={props.editAction} type="button" className={`form-button-edit ${props.editButtonSituation}`}>
            Editar <ion-icon name="create-outline"></ion-icon>
          </button>   
          <button onClick={props.deleteAction} type="button" className="form-button-delete">
            Deletar <ion-icon name="close-circle"></ion-icon>
          </button>  
        </div>
    </Fragment>
  );
}