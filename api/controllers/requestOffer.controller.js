const { CustomOffer } = require("../data/customOffer.model");
const { RequestOffer } = require("../data/requestOffer.model");
const { SendOffer } = require("../data/sendOffer.model");
const { OfferResponse } = require("../data/sendOffer.model");
const { Order } = require("../data/order.model");

module.exports.createBuyerRequest = async (req, res) => {
  const {
    body: {
      title,
      description,
      deliveryTime,
      price,
      attachment,
      category,
      sellerId,
    },
    user: { _id },
  } = req;
  try {
    const buyerRequest = await new RequestOffer({
      buyer: _id,
      title,
      description,
      price,
      deliveryTime,
      category,
      attachment,
      sellerId,
    });
    buyerRequest.save();
    res.send({
      error: false,
      message: "Request created Successfully",
      buyerRequest,
    });
  } catch (err) {
    console.log("get all company jobs api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.getAllBuyerRequests = async (req, res) => {
  const {
    body: {},
  } = req;
  try {
    const buyerRequests = await RequestOffer.find({
      isDeleted: false,
      isAccepted: false,
      isRejected: false,
    })
      .populate({
        path: "buyer",
      })
      .populate({ path: "sellerId" });
    res.send({
      error: false,
      message: "Buyer Requests fetched successfully",
      buyerRequests,
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};

module.exports.getUserBuyerRequests = async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;
  try {
    const buyerRequests = await RequestOffer.find({
      buyer: _id,
      isDeleted: false,
    }).populate({
      path: "sellerId",
    });

    res.send({
      error: false,
      message: "Buyer Requests fetched successfully",
      buyerRequests,
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};

module.exports.getBuyerRequestById = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const buyerRequest = await RequestOffer.findById({ _id: id });
    res.send({
      error: false,
      message: "Buyer Request fetched successfully",
      buyerRequest,
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};

module.exports.updateBuyerRequestById = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const buyerRequest = await RequestOffer.findByIdAndUpdate(
      { _id: id },
      { ...body }
    );
    res.send({
      error: false,
      message: "Buyer Request updated successfully",
      buyerRequest,
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};

module.exports.deleteBuyerRequestById = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await RequestOffer.findByIdAndUpdate({ _id: id }, { isDeleted: true });
    res.send({
      error: false,
      message: "Buyer Request deleted successfully",
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};

module.exports.getSentOffers = async (req, res) => {
  console.log("Inside get sent offers api");
  const {
    user: { _id },
  } = req;
  try {
    const sentRequests = await SendOffer.find({
      isDeleted: false,
    })
      .populate({
        path: "sellerId",
      })
      .populate({
        path: "buyerId",
        match: { isDeleted: false },
        populate: {
          path: "buyer",
        },
      });

    const filteredSentRequests = sentRequests.filter(
      (request) => request.buyerId.buyer._id.toString() === _id
    );

    res.send({
      error: false,
      message: "counter Offers fetched successfully",
      sentRequests: filteredSentRequests,
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};

module.exports.acceptOrRejectCustomOffer = async (req, res) => {
  console.log("Inside accept or reject custom offer api");
  const {
    body: { isAccepted, isRejected, customOfferId },
  } = req;
  try {
    if (isRejected) {
      await CustomOffer.findByIdAndUpdate(
        { _id: customOfferId },
        { isRejected: true }
      );
      res.send({
        error: false,
        message: "Offer Rejected successfully",
      });
    }
    if (isAccepted) {
      const customOffer = await CustomOffer.findById({ _id: customOfferId });
      const order = new Order({
        gigId: customOffer.gigId,
        buyerId: customOffer.buyerId,
        sellerId: customOffer.sellerId,
        responseMessage: "",
        responseData: "",
        price: customOffer.price,
        revision: customOffer.revision,
        deliveryTime: customOffer.deliveryTime,
        attachment: "",
        deliveryFeedback: "",
        rating: 0,
      });
      order.save();
      await RequestOffer.updateMany(
        { buyerId: customOffer.buyerid },
        { isAccepted: true }
      );
      customOffer.isAccepted = true;
      customOffer.save();
      res.send({
        error: false,
        message: "Order created successfully",
      });
    }
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};
