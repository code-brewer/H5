<template>
	<div class="accordion-container" :class="{visible: IS_VISIBLE}" v-el:container>
		<div class="accordion" v-el:accordion>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			for: {
				type: String
			},
			action: {
				type: Boolean,
				require: true
			}
		},
		data() {
			return {
				IS_VISIBLE: false,
				IS_ANIMATING: false,
				UNALIGNED: false,

				forElement: null,
				element: null,
				container: null
			}

		},

		ready() {
			this.UNALIGNED = true;
			
			if(this.for) {
				this.forElement = document.getElementById(this.for);
				this.forElement.addEventListener('click', this.handleForClick.bind(this))

				this.element = this.forElement.parentElement;

				this.container = this.$els.container;

			}
		},

		methods: {
			handleForClick(evt) {
				if(this.element && this.forElement) {
		            this.toggle(evt);
				}
			},
			show(evt) {
			    if (this.element && this.container) {
			      // Measure the inner element.
			      var height = this.$els.accordion.getBoundingClientRect().height;
			      var width = this.element.getBoundingClientRect().width;

			      // Apply the inner element's size to the container and outline.
			      this.container.style.width = width + 'px';
			      this.container.style.height = height + 'px';

			      var callback = function(e) {
			        if (e !== evt && !this.closing_ && e.target.parentNode !== this.element) {
			          document.removeEventListener('click', callback);
			          this.hide();
			        }
			      }.bind(this);

			      this.IS_VISIBLE = true;
			      this.action = true;
			    }
			},

			hide() {
			    if (this.element && this.container) {

			      this.container.style.height = '';

			      this.IS_VISIBLE = false;
			      this.action = false;

			    }
			},

			toggle(evt) {
			    if (this.IS_VISIBLE) {
			      	this.hide();
			    } else {
			      	this.show(evt);
			    }
			}
		}
 	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	@import '../../css/bootstrap/_mixins.scss';

	.accordion-container {
		display: block;
	    margin: 0;
	    padding: 0;
	    border: none;
	    overflow: hidden;
	    height: 0;
	    width: 0;
	    // visibility: hidden;
	    // z-index: -1;
	    @include transition(height .3s ease-out);


	    .accordion {
		    list-style: none;
		    height: auto;
		    width: 100%;
		    min-width: 124px;
		    margin: 0;
		    > ul {
		    	padding: 0;
		    }
	    }

	    

    	&.visible {
		    z-index: 999;
    		visibility: visible;

    		.accordion {
			    opacity: 1;
    			z-index: 999;
    		}
    	}
	}
</style>