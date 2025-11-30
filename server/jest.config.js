export default {
    testEnvironment: "node",
    transform: {},
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    collectCoverageFrom: ["routes/**/*.js", "index.js", "!**/node_modules/**"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
};
