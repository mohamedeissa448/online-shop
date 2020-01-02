const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
router.route("/:id").get(productController.getProduct);
router.route("/").get(productController.getFirstProduct);

module.exports = router;
