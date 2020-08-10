/*eslint-env node*/
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	devtool: "source-map",
	resolve: {
		alias: { "@": path.resolve(__dirname, "src") },
		extensions: [".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"], // excluded ".wasm"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "index.js",
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				enforce: "pre",
				loader: "eslint-loader",
				exclude: /node_modules/,
				options: {
					emitWarning: true,
					configFile: "./.eslintrc.js",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				loader: require.resolve("babel-loader"),
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		hot: true,
		overlay: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
};
