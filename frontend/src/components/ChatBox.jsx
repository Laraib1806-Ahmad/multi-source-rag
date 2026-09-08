import { useState } from "react";

export default function ChatBox({ source, label }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    setImages([]);

    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, source }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setImages(data.images || []);
    setLoading(false);
  }

  return (
    <div className="chat-area">
      <div className="input-row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={`Ask something about ${label}...`}
        />
        <button onClick={ask} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {answer && <div className="answer">{answer}</div>}
      {images.length > 0 && (
        <div className="images">
          {images.map((url, i) => <img src={url} key={i} alt="" />)}
        </div>
      )}
    </div>
  );
}