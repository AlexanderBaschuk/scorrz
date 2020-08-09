/*eslint-env node*/
module.exports = {
	clearMocks: true,
	moduleNameMapper: { "@/(.*)$": "<rootDir>/src/$1" },
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jestSettings.js"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	},
};
