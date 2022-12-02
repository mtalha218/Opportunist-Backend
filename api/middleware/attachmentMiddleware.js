const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, "public/uploads/resumes/");
    } else if (file.fieldname === "profileImg") {
      cb(null, "public/uploads/profileImages/");
    } else if (file.fieldname === "images") {
      cb(null, "public/uploads/images/");
    } else if (file.fieldname === "videos") {
      cb(null, "public/uploads/videos/");
    } else if (file.fieldname === "documents") {
      cb(null, "public/uploads/documents/");
    } else if (file.fieldname === "sourceFile") {
      cb(null, "public/uploads/sourceFiles/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    // if (file.fieldname === "profileImg") {
    // } else if (file.fieldname === "resume") {
    //   cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    // }
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 10,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  {
    name: "profileImg",
    maxCount: 1,
  },
  {
    name: "resume",
    maxCount: 1,
  },

  {
    name: "images",
    maxCount: 5,
  },
  {
    name: "videos",
    maxCount: 5,
  },
  {
    name: "documents",
    maxCount: 5,
  },
  {
    name: "sourceFile",
    maxCount: 1,
  },
]);

function checkFileType(file, cb) {
  if (file.fieldname === "resume") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "profileImg") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      fiel.mimetype === "image/gif"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (
    file.fieldname === "images" ||
    file.fieldname === "videos" ||
    file.fieldname === "sourceFile" ||
    file.fieldname === "documents"
  ) {
    cb(null, true);
  }
}
//at the save function

module.exports = upload;
