const mongoose = require("mongoose");
const Joi = require("joi");

const CompanySchema = new mongoose.Schema({
  hiringManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyName: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
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

function validateCompany(company) {
  const schema = {
    companyName: Joi.string().required(),
    companyEmail: Joi.string().email().required(),
    companyWebsite: Joi.string().required(),
    companyAddress: Joi.string().required(),
  };
  return Joi.validate(company, schema);
}

CompanySchema.pre("remove", function (callback) {
  // Remove all the docs that refers
  this.model("Job").remove({ companyId: this._id }, callback);
});

exports.Company = mongoose.model("Company", CompanySchema);
exports.validateCompany = validateCompany;
