import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
});

await client.deleteCollection({ name: "techedu_knowledge" });
console.log("✅ Old Chroma collection deleted");
process.exit();
