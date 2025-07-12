// notificationRoutes.js
import express from "express";
import { getNotifications } from "../controllers/notificationController.js";
import {
  requireSignIn,
  requireSignInShop,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Separate routes for each role
router.get("/all/customer", requireSignIn, getNotifications);
router.get("/all/shopowner", requireSignInShop, getNotifications);

export default router;
