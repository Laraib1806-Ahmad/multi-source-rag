export const SOURCES = [
  { id: "potterdb", label: "Harry Potter" },
  { id: "cosmyday", label: "Horoscope" },
  { id: "anycrap", label: "Anycrap" },
];

export default function Sidebar({ selected, onSelect }) {
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      {SOURCES.map((s) => (
        <button
          key={s.id}
          className={selected === s.id ? "active" : ""}
          onClick={() => onSelect(s.id)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}