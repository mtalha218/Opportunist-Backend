const { Company } = require("../data/company.model");

module.exports.create = async (req, res) => {
  console.log("Inside api create company");
  const {
    user: { _id },
    body,
  } = req;
  try {
    const company = new Company({
      hiringManager: _id,
      ...body,
    });
    company.save();
    res.send({ company, message: "Company created successfully" });
  } catch (err) {
    console.log("Has Company api failed", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.hasCompany = async (req, res) => {
  console.log("Inside api to check if employer has company");
  const {
    user: { _id },
  } = req;
  let hasCompany = false;
  try {
    const company = await Company.findOne({ hiringManager: _id });
    hasCompany = company ? true : false;
    res.send({ hasCompany });
  } catch (err) {
    console.log("Has Company api failed", err);
    res.status(500).send({ error: true, message: err.message });
  }
};
