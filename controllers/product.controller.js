const productsModel = require("../models/products.model");

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  productsModel
    .getProductById(id)
    .then(product => {
      res.render("product", {
        product
      });
    })
    .catch(err => next(err));
};

exports.getFirstProduct = (req, res, next) => {
  productsModel
    .getFirstProductInDB()
    .then(product => {
      res.render("product", {
        product
      });
    })
    .catch(err => next(err));
};
