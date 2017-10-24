<template>
	<div>
		<div class="docs-header">
	        <div class="container">
	            <h1>简介</h1>
	            <p>集合前端各个知识点的教程文档</p>
	        </div>
	    </div>
	    <div class="container">
        	<div class="row">
				<div class="col-md-9 border-right">
					<!-- HTML规范 -->
	                <div class="ams-docs-section">
	                    <h1 class="page-header" id="id1">HTML规范</h1>
	                    <!-- 通用 -->
	                    <h2 id="id2">通用</h2>
	                    <p>1、文件以<code>&lt;!DOCTYPE html&gt;</code>首行顶格开始；</p>
	                    <p>2、必须申明文档的编码charset，且与文件本身编码保持一致，推荐使用UTF-8编码格式：</p>
	                    <div class="highlight">
	                        <pre>
	                            <code>&lt;meta charset="utf-8" /&gt;</code>
	                        </pre>
	                    </div>
	                    <p>3、根据页面内容和需求填写适当的<code>keywords</code>和<code>description</code>；</p>
	                    <p>4、引入css时必须指明<code>rel="stylesheet"</code>；</p>
	                    <p>5、在head标签中引入页面需要的所有css资源，尽量在页面末尾引入javascript文件。</p>
	                    <!-- /通用 -->
	                    <!-- 保持良好的简洁的树形结构 -->
	                    <h2 id="id3">保持良好的简洁的树形结构</h2>
	                    <p>1、每一个块级元素都需另起一行，每一行都使用四个空格缩进对齐，父子级保持缩进结构；</p>
	                    <p>Tab缩进可以转换为空格，sublime设置如下：</p>
	                    <p>2、编写代码时编辑器可以设置为自动换行，便于阅读和编写。</p>
	                    <p>Mac设置：</p>
	                    <!-- /保持良好的简洁的树形结构 -->
	                    <!-- 命名 -->
	                    <h2 id="id4">命名</h2>
	                    <p>1、类名（class）必须单词全字母小写，单词间以 - 分隔；</p>
	                    <p>2、类名（class）定义尽可能代表相应模块的内容或功能，少量、单一允许以样式属性进行命名；</p>
	                    <p>以模块功能进行命名：</p>
	                    <div class="highlight">
	                        <pre>
	                            <code>&lt;div class="sidebar"&gt;&lt;div&gt;</code>
	                        </pre>
	                    </div>
	                    <p>以样式属性进行命名：</p>
	                    <div class="highlight">
	                        <pre>
	                            <code>&lt;div class="left"&gt;&lt;div&gt;</code>
	                        </pre>
	                    </div>
	                    <p>3、id必须保证页面唯一性；</p>
	                    <p>4、id、类名（class）命名时，在避免冲突并描述清楚的前提下尽可能短；</p>
	                    <div class="highlight">
	                        <pre>                            
<code>&lt;-- good -- &gt;
&lt;div id="nav"&gt;&lt;/div&gt;

&lt;-- bad -- &gt;
&lt;div id="navigation"&gt;&lt;/div&gt;


&lt;-- good -- &gt;
&lt;div id="comment"&gt;&lt;/div&gt;

&lt;-- bad -- &gt;
&lt;div id="com"&gt;&lt;/div&gt;</code>
	                        </pre>
	                    </div>
	                    <p>5、同一个页面，应该避免使用相同的name与id；*IE浏览器会混淆元素的id和name属性，<code>document.getElementById</code>可能获得不期望的元素。*</p>
	                    <div class="highlight">
	                        <pre>
