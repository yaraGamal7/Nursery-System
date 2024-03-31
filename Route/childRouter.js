


const express = require("express");
const controller = require("./../Controller/childController");
const validation = require("./../Core/validations/validationMiddleWare");
const childValidation = require("./../Validation/childsValidation");
const { checkAdmin } = require("./../Core/auth/authenticationMiddleWare");
const swaggerJSDoc = require("swagger-jsdoc");
const router = express.Router();

router
	.route("/childs")
	.all(checkAdmin)
	.get(controller.getAllChilds)
	.post(childValidation.postValidation, validation, controller.addChild)
	.patch(childValidation.patchValidation, validation, controller.updateChild)
	.delete(childValidation.deleteValidation, validation, controller.deleteChild);
router.get("/childs/:id", checkAdmin, childValidation.getChildValidation, validation, controller.getChild);

module.exports = router;
