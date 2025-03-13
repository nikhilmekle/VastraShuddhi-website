import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
    },
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
    total_price: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    order_status: {
      type: String,
      enum: ["Processing", "Completed", "Cancelled"],
      default: "Processing",
    },
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment", // Reference to Payment model
      default: null, // Initially no payment linked
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Order", orderSchema);
