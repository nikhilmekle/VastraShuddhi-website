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
    total_amount: {
      type: Number,
      required: true,
    },

    order_status: {
      type: String,
      enum: ["In Progress", "Ready for delivery", "Completed", "Cancelled"],
      default: "In Progress",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Order", orderSchema);
