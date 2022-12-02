const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const orderCtrl = require("../controllers/order.controller");
const upload = require("../middleware/attachmentMiddleware");

router.get("/buyerOrder", authMiddle, isDeleted, orderCtrl.getBuyerOrders);
router.get("/payment", authMiddle, isDeleted, orderCtrl.getPaymentOrders);

router.get("/sellerOrder", authMiddle, isDeleted, orderCtrl.getSellerOrders);
router.post("/completeOrder", authMiddle, isDeleted, orderCtrl.completeOrder);
router.post("/cancelOrder", authMiddle, isDeleted, orderCtrl.cancelOrder);
router.post(
  "/completeOrderSeller",
  authMiddle,
  isDeleted,
  upload,
  orderCtrl.completeOrderSeller
);
router.post("/PaymentOrders", authMiddle, isDeleted, orderCtrl.PaymentOrders);
module.exports = router;
