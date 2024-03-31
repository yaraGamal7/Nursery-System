const { body, param } = require("express-validator");

exports.postValidation = [
	body("_id").isNumeric().withMessage("Child Id should be Number"),
	body("fullName").isString().withMessage("Child Name should be string"),
	body("age").isInt().withMessage("Child age is Invalid"),
	body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Invalid Level Selection"),
	body("address").isObject().withMessage("Address is Invalid"),
	body("address.city").isString().withMessage("Invalid City"),
	body("address.street").isString().withMessage("Invalid Street"),
	body("address.building").isInt().withMessage("Invalid Building Number"),
];

exports.patchValidation = [
	body("_id").isNumeric().withMessage("Child Id should be Number"),
	body("fullName").optional().isString().withMessage("Child Name should be string"),
	body("age").optional().isInt().withMessage("Child age is Invalid"),
	body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("Invalid Level Selection"),
	body("address").optional().isObject().withMessage("Address is Invalid"),
	body("address.city").optional().isString().withMessage("Invalid City"),
	body("address.street").optional().isString().withMessage("Invalid Street"),
	body("address.building").optional().isInt().withMessage("Invalid Building Number"),
];

exports.getChildValidation = [param("id").isNumeric().withMessage("Child Id should be Number")];

exports.deleteValidation = [body("_id").isNumeric().withMessage("Child Id should be Number")];
