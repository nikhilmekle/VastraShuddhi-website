import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "recipientType",
  },
  recipientType: {
    type: String,
    enum: ["Customer", "ShopOwner"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Notification", notificationSchema);
