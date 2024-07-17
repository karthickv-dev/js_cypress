// parsers/service2Parser.js
module.exports = function parseService2(response) {
  return {
    serviceType: 'Service 2',
    data: {
      field1: response.fieldX,
      field2: response.fieldY,
    }
  };
};
