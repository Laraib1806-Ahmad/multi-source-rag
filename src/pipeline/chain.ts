import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { getVectorStore } from "./vectorstore";
import { env } from "../config/env";
import { ChatGroq } from "@langchain/groq";

const prompt = ChatPromptTemplate.fromTemplate(`
Answer the question using ONLY the context below. If the context doesn't contain the answer, say "I don't have information about this in the data."

Context:
{context}

Question: {question}

Answer:`);

const model = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0,
  apiKey: env.groqApiKey,
});

export async function getRagChain() {
  const vectorStore = await getVectorStore();
  const retriever = vectorStore.asRetriever(4);

  return RunnableSequence.from([
    {
      context: async (input: { question: string }) => {
  const docs = await retriever.invoke(input.question);
  console.log("Retrieved docs count:", docs.length);

  const context = docs.map((d) => d.pageContent).join("\n\n");
  console.log("Context being sent to prompt:\n", context);

  return context;
},
      question: (input: { question: string }) => input.question,
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);
}