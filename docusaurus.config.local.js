// @ts-check
// Local development config - overrides baseUrl for local testing
// Use this when testing locally (especially from WSL)

const config = require('./docusaurus.config.js');

// Override baseUrl for local development
// When serving locally, we don't need the /eco-balance-documentation/ prefix
config.baseUrl = '/';

module.exports = config;

