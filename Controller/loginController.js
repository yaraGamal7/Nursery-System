const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
require("./../Model/teacherModel");
const TeacherSchema = mongoose.model("teachers");
const dotenv = require("dotenv");


exports.login = (request, response, next) => {
	if (request.body.fullName == "admin" && request.body.password == "123456") {
		let token = jwt.sign({ id: 1, role: "admin" }, process.env.SECRET_KEY, { expiresIn: "2h" });
		response.status(200).json({ message: "Authenticated", token });
	} else {
		TeacherSchema.findOne({ fullName: request.body.fullName })
			.then((data) => {
				if (data == null) {
					let error = new Error("Not Authenticated");
					error.status = 401;
					next(error);
				} else {
					let checkPass = bcrypt.compareSync(request.body.password, data.password);
					if (!checkPass) {
						let error = new Error("Not Authenticated");
						error.status = 401;
						next(error);
					} else {
						let token = jwt.sign({ id: data._id, role: "teacher" }, process.env.SECRET_KEY, { expiresIn: "2h" });
						response.status(200).json({ message: "Authenticated", token });
					}
				}
			})
			.catch((error) => {
				next(error);
			});
	}
};
