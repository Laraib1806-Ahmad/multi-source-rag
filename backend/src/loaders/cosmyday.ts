import { Document } from "@langchain/core/documents";

export async function loadCosmyDayHoroscopes(): Promise<Document[]> {
  const res = await fetch("https://api.cosmyday.com/content/daily");
  const json = await res.json();

  const signs = Object.keys(json.horoscopes);

  const documents = signs.map((sign) => {
    const horoscope = json.horoscopes[sign];

    const pageContent = `${horoscope.content}\n\n${horoscope.closing}`;

    return new Document({
      pageContent,
      metadata: {
        source: "cosmyday",
        type: "horoscope",
        sign: horoscope.sign,
        date: json.date,
        relevance_score: horoscope.relevance_score,
      },
    });
  });

  return documents;
}