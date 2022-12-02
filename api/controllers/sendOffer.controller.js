const { SendOffer } = require("../data/sendOffer.model");
const { CustomOffer } = require("../data/customOffer.model");
const { RequestOffer } = require("../data/requestOffer.model");

module.exports.postOffer = async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;
  try {
    const offer = await RequestOffer.findById(
      { _id: body.buyerId },
      { counterOffers: 1 }
    );
    const sendOffer = await new SendOffer({
      ...body,
      sellerId: _id,
    });
    sendOffer.save();
    offer.counterOffers.push(sendOffer._id);
    offer.save();

    res.send({
      error: false,
      message: "Buyer Response sent successfully",
      sendOffer,
    });
  } catch (err) {}
};

module.exports.postCustomOffer = async (req, res) => {
  const { body } = req;
  try {
    const sendOffer = await new CustomOffer({
      ...body,
    });
    sendOffer.save();
    res.send({
      error: false,
      message: "Custom Offer Response sent successfully",
      sendOffer,
    });
  } catch (err) {}
};

module.exports.getMyCustomOffers = async (req, res) => {
  console.log("Inside get custom offers API");
  const {
    user: { _id },
  } = req;
  try {
    const customOffers = await CustomOffer.find({
      buyerId: _id,
      isDeleted: false,
      isAccepted: false,
      isRejected: false,
    });
    res.send({
      error: false,
      message: "Custom Offers fetched successfully",
      customOffers,
    });
  } catch (err) {}
};

module.exports.getMyOffers = async (req, res) => {
  const {
    user: { _id },
  } = req;
  try {
    const sentOffers = await SendOffer.find({
      sellerId: _id,
      isDeleted: false,
    });
    res.send({
      error: false,
      sentOffers,
      message: "sent Offers fetched successfully",
    });
  } catch (err) {
    res.send({
      error: false,
      message: err.message,
    });
  }
};
