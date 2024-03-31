const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
	_id: Number,
	fullName: { type: String, required: true },
	supervisor: { type: mongoose.ObjectId },
	children: { type: [Number] },
});

schema.plugin(AutoIncrement, { id: "class_id", inc_field: "_id" });

mongoose.model("classes", schema);

module.exports = mongoose.model("classes");