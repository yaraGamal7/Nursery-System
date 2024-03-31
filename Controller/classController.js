const mongoose = require("mongoose");
require("./../Model/classModel");

const ClassSchema = mongoose.model("classes");
const TeacherSchema = mongoose.model("teachers");
const ChildSchema = mongoose.model("childrens");

const checkStudentsArray = async (request, result, next) => {
	let existing = await ChildSchema.find({ _id: { $in: request.body.children } });
	let notFound = request.body.children.filter((element) => {
		if (!existing.find((e) => e._id === element)) return element;
	});
	return notFound;
};

exports.getAllClasses = (request, response, next) => {
	ClassSchema.find({})
		.populate({ path: "supervisor", select: { fullName: 1 } })
		.populate({ path: "children", select: { fullName: 1 } })
		.then((data) => {
			response.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};

exports.getClass = (request, response, next) => {
	ClassSchema.findById({ _id: request.params.id })
		.populate({ path: "supervisor", select: { fullName: 1 } })
		.populate({ path: "children", select: { fullName: 1 } })
		.then((data) => {
			if (data == null) {
				next(new Error("Class Not Found"));
			} else {
				response.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};

exports.addClass = async (request, response, next) => {
	try {
		let supervisor = await TeacherSchema.findOne({ _id: request.body.supervisor });
		if (supervisor == null) {
			throw new Error("Teacher Not Found");
		}
		let notFound = await checkStudentsArray(request, response, next);
		if (notFound.length > 0) {
			throw new Error("Childrens [" + notFound + "] Not Found");
		}
		let data = await new ClassSchema({
			_id: request.body.id,
			fullName: request.body.fullName,
			supervisor: request.body.supervisor,
			children: request.body.children,
		}).save();
		response.status(201).json({ data });
	} catch (error) {
		next(error);
	}
};

exports.updateClass = async (request, response, next) => {
	try {
		let supervisor = await TeacherSchema.findOne({ _id: request.body.supervisor });
		if (supervisor == null) {
			throw new Error("Teacher Not Found");
		}
		let notFound = await checkStudentsArray(request, response, next);
		if (notFound.length > 0) {
			throw new Error("Childrens [" + notFound + "] Not Found");
		}
		const data = await new ClassShcema.updateOne(
			{
				_id: req.params._id,
			},
			{
				$set: {
					name: req.body.name,
					supervisor: req.body.supervisor,
					children: req.body.children,
				},
			}
		);
		if (data.modifiedCount == 0) {
			throw new Error("not found this class");
		}
		res.status(200).json({ data });
	} catch (error) {
		next(error);
	}
	response.status(200).json({ data: "Updated" });
};

exports.deleteClass = (request, response, next) => {
	ClassSchema.deleteOne({ _id: request.body.id })
		.then((data) => {
			// console.log(data);
			if (data.deletedCount != 1) {
				next(new Error("Class Not Found"));
			} else {
				response.status(200).json({ data: "Deleted" });
			}
		})
		.catch((error) => {
			next(error);
		});
};

exports.getClassChildren = (request, response, next) => {
	ClassSchema.findOne({ _id: request.params.id }, { children: 1 })
		.populate({ path: "children", select: { fullName: 1 } })
		.then((data) => {
			// console.log(data);
			if (data == null) {
				next(new Error("Cannot Find Class"));
			} else {
				response.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};

exports.getClassTeacher = (request, response, next) => {
	ClassSchema.findOne({ _id: request.params.id }, { supervisor: 1 })
		.populate({ path: "supervisor", select: { fullName: 1 } })
		.then((data) => {
			// console.log(data);
			if (data == null) {
				next(new Error("Canot Find Class"));
			} else {
				response.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};
