import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to MongoDB Databse ${conn.connection.host}`);
  } catch (error) {
    console.log(`error while conneting to MongoDB database : ${error}`);
  }
};

export default connectDB;
