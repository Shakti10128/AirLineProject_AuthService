const express = require("express");
const UserController = require("../../controllers/user-controller");
const {AuthRequestValidators} = require("../../middlewares/index");

const router = express().router;

router.post("/signup",AuthRequestValidators.validateUserAuth,UserController.create);
router.post("/signin",AuthRequestValidators.validateUserAuth,UserController.signIn);
router.get("/isauthenticated",UserController.isAuthenticated);
router.get("/users/:id",UserController.getUserById);

router.get("/isadmin",AuthRequestValidators.validateIsAdminRequest,UserController.isAdmin);

module.exports = router;