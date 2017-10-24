<template>

	<custom class="button-ripple" :class="color" 
		:id="id" @touchstart="downHandler" @touchend="upHandler" @touchmove="upHandler" @blur="upHandler">
		<div class="slot"><slot></slot></div>
		<div class="button-ripple-container">
			<span class="ripple" :class="{visible: IS_VISIBLE, animating: IS_ANIMATING}" v-el:ripple></span>
		</div>
	</custom>
	
	
</template>

<script>
	
	const Constant = {
		INITIAL_SCALE: 'scale(0.0001, 0.0001)',
	    INITIAL_SIZE: '1px',
	    INITIAL_OPACITY: '0.4',
	    FINAL_OPACITY: '0',
	    FINAL_SCALE: ''
	}

	export default {
		props: {
			id: {
				type: String
			},
			color: {
				type: String
			},
			tag: {
				type: String,
				require: true,
				default: 'button'
			}
		},
		data() {
			return {
				boundHeight: '',
				boundWidth: '',
				rippleSize: 0,
			    
			    IS_VISIBLE: false,
			    IS_ANIMATING: false,
			    frameCount: 0,
			    x: 0,
			    y: 0,
			    ignoringMouseDown: false,

			    recentering: false
			}
		},

		created() {
			var beforeReplace = this.$options.template;
			beforeReplace = beforeReplace.replace('<custom', '<'+this.tag)
			beforeReplace = beforeReplace.replace('/custom', '/'+this.tag)
			this.$options.template = beforeReplace

		},

		methods: {
			downHandler(evt) {
				var $ripple = this.$els.ripple;

				if(!$ripple.style.width && !$ripple.style.height) {
					var rect = $ripple.getBoundingClientRect();
					this.boundHeight = rect.height;
      				this.boundWidth = rect.width;
      				this.rippleSize = Math.sqrt(rect.width * rect.width +
				          rect.height * rect.height) * 2 + 2;
				    $ripple.style.width = this.rippleSize + 'px';
				    $ripple.style.height = this.rippleSize + 'px';
				}

				this.IS_VISIBLE = true;
				this.IS_ANIMATING = true;

				if (evt.type === 'mousedown' && this.ignoringMouseDown) {
			      this.ignoringMouseDown = false;
			    } else {
			      if (evt.type === 'touchstart') {
			        this.ignoringMouseDown = true;
			      }
			      var frameCount = this.getFrameCount();
			      if (frameCount > 0) {
			        return;
			      }
			      this.setFrameCount(1);
			      var bound = evt.currentTarget.getBoundingClientRect();
			      var x;
			      var y;
			      // Check if we are handling a keyboard click.
			      if (evt.clientX === 0 && evt.clientY === 0) {
			        x = Math.round(bound.width / 2);
			        y = Math.round(bound.height / 2);
			      } else {
			        var clientX = evt.clientX ? evt.clientX : evt.touches[0].clientX;
			        var clientY = evt.clientY ? evt.clientY : evt.touches[0].clientY;
			        x = Math.round(clientX - bound.left);
			        y = Math.round(clientY - bound.top);
			      }
			      this.setRippleXY(x, y);
			      this.setRippleStyles(true);
			      window.requestAnimationFrame(this.animFrameHandler.bind(this));
			    }
				
			},

			upHandler(evt) {
				var self = this;
			 
			    if (evt && evt.detail !== 2) {
			      window.setTimeout(function() {
			        	self.IS_VISIBLE = false;
			      }, 0);
			    }
			},

			animFrameHandler() {
	          if (this.frameCount -- > 0) {
	            window.requestAnimationFrame(this.animFrameHandler.bind(this));
	          } else {
	            this.setRippleStyles(false);
	          }
	        },

	        getFrameCount() {
	          return this.frameCount;
	        },

	        setFrameCount(fC) {
	          this.frameCount = fC;
	        },

	    	setRippleXY(newX, newY) {
	          this.x = newX;
	          this.y = newY;
	        },

	        setRippleStyles(start) {
	          if (this.$els.ripple !== null) {
	            var transformString;
	            var scale;
	            var size;
	            var offset = 'translate(' + this.x + 'px, ' + this.y + 'px)';
	            if (start) {
	              scale = Constant.INITIAL_SCALE;
	              size = Constant.INITIAL_SIZE;
	            } else {
	              scale = Constant.FINAL_SCALE;
	              size = this.rippleSize + 'px';
	              if (this.recentering) {
	                offset = 'translate(' + this.boundWidth / 2 + 'px, ' +
	                  this.boundHeight / 2 + 'px)';
	              }
	            }

	            transformString = 'translate(-50%, -50%) ' + offset + scale;

	            this.$els.ripple.style.webkitTransform = transformString;
	            this.$els.ripple.style.msTransform = transformString;
	            this.$els.ripple.style.transform = transformString;

	            if (start) {
	              this.IS_ANIMATING = false;
	            } else {
	              this.IS_ANIMATING = true;
	            }
	          }
	        }
		}
	}
