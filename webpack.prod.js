const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	entry: "./src/main.js",
	output: {
		filename: "script.[contenthash].js",
		path: path.resolve(__dirname, "build"),
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "styles.[hash].css" }),
		new HtmlWebpackPlugin({ template: "./src/main.html" }),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
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
						name: "assets/[name].[hash].[ext]",
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
