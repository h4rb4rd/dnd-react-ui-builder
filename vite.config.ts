import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const reactConfig = {
	babel: {
		plugins: ['babel-plugin-react-compiler'],
	},
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(reactConfig)],

	server: {
		port: 3000,
		open: true,
	},
})
