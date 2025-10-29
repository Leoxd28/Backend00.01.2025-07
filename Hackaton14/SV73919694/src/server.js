import { app } from "./app.js";
import { env } from "./config/env.js";
// import { connectDb } from './db/index.js';

const server = app.listen(env.PORT, async () => {
  // await connectDb();
  console.log(`API up on http://localhost:${env.PORT}`);
});

export default server;
