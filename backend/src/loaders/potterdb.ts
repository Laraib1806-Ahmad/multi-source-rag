import { Document } from "@langchain/core/documents";

export async function loadPotterCharacters(): Promise<Document[]> {
  const res = await fetch("https://hp-api.onrender.com/api/characters");
const characters = (await res.json()).slice(0, 120);
  const documents = characters.map((c: any) => {
    const parts: string[] = [];

    parts.push(`${c.name} is a character from the Harry Potter universe.`);
    if (c.house) parts.push(`They belong to house ${c.house}.`);
    if (c.species) parts.push(`They are ${c.species}.`);
    if (c.ancestry) parts.push(`They are ${c.ancestry}.`);
    if (c.patronus) parts.push(`Their patronus is a ${c.patronus}.`);
    if (c.hogwartsStudent) parts.push(`They were a Hogwarts student.`);
    if (c.hogwartsStaff) parts.push(`They were Hogwarts staff.`);
    if (c.actor) parts.push(`They were played by ${c.actor} in the films.`);
    parts.push(c.alive ? "They are alive." : "They are deceased.");

    return new Document({
      pageContent: parts.join(" "),
      metadata: {
        source: "potterdb",
        type: "character",
        id: c.id,
        image: c.image || undefined,
        link: "https://hp-api.onrender.com",
      },
    });
  });

  return documents;
}