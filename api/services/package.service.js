const { Package } = require("../data/package.model");

const createPackage = async (packg, gig, res) => {
  const gigPackage = new Package({ ...packg, gigId: gig._id });
  gigPackage.save();

  return gigPackage;
};

module.exports = {
  createPackage,
};
