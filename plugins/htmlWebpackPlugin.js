const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

module.exports = class HtmlWebpackPlugin {
	constructor(options) {
		this.options = options
	}

	apply(compiler) {
		// 1. 编写一个自定义插件，注册`afterEmit`钩子
		// compiler.hooks.done.tap('HtmlWebpackPlugin', (stats) => {
		// 	 console.log(stats.startTime)
		// 	 console.log(stats.endTime)
		// 	 console.log(Object.keys(stats.compilation))
		// })

		compiler.hooks.afterEmit.tap('HtmlWebpackPlugin', (compilation) => {
			// 如果使用done钩子，则需要使用stats.compilation获取
			 // console.log(compilation.assets)
			 // console.log()
			// 2. 根据创建对象时传入的template属性来读取html模板
			// console.log(this.options.template)
			let result = fs.readFileSync(this.options.template, 'utf-8')
			// console.log(result)
			// 3. 使用工具分析HTML，推荐使用cheerio，可以直接使用jQuery api
			let $ = cheerio.load(result)
			// 4. 循环遍历webpack打包的资源文件列表，如果有多个bundle就都打包进去（可以根据需求自己修改，因为可能有chunk，一般只引入第一个即可）
			Object.keys(compilation.assets).forEach(item => {
				$(`<script src="/${item}"></script>`).appendTo('body')
			})
			// 5. 输出新生成的HTML字符串到dist目录中
			// console.log($.html())
			// path.join(process.cwd(), 'dist', this.options.filename)
			fs.writeFileSync('./dist/' + this.options.filename, $.html())
		})
	}
}