import express from "express";
import { getRagChain } from "./pipeline/chain";
import { getVectorStore, getDocumentsBySource } from "./pipeline/vectorstore";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/documents", async (req, res) => {
  const source = req.query.source as string;
  if (!source) return res.status(400).json({ error: "source is required" });

  try {
    const docs = await getDocumentsBySource(source);
    res.json({ docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/ask", async (req, res) => {
  const { question, source } = req.body;
  if (!question) return res.status(400).json({ error: "question is required" });

  try {
    const chain = await getRagChain(source);
    const vectorStore = await getVectorStore();
    const retriever = source
      ? vectorStore.asRetriever({ k: 4, filter: { source } })
      : vectorStore.asRetriever({ k: 4 });

    const [answer, docs] = await Promise.all([
      chain.invoke({ question }),
      retriever.invoke(question),
    ]);

    const images = [...new Set(docs.map((d) => d.metadata.image).filter((img) => img))];
    res.json({ answer, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));