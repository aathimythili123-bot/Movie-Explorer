import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { USING_MOCK } from "./api/tmdb";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

// HashRouter keeps routing working on GitHub Pages without server rewrites.
export default function App() {
  return (
    <HashRouter>
      <header className="top"><Link to="/"><h1>🎬 Movie Explorer</h1></Link></header>
      {USING_MOCK && <p className="banner">Demo mode: sample data shown. Add a TMDB key in .env for real movies.</p>}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<p className="empty">Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
    </HashRouter>
  );
}
