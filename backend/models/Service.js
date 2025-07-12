import mongoose, { mongo } from "mongoose";
const serviceSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
