import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Topbar from "./components/Bars/Topbar";
import Movies from "./components/Movies";
import MovieSection from "./components/MovieSection";
import SectionDetails from "./components/SectionDetails";
import SuccessScreen from "./components/SuccessScreen";
import Loaging from "./assets/gif/loading.gif";
import "./css/reset.css";
import "./css/style.css";

export default function App() {
  const [finalObject, setFinalObject] = useState({});

  function updateObject(currentObject, sectionID, object) {
    setFinalObject(object = { ...currentObject, sectionID });
  }

  return(
    <BrowserRouter>
      <Topbar />

      <Routes>
        <Route path="/" element={<Movies loading={Loaging} />} />
        <Route path="/movie-section/:idMovie" element={<MovieSection loading={Loaging} />} />
        <Route path="/section-details/:idSection" element={<SectionDetails loading={Loaging} sendSuccesObject={updateObject} />} />
        <Route path="/success-screen" element={<SuccessScreen loading={Loaging} successObject={finalObject} />} />
      </Routes>
    </BrowserRouter>
  );
}