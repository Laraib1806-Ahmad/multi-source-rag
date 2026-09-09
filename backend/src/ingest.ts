import { loadAllDocuments } from "./loaders";
import { splitDocuments } from "./pipeline/splitter";
import { embeddings } from "./pipeline/embeddings";
import { getChromaClient } from "./pipeline/vectorstore";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function embedWithRetry(texts: string[], attempt = 1): Promise<number[][]> {
  const vectors = await embeddings.embedDocuments(texts);
  const hasEmpty = vectors.some((v) => !v || v.length === 0);

  if (hasEmpty) {
    if (attempt >= 6) {
      throw new Error("Embedding failed after all retries.");
    }
    console.log(`Rate-limited, waiting 30s before retry (attempt ${attempt})...`);
    await sleep(30000);
    return embedWithRetry(texts, attempt + 1);
  }

  return vectors;
}

async function ingest() {
  const docs = await loadAllDocuments();
  console.log("Documents:", docs.length);

  const chunks = await splitDocuments(docs);
  console.log("Chunks:", chunks.length);

  const chromaClient = getChromaClient();
  const collection = await chromaClient.getOrCreateCollection({ name: "multi-source-rag" });

  const batchSize = 15;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const texts = batch.map((c) => c.pageContent);

    const vectors = await embedWithRetry(texts);

    const metadatas = batch.map((c) => {
      const { loc, ...rest } = c.metadata;
      return rest;
    });

    await collection.add({
      ids: batch.map((_, j) => `doc-${i + j}`),
      embeddings: vectors,
      documents: texts,
      metadatas,
    });

    console.log(`Ingested ${i + batch.length}/${chunks.length}`);
    await sleep(12000);
  }

  console.log("Ingestion complete — data stored in Chroma Cloud.");
}

ingest();