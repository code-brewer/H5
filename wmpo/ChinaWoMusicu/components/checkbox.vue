<template>
	<div class="checkbox-view" @click="toggle" :class="{'select':checked}">
		<label>{{msg}}</label>
		<input type="checkbox" :value="checked" />
		<span class="box"></span>
	</div>
</template>
<style lang="sass">
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
			border: 1px solid #ccc;
			width: 30px;
			height: 30px;
			display: inline-block;
			position: relative;
		}
	}
	
	.select {
		.box::after {
			display: block;
			content: ' ';
			width: 45px;
			top: -12px;
			left: 0;
			height: 45px;
			background-repeat: no-repeat;
			position: absolute;
			background-image: url('../images/true-icon.png');
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
			}
		},
		watch: {
			checked(v) {
				if(v)
					this.$dispatch("checked", this.value, this.checked);
			}
		},
		data() {
			return {

			}
		},
		methods: {
			toggle() {
				this.checked = !this.checked;
			}
		}
	}
</script>