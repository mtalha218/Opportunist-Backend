const { Question } = require("../data/question.model");
const { Answer } = require("../data/answer.model");

module.exports.askQuestion = async (req, res) => {
  console.log("in contact-us api");
  const {
    body: { subject, email, message },
  } = req;

  try {
    const question = await new Question({
      email,
      subject,
      message,
    });
    question.save();
    res.send({
      error: false,
      data: {},
      message: "Question asked successfully",
    });
  } catch (error) {
    res.status(500).send({ error: true, message: "API Failed" });
  }
};

module.exports.replyQuestion = async (req, res) => {
  console.log("in reply to question api");
  const {
    body: { questionId, answer: reply },
  } = req;

  try {
    const question = await Question.findById({ _id: questionId });
    const answer = await new Answer({
      answer: reply,
      questionId: question._id,
    });

    question.answer = answer._id;
    question.isResponded = true;
    question.save();

    res.send({
      error: false,
      data: {},
      message: "Question replied successfully",
    });
  } catch (error) {
    res.status(500).send({ error: true, message: "API Failed" });
  }
};

module.exports.getAllQueries = async (req, res) => {
  try {
    const questions = await Question.find({ isDeleted: false }).populate({
      path: "Answer",
      isDeleted: { $eq: false },
    });

    res.send({
      questions,
      message: " Queries fetch successfully",
      error: false,
    });
  } catch (err) {
    console.log("Failed to fetch user queries", err);
    res.status(500).send({ error: true, message: err.message });
  }
};
