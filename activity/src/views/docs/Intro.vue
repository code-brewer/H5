<template>
	<div class="ams-docs-header">
		<div class="container">
			<h1>起步</h1>
			<p>简要介绍该平台的组件使用和模板新增等教程。</p>
		</div>
	</div>
	<!-- end .ams-docs-header -->

	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<doc-section name="前言" id="intro/preface">
					<p class="lead">
						开发微活动需要掌握三个前端技术、分别为
						<a href="http://v1.vuejs.org/examples/" target="_bland">Vue1.0</a>基础框架、
						<a href="http://webpack.github.io/" target="_bland">webpack</a>前端架构工具、
						<a href="http://sass-lang.com/" target="_bland">sass</a>
					</p>
				</doc-section>
				<doc-section name="起步" id="intro/started">
					<p class="lead">
						平台开发由两部分组成，分别是AMS(管理平台)、AUS(活动平台)，AMS主要是面向客户群体，内容包含首页、模板列表、我的活动、个人信息页、活动新增等页面；而AUS主要是面向广大用户，内容有好玩的游戏，或者抽奖、集赞集卡等活动。
					</p>

					<p>下面介绍整个项目的文件结构。</p>
				</doc-section>

				<doc-section name="目录" id="intro/catalog">
					<p class="lead">这是工程源代码文件夹，主要文件结构如下:</p>
					<div class="highlight">
						<pre>
		    				<code class="bash">activity/
├── build/			──(webpak编译文件)       
├── config/			──(配置webpak编译配置文件)
├── src/
│   ├── css/			──(css目录)
│   ├── js/			──(js目录)
│   └── fonts/			──(文字库目录)	
│   └── assets/			──(编译图片目录)
│   └── components/		──(通用组件目录)
│   └── images/			──(图片目录)
│   └── views/			──(视图(View)子页面) 
│   └── templates/		──(微活动模板目录) 
│   	└── components/		──(aus公共组件目录) 
│   	└── layouts/		──(微活动各个模板)
│   	└── service/		──(aus的aip)
│   	└── utils/		──(aus的js工具类)
│   └── api/			──(ams的aip)
│   └── utils/			──(ams的js工具类)
└── node_modules/		── (无视该目录)
							</code>
						</pre>
					</div>

					<p><code>css/</code>、<code>js/</code>、<code>fonts/</code>、<code>assets/</code>、<code>images/</code>目录分别包含了CSS、JS、字体图片等资源文件。<code>components/</code>目录是放置所有组件，包括常用和独立零散性的组件。<code>views/</code>目录包含了所有该工程视图(View)子页面。<code>templates/</code>目录是放置所有活动模板文件。<code>api/</code>、<code>utils/</code>目录提供了常用的接口集合和工具类方法。</p>
				</doc-section>
				<!-- end doc-section -->

				<doc-section name="启动编译" id="intro/installing">
					<p>项目使用webpack构建工具，
						<a href="http://cn.vuejs.org" target="_bland">Vuejs</a>作为整体框架，下面说明如何编译源码等相关内容。</p>

					<h2 id="webpack-installing">安装</h2>
					<p>首先已经确保安装好<strong>npm</strong>。</p>
					<p>然后在<code>activity/</code>当前目录打开CMD窗口输入</p>
					<div class="highlight">
						<pre>
		    				<code class="bash">npm install</code>
						</pre>

					</div>
					<p>在无出错情况下跑完以上代码，基本可以运行<code>package.json</code>文件所提供的各个 npm 命令了</p>

					<h2 id="webpack-commands">可用的npm命令</h2>
					<p>
						<kbd>npm run build</kbd> (一次性编译<span class="text-warning">平台代码</span>)
					</p>
					<p>
						<kbd>npm run watch</kbd> (监听编译<span class="text-warning">平台代码</span>)
					</p>
					<p>
						<kbd>npm run wap</kbd> (监听编译<span class="text-warning">模板代码</span>)
					</p>
					<p>
						<kbd>npm run wapconfig</kbd> (监听编译<span class="text-warning">模板配置代码</span>)
					</p>

					<h2 id="webpack-troubleshooting">除错</h2>
					<p>如果遇到<code>npm install</code>安装工程一半停止不动了，请马上终止，需要手动往<code>node_modules/node_sass/</code>添加一个文件；具体操作联系项目负责人。</p>
				</doc-section>
				<!-- end doc-section -->

				<doc-section name="AMS开发" id="intro/ams">
					<p>接下来介绍我们AMS的有关的开发教程，方便以后参与维护的新手可以参阅。</p>

					<h2 id="intro/base_dev">基础开发</h2>

					<p>第一步我们需要通过
						<a href="#intro/installing">启动编译</a>，来完成项目的部署。</p>
					<p>第二步在<code>activity/</code>根目录下打开<kbd>CMD</kbd>命令窗口，输入<code>npm run watch</code>来监听编译AMS项目。</p>
					<p>AMS有三大模块分别是首页(home.js)，活动编辑页(activity.js)和主内容页(main.js)；另外主内容页是单页面应用，其子页面有模板列表、我的活动、个人信息，用户管理等。</p>
					<p>第三步打开我们首页模块的入口文件<span class="text-info">home.js</span>，如下面代码：</p>
					<doc-code language="javascript">
						import Vue from 'vue' var Home = Vue.extend(require('./Home.vue')) import VueResource from 'vue-resource' Vue.use(VueResource) new Home({ el: 'app' })
					</doc-code>
					<p>入口文件就几行代码，主要是配置了所用到的依赖包和文件，<span class="text-info">Home.vue</span>是该模块的主要文件；其他模块也类似这种方式。另外<span class="text-info">App.vue</span>是主内容页的容器，子页面都在<code>views/</code>这个目录；</p>

					<p>每个主模块的所有的组件都是公用的，<code>components/web-base/</code>和<code>components/bootstrap/</code>提供了常用组件，一些不常用但具有复用性的组件都放在<code>components/web/</code>，如果以后开发新组件的过程中有发现<span class="text-success">重复率超过两次以上的组件</span>都可以放在这个目录。</p>

					<p><code>css/</code>放置样式文件，要求统一用scss文件来写；<code>api/</code>放置接口集合；<code>utils/</code>提供了常用的
						<a href="#/utils">工具类</a>，</p>

					<p>以上大概介绍了各个目录的用途和放置规范。</p>
					<!-- <p>其他涉及到很多Vuejs框架的开发基础就不说了，关于这个项目的详细大家直接看源文件。</p> -->

					<h2 id="intro/wap_config">wap活动编辑</h2>
					<p>wap活动编辑页是整个项目的核心功能，里面由三大部分组成(如图1)：页面导航、模板视图、配置列表；</p>

					<p class="col-lg-offset-1"><img :src="'src/assets/doc_pic_1.jpg'" class="doc-img"><small style="text-align: center;width: 100%;display: block;">(图1)</small></p>

					<h4>1.页面导航</h4>
					<p>展示该模板的页面集合，首页和活动页(游戏页)是独立页面，其他皆为通用页面。这些是根据模板的
						<a href="#">路由配置</a>信息来动态展示的</p>

					<h4>2.模板视图</h4>
					<p>活动展示模拟器，跟wap端样式一致，首页可以自定义样式和信息</p>

					<h4>3.配置列表</h4>
					<p>包含了信息编辑、条件配置、奖品配置和高级配置</p>
				</doc-section>
				<!-- end doc-section -->

				<doc-section name="AUS开发" id="intro/aus">
					<p>这个文档模块将带你一步步完成一个模板开发，并可以在手机上你开发模板的实际效果。这个新添加的模板具备一切完善的功能，比如闯关、排名列表、领奖、以及分享提示等，开发起来非常简单。</p>
					<h2 id="intro/aus_intro">介绍</h2>
					<p>wap模板目录结构：</p>
					<div class="highlight">
						<pre>
		    				<code class="bash">
