export default function Movie(props) {
  return(
    <div id={props.id} className="movie">
      <div className="movie-img-container">
        <img className="movie-img" alt="filme.png" src={props.posterURL}/>
      </div>
    </div>
  );
}