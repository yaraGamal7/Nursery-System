const express = require("express");
const controller = require("./../Controller/classController");
const validation = require("./../Core/validations/validationMiddleWare");
const classValidation = require("./../Validation/classesValidation");
const { checkAdmin, checkTeacherAndAdmin } = require("./../Core/auth/authenticationMiddleWare");
const router = express.Router();

router
	.route("/classes")
	.all(checkAdmin)
	.get(controller.getAllClasses)
	.post(classValidation.postValidation, validation, controller.addClass)
	.patch(classValidation.patchValidation, validation, controller.updateClass)
	.delete(classValidation.deleteClass, validation, controller.deleteClass);
router.get("/classes/:id", checkAdmin, classValidation.validateClassId, validation, controller.getClass);
router.get("/classChildren/:id", checkAdmin, classValidation.validateClassId, validation, controller.getClassChildren);
router.get("/classTeacher/:id", checkAdmin, classValidation.validateClassId, validation, controller.getClassTeacher);

module.exports = router;
