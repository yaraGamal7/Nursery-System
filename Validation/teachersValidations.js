const { body, param } = require("express-validator");

exports.postValidation = [
	//body("_id").isMongoId().withMessage("Teacher Id should be Object"),
	body("fullName").isString().withMessage("Teacher Name should be string"),
	body("password").isString().withMessage("Password Must Be Hybird").isLength({ Min: 4 }).withMessage("Password must be > 8"),
	body("email").isEmail().withMessage("Email is Invalid"),
	body("image").optional().isString().withMessage("Image is Invalid"),
];

exports.patchValidation = [
	body("_id").isMongoId().withMessage("Teacher Id Must Be included"),
	body("fullName").optional().isString().withMessage("Teacher Name should be string"),
	body("password").optional().isString().withMessage("Password Must Be Hybird").isLength({ Min: 4 }).withMessage("Password must be > 8"),
	body("email").optional().isEmail().withMessage("Email is Invalid"),
	body("image").optional().isString().withMessage("Image is Invalid"),
];

exports.getTeacherValidation = [param("id").isMongoId().withMessage("Teacher Id should be Object")];

exports.deleteValidation = [body("_id").isMongoId().withMessage("Teacher Id should be Object")];

exports.ChangePasswordValidation = [	body("email").isEmail().withMessage("Email is Invalid"),
body("oldPassword").isString().withMessage("Password Must Be Hybird").isLength({ Min: 4 }).withMessage("Password must be > 8")
,
body("newPassword").isString().withMessage("Password Must Be Hybird").isLength({ Min: 4 }).withMessage("Password must be > 8")
];