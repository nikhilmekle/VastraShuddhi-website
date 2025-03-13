import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shopOwner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    service_type: {
      type: String,
      enum: ["Dry Cleaning", "Pressing"],
      required: true,
    },
    clothes: [
      {
        type: {
          type: String,
          enum: ["Shirt", "Trousers", "T-shirt", "Jeans", "Suit", "Other"], // Define allowed types
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // At least one item per type
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);
