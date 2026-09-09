import { Document } from "@langchain/core/documents";
import { env } from "../config/env";

export async function loadAnycrapItems(): Promise<Document[]> {
  const res = await fetch("https://anycrap.shop/api/v1/products?per_page=60", {
    headers: {
      Authorization: `Bearer ${env.anycrapApiKey}`,
    },
  });
  const json = await res.json();

  const documents = json.data.map((product: any) => {
    const pageContent = `${product.name}. ${product.description}`;

    return new Document({
      pageContent,
      metadata: {
        source: "anycrap",
        type: "product",
        id: product.id,
        image: product.image,
        categories: product.categories,
      },
    });
  });

  return documents;
}