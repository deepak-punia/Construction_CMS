const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema({
	url: {
		type: String,
		default: null,
	},
});

const customSchema = new Schema({
	promotions: {
		type: String,
		required: true,
		default: "off",
	},
	promotitle: {
		type: String,
	},
	promodetails: {
		type: String,
	},
	reviews: [
		{
			name: {
				type: String,
			},
			details: {
				type: String,
			},
			position: {
				type: String,
			},
		},
	],
	gridpictures: [ImagesSchema],
	sliderpictures: [ImagesSchema],
	theme: {
		type: String,
	},
});

const CS_custom = mongoose.model("CS_custom", customSchema);

module.exports = CS_apt;
