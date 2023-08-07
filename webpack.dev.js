const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: "./src/main.js",
	output: {
		filename: "script.js",
		path: path.resolve(__dirname, "build"),
	},
	plugins: [new HtmlWebpackPlugin({ template: "./src/main.html" })],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(svg|jpeg|jpg|glb)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "assets/[name].[ext]",
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|png)$/,
				type: "asset/resource",
			},
		],
	},
};
