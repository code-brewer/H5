<template>
	<div class="checkbox-view" @click="toggle" :class="{'true':type==1,'false':type==2}">
		<label>{{msg}}</label>
		<input type="checkbox" :value="checked" />
		<span class="box"></span>
	</div>
</template>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.checkbox-view {
		position: relative;
		width: 100%;
		label {
			display: inline-block;
		}
		input {
			display: none;
		}
		.box {
			border: 2px solid #e44933;
			border-radius: px2rem(23px);
			height: px2rem(45px);
			width: px2rem(45px);
			display: inline-block;
			position: relative;
		}
	}
	
	.true {
		.box::after {
			display: block;
			content: ' ';
			width: px2rem(22px);
			top: px2rem(9px);
			left: px2rem(8px);
			height: 100%;
			background-repeat: no-repeat;
			position: absolute;
			background-image: url('../images/true.png');
			background-size: 100%;
		}
	}
	
	.false {
		.box {
			border: 2px solid #056c00;
		}
		.box::after {
			display: block;
			content: ' ';
			width: px2rem(22px);
			height: 100%;
			top: px2rem(9px);
			left: px2rem(9px);
			background-repeat: no-repeat;
			position: absolute;
			background-size: 100%;
			background-image: url('../images/false.png');
		}
	}
</style>
<script>
	export default {
		props: {
			color: {
				type: String
			},
			checked: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean
			},
			value: {
				type: String
			},
			model: {
				default: false
			},
			msg: {
				type: String
			},
			answer: {
				type: String
			},
			index: {
				type: Number,
			}
		},
		data() {
			return {
				type: 0
			}
		},
		watch: {
			checked(v) {
				if(v) {
					this.setSelect();
					this.$dispatch("checked", this.value, this.checked);
				} else {
					this.type = 0;
				}
			}
		},
		methods: {
			setSelect() {
				console.log(22333)
				if(this.value == this.answer) {
					this.type = 1;
				} else {
					this.type = 2;
				}
			},
			toggle() {
				this.checked = !this.checked;	
			}
		}
	}
</script>