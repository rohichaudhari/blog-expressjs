require("dotenv").config()
const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ports = process.env.PORTS;
const app= express();
const passport = require('passport');
const session = require('express-session');
require('./config/passportlocal');
// View Engine configuration
app.set("view engine", "ejs");

// in-built middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render('Register.ejs');
});
// server.get("/index", (req, res) => {
//     res.render('index.ejs');
// });


// User routes
const userRoutes = require("./Routers/user.router");
const profileRoutes= require("./Routers/profile.routers");


app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);

app.listen(ports, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log(`Database connected sucessfully`))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${ports}`);
})