import { Chroma } from "@langchain/community/vectorstores/chroma";
import { loadAllDocuments } from "./loaders";
import { splitDocuments } from "./pipeline/splitter";
import { embeddings } from "./pipeline/embeddings";
import { getChromaClient } from "./pipeline/vectorstore";

async function ingest() {
  const docs = await loadAllDocuments();
  console.log("Documents:", docs.length);

  const chunks = await splitDocuments(docs);
  console.log("Chunks:", chunks.length);

  const chromaClient = getChromaClient();

  await Chroma.fromDocuments(chunks, embeddings, {
    collectionName: "multi-source-rag",
    index: chromaClient,
  });

  console.log("Ingestion complete — data stored in Chroma Cloud.");
}

ingest();