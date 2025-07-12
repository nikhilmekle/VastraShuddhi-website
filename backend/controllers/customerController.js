import customerModel from "../models/Customer.js";
import shopModel from "../models/Shop.js";
import ServiceRequestModel from "../models/ServiceRequest.js";
import PaymentModel from "../models/Payment.js";
import ReviewModel from "../models/Review.js";
import JWT from "jsonwebtoken";
import OrderModel from "../models/Order.js";
import mongoose from "mongoose";
import { sendNotification } from "../utils/sendNotifications.js";

import { hashPassword, comparePassword } from "../helpers/authHelper.js";

//------------------------------1-----controller for customer registration----------------------------------------------------
export const customerRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone_number, address } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }

    if (!password) {
      return res.status(400).send({ message: "pasword is required" });
    }

    if (!phone_number) {
      return res.status(400).send({ message: "phone number is required" });
    }

    if (!address) {
      return res.status(400).send({ message: "address is required" });
    }

    // Check if a costomer already exists with the same email
    const existingCustomer = await customerModel.findOne({ email });
    if (existingCustomer) {
      return res.status(200).send({
        success: false,
        message: "Already registerd , please login",
      });
    }

    // Hash the password using the hashPassword helper function
    const hashedPassword = await hashPassword(password);

    // Create a new customer with the hashed password and other details
    const customer = new customerModel({
      name,
      email,
      password: hashedPassword,
      phone_number,
      address,
    });

    // Save the new customer to the database
    await customer.save();

    // Respond with success message and customer data
    res.status(201).send({
      success: true,
      message: " Registerd successfully",
      customer,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

//-----------------------------------------2-------- Controller for customer login---------------------------------------
export const customerLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Ensure both email and password are provided
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or password",
      });
    }

    // Find the customer in the database by email
    const customer = await customerModel.findOne({ email });
    if (!customer) {
      return res.status(200).send({
        success: false,
        message: "Email is not register",
      });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, customer.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate a JWT token with the user's ID as the payload, set to expire in 7 days
    const token = await JWT.sign(
      { _id: customer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with user details and the generated token
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      customer: {
        _id: customer._id,
        name: customer.name,
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

//----------------------------------------3------------finding nearby shops-----------------------------------------------
export const getNearbyShops = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).send({
        success: false,
        message: "Latitude and longitude are required.",
      });
    }

    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    console.log(userLatitude, userLongitude);

    // Find shops within 2km using geospatial query
    const nearbyShops = await shopModel.find({
      shop_location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userLongitude, userLatitude], // MongoDB stores [longitude, latitude]
          },
          $maxDistance: 10000, // 10 km in meters
        },
      },
    });

    if (!nearbyShops.length) {
      return res.status(200).send({
        success: true,
        message: "No nearby shops found within 2km.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Nearby shops fetched successfully.",
      nearbyShops,
    });
  } catch (error) {
    console.error("Error fetching nearby shops:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

//------------------------------------4------------- Create a new service request (Customer requests a pickup)------------

export const createServiceRequest = async (req, res) => {
  try {
    const {
      shopOwner_id,
      service_type,
      clothes,
      total_quantity,
      total_amount,
    } = req.body;

    // ✅ Extract customer ID from token
    const customer_id = req.customer._id;

    // ✅ Validate required fields
    if (
      !customer_id ||
      !shopOwner_id ||
      !Array.isArray(service_type) ||
      service_type.length === 0 ||
      !Array.isArray(clothes) ||
      clothes.length === 0 ||
      typeof total_quantity !== "number" ||
      typeof total_amount !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer ID, Shop Owner ID, at least one service type, clothes details, total quantity, and total price are required.",
      });
    }

    // ✅ Ensure clothes array is valid
    for (let item of clothes) {
      if (!item.type || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message:
            "Each clothing item must have a valid type and quantity (at least 1).",
        });
      }
    }

    // ✅ Validate `shopOwner_id`
    if (!mongoose.Types.ObjectId.isValid(shopOwner_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop owner ID.",
      });
    }

    // ✅ Convert `shopOwner_id` to ObjectId
    const shopOwnerObjectId = new mongoose.Types.ObjectId(shopOwner_id);

    // ✅ Create new service request
    const newRequest = new ServiceRequestModel({
      customer_id, // Already an ObjectId from token
      shopOwner_id: shopOwnerObjectId,
      service_type, // Now accepts multiple services
      clothes,
      total_quantity, // Taken from frontend
      total_amount, // Taken from frontend
      status: "Pending", // Default status
    });

    // ✅ Save to database
    await newRequest.save();

    await sendNotification(
      shopOwner_id,
      "ShopOwner",
      "You have received a new service request."
    );

    res.status(201).json({
      success: true,
      message: "Service request created successfully.",
      serviceRequest: newRequest,
    });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//-------------------------------7 Get all service requests for a specific customer----------------------

