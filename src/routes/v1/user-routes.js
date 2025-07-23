const express = require("express");
const UserController = require("../../controllers/user-controller");
const {AuthRequestValidators} = require("../../middlewares/index");

const router = express().router;

router.post("/users/signup",AuthRequestValidators.validateUserAuth,UserController.create);
router.post("/users/signin",AuthRequestValidators.validateUserAuth,UserController.signIn);
router.get("/users/isauthenticated",UserController.isAuthenticated);
router.get("/users/:id",UserController.getUserById);
router.delete('/users/:id',UserController.deleteUser);

router.get("/users/isadmin",AuthRequestValidators.validateIsAdminRequest,UserController.isAdmin);

module.exports = router;