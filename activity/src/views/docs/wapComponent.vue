<template>
	<div class="ams-docs-header">
		<div class="container">
			<h1>wap组件</h1>
			<p>如果项目是一栋摩登高楼大厦的话，下面组件群可算是电源插座或LED电管。</p>
		</div>
	</div>
	<!-- end .ams-docs-header -->
	<div class="container">
		<div class="row">
			<div class="col-md-9">
				<modal-docs></modal-docs>

				<doc-section name="目录" id="intro/catalog">
					<p class="lead">这是工程源代码文件夹，主要文件结构如下:</p>
					<div class="highlight">
						<pre>
		    				<code class="bash"> 
├── components/
│   ├── activity-box/					──(首页活动宝箱)
│   ├── activity-date/					──(首页活动日期)
│   ├── banner-page/					──(启动广告页)
│   ├── barrage/					──(弹幕)
│   ├── black-white-block/				──(黑白块游戏)
│   ├── button/						──(按钮组件)
│   ├── fail/						──(闯关失败)
│   ├── fail-rank/					──(排行榜的闯关失败)
│   ├── find-color/					──(找色块游戏)
│   ├── game-result/					──(游戏基础结果)
│   ├── modal/						──(弹窗)
│   ├── my-prize-list/					──(奖品列表)
│   ├── my-rank-info/					──(排行榜信息)
│   ├── number-of-draws/				──(css目录)
│   ├── number-of-participants/				──(首页活动参与人数)
│   ├── puzzle-slider/					──(拼图游戏)
│   ├── rank/						──(排行榜)
│   ├── rank-link/					──(首页排行榜标签)
│   ├── rank-list/					──(排行榜列表)
│   ├── receive/					──(领奖页面)
│   ├── receive-success/				──(领奖成功页面)
│   ├── remaining-number-of-prizes/			──(首页活动奖品数量)
│   ├── rule-link/					──(首页活动说明标签)
│   ├── rule-text/					──(活动说明内容)
│   ├── share-btn/					──(分享按钮)
│   ├── slide-money/					──(数钱游戏)
│   ├── static-banner/					──(首页banner图)
│   ├── success/					──(游戏失败界面)
│   ├── success-end/					──(css目录)
│   ├── success-rank/					──(css目录)
│   ├── timer/						──(计时器)
│   ├── turntable/					──(幸运大转盘游戏)
│   ├── winning-list/					──(抽奖结果页面)
</code>
						</pre>
					</div>

				</doc-section>

				<div class="ams-docs-section">
					<h1 class="page-header"> 活动宝箱(activity-box)</h1>
					<div class="ams-example">

					</div>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>名称</th>
								<th>类型</th>
								<th>默认值</th>
								<th>描述</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>trigger</code></td>
								<td><kbd>String</kbd></kbd>
								</td>
								<td>hover</td>
								<td>触发事件, 分别有<code>click</code> <code>focus</code> <code>hover</code> <code>contextmenu</code></td>
							</tr>

							<tr>
								<td><code>effect</code></td>
								<td><kbd>String</kbd></td>
								<td>scale</td>
								<td>动画效果</td>
							</tr>
							<tr>
								<td><code>content</code></td>
								<td><kbd>String</td>
                                <td></td>
                                <td>显示内容</td>
                            </tr>
                            <tr>
                                <td><code>placement</code></td>
                                <td><kbd>String</kbd></td>
								<td>top</td>
								<td>方向，值为<code>top</code>、<code>bottom、</code><code>left</code>、<code>right</code></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-md-3">
				<nav class="ams-docs-sidebar">
					<ul class="nav ams-docs-sidenav">
						<li>
							<a href="#">模态框</a>
						</li>
						<li>
							<a href="#">工具提示</a>
						</li>
						<li>
							<a href="#">日期控件</a>
						</li>
						<li>
							<a href="#">轮播图</a>
						</li>
						<li>
							<a href="#">分页</a>
						</li>
						<li>
							<a href="#">冒泡栏</a>
						</li>
						<li>
							<a href="#">剪切式菜单</a>
						</li>
						<li>
							<a href="#">涟漪按钮</a>
						</li>
						<li>
							<a href="#">手风琴</a>
						</li>
						<li>
							<a href="#">加载提示</a>
						</li>
						<li>
							<a href="#">疑问注释</a>
						</li>
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
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.ams-docs-section .carousel {
		.carousel-inner {
			ul {
				padding: 0;
				li {
					list-style-type: none;
					float: left;
				}
			}
		}
	}
</style>