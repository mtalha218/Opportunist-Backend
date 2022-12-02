const { Gig } = require("../data/gig.model");
const { createPackage } = require("../services/package.service");
const { ReviewGig } = require("../data/gigReview.model");

module.exports.createGig = async (req, res) => {
  console.log("Inside create Gig api");
  const {
    files,
    body: { title, category, eTags, description, basic, standard, premium },
    user: { _id },
  } = req;

  let images = [];
  let videos = [];
  // let documents = [];

  const url = req.protocol + "://" + req.get("host");

  if (files.images) {
    files.images.map((image) => {
      images.push(
        url + image.path.replace(/\\/g, "/").substring("public".length)
      );
    });
  }

  if (files.videos) {
    files?.videos?.map((video) => {
      videos.push(
        url + video.path.replace(/\\/g, "/").substring("public".length)
      );
    });
  }

  // req.files.documents.map((document) => {
  //   documents.push(
  //     url + document.path.replace(/\\/g, "/").substring("public".length)
  //   );
  // });

  const gigData = {
    title: title,
    category: category,
    eTags: eTags,
    description: description,
  };
  try {
    const gig = await new Gig({
      ...gigData,
      ownerId: _id,
      videos,
      images,
      // documents,
    });

    const Basic = await createPackage(JSON.parse(basic), gig, res);
    const Standard = await createPackage(JSON.parse(standard), gig, res);
    const Premium = await createPackage(JSON.parse(premium), gig, res);

    gig.basic = Basic._id;
    gig.standard = Standard._id;
    gig.premium = Premium._id;
    gig.save();

    res.send({
      success: true,
      error: false,
      gig,
      message: "Gig created successfully",
    });
  } catch (err) {
    console.log("Inside catch of create gig api", err.message);
    res.send({
      success: false,
      error: true,
      message: err.message,
    });
  }
};

module.exports.getAllGigs = async (req, res) => {
  console.log("Inside get all Gigs api");
  const {
    user: { _id },
  } = req;
  try {
    const gigs = await Gig.find({ isDeleted: false })
      .populate({
        path: "basic",
      })
      .populate({
        path: "standard",
      })
      .populate({
        path: "premium",
      })
      .populate({
        path: "reviews",
      })
      .populate({
        path: "ownerId",
      });
    res.send({
      success: true,
      error: false,
      message: "Gigs fetched successfully",
      gigs,
    });
  } catch (err) {
    console.log("Inside catch of get all gigs api", err);
    res.send({
      success: false,
      error: true,
      message: err.details[0].message,
    });
  }
};

module.exports.getMyGigs = async (req, res) => {
  console.log("Inside get all my Gigs api");
  const {
    user: { _id },
  } = req;
  try {
    const gigs = await Gig.find({ ownerId: _id, isDeleted: false })
      .populate({
        path: "basic",
      })
      .populate({
        path: "standard",
      })
      .populate({
        path: "premium",
      })
      .populate({
        path: "reviews",
      })
      .populate({
        path: "ownerId",
      });
    res.send({
      success: true,
      error: false,
      message: "Gigs fetched successfully",
      gigs,
    });
  } catch (err) {
    console.log("Inside catch of get all gigs api", err);
    res.send({
      success: false,
      error: true,
      message: err.details[0].message,
    });
  }
};

module.exports.getAllGigsForCategory = async (req, res) => {
  console.log("Inside get all Gigs api");
  const {
    user: { _id },
  } = req;
  try {
    const gigs = await Gig.find({ isDeleted: false })
      .populate({
        path: "basic",
      })
      .populate({
        path: "standard",
      })
      .populate({
        path: "premium",
      })
      .populate({
        path: "reviews",
      });
    res.send({
      success: true,
      error: false,
      message: "Gigs fetched successfully",
      gigs,
    });
  } catch (err) {
    console.log("Inside catch of get all gigs api", err);
    res.send({
      success: false,
      error: true,
      message: err.details[0].message,
    });
  }
};

module.exports.getGigById = async (req, res) => {
  console.log("Inside getGigById api");
  const {
    params: { gigId: _id },
  } = req;
  try {
    const gig = await Gig.findById(_id)
      .populate({
        path: "basic",
      })
      .populate({
        path: "standard",
      })
      .populate({
        path: "premium",
      })
      .populate({
        path: "reviews",
        populate: { path: "reviewer" },
      })
      .populate({
        path: "ownerId",
      });

    res.send({
      success: true,
      error: false,
      message: "Gigs fetched successfully",
      gig,
    });
  } catch (err) {
    console.log("Inside catch of get gig by id api", err);
    res.send({
      success: false,
      error: true,
      message: err.details[0].message,
    });
  }
};

module.exports.updateGigById = async (req, res) => {
  console.log("Inside updateGigById api");
  const {
    param: { gigId: _id },
    body,
  } = req;
  try {
    const gig = await Gig.findByIdAndUpdate(_id, {
      ...body,
    });
    res.send({
      success: true,
      error: false,
      message: "Gigs updated successfully",
      gig,
    });
  } catch (err) {
    console.log("Inside catch of update gig by id api", err);
    res.send({
      success: false,
      error: true,
      message: err.details[0].message,
    });
  }
};

module.exports.deleteGig = async (req, res) => {
  console.log("Inside deleteGig api");
  const {
    params: { id: _id },
  } = req;
  try {
    const gigs = await Gig.findByIdAndUpdate(_id, {
      isDeleted: true,
    });
    res.send({
      success: true,
      error: false,
      message: "Gig deleted successfully",
      gigs,
    });
  } catch (err) {
    console.log("Inside catch of delete gig by id api", err);
    res.send({
      success: false,
      error: true,
      message: err.details[0].message,
    });
  }
};

module.exports.postReview = async (req, res) => {
  console.log("Inside review gig api");
  const {
    body: { comment, gigId },
    user: { _id: reviewrId },
  } = req;
  try {
    const gig = await Gig.findById({ _id: gigId });
    const review = new ReviewGig({
      gig: gigId,
      reviewer: reviewrId,
      comment,
    });
    review.save();
    gig.reviews.push(review._id);
    gig.save();

    res.status(201).send({
      error: false,
      success: true,
      data: { review },
    });
  } catch (err) {
    console.log("err while reviewing gig: ", err);
    res.status(500).send({
      error: true,
      success: false,
      message: err.details[0].message,
    });
  }
};

module.exports.getGigsByEtags = async (req, res) => {
  console.log("Inside fetch gigs by eTags");
  const {
    body: { eTag },
  } = req;

  try {
    const gigs = await Gig.find({
      $and: [
        {
          $or: [
            { eTags: { $regex: eTag, $options: "i" } },
            { title: { $regex: eTag, $options: "i" } },
          ],
        },
        { isDeleted: false },
      ],
    })
      .populate({
        path: "ownerId",
      })
      .populate({
        path: "basic",
      })
      .populate({
        path: "standard",
      })
      .populate({
        path: "premium",
      })
      .populate({
        path: "reviews",
      });

    res.status(200).send({
      error: false,
      success: true,
      data: { gigs },
    });
  } catch (err) {
    console.log("get gigs by Etags: ", err);
    res.status(500).send({
      error: true,
      success: false,
      message: err.message,
    });
  }
};
