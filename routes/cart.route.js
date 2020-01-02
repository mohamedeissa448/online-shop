const express = require("express");
const cartController = require("../controllers/cart.controller");
const router = express.Router();
const bodyParser = require("body-parser");
const { check } = require("express-validator");

//protect routes
const { isAuth } = require("./guards/authguard");
router.post(
  "/",
  isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .notEmpty()
    .withMessage("amount shouldn't be empty")
    .isInt({ min: 1 })
    .withMessage("amount should be greater than Zero"),
  cartController.postCart
);
router.post(
  "/save",
  isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .notEmpty()
    .withMessage("amount shouldn't be empty")
    .isInt({ min: 1 })
    .withMessage("amount should be greater than Zero"),
  cartController.postSave
);
router.post(
  "/delete",
  isAuth,
  bodyParser.urlencoded({ extended: true }),
  cartController.postDelete
);
router.post("/deleteAll", isAuth, cartController.postDeleteAll);
router.get("/", isAuth, cartController.getCart);
module.exports = router;
