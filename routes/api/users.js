const express = require("express");
const router = express.Router();
const CS_users = require("../../models/users");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const user = require("../../middleware/user");
const admin = require("../../middleware/admin");

//@route     POST api/users/login
//@desc      User Login
//@access    Public
router.post(
	"/login",
	[
		check("email")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email address is not valid."),
		check("password")
			.isLength({ min: 5 })
			.withMessage("Password with minium length of 5 is required."),
	],
	async (req, res) => {
		//Checking for valid input fields with express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Destructuring fields from request body
		const { email, password } = req.body;

		try {
			const user = await CS_users.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Email is not valid" }] });
			}

			//validate password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
			}

			//send JSONwebtoken in response once user is validated
			const secretkay = config.get("SECRET_KEY");
			jwt.sign(
				{ email: user.email },
				secretkay,
				{
					expiresIn: 360000,
				},
				(error, token) => {
					if (error) {
						throw error;
					} else {
						res.json({ token });
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     POST api/users/register
//@desc      User Register
//@access    Public
router.post(
	"/register",
	[
		check("name").not().isEmpty().withMessage("Name is required."),
		check("email")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email address is not valid."),
		check("phone")
			.not()
			.isEmpty()
			.withMessage("Phone is required")
			.isLength({ min: 10 })
			.withMessage("Phone number is not valid."),
		check("password")
			.isLength({ min: 5 })
			.withMessage("Password with minium length of 5 is required."),
	],
	async (req, res) => {
		//Checking for valid input fields with express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Destructuring fields from request body
		const { name, phone, email, password } = req.body;

		try {
			const user = await CS_users.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists." }] });
			}

			//encrypt password
			const salt = await bcrypt.genSalt(8);
			const hash = await bcrypt.hash(password, salt);

			const userobj = new CS_users({
				username: name,
				phone,
				email,
				password: hash,
			});

			const userdata = await userobj.save();

			//send JSONwebtoken in response once user is saved in database
			const secretkay = config.get("SECRET_KEY");
			jwt.sign(
				{ email: userdata.email },
				secretkay,
				{
					expiresIn: 360000,
				},
				(error, token) => {
					if (error) {
						throw error;
					} else {
						res.json({ token });
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     GET api/users/user
//@desc      Get Logged in User details
//@access    Private
router.get("/user", user, async (req, res) => {
	try {
		const user = await CS_users.findOne({ email: req.user }).select(
			"-password"
		);

		res.json(user);
	} catch (err) {
		res.status(500).send("Server Error");
	}
});

//@route     GET api/users/users
//@desc      Get all users
//@access    Private, Admin only
router.get("/users", user, admin, async (req, res) => {
	try {
		const user = await CS_users.find().select("-password");

		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/users/user/:id
//@desc      Delete User with ID
//@access    Private
router.post("/user/:id", user, async (req, res) => {
	const id = req.params.id;
	if (!id) {
		res.status(400).json({ errors: [{ msg: "User ID is required." }] });
	}
	try {
		const users = await CS_users.findOneAndDelete({ _id: id });
		if (!users) {
			return res.status(400).json({ errors: [{ msg: "No User found." }] });
		}

		res.send({ msg: "User is deleted." });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
