const {
  src,
  dest,
  watch
} = require('gulp')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const path = require('path')

const postcssOptions = {
  stage: 2,
  browsers: 'iOS 9, not ie > 0, not ie_mob > 0, Android >= 4.1',
  features: {
    'nesting-rules': true
  },
  preserve: false,
  importFrom: []
}

const cssPaths = ['./app.css', './pages/**/*.css', './components/**/*.css', './style/*.css']

function css() {
  return src(cssPaths, {
      base: './'
    })
    .pipe(
      postcss([postcssPresetEnv(postcssOptions)])
    )
    // 替换 css 文件里的内容： @import 'xx.css' => @import 'xx.wxss'
    .pipe(replace(/(@import.*)(.css)/g, '$1.wxss'))
    // 重命名 css 文件扩展名
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(dest('./'))
}

exports.default = function () {
  watch(cssPaths, css)
  return css()
}