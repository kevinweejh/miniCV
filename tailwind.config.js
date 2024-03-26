/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{html,js,jsx}'],
    theme: {
        colors: {
            'regent-st-blue': {
                50: '#f3f9fc',
                100: '#e6f3f8',
                200: '#c7e7f0',
                300: '#9ed6e5',
                400: '#5ebbd2',
                500: '#39a4be',
                600: '#2985a0',
                700: '#226b82',
                800: '#20596c',
                900: '#1f4c5b',
                950: '#15303c',
            },
        },
        extend: {},
    },
    plugins: [],
};
