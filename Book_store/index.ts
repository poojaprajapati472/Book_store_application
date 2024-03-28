import express from "express";
import mongoose from "mongoose";
import { router } from "./src/routes/router";
import { consumePurchaseNotifications } from "./src/rabbitMQ/consumer";
import appConfig from "./src/common/config";
import { setupCronJob } from "./src/node_cron/cron";
import { mongoConnection } from "./src/database/database";
const port=appConfig.env.PORT
const app = express();
app.use(express.json());
app.use('/app',router)
setupCronJob()
consumePurchaseNotifications();
(async () => {
  try {
    await mongoConnection.connectMongoDB();
    app.listen(port, () => {
      console.log(`Server is running ${port}`);
    });
  } catch (error) {
    console.error(`Error during server start`);
    console.error(error);
  }
})();
