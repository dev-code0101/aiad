/** @type {import('jest').Config} */
const config = {
  verbose: true,
  //   testRunner: "<rootDir>/node_modules/jest-circus/build/runner.js",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};

module.exports = config;