export const getCustomerServiceRequests = async (req, res) => {
  try {
    const customer_id = req.customer._id; //  Ensure req.customer exists from auth middleware

    //  Ensure shopOwner_id reference is correct
    const requests = await ServiceRequestModel.find({ customer_id }).populate({
      path: "shopOwner_id",
      model: "Shop", // ✅ Explicitly mention the correct model
      select: "name shop_name shop_address  phone_number ",
    });

    res.status(200).send({
      success: true,
      message: "Service requests fetched successfully!",
      requests,
    });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

//---------------------------8---------------- Cancel a service request (Only if it's still Pending)-------------------
export const cancelServiceRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const customer_id = req.customer._id;

    const request = await ServiceRequestModel.findOne({
      _id: requestId,
      customer_id,
      status: "Pending",
    });

    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Service request not found or cannot be canceled.",
      });
    }
    await ServiceRequestModel.deleteOne({ _id: requestId });

    res.status(200).send({
      success: true,
      message: "Service request canceled successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

//-------------9-------------write riview ------for a shop----------
export const createReview = async (req, res) => {
  try {
    const { shop_id, rating, comment } = req.body;
    const customer_id = req.customer._id;

    if (!shop_id || !rating) {
      return res.status(400).send({
        success: false,
        message: "Shop Id and Rating are required",
      });
    }

    // Check if the shop_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(shop_id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Shop ID.",
      });
    }

    //check if the customer has used  this shop's service
    const hasUsedService = await ServiceRequestModel.findOne({
      customer_id,
      shopOwner_id: shop_id,
      status: "Completed",
    });

    if (!hasUsedService) {
      return res.status(403).send({
        success: false,
        message:
          "You can only review shops where you have completed a service.",
      });
    }

    //create new review
    const newReview = new ReviewModel({
      customer_id,
      shop_id,
      rating,
      comment,
    });

    //save review to database
    await newReview.save();

    res.status(201).send({
      success: true,
      message: "Review submitted successfully!",
      newReview,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// -------------------10------delete review ----------------------------------
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const customer_id = req.customer._id; // Ensure this is correctly passed from auth middleware

    // Find review with matching ID and customer ownership
    const review = await ReviewModel.findOne({ _id: reviewId, customer_id });

    if (!review) {
      return res.status(404).send({
        success: false,
        message: "Review not found or unauthorized access",
      });
    }

    // Delete the review
    await ReviewModel.deleteOne({ _id: reviewId });

    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//------------------get customer order --------------
export const getCustomerOrder = async (req, res) => {
  try {
    const customer_id = req.customer._id;
    const orders = await OrderModel.find({ customer_id })
      .populate("customer_id", "name email address phone_number")
      .populate(
        "shopOwner_id",
        "name email shop_name shop_address phone_number"
      )
      .populate({
        path: "request_id",
        populate: { path: "clothes", select: "type quantity" },
      })
      .sort({ createdAt: -1 });

    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "orders not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Order fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

//------------------get Order by Id-----------------------
export const getCustomerOrderById = async (req, res) => {
  try {
    const customer_id = req.customer._id;
    const { orderId } = req.params;

    const order = await OrderModel.findOne({ _id: orderId, customer_id })
      .populate("customer_id", "name email address phone_number")
      .populate(
        "shopOwner_id",
        "name email shop_name shop_address phone_number"
      )
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

    // Add derived field
    const formattedOrder = {
      ...order._doc,
      payment_status: order.isPaid ? "Paid" : "Pending",
    };

    res.status(200).send({
      success: true,
      message: "Order fetched",
      order: formattedOrder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCustomerPayments = async (req, res) => {
  try {
    const customerId = req.customer._id;
    // console.log("Customer ID from token:", customerId);

    const payments = await PaymentModel.find({ customerId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Payment history fetched successfully",
      payments,
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching payment history",
    });
  }
};
