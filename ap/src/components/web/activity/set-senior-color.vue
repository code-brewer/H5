<template>
	<div class="set-senior-color-view">
		<ul>
			<li>
				<span>背景底色调：</span>
				<span class="color-picker-cube" @click="openColor(0)" :style="{'background-color':common.bg}"></span>
				<question style="display: inline-block;">
					预防因为手机屏幕尺寸不一造成页面出现留白。
				</question>
			</li>
			<li>
				<span>主色调：</span>
				<span class="color-picker-cube" @click="openColor(1)" :style="{'background-color':common.mainColor}"> </span>
			</li>
			<li>
				<span>基色调：</span>
				<span class="color-picker-cube" @click="openColor(2)" :style="{'background-color':common.secondColor}"></span>
			</li>

		</ul>
		<div v-show="selectColor" class="select-color" @click.stop>
			<Photoshop :colors.sync="colors"></Photoshop>
		</div>
	</div>
</template>
<style lang="scss">
	.set-senior-color-view {
		.select-color {
			position: absolute;
			z-index: 8;
			left: 121px;
		}
		ul {
			list-style: none;
			padding: 0;
			width: 100%;
			li {
				display: inline-block;
				margin-right: 50px;
				span {
					display: inline-block;
					vertical-align: middle;
				}
				&:first-child>span:first-child {
					margin-right: 35px;
					padding-left: 10px;
				}
				.color-picker-cube {
					width: 34px;
					height: 34px;
					border: 1px solid #ccc;
				}
			}
		}
	}
</style>
<script>
	import question from '../../web-base/question'
	import vueColor from '../../vue-color/vue-color.js'
	export default {
		components: {
			question,
			Photoshop: vueColor.Photoshop
		},
		props: {
			common: {
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				selectColor: false,
				colors: {
					hex: '#194d33',
					a: 1
				},
				index: 0,
			}
		},
		methods: {
			openColor(i) {
				this.index = i
				this.selectColor = true;
			}
		},
		events: {
			colorAccept() {
				if(this.index == 0)
					this.common.bg = this.colors.hex;
				else if(this.index == 1)
					this.common.mainColor = this.colors.hex;
				else
					this.common.secondColor = this.colors.hex;

				this.selectColor = false;
			},
			colorCancel() {
				this.selectColor = false;
			}
		}
	}
</script>