// utils/sendNotification.js
import Notification from "../models/Notification.js";

export const sendNotification = async (recipientId, recipientType, message) => {
  try {
    const notification = new Notification({
      recipient_id: recipientId,
      recipientType,
      message,
    });
    await notification.save();
  } catch (error) {
    console.error("Notification creation failed:", error.message);
  }
};
