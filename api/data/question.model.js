const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
  isResponded: {
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

function validateQuestion(question) {
  const schema = {
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  };
  return Joi.validate(question, schema);
}

exports.Question = mongoose.model("Question", questionSchema);
exports.validateQuestion = validateQuestion;
