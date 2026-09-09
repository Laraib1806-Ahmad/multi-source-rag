import { loadAllDocuments } from "./src/loaders";
import { getRagChain } from "./src/pipeline/chain";
import { splitDocuments } from "./src/pipeline/splitter";

async function main() {
  // const docs = await loadAllDocuments();
  // console.log("Documents:",docs.length);

  // const chunks = await splitDocuments(docs);
  // console.log("Chunks:", chunks.length);

const chain = await getRagChain();
  const answer = await chain.invoke({ question: "tell me about a weird gadget" });
  console.log(answer);
  
}

main();

// import { getRagChain } from "./src/pipeline/chain";

// async function main() {
//   const chain = await getRagChain();
//   const answer = await chain.invoke({ question: "What horoscope events are happening for Leo" });
//   console.log("ANSWER:", answer);
// }

// main();