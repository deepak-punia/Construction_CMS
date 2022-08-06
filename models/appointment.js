const mongoose = require("mongoose");

const slotSchema = new Schema ({
    apt_time: {
		type: String,
        required: true
	},
    apt_date: {
		type: String,
        required: true
	},
    date: {
		type: Date,
		default: Date.now,
	},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CS_users',
    }
  });

const CS_apt = mongoose.model("CS_apt", slotSchema);

module.exports = CS_apt;