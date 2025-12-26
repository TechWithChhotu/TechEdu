import mongoose from "mongoose";

const mongoDbConfig = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log("MongoDB, Connection successful");
    } else {
      console.log("MongoDB, Connecton failed");
    }
  } catch (err) {
    console.log(process.env.MONGO_URI);

    console.log("MongoDB, Something went wrong in mongoDB connection");
    console.error("MongoDB connection error:", err.message);
  }
};

export default mongoDbConfig;
