<template>
	<div class="label-inline">
		<span class="onse">倒计时设置：</span>
		<div>
			<div class="form-group">
				<input type="number" class="short-input" v-model="counttime" @input="limit"><span> 秒</span>
			</div>
		</div>
	</div>
	<div class="label-inline">
		<span class="onse">色块设置：</span>
		<div style="position: relative;">
			<ul class="colors-list">
				<li class="color-item" v-for="color in colors" track-by="$index">
					<div :style="{'background-color': color}" :title="color" @click="openColor(color, $index)"></div>
					<span class="del-btn" @click="delColor(color)"> <i class="fa fa-times-circle"></i></span>
				</li>
				<li class="color-item">
					<div style="text-align: center; border: 1px #eee dashed;"><span class="add-btn" @click="addColor"> <i class="fa fa-plus"></i></span></div>
				</li>
			</ul>
		</div>
	</div>

	<modal class="color-picker-modal" :show.sync="isSelectColor" size="md">

		<Photoshop :colors.sync="currSelectColor"></Photoshop>

	</modal>

</template>
<script>
	import Vue from 'vue'
	import vueColor from '../../../components/vue-color/vue-color2.js'
	import Modal from '../../../components/bootstrap/Modal2.vue'
	export default {
		components: {
			Photoshop: vueColor.Photoshop,
			Modal
		},
		props: {
			id: {
				type: String
			}
		},
		data() {
			var counttime = window.store.activityConfig.counttime;
			var colors = window.store.activityConfig.colors;
			return {
				counttime,
				colors,
				isSelectColor: false,
				currSelectColor: {
					hex: '#333'
				},
				currSelectColorIndex: 0,
				showForm: false
			}
		},
		methods: {
			limit() {
				if(!/\d/.test(this.counttime)) {
					this.counttime = 60;
				} else if(this.counttime < 10) {
					this.counttime = 10;
				} else if(this.counttime > 300) {
					this.counttime = 300;
				}
				this.counttime = parseInt(this.counttime);
				window.store.activityConfig.counttime = this.counttime;
			},
			delColor(color) {
				if(!this.colors.length) return;
				this.colors.$remove(color);
			},
			addColor() {
				if(this.colors.length >= 18) return;
				this.colors.push('#333');
			},
			openColor(color, index) {
				this.isSelectColor = true;
				this.currSelectColor.hex = color;
				this.currSelectColorIndex = index;
			},
			colseColor() {
				if(this.isSelectColor) {
					this.isSelectColor = false;
				}
			},
			setColors(index, color) {
				this.colors.splice(index, 1)
				this.colors.splice(index, 0, color)
			}
		},
		events: {
			colorAccept() {
				this.isSelectColor = false;
				this.setColors(this.currSelectColorIndex, this.currSelectColor.hex)
			},
			colorCancel() {
				this.isSelectColor = false
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	#condition-config-content {
		.del-btn {
			display: inline-block;
			color: $brand-danger;
			// margin-left: 10px;
			font-size: 15px;
			vertical-align: middle;
			cursor: pointer;
			position: absolute;
			right: 3px;
			top: -9px;
			&:hover {
				color: lighten($brand-danger, 3%);
			}
			&:active {
				color: darken($brand-danger, 6.5%);
			}
		}
		.add-btn {
			display: inline-block;
			color: $brand-success;
			font-size: 18px;
			vertical-align: middle;
			cursor: pointer;
			line-height: 40px;
			&:hover {
				color: lighten($brand-success, 3%);
			}
			&:active {
				color: darken($brand-success, 6.5%);
			}
		}
		.form-group {
			margin-bottom: 5px;
			font-size: 12px;
			> div {
				display: inline-block;
				max-width: 100%;
			}
		}
		.short-input {
			display: inline-block;
			width: 55px;
			text-align: center;
		}
		ul.colors-list {
			margin-left: -5px;
			list-style: none;
			> li {
				width: 50px;
				height: 50px;
				float: left;
				padding: 5px;
				position: relative;
				> div {
					width: 100%;
					height: 100%;
					display: block;
					position: relative;
					span.del-btn {
						position: absolute;
						right: 0;
						top: 0;
						line-height: 15px;
						z-index: 3;
					}
				}
			}
		}
		div.color-picker-wrap {
			display: inline-block;
			position: absolute;
			left: 0;
			top: 0;
		}
		.color-picker-modal {
			.modal-content {
				background: transparent;
				border: none;
				-webkit-box-shadow: none;
				box-shadow: none;
				.vue-colors__photoshop {
					margin: auto;
				}
			}
		}
	}
</style>