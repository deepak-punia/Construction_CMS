const express = require("express");
const router = express.Router();
const user = require("../../middleware/user");
const admin = require("../../middleware/admin");
const { check, validationResult } = require("express-validator");
const CS_apt = require("../../models/appointment");
const CS_users = require("../../models/users");

//@route     GET api/appointments/
//@desc      Get all appointments
//@access    Private
router.get("/", user, async (req, res) => {
	try {
		const apt = await CS_apt.find();
		if (!apt) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Appointment found." }] });
		}

		res.json(apt);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     GET api/appointments/:userid
//@desc      Get all appointments for user
//@access    Private
router.get("/:userid", user, async (req, res) => {
	const id = req.params.userid;
	try {
		const apt = await CS_apt.find({ user: id });
		if (!apt) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Appointment found." }] });
		}

		res.json(apt);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     GET api/appointments/one/:id
//@desc      Get appointment details
//@access    Private
router.get("/one/:id", user, async (req, res) => {
	const id = req.params.id;
	try {
		const apt = await CS_apt.findOne({ _id: id });
		if (!apt) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Appointment found." }] });
		}

		res.json(apt);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/appointments/
//@desc      Create appointment
//@access    Private
router.post(
	"/",
	user,
	[
		check("apt_time").not().isEmpty().withMessage("Time is required."),
		check("apt_date").not().isEmpty().withMessage("Date is required"),
	],
	async (req, res) => {
		//Checking for valid input fields with express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Destructuring fields from request body
		const { apt_time, apt_date } = req.body;

		try {
			const userdata = await CS_users.findOne({ email: req.user });

			const aptrobj = new CS_apt({
				apt_time,
				apt_date,
				user: userdata._id,
			});

			const userdata1 = await aptrobj.save();
			res.json(userdata1);
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     POST api/appointments/one/:id
//@desc      Delete one appointments
//@access    Private
router.post("/one/:id", user, async (req, res) => {
	const id = req.params.id;
	try {
		const apt = await CS_apt.findOneAndDelete({ _id: id });
		if (!apt) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Appointment found." }] });
		}

		res.send({ msg: "Appointment is deleted." });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
