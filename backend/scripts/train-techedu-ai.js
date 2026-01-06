// import { createEmbedding } from "../services/embed.js";
// import { getCollection } from "../services/chroma.js";
// import { techeduKnowledge } from "../data/techeduKnowledge.js";
import { getCollection } from "../services/chroma.js";
import { techeduKnowledge } from "../services/techeduKnowledge.js";
import { createEmbedding } from "../services/embed.js";

const collection = await getCollection();

for (const item of techeduKnowledge) {
  const embedding = await createEmbedding(item.text);

  await collection.add({
    ids: [item.id],
    documents: [item.text],
    embeddings: [embedding],
    metadatas: [{ category: item.category }],
  });

  console.log("Added:", item.id);
}

console.log("✅ TechEdu knowledge trained");
process.exit();
