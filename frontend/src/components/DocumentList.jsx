export default function DocumentList({ label, docs }) {
  return (
    <div>
      <h2>{label} — Documents</h2>
      <div className="doc-grid">
        {docs.map((d, i) => (
          <div className="doc-card" key={i}>{d.text.slice(0, 200)}...</div>
        ))}
      </div>
    </div>
  );
}