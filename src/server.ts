import express from "express";
import { getRagChain } from "./pipeline/chain";
import { getVectorStore } from "./pipeline/vectorstore";

const app = express();
app.use(express.json());

let chainPromise = getRagChain();
let vectorStorePromise = getVectorStore();

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "question is required" });

  try {
    const chain = await chainPromise;
    const vectorStore = await vectorStorePromise;
    const retriever = vectorStore.asRetriever(4);

    const [answer, docs] = await Promise.all([
      chain.invoke({ question }),
      retriever.invoke(question),
    ]);

    const images = docs
      .map((d) => d.metadata.image)
      .filter((img) => img !== undefined);

    res.json({ answer, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});