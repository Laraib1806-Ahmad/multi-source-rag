import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

const ALL = [
  { path: "/potterdb", label: "Harry Potter" },
  { path: "/cosmyday", label: "Horoscope" },
  { path: "/anycrap", label: "Anycrap" },
];

export default function CategoryPage({ source, label }) {
  const [docs, setDocs] = useState([]);
  const others = ALL.filter((c) => c.label !== label);

  useEffect(() => {
   fetch(`${import.meta.env.VITE_API_URL}/documents?source=` + source)

  return (
    <div className="page">
      <Link to="/" className="back-link">← Home</Link>
      <h1>{label}</h1>

      <div className="doc-grid">
        {docs.map((d, i) => (
          <div className="doc-card" key={i}>
            <p>{d.text.slice(0, 200)}...</p>
            {d.metadata.link ? (
              <a href={d.metadata.link} target="_blank" rel="noreferrer" className="citation">View source →</a>
            ) : (
              <span className="citation muted">Source: {label}</span>
            )}
          </div>
        ))}
      </div>

      <ChatBox source={source} label={label} />

      <div className="bottom-nav">
        <p>Explore other topics:</p>
        <div className="nav-buttons">
          {others.map((c) => (
            <Link className="nav-btn" to={c.path} key={c.path}>{c.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}