<code>&lt;input name="foo"&gt;
&lt;div id="foo"&gt;&lt;/div&gt;
&lt;script&gt;
//IE6 将显示 INPUT
alert(document.getElementById('foo').tagName);
&lt;/script&gt;</code>
	                        </pre>
	                    </div>
	                    <!-- /命名 -->
	                    <!-- 标签用法 -->
	                    <h2 id="id5">标签用法</h2>
	                    <p>1、标签名必须使用小写字母。</p>
	                    <p>2、对于无需自闭合的标签，不允许自闭合。</p>
	                    <p>3、HTML标签的使用应该遵循标签的含义。</p>
	                    <p>4、在css可以实现相同需求的情况下尽量不使用表格进行布局。</p>
	                    <p>5、标签的使用尽量简洁，减少不必要的标签和层次结构。</p>
	                    <h2 id="id6">属性用法</h2>
	                    <p>1、属性名必须使用小写字母；</p>
	                    <p>2、属性必须用双引号包含；</p>
	                    <p>3、布尔类型的属性，建议不添加属性值</p>
	                    <div class="highlight">
	                        <pre>
	                            <code>&lt;input type="text" disabled /&gt;</code>
	                        </pre>
	                    </div>
	                    <!-- /标签用法 -->
	                    <!-- 图片 -->
	                    <h2 id="id7">图片</h2>
	                    <p>1、<code>禁止</code>img的<code>src</code>取值为空，延迟加载的图片也要添加默认的<code>src</code>；*<code>src</code>值为空会导致部分浏览器重新加载一次当前页面*；</p>
	                    <p>2、为重要的图片添加<code>alt</code>属性。</p>
	                    <h2 id="id8">说明文案的注释写法</h2>
	                    <p>采用类似标签闭合的写法，与HTML统一格式；注释文案两头空格，与CSS注释统一格式。</p>
	                    <div class="highlight">
	                        <pre>
<code>&lt;!-- 头部 --&gt;
&lt;div class="g-hd"&gt;
    &lt;!-- LOGo --&gt;
    &lt;h1 class="m-logo"&gt;&lt;a href="javascript:;"&gt;LOGO&lt;/a&gt;&lt;/h1&gt;
    &lt;!-- /LOGO --&gt;
    &lt;!-- 导航 --&gt;
    &lt;ul class="m-nav"&gt;
        &lt;li&gt;&lt;a href="javascript:;"&gt;NAV1&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="javascript:;"&gt;NAV2&lt;/a&gt;&lt;/li&gt;
        &lt;!-- 更多导航项 --&gt;
    &lt;/ul&gt;
    &lt;!-- /导航 --&gt;
&lt;/div&gt;
&lt;!-- /头部 --&gt;</code>
	                        </pre>
	                    </div>
	                    <p>sublime关于注释的插件：docblockr</p>
	                    <p>简单用法</p>
	                    <p>1、/* + tab键：单行注释</p>
	                    <p>2、/** + tab键：函数注释</p>
	                    <!-- /图片 -->
	                    <!-- 框架（vue、angular）关于编写html代码的注意事项 -->
	                    <h2 id="id9">框架（vue、angular）关于编写html代码的注意事项</h2>
	                    <!-- /框架（vue、angular）关于编写html代码的注意事项 -->
	                </div>
	                <!-- /HTML规范 -->
				</div>
				<!-- 右边导航 -->
				<div class="col-md-3">
	                <nav class="docs-sidebar">
	                    <ul class="nav docs-sidenav">
	                        <li><a href="javascript:;" data-id="id1">HTML规范</a>
	                            <ul class="nav">
	                                <li><a href="javascript:;" data-id="id2">通用</a></li>
	                                <li><a href="javascript:;" data-id="id3">保持良好的简洁的树形结构</a></li>
	                                <li><a href="javascript:;" data-id="id4">命名</a></li>
	                                <li><a href="javascript:;" data-id="id5">标签用法</a></li>
	                                <li><a href="javascript:;" data-id="id6">属性用法</a></li>
	                                <li><a href="javascript:;" data-id="id7">图片</a></li>
	                                <li><a href="javascript:;" data-id="id8">说明文案的注释写法</a></li>
	                                <li><a href="javascript:;" data-id="id9">框架（vue、angular）关于编写html代码的注意事项</a></li>
	                            </ul>
	                        </li>
	                    </ul>
	                </nav>
	            </div>
	            <!-- /右边导航 -->
        	</div>
        </div>
	</div>
</template>
<script>
	const prefix = 'Home'
	export default {
		name: 'Home'
	}
</script>