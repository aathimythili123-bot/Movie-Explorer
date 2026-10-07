import { Link, useParams } from "react-router-dom";
import { fetchMovie, posterUrl } from "../api/tmdb";
import { useAsync } from "../hooks/useAsync";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function MovieDetails() {
  const { id } = useParams();
  const { data: m, loading, error } = useAsync(() => fetchMovie(id), [id]);

  if (loading) return <Loader label="Loading movie…" />;
  if (error) return <><ErrorMessage message={error} /><Link to="/">← All movies</Link></>;

  const src = posterUrl(m.poster_path, "w500");
  const cast = m.credits?.cast?.slice(0, 6).map((c) => c.name).join(", ");
  return (
    <article className="details">
      <Link to="/">← All movies</Link>
      <div className="details-body">
        {src ? <img src={src} alt={`${m.title} poster`} /> : <div className="noposter big" aria-hidden="true">🎬</div>}
        <div>
          <h2>{m.title}</h2>
          <p><Rating value={m.vote_average} count={m.vote_count} /></p>
          <p>{[m.release_date?.slice(0, 4), m.runtime && `${m.runtime} min`].filter(Boolean).join(" · ")}</p>
          <p className="tags">{m.genres?.map((g) => <span key={g.id} className="chip">{g.name}</span>)}</p>
          <p>{m.overview || "No overview available."}</p>
          {cast && <p><strong>Cast:</strong> {cast}</p>}
        </div>
      </div>
    </article>
  );
}
