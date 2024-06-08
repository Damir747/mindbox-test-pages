const { defaults } = require('jest-config');

/** @type {import('jest').Config} */
const config = {
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts', 'js', 'ts', 'tsx'],
};

module.exports = config;