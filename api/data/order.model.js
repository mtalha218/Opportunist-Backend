const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  gigId: {
    type: Schema.Types.ObjectId,
    ref: "Gig",
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sourceFile: {
    type: String,
  },
  sourceFileDetail: {
    type: String,
  },
  sourceLink: {
    type: String,
  },

  revision: {
    type: Number,
  },
  deliveryTime: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    default: "In Progress",
  },
  deliveryFeedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
  payment: {
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

exports.Order = mongoose.model("Order", orderSchema);
// exports.validateOfferRequest = validateOfferRequest;
