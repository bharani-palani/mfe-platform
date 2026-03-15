/** @type {import('tailwindcss').Config} */
const config = require('@repo/tailwind-config/tailwindConfig')

module.exports = {
  ...config,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/**/*.{js,jsx,ts,tsx}',
  ],
}
