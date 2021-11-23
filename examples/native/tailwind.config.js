const miniprogramPreset = require('tailwindcss-miniprogram-preset')
console.log(miniprogramPreset)
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  // purge: [],
  // darkMode: false, // or 'media' or 'class'
  // theme: {
  //   extend: {},
  // },
  // variants: {
  //   extend: {},
  // },
  // plugins: [],
  purge: {
    // enabled: true,
    content: ['**/*.wxml']
    // css: ['**/*.wxss']
  },
  presets: [miniprogramPreset.default]
}
