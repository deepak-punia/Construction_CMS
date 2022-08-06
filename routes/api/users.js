const express = require("express");
const router = express.Router();

//@route     POST api/users/login
//@desc      User Login
//@access    Public
router.post("/login", (req, res) => {
	res.send("api Login");
});

//@route     POST api/users/register
//@desc      User Register
//@access    Public
router.post("/register", (req, res) => {
	res.send("api Register");
});

//@route     GET api/users/user
//@desc      Get Logged in User details
//@access    Private
router.get("/user", (req, res) => {
	res.send("api User Details");
});

//@route     GET api/users/users
//@desc      Get all users
//@access    Private, Admin only
router.get("/users", (req, res) => {
	res.send("api All users for admin");
});

//@route     POST api/users/user/:id
//@desc      User Register
//@access    Private
router.post("/user/:id", (req, res) => {
	res.send("api delete user with id");
});
