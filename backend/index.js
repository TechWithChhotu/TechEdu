import app from "./app.js";
process.env.DOTENV_CONFIG_QUIET = "true";

import { config } from "dotenv";
config();

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`App is running on http://localhost:${port}`);
});
