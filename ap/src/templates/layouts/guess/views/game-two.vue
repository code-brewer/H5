<template>
	<div class="game-view-two guess-bg">
		<p>
			请问第<span>{{second}}</span>秒出现的是以下哪张图片？
		</p>
		<ul>
			<li v-for="item in List" @click="select(item.imgUrl,$index)" :class="{'select':selectItem==$index}" track-by="$index">
				<img :src="item.imgUrl" />
			</li>
		</ul>
		<a class="btn" @click="save">
			确定
		</a>
	</div>
</template>
<script>
	import sapi from '../../../service'
	export default {
		data() {
				var imgItem = window.store.activityConfig.imgItem;
				return {
					imgItem,
					item: [],
					second: 5,
					List: [],
					selectItem: -1,
					imgUrl: ''
				}
			},
			ready() {
				this.item = this.$root.item;
				this.init();
			},
			methods: {
				select(img, index) {
					this.selectItem = index;
					this.imgUrl = img;
				},
				init() {
					var i = Math.floor(Math.random() * 10);
					this.second = i + 1;
					this.getList();
					console.log(this.item[10 - this.second])
				},
				getList() {
					var k = Math.floor(Math.random() * 4);
					while(this.List.length < 4) {
						if(k == this.List.length) {
							this.List.push(this.item[10 - this.second]);
							continue;
						}
						var flag = Math.floor(Math.random() * this.imgItem.length),
							isNew = true;
						if(this.imgItem[flag].imgUrl == this.item[10 - this.second].imgUrl)
							continue;
						for(var i = 0; i < this.List.length; i++) {
							if(this.imgItem[flag].imgUrl == this.List[i].imgUrl) {
								isNew = false;
							}
						}
						if(isNew) {
							this.List.push(this.imgItem[flag]);
						}
					}
				},
				addPubScore() {
					sapi.addPubScore(this, {
						"score": 1,
						"types": window.store.configData.types
					}, (back) => {
						if(back.resCode == "00000") { //00000表示保存成功
							this.$root.$router.go({
								name: 'success',
								params: {
									type: 0,
									score: back.resMsg
								}
							})
						} else {
							this.$root.$router.go({
								name: 'fail',
								params: {
									type: 0,
									score: back.resMsg
								}
							})
						}
					})
				},
				save() {
					if(this.imgUrl == this.item[10 - this.second].imgUrl)
						this.addPubScore();
					else {
						this.$root.$router.go({
							name: 'fail',
							params: {
								type: 0,
								score: 0
							}
						})
					}
				}
			}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-two {
		.btn {
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../images/btn.png");
			width: px2rem(200px);
			height: px2rem(104px);
			line-height: px2rem(104px);
			font-size: px2rem(54px);
			text-align: center;
			margin: px2rem(100px) auto 0 auto;
			color: #ffffff;
			text-decoration: none;
			display: block;
			text-shadow: 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e;
		}
		p {
			padding-top: px2rem(117px);
			padding-bottom: px2rem(50px);
			font-size: px2rem(36px);
			text-shadow: 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e, 1px 1px #11324e;
			color: #fff;
			text-align: center;
			margin: 0;
			span {
				color: #890000;
				text-shadow: 0px 0px #890000;
			}
		}
		ul {
			list-style: none;
			font-size: 0;
			width: 100%;
			text-align: center;
			padding: 0;
			position: relative;
			li {
				margin: px2rem(25px);
				width: px2rem(218px);
				height: px2rem(218px);
				display: inline-block;
				position: relative;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.select::after {
				content: ' ';
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				background-image: url("../images/true.png");
				background-repeat: no-repeat;
				background-position: 50% 50%;
				background-size: px2rem(55px) px2rem(38px);
				background-color: rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>