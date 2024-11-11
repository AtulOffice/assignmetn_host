import express from "express";
import { datarouter } from "./route/data.router.js";
import { CONNECTION } from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { infinalRouter } from "./route/inital_final.route.js";
import { CurrentRouter } from "./route/current.route.js";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", datarouter);
app.use("/api/v1", infinalRouter);
app.use("/api/v1", CurrentRouter);


CONNECTION(process.env.DATABASE_URL);
app.get('/', (req, res) => {
  return res.status(201).json({
    success: true,
    message: "API is running successfully"
  })
})

app.listen(port, (req, res) => {
  console.log(`listening on on port ${port}`);
});

// import express from "express";
// import { datarouter } from "./route/data.router.js";
// import { CONNECTION } from "./database/db.js";
// import dotenv from "dotenv";
// import cors from "cors";
// import os from "os";
// import cluster from "cluster";

// dotenv.config();

// const port = process.env.PORT || 8000;
// const numCPUs = os.cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died, starting a new one`);
//     cluster.fork();
//   });
// } else {
//   const app = express();

//   app.use(express.json());
//   app.use(cors());

//   app.use("/api/v1", datarouter);
//   CONNECTION(process.env.DATABASE_URL);

//   app.listen(port, () => {
//     console.log(`server listening on port ${port}`);
//   });
// }
