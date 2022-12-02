const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const Joi = require("joi");

const jobSchema = new mongoose.Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  salary: {
    type: Number,
  },
  jobType: {
    type: String,
  },
  appliedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

function validateJob(job) {
  const schema = {
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.number().required(),
    jobType: Joi.string().required(),
  };
  return Joi.validate(job, schema);
}

exports.Job = mongoose.model("Job", jobSchema);
exports.validateJob = validateJob;
