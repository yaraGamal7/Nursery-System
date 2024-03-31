const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const teacherRoute = require("./Route/teacherRoute");
const childsRoute = require("./Route/childRouter");
const classesRoute = require("./Route/classRouter");
const loginRoute = require("./Route/loginRouter");
const authMW = require("./Core/auth/authenticationMiddleWare");
const server = express();
const dotenv = require("dotenv");


const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerFile = require("./swagger_output.json");


dotenv.config();

const port = process.env.port_number;
// Swagger Options
const swaggerOptions = {
	definition: {
	  openapi: '3.0.0',
	  info: {
		title: 'Your API Title',
		version: '1.0.0',
		description: 'Description of your API'
	  },
	  basePath: '/',
	},
	apis: ['./Route/*.js'], 
  };
  
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  
  // Serve Swagger UI
  server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.set("strictQuery", true);
mongoose
.connect(process.env.DB_url)
	.then(() => {
		console.log("dataBase Connection Success");
		server.listen(process.env.port_number, () => console.log(`listening on http://localhost:${port}`));
	})
	.catch((error) => {
		console.log("Connection Error: " + error);
	});
	
	server.use(cors());
	server.use(logger("dev"));
	
	server.use(express.json());
	
	
	server.use(express.urlencoded({ extended: false }));
	
server.use(loginRoute);
server.use(authMW);
server.use(teacherRoute);
server.use(childsRoute);
server.use(classesRoute);

server.use((require, result, next) => {
	result.status(404).json({ massage: "Not Found" });
});

server.use((error, require, result, next) => {
	let status = error.status || 500;
	result.status(status).json({ massage: error + "" });
});
