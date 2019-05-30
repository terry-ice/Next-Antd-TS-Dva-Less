/* eslint-disable */
const withTypescript = require('@zeit/next-typescript')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

const withLessExcludeAntd = require('./next-less.config.js')
// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'))

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
	require.extensions['.less'] = file => {}
}

module.exports = withTypescript(
	withLessExcludeAntd({
		lessLoaderOptions: {
			javascriptEnabled: true,
			modifyVars: themeVariables // make your antd custom effective
		},
		cssModules: true,
		webpack: function(config) {
			return config
		}
	})
)
