import { createClient } from "redis";

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,

  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),

    // 🔥 REQUIRED for Redis Cloud
    tls: {
      servername: process.env.REDIS_HOST, // 👈 THIS IS THE FIX
      rejectUnauthorized: false,
    },
  },
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redisClient.on("ready", () => {
  console.log("🟢 Redis ready to use");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
