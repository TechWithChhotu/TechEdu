import app from "./app.js";
process.env.DOTENV_CONFIG_QUIET = "true";

import { config } from "dotenv";
import mongoDbConfig from "./config/mongoose.config.js";
config();

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  await mongoDbConfig();
  console.log(`App is running on http://localhost:${port}`);
});
