const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/login", authController.login);

router.put("/changePassword/:id", authController.changePassword);

// router.post('/logout', authController.logout);

module.exports = router;
