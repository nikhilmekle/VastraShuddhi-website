import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  payment_method: {
    type: String,
    enum: ["PayPal", "Card", "UPI"],
    required: true,
  },
  payment_date: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    enum: ["Success", "Failed", "Pending"],
    required: true,
  },
});

export default model("Payment", paymentSchema);
