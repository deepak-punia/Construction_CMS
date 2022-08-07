const express = require("express");
const router = express.Router();
const CS_users = require("../../models/users");
const CS_custom = require("../../models/customizations");
const user = require("../../middleware/user");
const admin = require("../../middleware/admin");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join("./uploads"));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({ storage: storage });

//@route     GET api/customizations/
//@desc      GET custom settings
//@access    Public
router.get("/", async (req, res) => {
	try {
		const custom = await CS_custom.find();
		if (!custom) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Custom settings found." }] });
		}

		res.json(custom);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/customizations/promotion/update
//@desc      Update promotion
//@access    Private, Admin only
router.post(
	"/promotion/update",
	user,
	admin,
	[
		check("title").not().isEmpty().withMessage("Promo Title is required."),
		check("details").not().isEmpty().withMessage("Promo Details is required"),
	],
	async (req, res) => {
		//Checking for valid input fields with express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Destructuring fields from request body
		const { title, details } = req.body;
		try {
			const custom = await CS_custom.findOneAndUpdate(
				{ CS: "custom" },
				{ promotitle: title, promodetails: details }
			);
			if (!custom) {
				return res
					.status(400)
					.json({ errors: [{ msg: "No Custom promotion settings found." }] });
			}

			res.json(custom);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server Error");
		}
	}
);

//@route     POST api/customizations/promotion/:id
//@desc      ON/OFF promotion
//@access    Private, Admin only
router.post("/promotion/:id", user, admin, async (req, res) => {
	id = req.params.id;
	try {
		const custom = await CS_custom.findOneAndUpdate(
			{ CS: "custom" },
			{ promotions: id }
		);
		if (!custom) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Custom promotion settings found." }] });
		}

		res.json(custom);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/customizations/review
//@desc      Add review
//@access    Private, admin only
router.post(
	"/review",
	user,
	admin,
	[
		check("name").not().isEmpty().withMessage("Name is required."),
		check("details").not().isEmpty().withMessage("Details is required"),
		check("position").not().isEmpty().withMessage("Position is required"),
	],
	async (req, res) => {
		//Checking for valid input fields with express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Destructuring fields from request body
		const { name, details, position } = req.body;

		try {
			const reviewobj = {
				name,
				details,
				position,
			};

			const reviews = await CS_custom.findOneAndUpdate(
				{ CS: "custom" },
				{
					$push: {
						reviews: reviewobj,
					},
				}
			);
			if (!reviews) {
				return res.status(400).json({ errors: [{ msg: "No Reviews found." }] });
			}

			res.json({ msg: "Review is added." });
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     POST api/customizations/review/:id
//@desc      Delete review with id
//@access    Private, admin only
router.post("/review/:id", user, admin, async (req, res) => {
	const id = req.params.id;
	try {
		const custom = await CS_custom.findOne({ CS: "custom" });
		if (custom.reviews.length == 0) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No custom settings found." }] });
		}
		const reviews = custom.reviews.filter((item) => {
			return item._id != id;
		});

		await CS_custom.findOneAndUpdate(
			{ CS: "custom" },
			{
				reviews: reviews,
			}
		);

		res.send({ msg: "Review deleted." });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/customizations/pictures/style/:style
//@desc      Toggle pictures style GRID/SLIDER
//@access    Private, admin only
router.post("/pictures/style/:style", user, admin, async (req, res) => {
	style = req.params.style;
	try {
		const custom = await CS_custom.findOneAndUpdate(
			{ CS: "custom" },
			{ picturestyle: style }
		);
		if (!custom) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Custom Display Style settings found." }] });
		}

		res.json(custom);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/customizations/pictures/grid
//@desc      Add grid picture
//@access    Private, admin only
router.post(
	"/pictures/grid",
	user,
	admin,
	upload.single("grid"),
	async (req, res) => {
		try {
			let imgUrl;
			if (req.file) {
				imgUrl = req.file.path;
			} else {
				imgUrl = undefined;
				return res.status(400).json({
					errors: [{ msg: "Error. File is not uploaded. Please try again." }],
				});
			}
			const imagesdata = {
				url: imgUrl,
			};
			await CS_custom.findOneAndUpdate(
				{ CS: "custom" },
				{
					$push: {
						gridpictures: imagesdata,
					},
				}
			);
			res.json({ msg: "Uploaded." });
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     POST api/customizations/pictures/slider
//@desc      Add slider picture
//@access    Private, admin only
router.post(
	"/pictures/slider",
	user,
	admin,
	upload.single("slider"),
	async (req, res) => {
		try {
			let imgUrl;
			if (req.file) {
				imgUrl = req.file.path;
			} else {
				imgUrl = undefined;
				return res.status(400).json({
					errors: [{ msg: "Error. File is not uploaded. Please try again." }],
				});
			}
			const imagesdata = {
				url: imgUrl,
			};
			await CS_custom.findOneAndUpdate(
				{ CS: "custom" },
				{
					$push: {
						sliderpictures: imagesdata,
					},
				}
			);
			res.json({ msg: "Uploaded." });
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     POST api/customizations/pictures/theme/:theme
//@desc      Change theme
//@access    Private, admin only
router.post("/pictures/theme/:theme", user, admin, async (req, res) => {
	style = req.params.style;
	try {
		const custom = await CS_custom.findOneAndUpdate(
			{ CS: "custom" },
			{ theme: style }
		);
		if (!custom) {
			return res
				.status(400)
				.json({ errors: [{ msg: "No Custom Theme settings found." }] });
		}

		res.json(custom);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/customizations/pictures/delete/grid/:id
//@desc      Delete picture with id
//@access    Private, admin only
router.post("/pictures/delete/grid/:id", user, admin, async (req, res) => {
	const id = req.params.id;

	try {
		const custom = await CS_custom.findOne({ CS: "custom" });
		if (custom.gridpictures.length == 0) {
			return res.status(400).json({ errors: [{ msg: "No Pictures found." }] });
		}
		const picture = custom.gridpictures.filter((item) => {
			return item._id == id;
		});

		const pictures = custom.gridpictures.filter((item) => {
			return item._id != id;
		});

		await CS_custom.findOneAndUpdate(
			{ CS: "custom" },
			{
				gridpictures: pictures,
			}
		);
		//absolute file path
		//const picpath = path.join(__dirname , picture[0].url);

		fs.unlink(picture[0].url, (err) => {
			if (err) {
				console.error(err);
				throw new Error("File Path error");
				return;
			}

			//file removed
		});

		res.send({ msg: "Grid Picture deleted." });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/customizations/pictures/delete/slider/:id
//@desc      Delete picture with id
//@access    Private, admin only
router.post("/pictures/delete/slider/:id", user, admin, async (req, res) => {
	const id = req.params.id;

	try {
		const custom = await CS_custom.findOne({ CS: "custom" });
		if (custom.sliderpictures.length == 0) {
			return res.status(400).json({ errors: [{ msg: "No Pictures found." }] });
		}
		const picture = custom.sliderpictures.filter((item) => {
			return item._id == id;
		});

		const pictures = custom.sliderpictures.filter((item) => {
			return item._id != id;
		});

		await CS_custom.findOneAndUpdate(
			{ CS: "custom" },
			{
				sliderpictures: pictures,
			}
		);
		//absolute file path
		//const picpath = path.join(__dirname , picture[0].url);

		fs.unlink(picture[0].url, (err) => {
			if (err) {
				console.error(err);
				throw new Error("File Path error");
				return;
			}

			//file removed
		});

		res.send({ msg: "Slider Picture deleted." });
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
