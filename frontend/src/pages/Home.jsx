import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

const EXAMPLES = [
  "Tell me about a Hogwarts house",
  "What's today's horoscope for Leo?",
  "Tell me about a weird invented gadget",
];

const CATEGORIES = [
  { path: "/potterdb", label: "Harry Potter" },
  { path: "/cosmyday", label: "Horoscope" },
  { path: "/anycrap", label: "Anycrap" },
];

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Multi-Source RAG Assistant</h1>
        <p>Ask me anything — I pull answers from three different live data sources: Harry Potter characters, daily horoscopes, and invented gadgets.</p>
        <div className="examples">
          {EXAMPLES.map((q, i) => <span className="chip" key={i}>{q}</span>)}
        </div>
      </div>

      <ChatBox source={null} label="everything" />

      <div className="bottom-nav">
        <p>Or browse a specific topic:</p>
        <div className="nav-buttons">
          {CATEGORIES.map((c) => (
            <Link className="nav-btn" to={c.path} key={c.path}>{c.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}