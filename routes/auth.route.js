const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { check } = require("express-validator");
//protect routes
const { isAuth, notAuth } = require("./guards/authguard");

router.get("/signup", notAuth, authController.getSignUp);
router.get("/login", notAuth, authController.getLogIn);
router.post(
  "/signup",
  notAuth,
  express.urlencoded({ extended: false }),
  check("username")
    .not()
    .isEmpty()
    .withMessage("username shouldn't be empty!"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email shouldn't be empty!")
    .isEmail()
    .withMessage("email doesn't match any email format!"),
  // password must be at least 8 chars long
  check("password")
    .isLength({ min: 8 })
    .withMessage("password length should be at least 8 characters!"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw "Password confirmation does not match password";
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  authController.postSignUp
);

router.post(
  "/login",
  notAuth,
  express.urlencoded({ extended: false }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email shouldn't be empty!")
    .isEmail()
    .withMessage("email doesn't match any email format!"),
  // password must be at least 8 chars long
  check("password")
    .isLength({ min: 8 })
    .withMessage("password length should be at least 8 characters!"),
  authController.postLogIn
);
router.all("/logout", isAuth, authController.LogOut);

module.exports = router;
