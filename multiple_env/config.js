// config.js
const config = {
    development: {
      db: {
        host: 'localhost',
        port: 27017,
        dbName: 'dev_db'
      },
      apiUrl: 'http://localhost:3000/api'
    },
    production: {
      db: {
        host: 'prod-db-server',
        port: 27017,
        dbName: 'prod_db'
      },
      apiUrl: 'https://api.example.com'
    }
  };
  
  const environment = process.env.NODE_ENV || 'development';
  
  module.exports = config[environment];
  