const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /hello/{name}:
 *   get:
 *     description: Returns a JSON object with a message saying hello to the provided name
 *     parameters:
 *       - name: name
 *         in: path
 *         description: The name to greet
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The hello message
 */
router.get("/:name?", async (req, res) => {
  const name = req.params.name || "world";
  console.log("----->" + req.params.name);
  res.status(200).send({ message: `Hello, ${name}!` });
});

// Importing the router
module.exports = router;
