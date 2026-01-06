import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  // ssl: false,
});

export async function getCollection() {
  return await client.getOrCreateCollection({
    name: "techedu_knowledge",
    embeddingFunction: null, // ✅ VERY IMPORTANT
  });
}
