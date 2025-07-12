import express from "express";
import {
  cancelServiceRequest,
  createReview,
  createServiceRequest,
  customerLoginController,
  customerRegisterController,
  deleteReview,
  getCustomerOrder,
  getCustomerOrderById,
  getCustomerPayments,
  getCustomerServiceRequests,
  getNearbyShops,
} from "../controllers/customerController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//register customer route
router.post("/customer/register", customerRegisterController);
//customer login
router.post("/customer/login", customerLoginController);

//customer find nearby shops
router.get("/customer/nearby-shops", getNearbyShops);

// Customer creates a service request
router.post("/customer/service-request", requireSignIn, createServiceRequest);
// Customer gets all their service requests
router.get(
  "/customer/service-requests",
  requireSignIn,
  getCustomerServiceRequests
);

// Customer cancels a pending service request
router.delete(
  "/customer/service-request/:requestId",
  requireSignIn,
  cancelServiceRequest
);

//customer write review to shop
router.post("/customer/review", requireSignIn, createReview);

//delete review
router.delete("/customer/review/:reviewId", requireSignIn, deleteReview);

//get orders
router.get("/customer/orders", requireSignIn, getCustomerOrder);

//get orders by order id
router.get("/customer/order/:orderId", requireSignIn, getCustomerOrderById);

router.get("/customer/payment-history", requireSignIn, getCustomerPayments);

export default router;
