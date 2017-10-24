<template>
	<div class="menu-clip-container" :class="{upgraded: IS_UPGRADED, animating: IS_ANIMATING, visible: IS_VISIBLE}" v-el:menu>
		<div class="menu-outline menu-outline-right" v-el:outline></div>
		
		<div class="menu" v-el:list>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import buttonRipple from './button-ripple.vue'

	const Constant = {
	    TRANSITION_DURATION_SECONDS: 0.3,
	    TRANSITION_DURATION_FRACTION: 0.8,
	    CLOSE_TIMEOUT: 150
	};

	export default {
		components: {
			buttonRipple
		},
		props: {
			for: {
				type: String
			}
		},
		data() {
			return {
				IS_UPGRADED: false,
				IS_VISIBLE: false,
				IS_ANIMATING: false,
				UNALIGNED: false,

				forElement: null,
				element: null,
				container: null
			}

		},

		ready() {
			this.IS_UPGRADED = true;
			this.UNALIGNED = true;
			
			if(this.for) {
				this.forElement = document.getElementById(this.for);
				this.forElement.addEventListener('click', this.handleForClick.bind(this))

				this.element = this.forElement.parentElement;

				this.container = this.$els.menu;

				this.outline = this.$els.outline;

			}
		},

		methods: {
			handleForClick(evt) {
				if(this.element && this.forElement) {
					var rect = this.forElement.getBoundingClientRect();
      				var forRect = this.forElement.parentElement.getBoundingClientRect();

      				if(this.UNALIGNED) {

      				}
      				else {
      					this.container.style.right = (forRect.right - rect.right) + 'px';
			        	this.container.style.top =
			            this.forElement.offsetTop + this.forElement.offsetHeight + 'px';
      				}

		            this.toggle(evt);
				}
			},
			show(evt) {
			    if (this.element && this.container && this.outline) {
			      // Measure the inner element.
			      var height = this.$els.list.getBoundingClientRect().height;
			      var width = this.element.getBoundingClientRect().width;

			      // Apply the inner element's size to the container and outline.
			      this.container.style.width = width + 'px';
			      this.container.style.height = height + 'px';
			      this.outline.style.width = width + 'px';
			      this.outline.style.height = height + 'px';

			      var transitionDuration = Constant.TRANSITION_DURATION_SECONDS *
			          Constant.TRANSITION_DURATION_FRACTION;

			      // Calculate transition delays for individual menu items, so that they fade
			      // in one at a time.
			      var items = this.element.querySelectorAll('.' + 'menu-item');
			      for (var i = 0; i < items.length; i++) {
			        var itemDelay = null;
			        itemDelay = ((height - items[i].offsetTop - items[i].offsetHeight) /
			              height * transitionDuration) + 's';
			        items[i].style.transitionDelay = itemDelay;
			      }

			      // Apply the initial clip to the text before we start animating.
			      this.applyClip(height, width);

			      // Wait for the next frame, turn on animation, and apply the final clip.
			      // Also make it visible. This triggers the transitions.
			      window.requestAnimationFrame(function() {
			        this.IS_ANIMATING = true;

			        this.element.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
			        this.$els.list.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
					
					this.IS_VISIBLE = true;
			      }.bind(this));

			      // Clean up after the animation is complete.
			      this.addAnimationEndListener();

			      // Add a click listener to the document, to close the menu.
			      var callback = function(e) {
			        // Check to see if the document is processing the same event that
			        // displayed the menu in the first place. If so, do nothing.
			        // Also check to see if the menu is in the process of closing itself, and
			        // do nothing in that case.
			        // Also check if the clicked element is a menu item
			        // if so, do nothing.
			        if (e !== evt && !this.closing_ && e.target.parentNode !== this.element) {
			          document.removeEventListener('click', callback);
			          this.hide();
			        }
			      }.bind(this);
			      document.addEventListener('click', callback);
			    }
			},

			hide() {
			    if (this.element && this.container && this.outline) {
			      var items = this.element.querySelectorAll('.' + 'menu-item');

			      // Remove all transition delays; menu items fade out concurrently.
			      for (var i = 0; i < items.length; i++) {
			        items[i].style.removeProperty('transition-delay');
			      }

			      // Measure the inner element.
			      var rect = this.element.getBoundingClientRect();
			      var height = rect.height;
			      var width = rect.width;

			      // Turn on animation, and apply the final clip. Also make invisible.
			      // This triggers the transitions.
			      this.IS_ANIMATING = true;
			      this.applyClip(height, width);
			      this.IS_VISIBLE = false;


			      // Clean up after the animation is complete.
			      this.addAnimationEndListener();
			    }
			},

			toggle(evt) {
			    if (this.IS_VISIBLE) {
			      	this.hide();
			    } else {
			      	this.show(evt);
			    }
			},

			applyClip(height, width) {
				if(this.UNALIGNED) {
					this.element.style.clip = '';
					this.$els.list.style.clip = '';
				}
				else {
					this.element.style.clip = 'rect(' + height + 'px ' + width + 'px ' +
			          height + 'px ' + width + 'px)';

					this.$els.list.style.clip = 'rect(' + height + 'px ' + width + 'px ' +
			          height + 'px ' + width + 'px)';
				}
			    
			},

			addAnimationEndListener() {
			    this.element.addEventListener('transitionend', this.removeAnimationEndListener);
			    this.element.addEventListener('webkitTransitionEnd', this.removeAnimationEndListener);
			},

			removeAnimationEndListener(evt) {
			    this.IS_ANIMATING = false;
			}
		}
 	}
</script>

<style lang="scss">
	.menu-clip-container {
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

	        

    		&.menu-outline-right {
    			-webkit-transform-origin: 100% 0;
    			transform-origin: 100% 0;

    			.menu {
				    left: auto;
    				right: 0;
    			}
    		}
	    }

	    .menu {
	    	position: absolute;
		    list-style: none;
		    top: 0;
		    left: 0;
		    height: auto;
		    width: 100%;
		    min-width: 124px;
		    padding: 8px 0;
		    margin: 0;
		    opacity: 0;
		    clip: rect(0 0 0 0);
		    z-index: -1;
		    > ul {
		    	padding: 0;
		    }

		    .menu-item {
		    	display: block;
			    border: none;
			    color: rgba(0,0,0,.87);
			    background-color: transparent;
			    text-align: left;
			    margin: 0;
			    outline-color: #bdbdbd;
			    position: relative;
			    overflow: hidden;
			    font-size: 14px;
			    font-weight: 400;
			    letter-spacing: 0;
			    text-decoration: none;
			    cursor: pointer;
			    height: 48px;
			    line-height: 48px;
			    white-space: nowrap;
			    opacity: 0;
			    transition: opacity .2s cubic-bezier(.4,0,.2,1);
			    -webkit-user-select: none;
			    -moz-user-select: none;
			    -ms-user-select: none;
			    user-select: none;

			    .button-ripple {
		    		width: 100%;
			    }
		    }
	    }

	    

    	&.visible {
		    z-index: 999;
    		visibility: visible;
    		.menu-outline {
			    opacity: 1;
			    -webkit-transform: scale(1);
			    transform: scale(1);
			    z-index: 999;
    		}

    		.menu {
			    opacity: 1;
    			z-index: 999;
    		}

    		.menu-item {
			    opacity: 1;
    		}
    	}
	}
</style>