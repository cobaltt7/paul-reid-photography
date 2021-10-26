module.exports = {
  "map": process.env.NODE_ENV !== 'production' ,
  "parser": "postcss-scss",
  "plugins": {
    "tailwindcss": {},
    "postcss-import": {},
    "postcss-advanced-variables": {},
    "postcss-nested": {},
    "postcss-sort-media-queries": {},
    "cssnano": {
      "autoprefixer": false,
      "discardUnused": true,
      "mergeIdents": true,
      "reduceIdents": true,
      "zindex": true
    },
    "autoprefixer": {}
  }
}

