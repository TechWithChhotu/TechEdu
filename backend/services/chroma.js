import { ChromaClient } from "chromadb";

const client = new ChromaClient({ path: "./chroma" });

export async function getCollection() {
  return await client.getOrCreateCollection({
    name: "techedu_knowledge",
  });
}
