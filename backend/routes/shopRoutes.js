import express from "express";
import {
  getShopOrderById,
  getShopOwnerOrders,
  shopOwnerLoginController,
  shopOwnerRegisterController,
  updateServiceRequestStatus,
} from "../controllers/shopController.js";
import { requireSignInShop } from "../middleware/authMiddleware.js";

const router = express.Router();

//register shop routes
router.post("/shop/register", shopOwnerRegisterController);

//shop login;
router.post("/shop/login", shopOwnerLoginController);

//accept or reject service request
router.patch(
  "/shop/service-request/:requestId",
  requireSignInShop,
  updateServiceRequestStatus
);

//get shop all orders
router.get("/shop/orders", requireSignInShop, getShopOwnerOrders);

//get shoporder based on order id
router.get("/shop/order/:orderId", requireSignInShop, getShopOrderById);

export default router;
