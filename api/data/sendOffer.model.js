const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const Joi = require("joi");

const sendOfferSchema = new mongoose.Schema({
  gigId: {
    type: Schema.Types.ObjectId,
    ref: "Gig",
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "RequestOffer",
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  revision: {
    type: Number,
  },
  deliveryTime: {
    type: String,
  },
  attachment: {
    type: String,
  },
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

// function validateOfferRequest(offer) {
//   const schema = {
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     price: Joi.number().required(),
//     deliveryTime: Joi.string().required(),
//     category: Joi.string().required(),
//     attachment: Joi.string().optional(),
//   };
//   return Joi.validate(offer, schema);
// }

exports.SendOffer = mongoose.model("SentOffer", sendOfferSchema);
// exports.validateOfferRequest = validateOfferRequest;
