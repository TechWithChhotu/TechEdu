import mongoose from "mongoose";
import { createEmbedding } from "../services/embed.js";
import { getCollection } from "../services/chroma.js";

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Course = mongoose.model("Course", CourseSchema);

await mongoose.connect("mongodb://127.0.0.1:27017/techedu");

const courses = await Course.find();
const collection = await getCollection();

for (const course of courses) {
  const text = `${course.title} - ${course.description}`;
  const embedding = await createEmbedding(text);

  await collection.add({
    ids: [course._id.toString()],
    embeddings: [embedding],
    documents: [text],
  });
}

console.log("✅ Mongo data embedded into Chroma");
process.exit();
