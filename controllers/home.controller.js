const productsModel = require("../models/products.model");
exports.getHome = (req, res, next) => {
  if (req.query.category && req.query.category !== "All") {
    productsModel
      .getProductsByFilter(req.query.category)
      .then(products => {
        res.render("index", {
          products,
          isUser: req.session.userId,
          validationErrors: req.flash("validationErrors")
        });
      })
      .catch(err => next(err));
  } else {
    console.log("hhhhhhhhhhhh", req.flash("validationErrors")[0]);
    productsModel
      .getAllProducts()
      .then(products => {
        res.render("index", {
          validationError: req.flash("validationErrors")[0],
          products,
          isUser: req.session.userId
        });
      })
      .catch(err => next(err));
  }
};
