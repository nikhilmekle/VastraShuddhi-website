import express from "express";
import {
  getShopDetails,
  getShopOrderById,
  getShopOwnerOrders,
  getShopPayments,
  getShopServiceRequest,
  shopOwnerLoginController,
  shopOwnerRegisterController,
  updateOrderStatus,
  updateServiceRequestStatus,
} from "../controllers/shopController.js";
import { requireSignInShop } from "../middleware/authMiddleware.js";

const router = express.Router();

//register shop routes
router.post("/shop/register", shopOwnerRegisterController);

//shop login;
router.post("/shop/login", shopOwnerLoginController);

//get Shop Details
router.get("/shop/details", requireSignInShop, getShopDetails);

//get service requests
router.get("/shop/service-requests", requireSignInShop, getShopServiceRequest);

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

//update order statuss route
router.put(
  "/shop/order/update-status/:orderId",
  requireSignInShop,
  updateOrderStatus
);

router.get("/shop/payment", requireSignInShop, getShopPayments);

export default router;