├── templates/
│   ├── components/		──(aus公共组件目录) 
│   ├── layouts/		──(微活动各个模板) 
│   └── service/		──(aus的aip) 
│   └── utils/			──(aus的工具类) 
							</code>
						</pre>
					</div>
					<p><code>components/</code>是通用wap组件目录，<code>layouts/</code>放置模板布局(重要)，接下来就是<code>service/</code>接口文件，<code>utils/</code>工具类文件。</p>
					<h2 id="intro/aus_layouts">模板布局(Layouts)</h2>
					<p>目录结构：</p>
					<div class="highlight">
						<pre>
		    				<code class="bash">layouts/
├── (模板名称)/
│   └── index.js 			──(活动核心文件) 
│   └── app.js  			──(活动的编译入口) 
│   └── config.js 			──(活动配置的编译入口) 
│   └── route.js   			──(活动配置左侧路由导航) 
│   └── extbody.js  			──(扩展windos存储对象的json体) 
│   └── App.vue     			──(活动vue的入口文件) 
│   └── App.config.vue  		──(活动配置vue的入口文件) 
│   └── condition.vue   		──(活动的条件配置) 
│   ├── views/     			──(视图目录) 
│   	└── home.vue   			──(活动首页) 
│   	└── home.config.vue   		──(活动配置的首页) 
│   	└── activity.vue   		──(活动游戏页) 
│   	└── activity.config.vue   	──(活动游戏页的配置页) 
│   ├── images/   			──(图片目录) 
							</code>
						</pre>
					</div>
				</doc-section>
				<!-- end doc-section -->
				<p>以上目录包含了wap端和活动后台配置页的所有文件，后台配置页相关的文件除了包含<code>config.js</code>、<code>route.js</code>、<code>extbody.js</code>还有<code>condition.vue</code>，其他中间名含有<code>.config</code>都是后台配置文件,其余即是AUS活动文件。</p>
				<p><code>index.js</code>是编译入口文件，<code>app.js</code>是核心JS文件，<code>exbody.js</code>是该模板的配置信息，<code>route.js</code>是视图导航栏所需的，<code>condition.vue</code>是该模板的条件配置，<code>views/</code>放置视图文件。</p>
				<p></p>
				<h2 id="intro/aus_care">AUS开发要点</h2>
				<h4>1.活动基本页面开发 (首页及活动页等)</h4>
				<p>构建模板是由布局文件和若干小组件组成的，如图2；有些组件复用性极高，可用于多种模板类型，基本上利用现有的组件，前端人员只需要写好css样式就能轻轻松松开发一个完整的模板了，以下是<span class="text-primary">《滑块拼图》</span>模板的首页示例：</p>
				<p class="col-lg-offset-1">
					<img :src="'src/assets/doc-line-1.png'" class="doc-img">
					<small style="text-align: center;width: 100%;display: block;">(图2)</small></p>
				<p class="col-lg-offset-1">
					<img :src="'src/assets/doc_pic_2.jpg'" class="doc-img" width="480"><small style="text-align: center;width: 100%;display: block;">(图3)</small>
				</p>
				<doc-code language="markup">
					<div class="app-view view-home">
						<activity-box></activity-box>
						<static-banner></static-banner>
						<logo></logo>
						<remaining-number-of-prizes></remaining-number-of-prizes>
						<number-of-participants></number-of-participants>
						<start-button :end-jump="true"></start-button>
						<rule-link></rule-link>
					</div>
				</doc-code>
				<p>如图3所示在布局文件上写相应的组件标签，就能显示对应的组件功能。比如开始按钮，该组件已经封装好<span class="text-info">对活动开始时间和结束时间或者用户是否已经登录等逻辑</span>来判断是否让用户开始游戏。</p>
				<p>所以我们组件和布局完全分开的目的，是减少开发成本，利用复用率高效的组件来完成我们的模板开发。</p>
				<h4>2.活动条件</h4>
				<p>活动条件是一一对应的，每个活动都有相对应的条件。我们需要跟后台沟通好条件参数，并存储在window对象中<code>详见具体代码</code>。最终效果如<span class="text-primary">《滑块拼图》</span>模板的条件示例：</p>
				<img :src="'src/assets/doc_pic_4.jpg'" class="doc-img" width="100%"><small style="text-align: center;width: 100%;display: block;">(图4)</small>
				
			</div>
			<div class="col-md-3">
				<nav class="ams-docs-sidebar">
					<ul class="nav ams-docs-sidenav">
						<li class="active">
							<a href="#">起步</a>
						</li>
						<li>
							<a href="#">目录</a>
						</li>
						<!-- 	<li><a href="#">项目组成</a>
							<ul class="nav"> -->
						<li>
							<a href="#">AMS开发</a>
							<ul class="nav">
								<li>
									<a href="#">基础开发</a>
								</li>
								<!-- 首页、模板列表、个人信息 -->
								<li>
									<a href="#">wap活动编辑</a>
								</li>
								<!-- 介绍奖品配置和条件配置之类的 -->
							</ul>
						</li>

						<li>
							<a href="#">AUS开发</a>
							<ul class="nav">
								<li>
									<a href="#">模板开发</a>
								</li>
								<!-- 跟wap配置结合开发模板、一前一后 -->
							</ul>
						</li>
						<!-- 				</ul>
    					</li> -->
						<!-- 			<li><a href="#">使用案例</a>
							<ul class="nav"> -->
						<li>
							<a href="#">启动编译</a>
							<ul class="nav">
								<li class="">
									<a href="#webpack-installing">安装</a>
								</li>
								<li class="">
									<a href="#webpack-commands">可以使用的 npm 命令</a>
								</li>
								<li>
									<a href="#webpack-troubleshooting">除错</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#">模板使用</a>
							<ul class="nav">
								<li class="">
									<a href="#webpack-installing">模板录入</a>
								</li>
								<li class="">
									<a href="#webpack-commands">模板开发</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#">组件引入</a>
						</li>
						<!-- 		</ul>
    					</li> -->
					</ul>
				</nav>
			</div>
		</div>
	</div>

</template>

<script>
	import docSection from './docSection'
	import docTable from './docTable'
	import docCode from './docCode'
	export default {
		components: {
			docSection,
			docTable,
			docCode
		}
	}
</script>