import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//authentication routes
app.use("/api/v2/auth", customerRoutes);

app.use("/api/v2/auth", shopRoutes);

app.use("/api/v2/auth", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});
