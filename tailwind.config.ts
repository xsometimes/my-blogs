import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
        'primary-blue': '#1761FF',
      //   'primary-red': '#FF4040',

      //   general: {
      //     900: '#000',
      //     600: '#333',
      //     300: '#666',
      //     100: '#999',
      //   },

      // },
      screens: {
        'sm': {
          'max': '768px'
        },
        'md': {
          'max': '1024px'
        },
        'xl': {
          'max': '1440px'
        }
      },
      // backgroundImage: {
      //   'primary-gradient-linear':
      //     'linear-gradient( 180deg, #E0ECFF 4%, #F7FAFF 47%, #FFFFFF 98%);',
      //   'blue-gradient-linear': 'linear-gradient( 180deg, #387BFF 2%, #75B2FF 100%);'
      // },
      // backgroundColor: {
      //   'primary-blue': '#1761FF',
      //   'light-blue': '#E0ECFF',
      //   mark: 'rgba(0, 0, 0, 0.3)',
      //   'offline-gray': '#eeeeee', // 离线灰
      //   devider: '#D8D8D8',
      // },


    },
  },
  plugins: [],
} satisfies Config;
