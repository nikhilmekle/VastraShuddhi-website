import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shopOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // or ShopOwner, depending on your model name
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
