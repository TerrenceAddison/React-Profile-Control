module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/test/**/*.test.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|jpg)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  testTimeout: 10000,
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$",
    "^.+\\.module\\.(css|sass|scss)$",
    "[/\\\\]esm[/\\\\].+\\.(js|jsx|mjs)$",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
