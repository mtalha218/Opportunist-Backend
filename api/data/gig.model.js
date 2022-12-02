const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const Joi = require("joi");

const gigSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  eTags: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    default: [],
  },
  videos: {
    type: Array,
    default: [],
  },
  documents: {
    type: Array,
    default: [],
  },
  basic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },
  standard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },
  premium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GigReview",
    },
  ],
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

function validateGig(gig) {
  // let tag = Joi.string();
  const schema = {
    title: Joi.string().required(),
    category: Joi.string().required(),
    // eTags: Joi.array().items(tag).required(),
    description: Joi.string().required(),
  };
  return Joi.validate(gig, schema);
}

exports.Gig = mongoose.model("Gig", gigSchema);
exports.validateGig = validateGig;
