import Notification from "../models/Notification.js";
export const getNotifications = async (req, res) => {
  try {
    // Use req.customer or req.shop depending on the middleware used
    const userId = req.customer?._id || req.shop?._id; // Correct the variable names
    const userType = req.customer ? "Customer" : "ShopOwner";

    if (!userId || !userType) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const notifications = await Notification.find({
      recipient_id: userId,
      recipientType: userType,
    }).sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
