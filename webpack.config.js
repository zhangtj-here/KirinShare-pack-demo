const path = require('path')
const TestPlugin = require('./plugins/testPlugin')

module.exports = {
	entry: './src/index.js',
/*	entry: {
		index: './src/index.js'
	},*/
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	mode: 'development',
	plugins: [
		new TestPlugin()
	],
	module: {
		// 配置rule.enforce可以修改顺序，顺序为pre > inline > normal > post
		rules: [
			// {
			// 	test: /\.js$/,
			// 	use: ['./loaders/loader.js', './loaders/loader2.js'], 
			// },
			{
				test: /\.js$/,
				use: {
					loader: './loaders/loader.js',
					options: {
						name: '明天'
					}
				}, 
				enforce: 'pre'
			},
			{
				test: /\.js$/,
				use: './loaders/loader2.js'
			}
		]
	}
}