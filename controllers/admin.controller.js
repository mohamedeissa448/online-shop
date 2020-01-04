const productModel = require("../models/products.model");
const { validationResult } = require("express-validator");

exports.getAdd = (req, res, next) => {
  res.render("add-product", {
    validationErrors: req.flash("validationErrors"),
    isUser: true,
    isAdmin: true,
    pageTitle: "addProduct"
  });
};

exports.postAdd = (req, res, next) => {
  const validationErrors = validationResult(req).errors;
  console.log("BODY", req.body);
  console.log("FILE", req.file);

  if (validationErrors.length !== 0) {
    //we have validation errors
    req.flash("validationErrors", validationErrors);
    res.redirect("/admin/add");
  } else {
    //add product to DB
    productModel
      .addNewProduct({
        name: req.body.name,
        image: req.file.filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
      })
      .then(() => res.redirect("/admin/add"))
      .catch(err => next(err));
  }
};
