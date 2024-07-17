const pino = require("pino");
const fs = require("fs");

exports.writeLogFile = (msg, lvl) => {
  // Create a writable stream to a log file
  const logStream = fs.createWriteStream("app.log", { flags: "a" });
  const date = new Date();

  // Create a Pino logger instance with the writable stream
  const logger = pino(
    {
      levels: lvl,
      base: null, // Disables default Pino object properties
      timestamp: () =>
        `,"time":"${(date.getDate() < 10 ? "0" : "") + date.getDate()}-${
          (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)
        }-${date.getFullYear()} ${
          (date.getHours() < 10 ? "0" : "") + date.getHours()
        }:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}:${
          (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
        }"`
    },
    logStream
  );

  // Log a message
  logger.debug(msg);
  logger.info(msg);
  logger.warn(msg);
  logger.error(msg);
  logger.fatal(msg);
};
