const productsModel = require("../models/products.model");
exports.getHome = (req, res, next) => {
  if (req.query.category && req.query.category !== "All") {
    productsModel
      .getProductsByFilter(req.query.category)
      .then(products => {
        res.render("index", {
          products
        });
      })
      .catch(err => next(err));
  } else {
    productsModel
      .getAllProducts()
      .then(products => {
        res.render("index", {
          products
        });
      })
      .catch(err => next(err));
  }
};
