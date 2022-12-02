const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const Joi = require("joi");

const requestOfferSchema = new mongoose.Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  deliveryTime: {
    type: Number,
  },
  category: {
    type: String,
  },
  attachment: {
    type: String,
  },
  counterOffers: [
    {
      type: Schema.Types.ObjectId,
      ref: "SentOffer",
    },
  ],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

function validateOfferRequest(offer) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    deliveryTime: Joi.Number().required(),
    category: Joi.string().required(),
  };
  return Joi.validate(offer, schema);
}

exports.RequestOffer = mongoose.model("RequestOffer", requestOfferSchema);
exports.validateOfferRequest = validateOfferRequest;
