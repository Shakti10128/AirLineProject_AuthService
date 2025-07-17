const express = require("express");

const router = express().router;

const userRoutes = require("./v1/user-routes");

router.use("/v1",userRoutes);

module.exports = router;