import { Document } from "@langchain/core/documents";

export async function loadPotterCharacters(): Promise<Document[]> {
  const allCharacters: any[] = [];
  let page = 1;
  const pageSize = 100;
async function fetchWithRetry(url: string): Promise<any> {
  const res = await fetch(url);
  const json = await res.json();

  if (json.errors && json.errors[0]?.status === 429) {
    console.log("Rate limited — waiting 10s before retry...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return fetchWithRetry(url); // same page dobara try
  }

  return json;
}
 while (true) {
    const json = await fetchWithRetry(
      `https://api.potterdb.com/v1/characters?page[size]=${pageSize}&page[number]=${page}`
    );

    if (!json.data) {
      console.error(`Page ${page} failed permanently:`, json);
      break;
    }

    allCharacters.push(...json.data);

    if (page >= json.meta.pagination.last) break;
    page++;

    await new Promise((resolve) => setTimeout(resolve, 4200));
}

  const documents = allCharacters.map((character: any) => {
    const attrs = character.attributes;
    const parts: string[] = [];

    parts.push(`${attrs.name} is a character from the Harry Potter universe.`);
    if (attrs.house) parts.push(`They belong to house ${attrs.house}.`);
    if (attrs.species) parts.push(`They are ${attrs.species}.`);
    if (attrs.born) parts.push(`Dates are: ${attrs.born}.`);
    if (attrs.blood_status) parts.push(`They are ${attrs.blood_status}.`);
    if (attrs.died) parts.push(`They are ${attrs.died}.`);
    if (attrs.nationality) parts.push(`They are ${attrs.nationality}.`);
    if (attrs.jobs && attrs.jobs.length > 0) parts.push(`They work as ${attrs.jobs.join(", ")}.`);

    return new Document({
      pageContent: parts.join(" "),
      metadata: { source: "potterdb", type: "character", id: character.id },
    });
  });

  return documents;
}