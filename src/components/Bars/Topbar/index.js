import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  function hadleNavigate() {
    navigate(-1);
  }

  return(
    <Fragment>
      {window.location.pathname !== '/' ?
        <div className="topbar-backpage">
          <div className="topbar-backpage-content">
            <h1 className="topbar-brand-backpage">CINEFLEX</h1>

            <ion-icon onClick={hadleNavigate} name="arrow-undo-circle" />
          </div>
        </div>
      :
        <div className="topbar">
          <h1 className="topbar-brand">CINEFLEX</h1>
        </div>
      }
    </Fragment>
  );
}