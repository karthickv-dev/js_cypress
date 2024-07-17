const express = require("express");
const dotenv = require("dotenv");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Creating express server
const app = express();

// Define Routes
const edeliveryRouter = require("./src/routes/fetchEdelivery");
const logger = require("./src/log/logger");

// Load config file
dotenv.config({ path: "./config.env" });

app.use(express.json());


const port = process.env.PORT || 3030;

if (global.__coverage__) {
  console.log("have code coverage, will add middleware for express");
  console.log(`to fetch: GET :${port}/__coverage__`);
  require("@cypress/code-coverage/middleware/express")(app);
}

// Handling routes request
app.use("/edelivery/details", edeliveryRouter);

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WDL E-Delivery details API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Route for all other paths
app.get("*", (req, res) => {
  res.send("404 Not Found!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  logger.writeLogFile(`App running on port ${port}...`, "INFO");
});
