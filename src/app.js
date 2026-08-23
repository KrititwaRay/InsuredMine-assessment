import "dotenv/config";
import express from "express";
const app = express();

import connectDb from "./configuration/db.js";
import { CommonHelper } from "./helper/common_helper.js";
import { httpCodes } from "./helper/httpCodes.js";
import { startCpuMonitor } from "./configuration/cpuMonitor.js";

/* MongoDb */
connectDb();

let global_helper = new CommonHelper();


globalThis.Helpers = global_helper;
globalThis.httpCodes = httpCodes;


app.use(express.json({ limit: '150mb' }));


import { app_route } from "./app_routing.js";

app.use('/v1', app_route);

const PORT = process.env.PORT;

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
  // Start real-time CPU tracking
  // startCpuMonitor({
  //   threshold: 70,       // 70% threshold trigger
  //   checkInterval: 5000, // Checks every 5 seconds
  // });
})

