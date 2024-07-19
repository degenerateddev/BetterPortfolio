/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'surface': '#000814',
				'primary': '#003566',
				'secondary': '#ffd60a'
			}
		},
	},
	plugins: [],
}
