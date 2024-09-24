const express = require('express');
const profileRoutes = express.Router();
const {
    showProfilePage,
    profilePage,
    updateProfile,
    editprofile,
    deleteProfile
} = require("../Controller/profile.controller");


profileRoutes.get("/", showProfilePage);
profileRoutes.post("/", profilePage);
profileRoutes.get("/:id/edit", editprofile);
profileRoutes.post("/:id/edit", updateProfile);
profileRoutes.post("/:id", deleteProfile);
module.exports = profileRoutes;