// tailwind.config.ts - Updated with Classic theme support
import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
        ".src/*.{js,jsx,ts,tsx}"
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            fontFamily: {
                NewTimesRoman: ['NewTimesRoman'],
                Burtons: ['burtons']
            },
            colors: {
                // Custom dark mode colors
                dark: {
                    50: '#f8f9fa',
                    100: '#e9ecef',
                    200: '#dee2e6',
                    300: '#ced4da',
                    400: '#adb5bd',
                    500: '#6c757d',
                    600: '#495057',
                    700: '#343a40',
                    800: '#212529',
                    900: '#121417',
                },
                // Classic theme colors (Professional white/black)
                classic: {
                    // Backgrounds
                    bg: '#FFFFFF',
                    bgSecondary: '#F9FAFB',
                    bgCard: '#FFFFFF',
                    
                    // Text
                    text: '#111827',
                    textSecondary: '#4B5563',
                    textMuted: '#6B7280',
                    
                    // Borders
                    border: '#E5E7EB',
                    borderDark: '#D1D5DB',
                    
                    // Accents
                    accent: '#3B82F6',
                    accentHover: '#2563EB',
                    success: '#10B981',
                    error: '#EF4444',
                    warning: '#F59E0B',
                },
                // Pastel theme colors
                pastel: {
                    // Primary mint & blue tones
                    mint: '#B4E7CE',
                    blue: '#A8D8EA',
                    babyblue: '#C6E2FF',
                    cyan: '#D4F1F4',

                    // Light backgrounds
                    mintlight: '#E8F5E9',
                    bluelight: '#F0F8FF',
                    aqua: '#B8E6E0',
                    mintdark: '#7DD3C0',

                    // Complementary accents
                    pink: '#FFE5E5',
                    cream: '#FFF4E6',
                    lavender: '#E8D5F2',

                    lightRed: '#f5a4b9',
                    lightGreen: 'rgba(175,245,176,0.57)',
                    
                    // Text colors
                    text: '#4A5568',
                    textlight: '#718096',
                    border: '#E2E8F0'
                }
            },
            // Add custom animations for theme transitions
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'circuit-flow': 'circuitFlow 4s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                circuitFlow: {
                    '0%': { transform: 'translateX(0%) scaleX(0)', opacity: '0' },
                    '50%': { transform: 'translateX(50%) scaleX(1)', opacity: '1' },
                    '100%': { transform: 'translateX(100%) scaleX(0)', opacity: '0' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};

export default config;
