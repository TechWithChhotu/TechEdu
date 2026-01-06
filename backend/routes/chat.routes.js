import express from "express";
import { createEmbedding } from "../services/embed.js";
import { generateAnswer } from "../services/ollama.js";
import { getCollection } from "../services/chroma.js";

const chatRoute = express.Router();

chatRoute.post("/", async (req, res) => {
  try {
    const { question, text } = req.body;

    const greetings = ["hi", "hello", "hey"];

    if (greetings.includes(question.toLowerCase().trim())) {
      return res.json({
        botMessage: "Hi 👋 Welcome to TechEdu! How can I help you today?",
      });
    }

    const userQuery = question || text;

    const collection = await getCollection();

    // 1️⃣ Embedding
    const embedding = await createEmbedding(userQuery);

    // 2️⃣ Query Chroma
    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 1,
    });

    const docs = results.documents?.[0] || [];

    if (docs.length === 0) {
      return res.json({
        botMessage: "I couldn't find relevant information yet.",
      });
    }

    res.json({
      botMessage: docs.join("\n"),
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      botMessage: "Something went wrong, please try again.",
    });
  }
});

export default chatRoute;
