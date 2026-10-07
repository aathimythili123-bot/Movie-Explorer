import { MOCK_GENRES, MOCK_MOVIES } from "./mock.js";

const KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
export const USING_MOCK = !KEY;
export const posterUrl = (path, size = "w342") => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null);

async function get(path, params = {}) {
  const url = `${BASE}${path}?${new URLSearchParams({ api_key: KEY, ...params })}`;
  let res;
  try { res = await fetch(url); } catch { throw new Error("Network problem. Check your connection and try again."); }
  if (res.status === 401) throw new Error("Invalid TMDB API key. Check your .env file.");
  if (res.status === 404) throw new Error("That movie could not be found.");
  if (!res.ok) throw new Error(`Movie service error (${res.status}).`);
  return res.json();
}

const delay = (v) => new Promise((r) => setTimeout(() => r(v), 400));

export async function fetchGenres() {
  if (USING_MOCK) return delay(MOCK_GENRES);
  return (await get("/genre/movie/list")).genres;
}

export async function fetchMovies({ query = "", genre = "", page = 1 }) {
  if (USING_MOCK) {
    const q = query.toLowerCase();
    const results = MOCK_MOVIES.filter((m) => m.title.toLowerCase().includes(q) && (!genre || m.genre_ids.includes(+genre)));
    return delay({ results, total_pages: 1 });
  }
  if (query) return get("/search/movie", { query, page });
  return genre ? get("/discover/movie", { with_genres: genre, page, sort_by: "popularity.desc" })
               : get("/movie/popular", { page });
}

export async function fetchMovie(id) {
  if (USING_MOCK) {
    const m = MOCK_MOVIES.find((x) => x.id === +id);
    if (!m) throw new Error("That movie could not be found.");
    return delay({ ...m, credits: { cast: [{ id: 1, name: "Sample Actor" }, { id: 2, name: "Sample Actress" }] } });
  }
  return get(`/movie/${id}`, { append_to_response: "credits" });
}
