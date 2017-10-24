<template>
	<div class="slider-container">
		<input type="range" class="slider" :class="{'is-lowest-value': IS_LOWEST_VALUE}" @input="boundInputHandler" @change="boundChangeHandler" @mouseup="boundMouseUpHandler" @mousedown="boundContainerMouseDownHandler" v-model="value" :min="min" :max="max" :step="step">
		<div class="slider-background-flex">
			<div class="slider-background-lower" v-el:lower_></div>
			<div class="slider-background-upper" v-el:upper_></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			color: {
				type: String
			},
			disabled: {
				type: Boolean
			},
			value: {
				require: true,
				type: Number,
				default: 0
			},
			min: {
				require: true,
				type: String,
				default: 0
			},
			max: {
				require: true,
				type: String,
				default: 100
			},
			step: {
				type: String
			}
		},

		data() {
			return {
				IS_LOWEST_VALUE: false
			}
		},

		ready() {
			this.updateValueStyles()
		},

		watch: {
			value(val) {
				this.updateValueStyles()
			}
		},

		methods: {
			boundInputHandler(evt) {
				// this.updateValueStyles()
			},
			boundChangeHandler(evt) {
				// this.updateValueStyles()
			},
			boundMouseUpHandler(evt) {
				evt.target.blur();
			},
			boundContainerMouseDownHandler(evt) {
				// console.log(evt.clientX)
			},

			updateValueStyles() {
				var fraction = (this.value - this.min) / (this.max - this.min)
				this.IS_LOWEST_VALUE = (fraction === 0)
			
				this.$els.lower_.style.flex = fraction;
			    this.$els.lower_.style.webkitFlex = fraction;
			    this.$els.upper_.style.flex = 1 - fraction;
			    this.$els.upper_.style.webkitFlex = 1 - fraction;
    
			}

			
		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	@import '../../css/bootstrap/_mixins.scss';

	_:-ms-input-placeholder, :root .slider.slider.is-upgraded {
	  -ms-appearance: none;
	  height: 32px;
	  margin: 0;
	}
	
	.slider-container {
	    height: 18px;
	    position: relative;
	    background: none;
	    display: flex;
	    flex-direction: row;
		.slider {
			width: calc(100% - 40px);
	 		margin: 0 20px;

	        -webkit-appearance: none;
	        -moz-appearance: none;
	        appearance: none;
	        height: 2px;
	        background: transparent;
	        -webkit-user-select: none;
	        -moz-user-select: none;
	        user-select: none;
	        outline: 0;
	        padding: 0;
	        color: $brand-primary;
	        align-self: center;
	        z-index: 1;
	        cursor: pointer;

	        &::-moz-focus-outer {
	            border: 0;
	        }

	        &::-ms-tooltip {
	            display: none;
	        }
	     
	        &::-webkit-slider-runnable-track {
	            background: transparent;
	        }
	        &::-moz-range-track {
	            background: transparent;
	            border: none;
	        }
	        &::-ms-track {
	            background: none;
	            color: transparent;
	            height: 2px;
	            width: 100%;
	            border: none;
	        }
	        &::-ms-fill-lower {
	            padding: 0;
	            background: linear-gradient(to right, transparent, transparent 16px, $brand-primary 16px, $brand-primary 0);
	        }
	        &::-ms-fill-upper {
	            padding: 0;
	            background: linear-gradient(to left, transparent, transparent 16px, rgba(0, 0, 0, .26) 16px, rgba(0, 0, 0, .26) 0);
	        }


	        &::-webkit-slider-thumb {
	            -webkit-appearance: none;
	            width: 12px;
	            height: 12px;
	            // box-sizing: border-box;
	            border-radius: 50%;
	            background: $brand-primary;
	            border: none;
	            @include transition(transform .18s cubic-bezier(.4, 0, .2, 1), border .18s cubic-bezier(.4, 0, .2, 1), box-shadow .18s cubic-bezier(.4, 0, .2, 1), background .28s cubic-bezier(.4, 0, .2, 1));
	        }
	        &::-moz-range-thumb {
	            -moz-appearance: none;
	            width: 12px;
	            height: 12px;
	            box-sizing: border-box;
	            border-radius: 50%;
	            background-image: none;
	            background: $brand-primary;
	            border: none;
	        }
	        &:focus:not(:active)::-webkit-slider-thumb {
	            @include box-shadow(0 0 0 10px rgba(0, 150, 136, .26));
	        }
	        &:focus:not(:active)::-moz-range-thumb {
	            @include box-shadow(0 0 0 10px rgba(0, 150, 136, .26));
	        }
	        &:active::-webkit-slider-thumb {
	            background-image: none;
	            background: $brand-primary;
	            @include scale(1.5);
	        }
	        &:active::-moz-range-thumb {
	            background-image: none;
	            background: $brand-primary;
	            @include scale(1.5);
	        }
	        &::-ms-thumb {
	            width: 32px;
	            height: 32px;
	            border: none;
	            border-radius: 50%;
	            background: $brand-primary;
	            @include scale(0.375);
	            @include transition(transform .18s cubic-bezier(.4, 0, .2, 1), background .28s cubic-bezier(.4, 0, .2, 1));
	        }
	        &:focus:not(:active)::-ms-thumb {
	            background: radial-gradient(circle closest-side, $brand-primary 0%, $brand-primary 37.5%, rgba(0, 150, 136, .26) 37.5%, rgba(0, 150, 136, .26) 100%);
	            @include scale(1);
	        }
	        &:active::-ms-thumb {
	            background: $brand-primary;
	            @include scale(0.5625);
	        }
	        &.is-lowest-value::-webkit-slider-thumb {
	            border: 2px solid rgba(0, 0, 0, .26);
	            background: transparent;
	        }
	        &.is-lowest-value::-moz-range-thumb {
	            border: 2px solid rgba(0, 0, 0, .26);
	            background: transparent;
	        }
	        &.is-lowest-value + .mdl-slider__background-flex > .mdl-slider__background-upper {
	            left: 6px;
	        }
	        &.is-lowest-value:focus:not(:active)::-webkit-slider-thumb {
	            @include box-shadow(0 0 0 10px rgba(0, 0, 0, .12));
	            background: rgba(0, 0, 0, .12);
	        }
	        &.is-lowest-value:focus:not(:active)::-moz-range-thumb {
	            @include box-shadow(0 0 0 10px rgba(0, 0, 0, .12));
	            background: rgba(0, 0, 0, .12);
	        }
	        &.is-lowest-value:active::-webkit-slider-thumb {
	            border: 1.6px solid rgba(0, 0, 0, .26);
	            @include scale(1.5);
	        }
	        &.is-lowest-value:active + .mdl-slider__background-flex > .mdl-slider__background-upper {
	            left: 9px;
	        }
	        &.is-lowest-value:active::-moz-range-thumb {
	            border: 1.5px solid rgba(0, 0, 0, .26);
	            @include scale(1.5);
	        }
	        &.is-lowest-value::-ms-thumb {
	            background: radial-gradient(circle closest-side, transparent 0%, transparent 66.67%, rgba(0, 0, 0, .26) 66.67%, rgba(0, 0, 0, .26) 100%);
	        }
	        &.is-lowest-value:focus:not(:active)::-ms-thumb {
	            background: radial-gradient(circle closest-side, rgba(0, 0, 0, .12) 0%, rgba(0, 0, 0, .12) 25%, rgba(0, 0, 0, .26) 25%, rgba(0, 0, 0, .26) 37.5%, rgba(0, 0, 0, .12) 37.5%, rgba(0, 0, 0, .12) 100%);
	            @include scale(1);
	        }
	        &.is-lowest-value:active::-ms-thumb {
	            @include scale(0.5625);
	            background: radial-gradient(circle closest-side, transparent 0%, transparent 77.78%, rgba(0, 0, 0, .26) 77.78%, rgba(0, 0, 0, .26) 100%);
	        }
	        &.is-lowest-value::-ms-fill-lower {
	            background: transparent;
	        }
	        &.is-lowest-value::-ms-fill-upper {
	            margin-left: 6px;
	        }
	        &.is-lowest-value:active::-ms-fill-upper {
	            margin-left: 9px;
	        }

	        &:disabled:focus::-webkit-slider-thumb,
	        &:disabled:active::-webkit-slider-thumb,
	        &:disabled::-webkit-slider-thumb {
	            @include scale(0.667);
	            background: rgba(0, 0, 0, .26);
	        }
	        &:disabled:focus::-moz-range-thumb,
	        &:disabled:active::-moz-range-thumb,
	        &:disabled::-moz-range-thumb {
	            @include scale(0.667);
	            background: rgba(0, 0, 0, .26);
	        }
	        &:disabled + .mdl-slider__background-flex > .mdl-slider__background-lower {
	            background-color: rgba(0, 0, 0, .26);
	            left: -6px;
	        }
	        &:disabled + .mdl-slider__background-flex > .mdl-slider__background-upper {
	            left: 6px;
	        }
	        &.is-lowest-value:disabled:focus::-webkit-slider-thumb,
	        &.is-lowest-value:disabled:active::-webkit-slider-thumb,
	        &.is-lowest-value:disabled::-webkit-slider-thumb {
	            border: 3px solid rgba(0, 0, 0, .26);
	            background: transparent;
	            @include scale(0.667);
	        }
	        &.is-lowest-value:disabled:focus::-moz-range-thumb,
	        &.is-lowest-value:disabled:active::-moz-range-thumb,
	        &.is-lowest-value:disabled::-moz-range-thumb {
	            border: 3px solid rgba(0, 0, 0, .26);
	            background: transparent;
	            @include scale(0.667);
	        }
	        &.is-lowest-value:disabled:active + .mdl-slider__background-flex > .mdl-slider__background-upper {
	            left: 6px;
	        }
	        &:disabled:focus::-ms-thumb,
	        &:disabled:active::-ms-thumb,
	        &:disabled::-ms-thumb {
	            @include scale(0.25);
	            background: rgba(0, 0, 0, .26);
	        }
	        &.is-lowest-value:disabled:focus::-ms-thumb,
	        &.is-lowest-value:disabled:active::-ms-thumb,
	        &.is-lowest-value:disabled::-ms-thumb {
	            @include scale(0.25);
	            background: radial-gradient(circle closest-side, transparent 0%, transparent 50%, rgba(0, 0, 0, .26) 50%, rgba(0, 0, 0, .26) 100%);
	        }
	        &:disabled::-ms-fill-lower {
	            margin-right: 6px;
	            background: linear-gradient(to right, transparent, transparent 25px, rgba(0, 0, 0, .26) 25px, rgba(0, 0, 0, .26) 0);
	        }
	        &:disabled::-ms-fill-upper {
	            margin-left: 6px;
	        }
	        &.is-lowest-value:disabled:active::-ms-fill-upper {
	            margin-left: 6px;
	        }


		    
		}
		.slider-background-flex {
		    background: transparent;
		    position: absolute;
		    height: 2px;
		    width: calc(100% - 52px);
		    top: 50%;
		    left: 0;
		    margin: 0 26px;
		    display: flex;
		    overflow: hidden;
		    border: 0;
		    padding: 0;
		    @include translate(0, -1px);
		}

		.slider-background-lower {
		    background: $brand-primary;
		    flex: 0;
		    position: relative;
		    border: 0;
		    padding: 0;
		}

		.slider-background-upper {
		    background: rgba(0, 0, 0, .26);
		    flex: 0;
		    position: relative;
		    border: 0;
		    padding: 0;
		    @include transition(left .18s cubic-bezier(.4, 0, .2, 1));
		}
	}
	


</style>


