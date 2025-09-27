import pkg from "../package.json";

export const federationConfig = () => ({
	name: "appContainer",
	remotes: [
		{
			name: "todoApp",
			entry: process.env["REMOTE_TODO_APP_URL"],
			type: "script",
		},
	],
	shared: {
		react: {
			version: pkg.dependencies["react"],
			shareConfig: {
				singleton: true,
				requiredVersion: pkg.dependencies["react"],
			},
		},
		"react-dom": {
			version: pkg.dependencies["react-dom"],
			shareConfig: {
				singleton: true,
				requiredVersion: pkg.dependencies["react-dom"],
			},
		},
	},
});
