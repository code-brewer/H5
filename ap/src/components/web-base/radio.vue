<template>
	<label class="radio-ripple"
	       :class="{'is-disabled': IS_DISABLED, 'is-checked': IS_CHECKED, 'is-focused': IS_FOCUSED}"
	       @mouseup="boundElementMouseUp"
	       v-el:wrap>
		<input type="radio"
		       class="radio-input"
		       :checked="checked"
		       v-model="model"
		       :disabled="disabled"
		       @focus="boundInputOnFocus"
		       @blur="boundInputOnBlur"
		       :name="name"
		       :value="value"
		       v-el:input>
		<span class="radio-label"><slot></slot></span>
		<span class="radio-outer-circle"></span>
		<span class="radio-inner-circle"></span>
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
		value: {
			type: String
		},
		name: {
			type: String
		},
		model: {
			twoWays: true,
			type: String
		}
	},

	components: {
		buttonRipple
	},

	created() {
	},

	data() {
		return {
			IS_FOCUSED: false,
			IS_DISABLED: false,
			IS_CHECKED: false
		}
	},

	ready() {
		this.updateClasses_()
	},

	watch: {
		model(val) {
			this.boundInputOnChange()
		}
	},

	methods: {
		boundInputOnChange(evt) {
			var radios = document.getElementsByClassName('radio-ripple')
			for (var i = 0; i < radios.length; i++) {
				var input = radios[i].querySelector('.radio-input')
				if (input.getAttribute('name') === this.name) {
					radios[i].classList.remove('is-checked')
				}
			};

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
			if (this.$els.input.disabled) {
				this.IS_DISABLED = true;
			} else {
				this.IS_DISABLED = false;
			}
		},
		checkToggleState() {
			if (this.$els.input.checked) {
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
.radio-ripple {
	position: relative;
	vertical-align: middle;
	display: inline-block; // box-sizing: border-box;
	width: auto;
	height: 24px;
	line-height: 24px;
	margin: 0;
	padding: 0;
	padding-left: 24px;
	.radio-input {
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
	.radio-outer-circle {
		position: absolute;
		top: 4px;
		left: 0;
		display: inline-block; // box-sizing: border-box;
		width: 16px;
		height: 16px;
		margin: 0;
		cursor: pointer;
		border: 2px solid rgba(0, 0, 0, .54);
		@include border-radius(50%);
		z-index: 2;
	}
	&.is-checked .radio-outer-circle {
		border: 2px solid $brand-primary;
	}
	&.is-disabled .radio-outer-circle {
		border: 2px solid rgba(0, 0, 0, .26);
		cursor: auto;
	}
	.radio-inner-circle {
		position: absolute;
		z-index: 1;
		margin: 0;
		top: 8px;
		left: 4px; // box-sizing: border-box;
		width: 8px;
		height: 8px;
		cursor: pointer;
		@include transition-duration(.28);
		@include transition-timing-function(cubic-bezier(.4, 0, .2, 1));
		@include transition-property(transform);
		@include scale3d(0, 0, 0);
		@include border-radius(50%);
		background: #009688;
	}
	&.is-checked .radio-inner-circle {
		@include scale3d(1, 1, 1);
	}
	&.is-disabled .radio-inner-circle {
		border: 2px solid rgba(0, 0, 0, .26);
		cursor: auto;
	}
	&.is-focused .radio-inner-circle {
		@include box-shadow(0 0 0px 10px rgba(0, 0, 0, 0.1));
	}
	.radio-label {
		cursor: pointer;
	}
	&.is-disabled .radio-label {
		color: rgba(0, 0, 0, .26);
		cursor: auto;
	}
	.button-ripple {
		position: absolute;
		z-index: 2;
		top: -6px;
		left: -10px; // box-sizing: border-box;
		width: 36px;
		height: 36px;
		@include border-radius(50%);
		cursor: pointer;
		overflow: hidden;
		-webkit-mask-image: -webkit-radial-gradient(circle, white, black);
	}
	&.is-disabled .button-ripple {
		background: transparent;
	}
	&.is-disabled {
		pointer-events: none !important;
	}
}
</style>