export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        pixora: {
          bg: "hsl(var(--bg) / <alpha-value>)",
          fg: "hsl(var(--fg) / <alpha-value>)",
          muted: "hsl(var(--muted) / <alpha-value>)",
          muted2: "hsl(var(--muted-2) / <alpha-value>)",
          surface: "hsl(var(--surface) / <alpha-value>)",
          surface2: "hsl(var(--surface-2) / <alpha-value>)",
          border: "hsl(var(--border) / <alpha-value>)",
          ring: "hsl(var(--ring) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
}
