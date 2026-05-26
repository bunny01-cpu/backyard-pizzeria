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
                primary: '#C0392B',       // Brick Red
                black: '#1C1C1C',         // Charcoal Black
                red: '#A93226',           // Deep Red
                textGray: '#8B7355',      // Warm Brown-Gray
                backgroundGray: '#FAF7F2', // Cream White
                cream: '#F5F0E8',         // Off-White
            },
        },
    },
    plugins: [],
};
