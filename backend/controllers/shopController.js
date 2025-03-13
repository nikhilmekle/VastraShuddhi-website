import ShopsModel from "../models/Shop.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import ServiceRequestModel from "../models/ServiceRequest.js";
import OrderModel from "../models/Order.js";
import JWT from "jsonwebtoken";

//----------------1-------------controller for shopOwner registration---------------------------

export const shopOwnerRegisterController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone_number,
      shop_name,
      shop_address,
      shop_location,
    } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }
    if (!phone_number) {
      return res.status(400).send({ message: "phone number is required" });
    }
    if (!shop_name) {
      return res.status(400).send({ message: "shop name is required" });
    }
    if (!shop_address) {
      return res.status(400).send({ message: "shop address is required" });
    }
    if (!shop_location) {
      return res.status(400).send({ message: "shop location is required" });
    }

    // Check if a shop already exists with the same email

    const existingShopOwner = await ShopsModel.findOne({ email });
    if (existingShopOwner) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }

    // Hash the password using the hashPassword helper function
    const hashedPassword = await hashPassword(password);

    // Create a new shop with the hashed password and other details
    const shop = new ShopsModel({
      name,
      email,
      password: hashedPassword,
      phone_number,
      shop_name,
      shop_address,
      shop_location,
    });

    // Save the new user to the database
    await shop.save();

    // Respond with success message and user data
    res.status(201).send({
      success: true,
      message: "shop registration successully",
      shop,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in registartion",
      error: error.message,
    });
  }
};

//-------------------------2-----------------shop owner login---------------------------------
export const shopOwnerLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate email , password
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Enter Email Address",
      });
    }
    if (!password) {
      return res.status(404).send({
        success: true,
        message: "Eneter Password",
      });
    }

    // Find the shop in the database by email
    const shop = await ShopsModel.findOne({ email });
    if (!shop) {
      return res.status(200).send({
        success: false,
        message: "Email is not register",
      });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, shop.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Generate a JWT token with the user's ID as the payload, set to expire in 7 days
    const token = await JWT.sign({ _id: shop._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with user details and the generated token
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      shop: {
        _id: shop._id,
        name: shop.name,
        shopName: shop.shop_name,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// -----------------------------------------3 update service request controller---------import mongoose from "mongoose";

export const updateServiceRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const shop_id = req.shop._id;

    // Find the service request and ensure the shop owner owns it
    const serviceRequest = await ServiceRequestModel.findOne({
      _id: requestId,
      shopOwner_id: shop_id,
    });

    if (!serviceRequest) {
      return res.status(404).send({
        success: false,
        message: "Service request not found.",
      });
    }

    // Check current status from database
    if (serviceRequest.status !== "Pending") {
      return res.status(400).send({
        success: false,
        message: `Service request is already ${serviceRequest.status}. Cannot update.`,
      });
    }

    // Update status
    serviceRequest.status = status;
    await serviceRequest.save();

    // 🔥 Only create an order if the service request is accepted
    if (status === "Accepted") {
      await createOrder(serviceRequest);
    }

    res.status(200).send({
      success: true,
      message: `Service request ${status.toLowerCase()} successfully.`,
      serviceRequest,
    });
  } catch (error) {
    console.error("Error updating service request status:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// ------------------------------------create order function--------------------------
export const createOrder = async (serviceRequest) => {
  try {
    const newOrder = new OrderModel({
      request_id: serviceRequest._id,
      customer_id: serviceRequest.customer_id,
      shopOwner_id: serviceRequest.shopOwner_id,
      total_price: 0, // Initially 0, will update when calculating price
      payment_status: "Pending",
      order_status: "Processing",
    });

    await newOrder.save();
    console.log(
      "✅ Order created successfully for service request:",
      serviceRequest._id
    );
  } catch (error) {
    console.error("❌ Error creating order:", error);
  }
};

//--------------------------get orders by id -------------------------
export const getShopOwnerOrders = async (req, res) => {
  try {
    const shopOwner_id = req.shop._id;

    const orders = await OrderModel.find({ shopOwner_id })
      .populate("customer_id", "name email")
      .populate("shopOwner_id", "name shopName")
      .populate({
        path: "request_id",
        populate: { path: "clothes", select: "type quantity" },
      })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: " orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// ------------------get shop order by order id--------------------
export const getShopOrderById = async (req, res) => {
  try {
    const shopOwner_id = req.shop._id;
    const { orderId } = req.params;

    const order = await OrderModel.findOne({ _id: orderId, shopOwner_id })
      .populate("customer_id", "name email")
      .populate("shopOwner_id", "name shopName")
      .populate({
        path: "request_id",
        populate: { path: "clothes", select: "type quantity" },
      });

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found or you don't have permission to view it.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
