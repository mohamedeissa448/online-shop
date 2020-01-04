const cartModel = require("../models/cart.model.js");
const { validationResult } = require("express-validator");

exports.postCart = (req, res, next) => {
  //if input isnot validated ,
  const validationErrors = validationResult(req).errors;
  if (validationErrors.length !== 0) {
    req.flash("validationErrors", validationErrors);
    res.redirect(req.body.redirectTo);
    return;
  }

  cartModel
    .addNewItem({
      name: req.body.name,
      price: req.body.price,
      amount: req.body.amount,
      userId: req.session.userId,
      productId: req.body.productId,
      timestamp: Date.now()
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => next(err));
};

exports.getCart = (req, res, next) => {
  cartModel
    .getItemsByUserId(req.session.userId)
    .then(items => {
      res.render("cart", {
        items: items,
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationError: req.flash("validationErrors")[0],
        pageTitle: "cart"
      });
    })
    .catch(err => next(err));
};

exports.postSave = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .editCart(req.body.cartId, {
        amount: req.body.amount,
        timestamp: Date.now()
      })
      .then(() => res.redirect("/cart"))
      .catch(err => next(err));
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/cart");
  }
};

exports.postDelete = (req, res, next) => {
  cartModel
    .deleteCart(req.body.cartId)
    .then(() => res.redirect("/cart"))
    .catch(err => next(err));
};
exports.postDeleteAll = (req, res, next) => {
  cartModel
    .deleteAllCarts()
    .then(() => res.redirect("/cart"))
    .catch(err => next(err));
};
