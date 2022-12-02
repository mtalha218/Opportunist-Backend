var multer = require("multer");
var path = require("path");

let upload = () => {
  return multer({
    fileSize: 4000000,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/uploads");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  });
};

module.exports.singleUploadMiddleware = (req, res, next) => {
  return upload().single("profileImg")(req, res, () => {
    if (req?.body?.profileImg) {
      return next();
    } else if (!req.file) return res.json({ error: "invalid file type" });
    next();
  });
};

module.exports.uploadResumeMiddleware = (req, res, next) => {
  return upload().single("resume")(req, res, () => {
    if (req?.body?.resume) {
      return next();
    } else if (!req.file) return res.json({ error: "invalid file type" });
    next();
  });
};
