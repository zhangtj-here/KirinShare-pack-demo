const loaderUtils = require('loader-utils')


// 其实loader就是一个函数
module.exports = function(source) {
	// this.query已废弃，最新的api是使用loaderUtils.getOptions方法来获取
	// console.log('loader', this.query)
	let options = loaderUtils.getOptions(this)
	console.log('loader', options)
	return source.replace(/今天/g, options.name || '明天')
}