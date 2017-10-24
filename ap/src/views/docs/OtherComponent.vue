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