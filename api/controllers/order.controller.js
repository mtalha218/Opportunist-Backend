const { Order } = require("../data/order.model");
const { Gig } = require("../data/gig.model");
const { ReviewGig } = require("../data/gigReview.model");

module.exports.getBuyerOrders = async (req, res) => {
  console.log("Inside get buyer orders api");
  try {
    const buyerOrders = await Order.find({
      $or: [
        {
          status: "In Progress",
        },
        {
          status: "Completed",
        },
        {
          status: "Pending",
        },
      ],
    }).populate({
      path: "sellerId",
    });
    res.send({
      error: false,
      message: "Order fetched successfully",
      buyerOrders,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.getPaymentOrders = async (req, res) => {
  console.log("Inside get buyer orders api");
  const {
    user: { _id },
  } = req;
  try {
    let total = 0;
    const buyerOrders = await Order.find({
      status: "Completed",
      payment: false,
    });
    buyerOrders.forEach((item) => {
      total += item.price;
    });
    res.send({
      error: false,
      message: "Order fetched successfully",
      total,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.PaymentOrders = async (req, res) => {
  console.log("Inside get payment orders api");
  const {
    user: { _id },
  } = req;
  try {
    await Order.updateMany(
      { sellerId: _id, status: "Completed" },
      { $set: { payment: true } }
    );

    res.send({
      error: false,
      message: "Payment withdrawn successfully",
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.getSellerOrders = async (req, res) => {
  console.log("Inside get seller orders api");
  const {
    user: { _id },
  } = req;
  try {
    const sellerOrders = await Order.find({ sellerId: _id }).populate({
      path: "buyerId",
    });
    //
    res.send({
      error: false,
      message: "Order fetched successfully",
      sellerOrders,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.completeOrder = async (req, res) => {
  console.log("Inside complete order api");
  const {
    body: { orderId, rating, deliveryFeedback },
  } = req;
  try {
    const sellerOrders = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        $set: {
          rating,
          deliveryFeedback,
          status: "Completed",
        },
      },
      { new: true }
    );
    const gigReview = new ReviewGig({
      gig: sellerOrders.gigId,
      reviewer: sellerOrders.buyerId,
      comment: deliveryFeedback,
      rating,
    });

    gigReview.save();

    const gig = await Gig.findById({ _id: sellerOrders.gigId });
    gig.reviews.push(gigReview._id);
    gig.save();

    res.send({
      error: false,
      message: "Thank you for placing an order, comeback again.",
      sellerOrders,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.cancelOrder = async (req, res) => {
  console.log("Inside complete order api");
  const {
    body: { orderId },
    user: { _id },
  } = req;
  try {
    const sellerOrders = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        status: "Cancelled",
      }
    );
    res.send({
      error: false,
      message: "Order Cancelled successfully",
      // sellerOrders,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.completeOrderSeller = async (req, res) => {
  console.log("Inside complete order api");
  const {
    files,
    body,
    body: { orderId, sourceFileDetail, status, sourceLink },
    user: { _id },
  } = req;

  let sourceFile = body?.sourceFile;
  if (!sourceFile && files.sourceFile) {
    const url = req.protocol + "://" + req.get("host");
    sourceFile =
      url +
      files.sourceFile[0].path.replace(/\\/g, "/").substring("public".length);
  }

  try {
    const sellerOrders = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        $set: {
          sourceFile,
          sourceFileDetail,
          sourceLink,
          status: status,
        },
      }
    );
    res.send({
      error: false,
      message: "Order Uploadd by Seller successfully",
      sellerOrders,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};
