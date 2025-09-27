import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: { main: "#1976d2" },
		secondary: { main: "#9c27b0" },
		grey: {
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
		},
	},
	typography: {
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		h6: { fontWeight: 600 },
		body1: { fontSize: "1rem" },
		body2: { fontSize: "0.875rem" },
	},
	spacing: 8,
	shape: {
		borderRadius: 8,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
	},
});

export default theme;
