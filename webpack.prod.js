const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
						pure_funcs: [
							"console.info",
							"console.debug",
							"console.warn",
						],
					},
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
		splitChunks: {
			chunks: "all",
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)[1];
						return `npm.${packageName.replace("@", "")}`;
					},
				},
			},
		},
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
		publicPath: "auto",
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
});
