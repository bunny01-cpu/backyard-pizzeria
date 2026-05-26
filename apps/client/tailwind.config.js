const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/modals/**/*.{js,ts,jsx,tsx,mdx}',
        './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#feca57',       // Original Yellow
                black: '#2f2f2f',         // Original Dark
                red: '#ff6b6b',           // Original Red
                textGray: '#afafaf',      // Original Gray
                backgroundGray: '#fafafa', // Original Background
            },
        },
    },
    plugins: [],
};
