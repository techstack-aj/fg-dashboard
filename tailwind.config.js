/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                fear: '#ef4444',
                neutral: '#f59e0b',
                greed: '#22c55e',
            },
        },
    },
    plugins: [],
}
