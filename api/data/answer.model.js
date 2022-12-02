const mongoose = require("mongoose");
const Joi = require("joi");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  answer: {
    type: String,
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

function validateAnswer(answer) {
  const schema = {
    answer: Joi.string().required(),
  };
  return Joi.validate(answer, schema);
}

exports.Answer = mongoose.model("Answer", answerSchema);
exports.validateAnswer = validateAnswer;
