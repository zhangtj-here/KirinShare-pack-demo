// 1.构造函数
class TestPlugin {
	constructor(options) {
		this.options = options
	}

	// 2.prototype中需要有一个apply方法
	apply(compiler) {
		// 通过compiler对象可以注册对应的事件
		compiler.hooks.done.tap('TestPlugin', (stats) => {
			console.log(stats)
			console.log('整个webpack打包结束了')
		})
		compiler.hooks.emit.tap('TestPlugin', (compilation) => {
			// console.log(Object.keys(compilation))
			console.log('文件发射结束了')
		})
		console.log('testPlugin')
	}
}








module.exports = TestPlugin