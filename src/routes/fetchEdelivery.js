const express = require("express");
const router = express.Router();

const dbService = require("../services/dbService");
const fileioService = require("../services/fileioService");
const textMap = require("../static/textMap.json");
const errorMap = require("../static/errorMap.json");

/**
 * @swagger
 * /edelivery/details/:
 *   post:
 *     summary: Get WDL account details
 *     description: Returns JSON with account details *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *                accountNo:
 *                  type: string
 *                accountType:
 *                  type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountNo:
 *                   type: string
 *                 accountType:
 *                   type: string
 *                 gdpEdelivery:
 *                   type: integer
 *                 pershingEdelivery:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 error:
 *                   type: object
 *
 */
router.post("/", async (req, res) => {
  try {
    if (req.body.length) {
      // Check if 3rd party service is available
      const isServiceAvailable = await fileioService.checkService();
      if (isServiceAvailable) {
        const thirdPartyServiceData = await fileioService.fetchWdlInfo(
          req.body
        );
        console.log(
          "Fetching data from 3rd party service & updating WDL cache if new data"
        );

        // Insert or update WDL cache
        await dbService.updateWdlCache(thirdPartyServiceData.matched);

        if (thirdPartyServiceData.matched.length > 0)
          res.send(thirdPartyServiceData.matched);
        //res.status(204).send("No Content");
        else {
          const notCompatibleType = [];
          notCompatibleType.push({
            [textMap.accountNo]: req.body[0].accountNo,
            [textMap.accountType]: req.body[0].accountType,
            [textMap.gdpEdelivery]: null,
            [textMap.pershingEdelivery]: null,
            [textMap.createdAt]: null,
            [textMap.error]: {
              [textMap.errorCode]: errorMap.errorMsg_002.code,
              [textMap.errorMsg]: errorMap.errorMsg_002.msg,
            },
          });
          res.status(200).send(notCompatibleType);
        }
      } else {
        console.log("Fetching from WDL cache...");

        // First check if the required information is available in the WDL cache
        const result = await dbService.fetchWdlCache(req.body);

        /* Return result if length of request & response is equal 
         which indicates all the required data is available in WDL cache & fetched */
        if (req.body.length == result.length) {
          console.log("Fetched all data from WDL cache...");
          res.send(result);
          return;
        }

        // Identify the missing data in WDL cache
        let missingData = [];
        const resAccountNumbers = result.map((account) => account.accountNo);

        // Identify missing account numbers and their indices in requestBody
        const notCompatibleType = [];
        req.body.forEach((account, index) => {
          if (!resAccountNumbers.includes(account.accountNo)) {
            if (
              account.accountType != textMap.trust &&
              account.accountType != textMap.brokerage
            ) {
              notCompatibleType.push({
                [textMap.accountNo]: account.accountNo,
                [textMap.accountType]: account.accountType,
                [textMap.gdpEdelivery]: null,
                [textMap.pershingEdelivery]: null,
                [textMap.createdAt]: null,
                [textMap.error]: {
                  [textMap.errorCode]: errorMap.errorMsg_002.code,
                  [textMap.errorMsg]: errorMap.errorMsg_002.msg,
                },
              });
              return;
            } else {
              notCompatibleType.push({
                [textMap.accountNo]: account.accountNo,
                [textMap.accountType]: account.accountType,
                [textMap.gdpEdelivery]: null,
                [textMap.pershingEdelivery]: null,
                [textMap.createdAt]: null,
                [textMap.error]: {
                  [textMap.errorCode]: errorMap.errorMsg_001.code,
                  [textMap.errorMsg]: errorMap.errorMsg_001.msg,
                },
              });
              return;
            }
            //missingData.push(req.body[index]);
          }
        });

        console.log(
          "Missing data in WDL cache:",
          JSON.stringify(missingData),
          JSON.stringify(notCompatibleType)
        );
        const mergedData = result.concat(missingData).concat(notCompatibleType);

        if (mergedData.length > 0) res.send(mergedData);
        else res.status(204).send("No Content");
      }
    }
  } catch (error) {
    res.send(`${errorMap.errorMsg_003}: ${error}`);
  }
});

// Importing the router
module.exports = router;
