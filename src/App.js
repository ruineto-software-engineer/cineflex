import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import MovieSection from "./components/MovieSection";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie-section/:idMovie" element={<MovieSection />} />
      </Routes>
    </BrowserRouter>
  );
}