const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	//_id: mongoose.ObjectId,
	fullName: { type: String, required: true },
	password: { type: String, required: true },
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
		required: true,
	},
	image: { type: String, required: true },
});

mongoose.model("teachers", schema);

module.exports = mongoose.model("teachers");