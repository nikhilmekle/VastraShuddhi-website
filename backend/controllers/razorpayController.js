import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

dotenv.config();

// Razorpay credentials
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Razorpay Key Secret
});

// Create payment order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in smallest unit (e.g., paise for INR)

    // Set up the Razorpay order options
    const options = {
      amount: amount * 100, // Razorpay works in paise, so multiply by 100
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"), // Generate a random receipt ID
      payment_capture: 1, // Automatic capture after payment
    };

    // Create the order with Razorpay
    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order_id: order.id, // Send the order ID back to the frontend
      amount: order.amount / 100, // Convert amount back to rupees for frontend
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Handle payment verification

export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, orderMongoId } = req.body;

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (generated_signature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Verification failed.",
      });
    }

    // ✅ Update order
    await Order.findByIdAndUpdate(orderMongoId, { isPaid: true });

    const order = await Order.findById(orderMongoId);

    const payment = await Payment.create({
      orderId: orderMongoId,
      customerId: order.customer_id,
      shopOwnerId: order.shopOwner_id,
      amountPaid: order.total_amount,
      paymentStatus: "completed",
      razorpay_order_id: order_id,
      razorpay_payment_id: payment_id,
      razorpay_signature: signature,
    });

    const receiptPath = path.join("receipts", `receipt-${payment._id}.pdf`);
    const receiptUrl = `${req.protocol}://${req.get("host")}/${receiptPath}`;

    await generateReceiptPDF(order, payment, receiptPath);
    res.json({
      success: true,
      message: "Payment verified and recorded successfully.",
      receiptUrl: receiptUrl,
    });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({
      success: false,
      message: "Server error during payment verification.",
    });
  }
};

const generateReceiptPDF = async (order, payment, filePath) => {
  const doc = new PDFDocument({ margin: 50 });

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  // Title
  doc
    .fontSize(24)
    .fillColor("#1976d2")
    .text("Vastrashuddhi Laundry", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(16)
    .fillColor("black")
    .text("Payment Receipt", { align: "center", underline: true })
    .moveDown(1.5);

  // Divider line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(1);

  // Receipt Info
  doc.fontSize(14).text(`Receipt ID: ${payment._id}`);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Payment Date: ${payment.createdAt.toDateString()}`);
  doc.text(`Customer ID: ${order.customer_id}`);
  doc.text(`Shop Owner ID: ${order.shopOwner_id}`);
  doc.moveDown();

  // Highlighted amount
  doc
    .fontSize(16)
    .fillColor("green")
    .text(`Amount Paid: ₹${payment.amountPaid}`, { bold: true })
    .fillColor("black");

  doc.moveDown();
  doc.fontSize(14).text(`Payment ID: ${payment.razorpay_payment_id}`);
  doc.text(`Razorpay Order ID: ${payment.razorpay_order_id}`);
  doc.text(`Signature: ${payment.razorpay_signature}`);
  doc.text(`Status: ${payment.paymentStatus}`);
  doc.moveDown();

  // Thank You message
  doc
    .fontSize(12)
    .fillColor("gray")
    .text("Thank you for using Vastrashuddhi Laundry Services!", {
      align: "center",
    });

  doc.end();
};
