var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
	navigateFallback: '/index.html',
	navigateFallbackWhitelist: [/^(?!\/__)/], // <-- necessary for Firebase OAuth
	stripPrefix: 'dist',
	root: 'dist/',
	importScripts: [],
	plugins: [
		new SWPrecacheWebpackPlugin({
			cacheId: 'rvm-client',
			filename: 'service-worker.js',
			staticFileGlobs: ['dist/index.html', 'dist/**.js', 'dist/**.scss'],
			stripPrefix: 'dist/assets/',
			mergeStaticsConfig: true // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
		})
	]
};
