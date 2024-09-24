const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const passport = require('passport')
// const jwt=require('jsonwebtoken');

// Registration

exports.showRegisterPage = async (req, res) => {
    try {
        res.render('register.ejs');   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ ...req.body, password: hashPassword });

        // user.save();
        // res.status(201).json({user,message:"User Registration successful"});
        res.redirect('/api/users/login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.showLoginPage = async (req, res) => {
    try {
        res.render('login.ejs');   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.loginUser = async (req,res) =>{
    try {
        let user = await User.findOne({email: req.body.email,isDelete: false});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        let matchPassword = await bcrypt.compare(req.body.password,user.password);
        console.log(matchPassword);
        if(!matchPassword){
            return res.status(404).json({message:'email and password not match'});
        }
        const token=jwt.sign(
            {id:user._id},'hhhh',
            {expiresIn:"2h"}
        );
        user.token=token
        // let token = await jwt.sign({userId: user._id},process.env.JWT_SECRET);
        // res.status(200).json({message:'Login success',token});
        //    res.status(200).json(token);
           res.redirect('/api/profile');
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internav server error'})
    }
};
// exports.loginUser = passport.authenticate("local", {
//     successRedirect: '/api/profile/',
//     failureRedirect: '/api/users/login',
//     failureFlash: true,
//   });

exports.updateProfile= async (req,res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(
            user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user,message:"User update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.deleteUser= async (req,res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(
            user._id,
            {isDelete: true},
            {new:true}
        );
        res.status(202).json({user,message:"User update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

