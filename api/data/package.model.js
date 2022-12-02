const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const Joi = require("joi");

const packageSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
  },
  packageName: {
    type: String,
  },
  packageDescription: {
    type: String,
  },
  packageDeliveryTime: {
    type: Number,
  },
  noOfPages: {
    type: Number,
  },
  designCustomization: {
    type: Boolean,
    default: false,
  },
  contentUpload: {
    type: Boolean,
    default: false,
  },
  responsiveDesign: {
    type: Boolean,
    default: false,
  },
  includeSourceCode: {
    type: Boolean,
    default: false,
  },
  revisions: {
    type: Number,
    default: 1,
  },
  finalPrice: {
    type: Number,
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

function validatePackage(package) {
  let tag = Joi.string();
  const schema = {
    packageName: Joi.string().required(),
    packageDescription: Joi.string().required(),
    packageDeliveryTime: Joi.number().required(),
    noOfPages: Joi.string().required(),
    designCustomization: Joi.boolean().required(),
    contentUpload: Joi.boolean().required(),
    responsiveDesign: Joi.boolean().required(),
    includeSourceCode: Joi.boolean().required(),
    revisions: Joi.string().required(),
    finalPrice: Joi.string().required(),
  };
  return Joi.validate(package, schema);
}

exports.Package = mongoose.model("Package", packageSchema);
exports.validatePackage = validatePackage;
