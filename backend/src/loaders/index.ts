import type { Document } from "@langchain/core/documents";
import { loadPotterCharacters } from "./potterdb";
import { loadCosmyDayHoroscopes } from "./cosmyday";  
import { loadAnycrapItems } from "./anycrap";          

export async function loadAllDocuments(): Promise<Document[]> {
  const potterDocs = await loadPotterCharacters();
 
  const cosmyDocs = await loadCosmyDayHoroscopes();
  const anycrapDocs = await loadAnycrapItems();

  return [...potterDocs, ...cosmyDocs , ...anycrapDocs];
}