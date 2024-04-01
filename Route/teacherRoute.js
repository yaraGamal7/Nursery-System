const express = require("express");
const controller = require("./../Controller/teacherController");
const validation = require("./../Core/validations/validationMiddleWare");
const teachervalidation = require("./../Validation/teachersValidations");
const { checkAdmin, checkTeacherAndAdmin } = require("./../Core/auth/authenticationMiddleWare");

const path = require("path");
const upload = require("../Core/Multer/MulterMiddleWare");


/**
 * @swagger
 * components:
 *   schemas:
 *     teachers:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: The teacher full name
 *         email:
 *           type: string
 *           description: The teacher email
 *         password:
 *           type: string
 *           description: The teacher password
 *         image:
 *           type: string
 *           format: binary
 *           description: The teacher image
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: the message description
 *             
 */


/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags : [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/teachers'
 *       401:
 *         description: unauthnticated error
 */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: The teacher id was not found
 */

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: add a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: The teacher was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers:
 *   put:
 *     summary: update teacher data
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              _id:
 *               type: string
 *               description: the teacher id
 *              fullname:
 *               type: string
 *               description: The teacher full name
 *              email:
 *               type: string
 *               description: The teacher email
 *              password:
 *               type: string
 *               description: The teacher password
 *              image:
 *               type: string
 *               format: binary
 *               description: The teacher image
 *     responses:
 *       201:
 *         description: The teacher was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers:
 *   delete:
 *     summary: delete a teacher from the db
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type : object
 *               properties:
 *                    _id:
 *                      type: string
 *                      description : the teacher id
 *     responses:
 *       200:
 *         description: The teacher was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *               
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers/changePassword:
 *   post:
 *     summary: change the password
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: the user id
 *                  password:
 *                      type: string
 *                      description: the new password
 *     responses:
 *       200:
 *         description: The password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: user not found         
 *       500:
 *         description: internal server error
 */


const router = express.Router();



router
	.route("/teachers")
	.all(checkAdmin)
	.get(controller.getAllTeachers)
	.post(upload.single("image"), teachervalidation.postValidation, validation, controller.addTeacher)
	.delete(teachervalidation.deleteValidation, validation, controller.deleteTeacher);

// router.patch(
// 	"/teachers",
// 	checkTeacherAndAdmin,
// 	upload.single("image"),

// 	teachervalidation.patchValidation,
// 	validation,
// 	controller.updateTeacher
// );

router
.route("/teachers/:id")
.get( checkAdmin, teachervalidation.getTeacherValidation, validation, controller.getTeacher)
.delete(teachervalidation.deleteValidation, validation, controller.deleteTeacher)
.patch(
	checkTeacherAndAdmin,
	upload.single("image"),

	teachervalidation.patchValidation,
	validation,
	controller.updateTeacher
)

router.put("/changePassword",
checkTeacherAndAdmin,
teachervalidation.ChangePasswordValidation,controller.changePassword);
module.exports = router;
