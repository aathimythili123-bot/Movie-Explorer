import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { fetchGenres, fetchMovies } from "../api/tmdb";
import { useAsync } from "../hooks/useAsync";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  // Search and genre live in the URL, so results survive refresh/back and can be shared.
  const [params, setParams] = useSearchParams();
  const genre = params.get("genre") ?? "";
  const [text, setText] = useState(params.get("q") ?? "");
  const query = useDebounce(text.trim());
  const [retry, setRetry] = useState(0);

  const genres = useAsync(fetchGenres, []);
  const movies = useAsync(() => fetchMovies({ query, genre }), [query, genre, retry]);

  const update = (next) => setParams((p) => {
    const n = new URLSearchParams(p);
    Object.entries(next).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)));
    return n;
  }, { replace: true });

  return (
    <>
      <SearchBar value={text} onChange={(v) => { setText(v); update({ q: v.trim() }); }} />
      <CategoryFilter genres={genres.data ?? []} selected={genre} onSelect={(id) => update({ genre: id })} />
      <h2>{query ? `Results for "${query}"` : genre ? "Category picks" : "Popular right now"}</h2>
      {movies.loading && <Loader />}
      {movies.error && <ErrorMessage message={movies.error} onRetry={() => setRetry((r) => r + 1)} />}
      {!movies.loading && !movies.error && <MovieGrid movies={movies.data.results} />}
    </>
  );
}
