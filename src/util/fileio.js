const express = require("express");
const helperFilterJson = require("../helper/filterJson");

const router = express.Router();

const fs = require("fs");
const path = require("path");

// Get the path to the parent directory of the current directory
const parentDir = path.join(__dirname, "../..");

// Assuming your JSON file is named data.json and is in the same directory as this script
const filePath = path.join(parentDir, "data.json");

router.get("/", (req, res) => {
  // Reading the JSON file asynchronously
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.send(`Error reading file: ${err}`);
      return;
    }

    try {
      // Parsing the JSON data
      console.log(req.body);
      const jsonData = helperFilterJson.filterJSON(JSON.parse(data), req.body);
      let conv = JSON.stringify(jsonData);
      res.send(`Contents of the JSON file: ${conv}`);
    } catch (error) {
      res.send(`Error parsing JSON data: ${error}`);
    }
  });
});

// Importing the router
module.exports = router;
