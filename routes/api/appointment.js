const express = require("express");
const router = express.Router();

//@route     GET api/appointments/
//@desc      Get all appointments
//@access    Private, Admin only
router.get("/", (req, res) => {
	res.send("api delete user with id");
});

//@route     GET api/appointments/:userid
//@desc      Get all appointments
//@access    Private
router.get("/:userid", (req, res) => {
	res.send("api get users appointment");
});

//@route     GET api/appointments/one/:id
//@desc      Get all appointments
//@access    Private
router.get("/one/:id", (req, res) => {
	res.send("api get 1 appointment details with id");
});

//@route     POST api/appointments/
//@desc      Create appointment
//@access    Private
router.post("/", (req, res) => {
	res.send("api create appointment");
});

//@route     POST api/appointments/one/:id
//@desc      Delete one appointments
//@access    Private
router.post("/one/:id", (req, res) => {
	res.send("api delete 1 appointment details with id");
});
