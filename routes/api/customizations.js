const express = require("express");
const router = express.Router();

//@route     POST api/customizations/promotion
//@desc      ON/OFF promotion
//@access    Private, Admin only
router.post("/promotion", (req, res) => {
	res.send("api on / off promotion");
});

//@route     POST api/customizations/promotion/update
//@desc      Update promotion
//@access    Private, Admin only
router.post("/promotion/update", (req, res) => {
	res.send("api update promotion");
});

//@route     POST api/customizations/review
//@desc      Add review
//@access    Private, admin only
router.post("/review", (req, res) => {
	res.send("api add review");
});

//@route     POST api/customizations/review/:id
//@desc      Delete review with id
//@access    Private, admin only
router.post("/review/:id", (req, res) => {
	res.send("api delete review with id");
});

//@route     POST api/customizations/pictures/style
//@desc      Toggle pictures style GRID/SLIDER
//@access    Private, admin only
router.post("/pictures/style", (req, res) => {
	res.send("api toggle pictures style");
});

//@route     POST api/customizations/pictures/grid
//@desc      Add grid picture
//@access    Private, admin only
router.post("/pictures/grid", (req, res) => {
	res.send("api add Grid picture");
});

//@route     POST api/customizations/pictures/:id
//@desc      Delete picture with id
//@access    Private, admin only
router.post("/pictures/:id", (req, res) => {
	res.send("api Delete picture with id");
});

//@route     POST api/customizations/pictures/slider
//@desc      Add slider picture
//@access    Private, admin only
router.post("/pictures/slider", (req, res) => {
	res.send("api add slider picture");
});

//@route     POST api/customizations/pictures/theme
//@desc      Change theme
//@access    Private, admin only
router.post("/pictures/theme", (req, res) => {
	res.send("api Change theme");
});
