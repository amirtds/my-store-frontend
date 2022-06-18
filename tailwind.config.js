module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enable: true,
    content: [
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      whitelistPatterns: [
        /^text-/,
        /^bg-/,
        /^hover:bg-/,
        /^border-/,
        /^hover:text-/,
        /^hover:bg-/,
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
