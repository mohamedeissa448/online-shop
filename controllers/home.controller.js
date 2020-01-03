const productsModel = require("../models/products.model");
exports.getHome = (req, res, next) => {
  if (req.query.category && req.query.category !== "All") {
    productsModel
      .getProductsByFilter(req.query.category)
      .then(products => {
        res.render("index", {
          products,
          isUser: req.session.userId,
          isAdmin: req.session.isAdmin,
          validationError: req.flash("validationErrors")[0]
        });
      })
      .catch(err => next(err));
  } else {
    productsModel
      .getAllProducts()
      .then(products => {
        res.render("index", {
          validationError: req.flash("validationErrors")[0],
          products,
          isUser: req.session.userId,
          isAdmin: req.session.isAdmin
        });
      })
      .catch(err => next(err));
  }
};
