const { body, param } = require("express-validator");

exports.postValidation = [
	// body("_id").isNumeric().withMessage("Class Id should be Entered"),
	body("fullName").isString().withMessage("Class Name should be string"),
	body("supervisor").isMongoId().withMessage("Teacher Id Is Invalid"),
	body("children").isArray().withMessage("Childrens Is Missing"),
	body("children.*").isInt().withMessage("Childrens ID is Invalid"),
];

exports.patchValidation = [
	// body("_id").isNumeric().withMessage("Class Id should be Entered"),
	body("fullName").optional().isString().withMessage("Class Name should be string"),
	body("supervisor").optional().isMongoId().withMessage("Teacher Id Is Invalid"),
	body("children").optional().isArray().withMessage("Childrens Is Missing"),
	body("children.*").optional().isInt().withMessage("Childrens ID is Invalid"),
];

exports.validateClassId = [param("id").isNumeric().withMessage("Class Id should be Entered")];

exports.deleteClass = [body("_id").isNumeric().withMessage("Class Id should be Entered")];
