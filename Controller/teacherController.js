const mongoose = require("mongoose");
const teacherModel =require("./../Model/teacherModel");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const TeacherSchema = mongoose.model("teachers");

exports.getAllTeachers = (request, response, next) => {
	TeacherSchema.find({})
		.then((data) => {
			response.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};

exports.addTeacher = (request, response, next) => {
	if (request.file && request.file.path) {
		request.body.image = request.file.path;
	}
	new TeacherSchema({
	//	_id: request.body._id,
		fullName: request.body.fullName,
		password: bcrypt.hashSync(request.body.password, salt),
		email: request.body.email,
		image: request.body.image,
	})
		.save()
		.then((data) => {
			response.status(201).json({ data });
		})
		.catch((error) => next(error));
};

exports.updateTeacher = (request, response, next) => {
	let hashedPass = request.body.password ? bcrypt.hashSync(request.body.password, salt) : request.body.password;
	if (request.body.id != request.id) {
		let error = new Error("Not Authenticated");
		error.status = 401;
		next(error);
	} else {
		if (request.file && request.file.path) {
			request.body.image = request.file.path;
		}
		TeacherSchema.updateOne(
			{
				_id: request.body.id,
			},
			{
				$set: {
					fullName: request.body.fullName,
					password: hashedPass,
					email: request.body.email,
					image: request.body.image,
				},
			}
		)
			.then((data) => {
				if (data.matchedCount == 0) {
					next(new Error("Teacher Not Found"));
				} else {
					response.status(200).json({ data: "Updated" });
				}
			})
			.catch((error) => {
				next(error);
			});
	}
};


exports.deleteTeacher = (req, res, next) => {
	const teacherId = req.params.id;
	TeacherSchema
	  .findByIdAndDelete(teacherId)
	  .then((deletedTeacher) => {
		if (!deletedTeacher) {
		  res.status(404).json({ data: "teacher not exists" });
		}
		res
		  .status(200)
		  .json({
			message: "Teacher deleted successfully",
			data: deletedTeacher,
		  });
	  })
	  .catch((error) => next(error));
  };



exports.getTeacher = (request, response, next) => {
	TeacherSchema.findById(request.params.id)
		.then((data) => {
			console.log(data);
			if (data == null) {
				next(new Error("Teacher Not Found"));
			} else {
				response.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};


exports.changePassword = async (req, res, next) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await teacherModel.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(oldPassword, user.password);
            if (auth) {
				const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updateUser = await teacherModel.findByIdAndUpdate(user._id,
					{ password: hashedPassword},{
					new:true
				});
				res.status(200).json({updateUser});
            }
            else {
                res.status(401).json({ message: "Invalid password" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}