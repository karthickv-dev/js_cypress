const fs = require("fs");
const path = require("path");

const helperFilterJson = require("../helper/filterJson");

exports.checkService = () => {
  // Check if file exists
  const parentDir = path.join(__dirname, "../..");
  const filePath = path.join(parentDir, "data.json");

  return fs.existsSync(filePath);
};

exports.fetchWdlInfo = (jsonRequestData) => {
  // Get the path to the parent directory of the current directory
  const parentDir = path.join(__dirname, "../..");
  const filePath = path.join(parentDir, "data.json");

  try {
    // Synchronously read the contents of the JSON file
    const data = fs.readFileSync(filePath, "utf8");

    const jsonData = helperFilterJson.filterJSON(
      JSON.parse(data),
      jsonRequestData
    );
    return jsonData;
  } catch (error) {
    return error;
  }
};
