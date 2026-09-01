import { loadAllDocuments } from "./src/loaders";
import { splitDocuments } from "./src/pipeline/splitter";

async function main() {
  const docs = await loadAllDocuments();
  console.log("Documents:",docs.length);

  const chunks = await splitDocuments(docs);
  console.log("Chunks:", chunks.length);


  
}

main();