import "dotenv/config";

export const env = {
  anycrapApiKey: process.env.ANYCRAP_API_KEY,
  openaiApiKey: process.env.OPEN_AI_API_KEY,
  chromaTenant: process.env.CHROMA_TENANT,
  chromaDatabase: process.env.CHROMA_DATABASE,
  chromaApiKey: process.env.CHROMA_API_KEY,
  groqApiKey : process.env.GROQ_API_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,

  
};

console.log("DEBUG:", {
  tenant: env.chromaTenant,
  database: env.chromaDatabase,
  apiKeyLength: env.chromaApiKey?.length,
  apiKeyStart: env.chromaApiKey?.slice(0, 8),
});