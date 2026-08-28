tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1F88B6',
                secondary: '#111827',
                accent: '#F3F4F6',
                purple: '#A558A5',
                medical: {
                    50: '#F0F9FF',
                    100: '#E0F2FE',
                    500: '#1F88B6',
                    900: '#0C4A6E',
                }
            },
            fontSize: {
                'xxs': '0.625rem', // 10px
                'tiny': '0.5rem',  // 8px
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '100': '100',
            },
            spacing: {
                '150': '37.5rem', // 600px
                '175': '43.75rem', // 700px
            },
            minHeight: {
                '150': '37.5rem',
                '175': '43.75rem',
            },
            aspectRatio: {
                'portrait': '9/16',
                'card': '4/5',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                header: ['Syncopate', 'sans-serif'],
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        }
    }
}
