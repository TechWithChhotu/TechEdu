import express from "express";
import { createEmbedding } from "../services/embed.js";
import { generateAnswer } from "../services/ollama.js";
import { getCollection } from "../services/chroma.js";

const chatRoute = express.Router();

chatRoute.post("/", async (req, res) => {
  const { question } = req.body;

  const embedding = await createEmbedding(question);
  const collection = await getCollection();

  const result = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 3,
  });

  const context = result.documents.flat().join("\n");

  const prompt = `
You are TechEdu AI Assistant.
Answer ONLY from TechEdu content below.
If not found, say: "This information is not available in TechEdu yet."

TechEdu Content:
${context}

Question: ${question}
`;

  const answer = await generateAnswer(prompt);

  res.json({ answer });
});

export default chatRoute;
