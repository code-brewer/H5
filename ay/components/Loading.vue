<template>
	<div class="loading-container" :class="{'visible active': show}">
		<div class="loading">
			<div style="stroke:#f1f2f7;" class="spinner" v-if="icon" v-el:ele>
				<svg viewBox="0 0 64 64"><g transform="rotate(147.5999999999999,32,32)"><circle stroke-width="2" stroke-dasharray="185.99887558670915" stroke-dashoffset="181.99647166863906" r="26" cx="32" cy="32" fill="none" transform="scale(-1,1) translate(-64,0) rotate(-11,32,32)"></circle></g></svg>
			</div>
			<div class="xs">{{text}}</div>
		</div>
	</div>
</template>

<script>
	var TRANSLATE32 = 'translate(32,32)';
	var STROKE_OPACITY = 'stroke-opacity';
	var ROUND = 'round';
	var INDEFINITE = 'indefinite';
	var DURATION = '750ms';
	var NONE = 'none';
	var SHORTCUTS = {
	    a: 'animate',
	    an: 'attributeName',
	    at: 'animateTransform',
	    c: 'circle',
	    da: 'stroke-dasharray',
	    os: 'stroke-dashoffset',
	    f: 'fill',
	    lc: 'stroke-linecap',
	    rc: 'repeatCount',
	    sw: 'stroke-width',
	    t: 'transform',
	    v: 'values'
	};

	var SPIN_ANIMATION = {
	    v: '0,32,32;360,32,32',
	    an: 'transform',
	    type: 'rotate',
	    rc: INDEFINITE,
	    dur: DURATION
	};

	

	var rIndex = 0;
    var rotateCircle = 0;
    var startTime;        
	        
	export default {
	    props: {
	        text: {
	            type: String,
	            default: '正在拼命加载中...'
	        },
	        show: {
	        	require: true,
		        type: Boolean,
		        twoWay: true
	        },
	        icon: {
	        	type: Boolean,
	        	default: true
	        },
	        duration: {
	        	type: Number,
	        	default: 0
	        },
	        name: {
	        	type: String,
	        	default: ''
	        }
	    },
	    data() {
	        return {
	            stop: false,
	            timeoutid:false,
	        }
	    },
	    watch: {
	    	show(val) {
	    		if(val) {
	    			this.changeData();
	    		}
	    		else {
	    			
	    			if(this.icon) {
	    				this.stop = true;
	    			}
	    			if(this.timeoutid){
	    				clearTimeout(this.timeoutid);
	    			}

	    			document.querySelector('.view-wrap').classList.remove('open');
	    		}
	    	}
	    },
	    methods: {
	    	changeData(){
	    		var that = this;

	    		if(that.icon) {
	    			startTime = Date.now();
	    			that.stop = false;
	    			that.runAnim();
	    		}
	    		else {
	    			startTime = Date.now();
	    			that.stop = false;
	    			that.runEmpty();
	    		}

	    		document.querySelector('.view-wrap').classList.add('open');

	    		if(that.duration&&that.duration!=0) {
	    			that.timeoutid = setTimeout(()=> {
	    				if(that.show){
	    					that.show = false;
	    					that.$dispatch('cancelloading', that.name);
	    				}
	    			}, that.duration);
	    		

	    		}
	    	},
	    	runAnim() {
	    		var self = this;
		        var ele = self.$els.ele;

		        if(!ele) return;
			    var svgEle = ele.querySelector('g');
			    var circleEle = ele.querySelector('circle');

	            if (self.stop) return;
	            if (!self.show){
	            	if(self.timeoutid){
	    				clearTimeout(self.timeoutid);
	    			}
	    			return;
	            }

	            var v = easeInOutCubic(Date.now() - startTime, 650);
	            var scaleX = 1;
	            var translateX = 0;
	            var dasharray = (188 - (58 * v));
	            var dashoffset = (182 - (182 * v));

	            if (rIndex % 2) {
	                scaleX = -1;
	                translateX = -64;
	                dasharray = (128 - (-58 * v));
	                dashoffset = (182 * v);
	            }

	            var rotateLine = [0, -101, -90, -11, -180, 79, -270, -191][rIndex];

	            setSvgAttribute(circleEle, 'da', Math.max(Math.min(dasharray, 188), 128));
	            setSvgAttribute(circleEle, 'os', Math.max(Math.min(dashoffset, 182), 0));
	            setSvgAttribute(circleEle, 't', 'scale(' + scaleX + ',1) translate(' + translateX + ',0) rotate(' + rotateLine + ',32,32)');

	            rotateCircle += 4.1;
	            if (rotateCircle > 359) rotateCircle = 0;
	            setSvgAttribute(svgEle, 't', 'rotate(' + rotateCircle + ',32,32)');

	            if (v >= 1) {
	                rIndex++;
	                if (rIndex > 7) rIndex = 0;
	                startTime = Date.now();
	            }
	            requestAnimationFrame(self.runAnim);
	        },
	        runEmpty() {
	        	var self = this;
		        var ele = self.$els.ele;

		        if (self.stop) return;
		        if (!self.show){
	            	if(self.timeoutid){
	    				clearTimeout(self.timeoutid);
	    			}
	    			return;
	            }

		        var v = easeInOutCubic(Date.now() - startTime, 650);

		        if (v >= 1) {
	                rIndex++;
	                if (rIndex > 7) rIndex = 0;
	                startTime = Date.now();
	            }
	            requestAnimationFrame(self.runEmpty);
	        }
	    },
	    ready() {
	    	 this.changeData();
	    }
	}

	function setSvgAttribute(ele, k, v) {
	    ele.setAttribute(SHORTCUTS[k] || k, v);
	}

	function easeInOutCubic(t, c) {
	    t /= c / 2;
	    if (t < 1) return 1 / 2 * t * t * t;
	    t -= 2;
	    return 1 / 2 * (t * t * t + 2);
	}


</script>

<style lang="sass">
	.loading-container {
		z-index: 9999;
	    &.active {
	        opacity: 1;
	    }
	    &.visible {
	        visibility: visible;
	    }
	    position: absolute;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(#000, .4);
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -moz-box;
	    display: -moz-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    -moz-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    -moz-align-items: center;
	    align-items: center;
	    -webkit-transition: .2s opacity linear;
	    transition: .2s opacity linear;
	    visibility: hidden;
	    opacity: 0;
	    .loading {
	        padding: 1.5rem 2rem;
	        background-color: rgba(0, 0, 0, .7);
			color: #fff;
			text-align: center;
			text-overflow: ellipsis;
			font-size: 15px;
			-webkit-border-radius: 10px;
			-moz-border-radius: 10px;
			border-radius: 10px;
	    }

	    .spinner {
		    svg {
		        height: 4rem;
		        width: 4rem;
		    }
		    margin-bottom: 0.5rem;
		}

		.xs {
			
			font-size: 1rem;
		}
	}
</style>