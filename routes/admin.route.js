const express = require("express");
const router = express.Router();
const adminGuard = require("./guards/admin.guard");
const adminController = require("../controllers/admin.controller");
var multer = require("multer");
const { check } = require("express-validator");

router.get("/add", adminGuard.isAdmin, adminController.getAdd);
//handling uploaded file by multer.
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
function fileFilter(req, file, cb) {
  // To accept the file pass `true`, like so:
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb(null, false);
  }
}
var upload = multer({ storage: storage, fileFilter: fileFilter });
router.post(
  "/add",
  adminGuard.isAdmin,
  upload.single("file"),
  check("name")
    .notEmpty()
    .withMessage("product name shouldn't be empty!"),
  check("price")
    .notEmpty()
    .withMessage("price shouldn't be empty!")
    .isFloat({ gt: 0 })
    .withMessage("price should be at least greater than zero!"),
  check("description")
    .notEmpty()
    .withMessage("description shouldn't be empty!"),
  check("category").custom((value, { req }) => {
    if (req.body.category) return true;
    else throw "Please select a category!";
  }),
  check("image").custom((value, { req }) => {
    if (req.file) return true;
    else throw "image is required";
  }),
  adminController.postAdd
);

router.get("/orders", adminGuard.isAdmin);

module.exports = router;