</script>

<style lang="sass">
	$brand-primary: #fa7c33;
	$brand-yellow: #fad233;

	.button-ripple {
	    background: 0 0;
	    border: none;
	    border-radius: 2px;
	    color: #000;
	    position: relative;
	    height: 36px;
	    width: auto;
	    margin: 0;
	    display: inline-block;
	    font-family: "Roboto","Helvetica","Arial",sans-serif;
	    font-size: 14px;
	    font-weight: 500;
	    text-transform: uppercase;
	    letter-spacing: 0;
	    overflow: hidden;
	    will-change: box-shadow;
	    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
	    outline: none;
	    cursor: pointer;
	    text-decoration: none;
	    text-align: center;
	    line-height: 36px;
	    vertical-align: middle;
	    &:hover {
	    	background-color: rgba(158,158,158,.2);
	    }

	    &.button-primary {
	    	background-color: $brand-primary;
	    	color: #fff;
	    	&:hover {
	    		background-color: darken($brand-primary, 6.5%);
	    	}
	    }

	    &.button-yellow {
	    	background-color: $brand-yellow;
	    	color: #fff;
	    	&:hover {
	    		background-color: darken($brand-yellow, 6.5%);
	    	}
	    }

		
		&.disabled {
			pointer-events: none !important;
			background-color: rgba(158,158,158,.2) !important;
		}
		
		.slot {
			z-index: 2;
			position: relative;
			a {
				text-decoration: none;
			}
		}
	    
	    .button-ripple-container {
		    display: block;
		    height: 100%;
		    left: 0;
		    position: absolute;
		    top: 0;
		    width: 100%;
		    z-index: 0;
		    overflow: hidden;
    		-webkit-mask-image: -webkit-radial-gradient(circle,#fff,#000);
		    .ripple {
		    	background: #000;
			    border-radius: 50%;
			    height: 50px;
			    left: 0;
			    opacity: 0;
			    pointer-events: none;
			    position: absolute;
			    top: 0;
			    -webkit-transform: translate(-50%,-50%);
			    transform: translate(-50%,-50%);
			    width: 50px;
			    overflow: hidden;
			    &.animating {
			    	transition: transform .3s cubic-bezier(0,0,.2,1),width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .6s cubic-bezier(0,0,.2,1);
    				transition: transform .3s cubic-bezier(0,0,.2,1),width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .6s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1);
			    }

			    &.visible {
			    	opacity: .3;
			    }


		    }
		}

		.menu-container {
			display: block;
		    margin: 0;
		    padding: 0;
		    border: none;
		    position: absolute;
		    overflow: visible;
		    height: 0;
		    width: 0;
		    visibility: hidden;
		    z-index: -1;
		    .menu-outline {
		    	display: block;
			    background: #fff;
			    margin: 0;
			    padding: 0;
			    border: none;
			    border-radius: 2px;
			    position: absolute;
			    top: 0;
			    left: 0;
			    overflow: hidden;
			    opacity: 0;
			    -webkit-transform: scale(0);
			    transform: scale(0);
			    -webkit-transform-origin: 0 0;
			    transform-origin: 0 0;
			    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
			    will-change: transform;
			    transition: transform .3s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1);
			    transition: transform .3s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1),-webkit-transform .3s cubic-bezier(.4,0,.2,1);
			    z-index: -1;
		    }


		}
	}
</style>