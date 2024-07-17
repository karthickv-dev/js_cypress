// parsers/service1Parser.js
module.exports = function parseService1(response) {
  return {
    serviceType: 'Service 1',
    data: {
      field1: response.fieldA,
      field2: response.fieldB,
    }
  };
};
