// --- filepath: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
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

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: { extend: {} },
//   plugins: [],            // <— WICHTIG: Array, nicht Objekt
// }
