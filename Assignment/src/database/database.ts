import mongoose from "mongoose";
import appConfig from "../common/config";
class MongoConnection {
  async connectMongoDB() {
    try {
      const mongoClient = await mongoose.connect(String(appConfig.env.MONGODB_URL));
      console.log(`Connection with Mongo DB is successfull!`);
    } catch (error) {
      console.error("MongoDB Connection error:", error);
    }
  }
}

export const mongoConnection = new MongoConnection();
