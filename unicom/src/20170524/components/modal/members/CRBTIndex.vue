<template>
	<Modal :show="show" @close="close">
		<div class="members CRBT_index" slot="content">
			<h3>登记成功！</h3>
			<p class="mes1 center">听说这里有属于我们自己的炫铃>>></p>
			<div class="music">
				<img src="../../../images/music-img2.jpg">
				<div class="music_btns">
					<a href="javascript:;" class="btn1" :class="cls" @click="play"></a>
					<a href="javascript:;" class="btn2" @click="showModal"></a>
				</div>
				<div class="music_name"><p><span ref="musicName" :style="{transform: 'translate('+translate+'px,0)'}">爱我所爱(《欢乐颂2》插曲)-邓伦</span></p></div>
			</div>
			<div class="center">
				<btn href="http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d815a6d02a2015a6f05d0ba074e">不喜欢，我要自己选歌>></btn>
			</div>
			<audio ref="audio">
				<!-- <source src="http://a.10155.com/90115000/rbt/1_88ct/2012031302/222720.wav" type="audio/wav"> -->
				<source :src="src" type="audio/wav">
			</audio>
		</div>
	</Modal>
</template>
<script>
	import utils from '../utils.js'
	import btn from '../../button/button.vue'
	export default {
		mixins: [utils],
		components: {
			btn
		},
		data() {
			return {
				isPlay: false,
				timer: null,
				translate: 0,
				src: ''
			}
		},
		computed: {
			cls() {
				return this.isPlay ? ['play'] : ['pause'];
			}
		},
		watch: {
			show(val) {
				if ( val ) {
					this.scrollMusicName();
				} else {
					clearTimeout(this.timer);
				}
			}
		},
		mounted() {
			let mobile = window.localStorage.getItem('loginMobile');
			this.src = 'http://a.10155.com/90115000/rbt/1_88ct/20170508/220182.wav?user='+(mobile||'')+'&channelID='+source+'&contentid=9178900020170601431267';
			this.$nextTick(() => {
				this.scrollMusicName();
			})
		},
		methods: {
			/**
			 * [播放炫铃]
			 */
			play() {
				if ( this.isPlay ) {
					this.$refs.audio.pause();
				} else {
					this.$refs.audio.play();
				}
				this.isPlay = !this.isPlay;
			},
			showModal() {
				this.$emit('showModal', 'MembersCRBTConfirm');
			},
			/**
			 * 歌曲名字滑动效果
			 */
			scrollMusicName() {
				let maxWidth = 50;

				clearTimeout(this.timer);
				
				this.timer = setTimeout(() => {
					this.translate -= 1;
					if (this.translate < -maxWidth) {
						this.translate = 0;
					}
					this.scrollMusicName();
				}, 60);
			}
		},
		beforeDestroy() {
			this.$refs.audio.pause();
		}
	}
</script>
<style lang="scss" scoped>
	.CRBT_index {
		.mes1 {
			padding-bottom: 40px;
			font-size: 34px;
			color: #000be2;
		}
		.music {
			position: relative;
			width: 90%;
			margin: 0 auto 20px;
			border: 5px solid black;
			background: white;
			box-shadow: 2px 2px 0 black;
			img {
				position: absolute;
				top: 50%;
				left: 20px;
				width: 170px;
				height: 170px;
				transform: translate(0, -50%);
				z-index: 3;
			}
		}
		.music_btns {
			padding: 34px 0 34px 210px;
			text-align: center;
			a {
				display: inline-block;
				width: 67px;
				height: 67px;
				margin: 0 30px;
				background-image: url(../../../images/music-tip.png);
				background-repeat: no-repeat;
			}
			.play {
				background-position: 0 -134px;
				&:active {
					background-position: 0 -201px;
				}
			}
			.pause {
				background-position: 0 0;
				&:active {
					background-position: 0 -67px;
				}
			}
			.btn2 { //134 201
				background-position: 0 -268px;
				&:active {
					background-position: 0 -335px;
				}
			}
		}
		.music_name {
			padding: 10px 15px 10px 210px;
			text-align: center;
			background: blue;
			font-size: 36px;
			color: white;
			p {
				overflow: hidden;
				white-space: nowrap;
			}
			span {
				display: inline-block;
			}
		}
	}
</style>