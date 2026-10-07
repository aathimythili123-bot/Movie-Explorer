import { Link } from "react-router-dom";
import { posterUrl } from "../api/tmdb";
import Rating from "./Rating";

export default function MovieCard({ movie }) {
  const src = posterUrl(movie.poster_path);
  return (
    <li>
      <Link to={`/movie/${movie.id}`} className="card">
        {src ? <img src={src} alt={`${movie.title} poster`} loading="lazy" /> : <div className="noposter" aria-hidden="true">🎬</div>}
        <div className="card-body">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.slice(0, 4) || "Unknown year"}</p>
          <Rating value={movie.vote_average} />
        </div>
      </Link>
    </li>
  );
}
