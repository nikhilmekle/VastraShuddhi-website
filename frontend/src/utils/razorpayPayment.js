import loadRazorpay from "./loadRazorpay";
import toast from "react-hot-toast";

const handlePayment = async ({ orderData, token, setOrderData }) => {
  const res = await loadRazorpay();
  if (!res) {
    alert("Razorpay SDK failed to load.");
    return;
  }

  try {
    const result = await fetch(
      "http://localhost:8080/api/v2/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ amount: orderData.total_amount }),
      }
    );

    const data = await result.json();
    if (!data.success) {
      alert("Server error. Payment not initiated.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      order_id: data.order_id,
      name: "Vastrashuddhi Laundry",
      description: "Laundry Service Payment",
      handler: async function (response) {
        toast.success("Payment Successful");

        try {
          const verifyRes = await fetch(
            "http://localhost:8080/api/v2/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({
                order_id: data.order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                orderMongoId: orderData._id,
                customerId: orderData.customer_id._id,
                amount: orderData.total_amount,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            toast.success("Payment Verified & Stored");
            setOrderData((prev) => ({ ...prev, isPaid: true })); // Update UI if needed

            if (verifyData.receiptUrl) {
              window.open(verifyData.receiptUrl, "_blank");
            }
          } else {
            toast.error(verifyData.message || "Verification failed");
          }
        } catch (err) {
          console.error("Verification Error:", err);
          toast.error("Failed to verify/store payment.");
        }
      },
      prefill: {
        name: orderData.customer_id.name,
        email: orderData.customer_id.email,
        contact: orderData.customer_id.phone_number,
      },
      theme: {
        color: "#1976d2",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (err) {
    console.error("Payment failed:", err);
    toast.error("Payment Failed. Please try again.");
  }
};

export default handlePayment;
