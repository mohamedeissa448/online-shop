const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
exports.getSignUp = (req, res, next) => {
  res.render("signup", {
    validationErrors: req.flash("validationErrors"),
    isUser: false
  });
};

exports.postSignUp = (req, res, next) => {
  //if there is any validation errors ,we redirect to same page.
  const validationErrors = validationResult(req).errors;
  if (validationErrors.length !== 0) {
    req.flash("validationErrors", validationErrors);
    res.redirect("/signup");
    return;
  }

  userModel
    .createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => {
      res.redirect("/login");
    })
    .catch(err => {
      req.flash("validationErrors", err);
      res.redirect("/signup");
    });
};

exports.getLogIn = (req, res, next) => {
  const authError = req.flash("authError")[0];
  const validationErrors = req.flash("validationErrors");
  res.render("login", {
    authError,
    validationErrors,
    isUser: false
  });
};

exports.postLogIn = (req, res, next) => {
  //if there is any validation errors ,we redirect to same page.
  const validationErrors = validationResult(req).errors;
  if (validationErrors.length !== 0) {
    req.flash("validationErrors", validationErrors);
    res.redirect("/login");
    return;
  }
  userModel
    .getUser(req.body.email, req.body.password)
    .then(userId => {
      console.log(req.session);
      req.session.userId = userId;
      res.redirect("/");
    })
    .catch(err => {
      req.flash("authError", err);
      res.redirect("/login");
    });
};

exports.LogOut = (req, res, next) => {
  //destrou session on DB
  req.session.destroy(() => {
    //destroy session on client side
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};
