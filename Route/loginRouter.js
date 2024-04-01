const express = require("express");
const controller = require("./../Controller/loginController");
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: The login name
 *         password:
 *           type: string
 *           description: The login password
 *             
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login on to the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: login is successful
 *       404:
 *         description: Incorrect Email or Password
 */


router.post("/login", controller.login);

module.exports = router;
