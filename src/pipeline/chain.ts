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


export async function getRagChain(source?: string) {
  const vectorStore = await getVectorStore();
  const retriever = source
    ? vectorStore.asRetriever({ k: 4, filter: { source } })
    : vectorStore.asRetriever({ k: 4 });

  return RunnableSequence.from([
    {
      context: async (input: { question: string }) => {
        const docs = await retriever.invoke(input.question);
        return docs.map((d) => d.pageContent).join("\n\n");
      },
      question: (input: { question: string }) => input.question,
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);
}