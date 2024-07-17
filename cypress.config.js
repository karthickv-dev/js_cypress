const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  fixturesFolder: false,
  reporterOptions: {
    charts: true,
    reportDir: './cypress/cypress-report', // Directory where reports will be saved
    reportFilename: 'report', // Report filename (without extension)
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    codeCoverage: {
      url: 'http://localhost:3000/__coverage__'
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
  },
})
