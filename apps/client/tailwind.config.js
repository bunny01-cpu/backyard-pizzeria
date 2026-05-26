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
                primary: '#C8102E',        // Italian Red
                green: '#007A33',          // Italian Green
                black: '#1C1C1C',          // Charcoal
                red: '#A50D24',            // Deep Red (hover)
                textGray: '#6B6B6B',       // Neutral Gray
                backgroundGray: '#F8F8F8', // Off-White
                cream: '#FFFFFF',          // White
            },
        },
    },
    plugins: [],
};
