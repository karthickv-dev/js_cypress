const textMap = require("../static/textMap.json");
const errorMap = require("../static/errorMap.json");

// Returns JSON array by matching the data from filterJsonArray in jsonData
exports.filterJSON = (jsonData, filterJsonArray) => {
  const matchedData = [];
  const unmatchedData = [];

  jsonData.forEach((item) => {
    if (
      filterJsonArray.some(
        (criteria) =>
          criteria.accountNo === item.accountNo &&
          criteria.accountType === item.accountType
      )
    ) {
      matchedData.push(item);
    } else {
      //unmatchedData.push(item);
      unmatchedData.push({
        [textMap.accountNo]: item.accountNo,
        [textMap.accountType]: item.accountType,
        [textMap.gdpEdelivery]: null,
        [textMap.pershingEdelivery]: null,
        [textMap.createdAt]: null,
        [textMap.error]: {
          [textMap.errorCode]: errorMap.errorMsg_001.code,
          [textMap.errorMsg]: errorMap.errorMsg_001.msg,
        },
      });
    }
  });

  return {
    matched: matchedData,
    unmatched: unmatchedData,
  };
};
