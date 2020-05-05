/*eslint-env node*/
module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		parser: "babel-eslint",
		sourceType: "module",
	},
	overrides: [
		{
			files: ["*.stories.tsx"],
			rules: {
				"no-restricted-syntax": ["off"],
			},
		},
	],
	plugins: ["react", "@typescript-eslint", "react-hooks"],
	rules: {
		"no-restricted-syntax": [
			"error",
			{
				selector: "ExportDefaultDeclaration",
				message: "Restricted default export, prefer named exports!",
			},
		],
		"react/prop-types": 0,
		"no-unused-vars": "off",
		"object-shorthand": 1,
	},
	settings: {
		react: {
			pragma: "React",
			version: "detect",
		},
	},
};
