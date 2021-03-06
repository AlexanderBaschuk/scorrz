const webpack = require("webpack");
const custom = require("../webpack.config.js");
const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.tsx"],
	addons: [
		"@storybook/addon-actions/register",
		"@storybook/addon-links",
		"@storybook/addon-knobs/register",
		"@storybook/addon-storysource",
	],

	webpackFinal: (config) => {
		config.plugins.push(new webpack.HotModuleReplacementPlugin());

		config.module.rules.push({
			test: /\.stories\.(tsx|jsx)$/,
			loaders: [
				{
					loader: require.resolve("@storybook/source-loader"),
					options: { parser: "typescript" },
				},
			],
			enforce: "pre",
		});

		return {
			...config,
			resolve: {
				alias: { "@": path.resolve(__dirname, "../src")},
				extensions: custom.resolve.extensions,
			},
			module: {
				...config.module,
				rules: [...config.module.rules, ...custom.module.rules],
			},
		};
	},
};
