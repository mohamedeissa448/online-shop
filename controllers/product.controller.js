const productsModel = require("../models/products.model");

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  console.log(req.flash("validationErrors"));
  productsModel
    .getProductById(id)
    .then(product => {
      res.render("product", {
        product,
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationError: req.flash("validationErrors")[0]
      });
    })
    .catch(err => next(err));
};

exports.getFirstProduct = (req, res, next) => {
  productsModel
    .getFirstProductInDB()
    .then(product => {
      res.render("product", {
        product,
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationError: req.flash("validationErrors")[0]
      });
    })
    .catch(err => next(err));
};
