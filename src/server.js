import app from "./app.js";

import { env } from "./helpers/index.js";

const PORT = env("PORT");

app.listen(PORT, () => {
  console.log(`The server is running on the port ${PORT}`);
});

app.on("error", (error) => {
  console.error("An error has occurred:", error.message);
});
