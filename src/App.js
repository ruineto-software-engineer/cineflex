import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import MovieSection from "./components/MovieSection";
import SectionDetails from "./components/SectionDetails";
import SuccessScreen from "./components/SuccessScreen";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie-section/:idMovie" element={<MovieSection />} />
        <Route path="/section-details/:idSection" element={<SectionDetails />} />
        <Route path="/success-screen" element={<SuccessScreen />} />
      </Routes>
    </BrowserRouter>
  );
}