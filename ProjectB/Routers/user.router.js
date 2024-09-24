const express = require('express');
const userRoutes = express.Router();
const {
    showRegisterPage,
    registerUser,
    showLoginPage,
    loginUser,
} = require("../Controller/user.controller");


userRoutes.get("/register", showRegisterPage);
userRoutes.post("/register", registerUser);

userRoutes.get("/login", showLoginPage);
userRoutes.post("/login", loginUser);

userRoutes.get("/index",showLoginPage);


module.exports = userRoutes;