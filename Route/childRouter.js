const express = require("express");
const controller = require("./../Controller/childController");
const validation = require("./../Core/validations/validationMiddleWare");
const childValidation = require("./../Validation/childsValidation");
const { checkAdmin } = require("./../Core/auth/authenticationMiddleWare");
const swaggerJSDoc = require("swagger-jsdoc");
const router = express.Router();

const path = require("path");
const upload = require("./../Core/Multer/MulterMiddleWare");

router
    .route("/childs")
    .all(checkAdmin)
    .get(controller.getAllChilds)
    .post(
        upload.single("image"),
        childValidation.postValidation,
        validation,
        controller.addChild
    )
    // .patch(childValidation.patchValidation, validation, controller.updateChild);

// Update Swagger documentation to include image field in post request
/**
 * @swagger
 * /childs:
 *   post:
 *     summary: add a new child
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The child's full name
 *               age:
 *                 type: number
 *                 description: The child's age
 *               level:
 *                 type: string
 *                 description: The child's level
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   street:
 *                     type: string
 *                   building:
 *                     type: number
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The child's image
 *     responses:
 *       201:
 *         description: The child was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

router.route("/childs/:id")
    .get(checkAdmin, childValidation.getChildValidation, validation, controller.getChild)
    .delete(childValidation.deleteValidation, validation, controller.deleteChild)
    .patch(upload.single("image"), childValidation.patchValidation, validation, controller.updateChild);

module.exports = router;
