import { CloudClient } from "chromadb";
import { env } from "../config/env";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "./embeddings";
export function getChromaClient() {
  return new CloudClient({
    apiKey: env.chromaApiKey,
    tenant: env.chromaTenant,
    database: env.chromaDatabase,
  });
}

export async function getVectorStore() {
  const chromaClient = getChromaClient();
  return Chroma.fromExistingCollection(embeddings, {
    collectionName: "multi-source-rag",
    index: chromaClient,
  });
}