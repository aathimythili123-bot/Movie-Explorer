export default function SearchBar({ value, onChange }) {
  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="q" className="sr">Search movies</label>
      <input id="q" type="search" value={value} placeholder="Search movies by title…" onChange={(e) => onChange(e.target.value)} />
    </form>
  );
}
