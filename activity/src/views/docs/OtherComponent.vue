<template>
	<div class="ams-docs-header">
		<div class="container">
			<h1>模板组件</h1>
			<p>开发模板所用到的组件集合。</p>
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
components/
├── web/
│   ├── activity/					──(活动配置文件夹)
|	|    ├──advanced-config-content.vue  		──(高级配置中的通用样式配置)
|	|    ├──configs.vue  	 			──(活动配置的基本配置内容)
|	|    ├──phone-handler.vue  			──(活动配置中的iphone拟态框)
|	|    ├──set-senior-color.vue    		──(高级配置中的通用的颜色配置)
|	|    ├──views-box.vue           		──(活动配置中左侧的导航栏配置)
│   ├── activity-list-view.vue/				──(我的活动列表)
│   ├── activity-menu.vue/				──(活动数据中的左侧菜单栏)
│   ├── add-user.vue/					──(用户管理中的新增用户)
│   ├── banner-page.vue/				──(活动配置中的是广告页组件)
│   ├── blacklist-state-toggle.vue/			──(兑换状态栏组件-我的活动数据中的黑白名单)
│   ├── button-style-panel.vue/				──(目前没用到，关于上传的按钮)
│   ├── category-filter.vue/				──(类别筛选栏组件，活动的类别赛选，如游戏休闲等)
│   ├── chartist-line.vue/				──(数据统计中的条形图)
│   ├── chartist-pie.vue/				──(数据统计中的饼状图)
│   ├── count-data-source.vue/				──(我的活动中的数据来源,暂无用到)
│   ├── data-export.vue/				──(导出数据样式)
│   ├── data-overview.vue/				──(数据总览 - 全部的pv/uv分享次数等)
│   ├── exchange-state-toggle.vue/			──(兑换状态栏组件-我的活动数据中已兑奖切换)
│   ├── footer-bar.vue/					──(首页底部组件)
│   ├── header-bar.vue/					──(页面的头部导航)
│   ├── login-modal.vue/				──(活动登录框)
│   ├── model-list-view.vue/				──(模板商城中的列表)
│   ├── prize.vue/					──(奖品库，奖项配置的基础组件)
│   ├── qr-code.vue/					──(活动配置中的二维码编辑)
│   ├── question-bank.vue/				──(疑问描述组件)
│   ├── set-prize-date.vue/				──(每日排行与总排行奖项配置)
│   ├── set-prize-immediate.vue/			──(完成时领奖奖项配置)
│   ├── set-prize-luck.vue/				──(大转盘奖项配置)
│   ├── set-prize-wechatred.vue/			──(微信红包奖项配置)
│   ├── sort.vue/					──(排序栏组件 ,最新最热)
│   ├── sort-user-list.vue/				──(用户管理中的状态，暂无用到)
│   ├── status-toggle.vue/				──(活动状态栏,包括上线,下线,活动中)
│   ├── upload.vue/					──(上传组件)
│   ├── user-panel.vue/					──(用户信息界面中panel组件)
│   ├── view-toggle.vue/				──(模板商城的模板切换)
│   ├── weixin-share.vue/				──(活动配置中的微信分享)
</code>
						</pre>
					</div>

				</doc-section>

				<div class="ams-example">
					<!--<carousel>
						<slider v-for="item in imgItem">
							<img :src="item.img+$index">
						</slider>
					</carousel>-->
					<swiper :options="swiperOption">
						<swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
				<div class="ams-docs-section">
					<h1 class="page-header">视图切换栏(viewToggle)</h1>
					<div class="ams-example">
						<div class="content" :style="{height: height+'px'}" v-iscroll="iscroll" class="el-scroller">
							<div class="scroller">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import docSection from './docSection'
	import docTable from './docTable'
	import docCode from './docCode'
	import Carousel from '../../components/bootstrap/Carousel'
	import Slider from '../../components/bootstrap/Slider'
	import Vue from 'vue'
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'

	export default {
		components: {
			docSection,
			docTable,
			docCode,
			Slider,
			Carousel,
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOption: {
					autoplay: false,
					setWrapperSize: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: true,
				},
				swiperSlides: [1, 2, 3, 4, 5],
				iscroll: {
					pullUp: false,
					pullUpFun: function() {},
					pullDown: false,
					pullDownFun: function() {},
					Lazyload: false,
					ScrollMove: null,
					upLoad: false,
					upFun: function() {},
					downFun: function() {},
					bounce: true,
					scroll: {}
				},
				height: 0,
				imgItem: [{
					img: 'https://placehold.it/1200x400?text='
				}, {
					img: 'https://placehold.it/1200x400?text='
				}, {
					img: 'https://placehold.it/1200x400?text='
				}],
				showModal: false
			}
		},
		ready() {
			let _this = this
			setInterval(() => {
				console.log('simulate async data')
				let swiperSlides = _this.swiperSlides
				if(swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
			}, 3000)
			window.t = this;
			Vue.nextTick(() => {
				this.height = ~~document.body.offsetHeight - ~~document.querySelector(".weui_tabbar").offsetHeight - ~~document.querySelector("header").offsetHeight;
			})
		},
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