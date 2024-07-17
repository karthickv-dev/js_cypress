// commonHandler.js
const parsersConfig = require('./config/parsersConfig');

function handleResponse(response, serviceType) {
  if (!parsersConfig[serviceType]) {
    throw new Error(`Unsupported service type: ${serviceType}`);
  }

  const parser = require(parsersConfig[serviceType]);
  return parser(response);
}

module.exports = handleResponse;
