import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import cors from "cors";
// In server.js or app.js
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Allow frontend
    credentials: true, // ✅ Allow cookies & headers
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/receipts", express.static(path.join(__dirname, "receipts")));
//authentication routes
app.use("/api/v2/auth", customerRoutes);

app.use("/api/v2/auth", shopRoutes);

app.use("/api/v2/auth", adminRoutes);

app.use("/api/v2/payment", razorpayRoutes);

app.use("/api/v2/notifications", notificationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});
