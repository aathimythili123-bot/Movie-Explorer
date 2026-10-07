export default function CategoryFilter({ genres, selected, onSelect }) {
  const chip = (id, name) => (
    <button key={id} className={`chip ${String(selected) === String(id) ? "active" : ""}`}
      aria-pressed={String(selected) === String(id)} onClick={() => onSelect(id)}>{name}</button>
  );
  return <div className="chips" aria-label="Filter by category">{chip("", "All")}{genres.map((g) => chip(g.id, g.name))}</div>;
}
