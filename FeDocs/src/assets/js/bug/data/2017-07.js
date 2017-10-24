let data = [{
	'Q': '如何解决webpack打包css的图片路径问题？',
	'A': '<h3>解决方案一</h3><p>webpack取消使用ExtractTextPlugin插件</p>\
		<h3>解决方案二</h3><p>在vue中用require请求图片，然后赋值给data属性</p><div class="highlight"><pre><code>data() {\n\treturn {\n\t\timg: require("imgurl")\n\t}\n}</code></pre></div>',
	'label': 'webpack,vue',
	'author': '陈伟标',
	'time': '2017-07-21',
	'flag': 'success'
}, {
	'Q': '如何解决mouseout和click冲突？',
	'A': '安装file-loader',
	'label': 'javascript',
	'author': '陈伟标',
	'time': '2017-07-21',
	'flag': 'success'
}]

export default data