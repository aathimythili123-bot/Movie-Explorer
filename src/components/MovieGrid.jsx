import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  if (!movies.length) return <p className="empty">No movies match your search. Try a different title or category.</p>;
  return <ul className="grid">{movies.map((m) => <MovieCard key={m.id} movie={m} />)}</ul>;
}
