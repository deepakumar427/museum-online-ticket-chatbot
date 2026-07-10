const express = require("express");
const router = express.Router();
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  createMembershipOrder,
  verifyMembershipPayment,
} = require("../controllers/payment");
const { auth } = require("../middleware/auth"); // Only import auth middleware

// Route to capture payment (allows both members and non-members)
router.post("/capturePayment", auth, capturePayment);

// Route to verify payment
router.post("/verifyPayment", auth, verifyPayment);

// Route to send payment success email
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail);

router.post("/membership/order", auth, createMembershipOrder);
router.post("/membership/verify", auth, verifyMembershipPayment);

module.exports = router;
