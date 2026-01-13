import app from "./app.js";
process.env.DOTENV_CONFIG_QUIET = "true";

import { config } from "dotenv";
import mongoDbConfig from "./config/mongoose.config.js";
config();
import v2 from "cloudinary";
import { connectRedis } from "./helper/redis.helper.js";

/*----------------->> Cloudinary configuration<<-----------------*/
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const port = process.env.PORT || 3001;
(async () => {
  await connectRedis();
  await mongoDbConfig();
})();
app.listen(port, async () => {
  console.log(`App is running on http://localhost:${port}`);
});
