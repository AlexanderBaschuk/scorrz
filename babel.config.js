/*eslint-env node*/
module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current",
				},
				//modules: false,
			},
		],
		"@babel/preset-typescript",
		"@babel/preset-react",
	],
	env: {
		production: {
			plugins: ["@emotion"],
		},
		development: {
			plugins: [["@emotion", { sourceMap: true }]],
		},
	},
};
