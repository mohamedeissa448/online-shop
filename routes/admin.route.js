const express = require("express");
const router = express.Router();
const adminGuard = require("./guards/admin.guard");
const adminController = require("../controllers/admin.controller");
router.get("/add", adminGuard.isAdmin, adminController.getAdd);
router.get("/orders", adminGuard.isAdmin);

module.exports = router;
