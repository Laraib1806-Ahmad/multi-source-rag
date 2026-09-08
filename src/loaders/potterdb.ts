// import { Document } from "@langchain/core/documents";

// export async function loadPotterCharacters(): Promise<Document[]> {
//   const res = await fetch("https://api.potterdb.com/v1/characters?page[size]=100");
//   const json = await res.json();

//   const documents = json.data.map((character: any) => {
//     const attrs = character.attributes;
//     const parts: string[] = [];
    

//     parts.push(`${attrs.name} is a character from the Harry Potter universe.`);
//     if (attrs.house) parts.push(`They belong to house ${attrs.house}.`);
//     if (attrs.species) parts.push(`They are ${attrs.species}.`);
//     if (attrs.born) parts.push(`Dates are: ${attrs.born}.`);
//     if (attrs.blood_status) parts.push(`They are ${attrs.blood_status}.`);
//     if (attrs.died) parts.push(`They are ${attrs.died}.`);
//     if (attrs.nationality) parts.push(`They are ${attrs.nationality}.`);
//     if (attrs.jobs && attrs.jobs.length > 0) parts.push(`They work as ${attrs.jobs.join(", ")}.`);

//     return new Document({
//       pageContent: parts.join(" "),
// metadata: { source: "potterdb", type: "character", id: character.id, link: attrs.wiki },
//     });
//   });

//   return documents;
// }