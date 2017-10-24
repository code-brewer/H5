<template>
	<label class="checkbox-ripple" :class="{'is-disabled': IS_DISABLED, 'is-checked': IS_CHECKED, 'is-focused': IS_FOCUSED}" @change="boundInputOnChange" @mouseup="boundElementMouseUp" v-el:wrap>
		<input type="checkbox" class="checkbox-input" :checked="checked" :disabled="disabled" v-model="model" v-bind:value="value" @focus="boundInputOnFocus" @blur="boundInputOnBlur" v-el:input>
		<span class="checkbox-label"><slot></slot></span>
		<span class="helper"></span>
		<span class="outline"><span class="tick-outline"></span></span>
		<button-ripple tag="span"></button-ripple>
	</label>
</template>

<script>
	import buttonRipple from './button-ripple'
	const Constant = {
		TINY_TIMEOUT: 0.001
	}
	export default {
		props: {
			color: {
				type: String
			},
			checked: {
				type: Boolean
			},
			disabled: {
				type: Boolean
			},
			model: {
				require: true
			},
			value: {}
		},

		components: {
			buttonRipple
		},

		data() {
			return {
				IS_FOCUSED: false,
				IS_DISABLED: false,
				IS_CHECKED: false
			}
		},
		ready() {
			this.init();
			this.updateClasses_();
		},
		watch: {
			model(val) {
				this.updateClasses_()
			}
		},
		methods: {
			//预设选中数组的值
			init() {
				if(Object.prototype.toString.call(this.model).indexOf("Array") != -1) {
					for(var i = 0; i < this.model.length; i++) {
						if(this.model[i] == this.value) {
							this.IS_CHECKED = true;
							return
						}
					}
				}
			},
			boundInputOnChange(evt) {
				this.updateClasses_()
			},
			boundInputOnFocus(evt) {
				this.IS_FOCUSED = true;
			},
			boundInputOnBlur(evt) {
				this.IS_FOCUSED = false;
			},
			boundElementMouseUp(evt) {
				this._blur()
			},
			updateClasses_() {
				this.checkDisabled()
				this.checkToggleState()
			},
			_blur() {
				let that = this;
				setTimeout(() => {
					that.$els.input.blur()
				}, Constant.TINY_TIMEOUT)
			},
			checkDisabled() {
				if(this.$els.input.disabled) {
					this.IS_DISABLED = true;
				} else {
					this.IS_DISABLED = false;
				}
			},
			checkToggleState() {
				if(this.$els.input.checked) {
					this.IS_CHECKED = true;
				} else {
					this.IS_CHECKED = false;
				}
			},

		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	@import '../../css/bootstrap/_mixins.scss';
	.checkbox-ripple {
		position: relative;
		z-index: 1;
		vertical-align: middle;
		display: inline-block;
		// box-sizing: border-box;
		width: auto;
		height: 24px;
		margin: 0;
		padding: 0;
		padding-left: 24px;
		.checkbox-input {
			position: absolute;
			width: 0;
			height: 0;
			margin: 0;
			padding: 0;
			opacity: 0;
			-ms-appearance: none;
			-moz-appearance: none;
			-webkit-appearance: none;
			appearance: none;
			border: none;
			line-height: 24px;
		}
		.helper {
			position: absolute;
			top: 3px;
			left: 0;
			display: inline-block;
			// box-sizing: border-box;
			width: 16px;
			height: 16px;
			@include border-radius(50%);
			background-color: transparent;
		}
		&.is-focused .helper {
			box-shadow: 0 0 0px 8px rgba(0, 0, 0, 0.1);
			background-color: rgba(0, 0, 0, 0.1);
		}
		&.is-focused.is-checked .helper {
			box-shadow: 0 0 0px 8px rgba($brand-primary, .26);
			background-color: rgba($brand-primary, .26);
		}
		.outline {
			position: absolute;
			top: 4px;
			left: 0;
			display: inline-block;
			// box-sizing: border-box;
			width: 16px;
			height: 16px;
			margin: 0;
			cursor: pointer;
			overflow: hidden;
			border: 1px solid #d6d6d6;
			@include border-radius(2px);
			z-index: 2;
		}
		&.is-checked .outline {
			border: 1px solid $brand-primary;
		}
		&.is-disabled .outline {
			border: 1px solid rgba(0, 0, 0, .26);
			cursor: auto;
		}
		.tick-outline {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			mask: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcCI+CiAgICAgIDxwYXRoCiAgICAgICAgIGQ9Ik0gMCwwIDAsMSAxLDEgMSwwIDAsMCB6IE0gMC44NTM0Mzc1LDAuMTY3MTg3NSAwLjk1OTY4NzUsMC4yNzMxMjUgMC40MjkzNzUsMC44MDM0Mzc1IDAuMzIzMTI1LDAuOTA5Njg3NSAwLjIxNzE4NzUsMC44MDM0Mzc1IDAuMDQwMzEyNSwwLjYyNjg3NSAwLjE0NjU2MjUsMC41MjA2MjUgMC4zMjMxMjUsMC42OTc1IDAuODUzNDM3NSwwLjE2NzE4NzUgeiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KICAgIDwvY2xpcFBhdGg+CiAgICA8bWFzayBpZD0ibWFzayIgbWFza1VuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgbWFza0NvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8cGF0aAogICAgICAgICBkPSJNIDAsMCAwLDEgMSwxIDEsMCAwLDAgeiBNIDAuODUzNDM3NSwwLjE2NzE4NzUgMC45NTk2ODc1LDAuMjczMTI1IDAuNDI5Mzc1LDAuODAzNDM3NSAwLjMyMzEyNSwwLjkwOTY4NzUgMC4yMTcxODc1LDAuODAzNDM3NSAwLjA0MDMxMjUsMC42MjY4NzUgMC4xNDY1NjI1LDAuNTIwNjI1IDAuMzIzMTI1LDAuNjk3NSAwLjg1MzQzNzUsMC4xNjcxODc1IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgICA8L21hc2s+CiAgPC9kZWZzPgogIDxyZWN0CiAgICAgd2lkdGg9IjEiCiAgICAgaGVpZ2h0PSIxIgogICAgIHg9IjAiCiAgICAgeT0iMCIKICAgICBjbGlwLXBhdGg9InVybCgjY2xpcCkiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIgLz4KPC9zdmc+Cg==");
			background: transparent;
			transition-duration: .28s;
			transition-timing-function: cubic-bezier(.4, 0, .2, 1);
			transition-property: background;
		}
		&.is-checked .tick-outline {
			background: $brand-primary url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K");
		}
		&.is-checked.is-disabled .tick-outline {
			background: rgba(0, 0, 0, .26) url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K");
		}
		.checkbox-label {
			position: relative;
			cursor: pointer;
			font-size: 12px;
			line-height: 24px;
			margin: 0;
		}
		&.is-disabled .checkbox-label {
			color: rgba(0, 0, 0, .26);
			cursor: auto;
		}
		.button-ripple {
			position: absolute;
			z-index: 2;
			top: -6px;
			left: -10px;
			// box-sizing: border-box;
			width: 36px;
			height: 36px;
			@include border-radius(50%);
			cursor: pointer;
			overflow: hidden;
			-webkit-mask-image: -webkit-radial-gradient(circle, #fff, #000)
		}
		&.is-disabled .button-ripple {
			background: transparent;
		}
		&.is-disabled {
			pointer-events: none !important;
		}
	}
</style>