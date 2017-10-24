<template>
	<div class="image-msg">
		<div class="header">
			<img :src="info.fromHeadimg" />
			<span class="name">{{info.fromName}}</span>
		</div>
		<swiper :options="swiperOption" :swiper.sync="mswiper">
			<swiper-slide v-for="slide in items">
				<img :src="filedownlodaurl+slide.text.messages" />
			</swiper-slide>
			<!--<div class="swiper-pagination" slot="pagination"></div>-->
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>
<script>
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'

	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				mswiper: null,
				swiperOption: {
					autoplay: false,
					setWrapperSize: false,
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: true,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
				},
				info: {},
				time: {},
				items: [],
				list: [],
				filedownlodaurl: ''
			}
		},
		watch: {
			activeIndex(v) {
				this.info = this.items[v];
			}
		},
		computed: {
			activeIndex: function() {
				return this.mswiper ? this.mswiper.activeIndex : 0
			}
		},
		created() {
			this.filedownlodaurl = filedownlodaurl;
			if(!this.$root.isFirst) {
				this.init();
			}
			this.getFirstList();
		},
		events: {
			start() {
				this.init();
			},
			imageMsg(data) {
				var obj = data;
				obj.am = true;
				this.list.push(obj);
			},
			getFirst() {
				this.getFirstList();
			},
		},
		beforeDestroy() {
			clearInterval(this.time);
		},
		methods: {
			getFirstList() {
				var list = [];
				if(this.$root.index.image <= 0) {
					this.items = JSON.parse(JSON.stringify(this.$root.imgMsgList));
					this.list = JSON.parse(JSON.stringify(this.$root.imgMsgList));
					this.$root.index.image = this.items.length;
				} else {
					for(var i = 0; i < this.$root.imgMsgList.length; i++) {
						var obj = this.$root.imgMsgList[i];
						obj.am = true;
						if(this.$root.index.image > i) {
							this.items.push(obj);
						}
						list.push(obj);
					}
					this.list = list;
				}
				if(this.items.length != 0) {
					setTimeout(() => {
						this.mswiper.slideTo(this.items.length);
					}, 300)
				}
			},
			init() {
				this.time = setInterval(() => {
					if(this.$root.index.image < this.list.length) {
						this.items.push(this.list[this.$root.index.image]);
						if(this.$root.index.image == 0)
							this.info = this.list[this.$root.index.image];
						this.$root.index.image += 1;
						if((this.$root.index.image - 1) == (this.activeIndex + 1)) {
							this.$nextTick(() => {
								this.mswiper.slideNext();
							})
						}
					}
				}, 1500);
			}
		},
		ready() {

		}
	}
</script>
<style lang="scss">
	.image-msg {
		width: 965px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		.header {
			width: 100%;
			height: 100px;
			img {
				height: 80px;
				width: 80px;
				border-radius: 40px;
				display: inline-block;
				margin-top: 10px;
				vertical-align: middle;
				margin-left: 10px;
			}
			.name {
				font-size: 30px;
				display: inline-block;
				vertical-align: middle;
			}
		}
		.swiper-container {
			height: 100%;
			padding-top: 100px;
			padding-bottom: 60px;
			margin-top: -100px;
			box-sizing: border-box;
			.swiper-slide {
				text-align: center;
			}
			.swiper-button-prev,
			.swiper-button-next {
				height: 160px;
				width: 90px;
				margin-top: -45px;
				border-radius: 15px;
				background-color: rgba(255, 255, 255, 0.5);
				background-image: url(../image/left.png);
			}
			.swiper-button-prev {
				transform: rotate(180deg);
			}
			img {
				height: 100%;
				    max-width: 758px;
			}
		}
	}
</style>