const userModel = require("../models/user.model");
exports.getSignUp = (req, res, next) => {
  res.render("signup");
};

exports.postSignUp = (req, res, next) => {
  userModel
    .createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => {
      res.redirect("/login");
    })
    .catch(err => res.redirect("/signup"));
};

exports.getLogIn = (req, res, next) => {
  res.render("login");
};

exports.postLogIn = (req, res, next) => {
  userModel
    .getUser(req.body.email, req.body.password)
    .then(userId => {
      console.log(req.session);
      req.session.userId = userId;
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.LogOut = (req, res, next) => {
  //destrou session on DB
  req.session.destroy(() => {
    //destrou session on client side
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};
