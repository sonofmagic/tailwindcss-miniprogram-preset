const { createPreset, defaultPreset } = require('tailwindcss-miniprogram-preset')

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
  presets: [
    createPreset({
      rem2rpx: false
    })
    // defaultPreset
  ]
}
