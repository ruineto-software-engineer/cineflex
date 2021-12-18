import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Movies from "./components/Movies";
import MovieSection from "./components/MovieSection";
import SectionDetails from "./components/SectionDetails";
import SuccessScreen from "./components/SuccessScreen";

export default function App() {
  const [finalObject, setFinalObject] = useState({});

  function updateObject(currentObject, sectionID, object) {
    setFinalObject(object = { ...currentObject, sectionID });
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie-section/:idMovie" element={<MovieSection />} />
        <Route path="/section-details/:idSection" element={<SectionDetails sendSuccesObject={updateObject} />} />
        <Route path="/success-screen" element={<SuccessScreen successObject={finalObject} />} />
      </Routes>
    </BrowserRouter>
  );
}