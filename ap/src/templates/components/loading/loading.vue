<template>
	<div class="loading-container" transition="loading">
		<div class="loading">
			<div class="spinner" v-if="icon">
			    <div class="loading-leaf loading-leaf-0"></div>
			    <div class="loading-leaf loading-leaf-1"></div>
			    <div class="loading-leaf loading-leaf-2"></div>
			    <div class="loading-leaf loading-leaf-3"></div>
			    <div class="loading-leaf loading-leaf-4"></div>
			    <div class="loading-leaf loading-leaf-5"></div>
			    <div class="loading-leaf loading-leaf-6"></div>
			    <div class="loading-leaf loading-leaf-7"></div>
			    <div class="loading-leaf loading-leaf-8"></div>
			    <div class="loading-leaf loading-leaf-9"></div>
			    <div class="loading-leaf loading-leaf-10"></div>
			    <div class="loading-leaf loading-leaf-11"></div>
			</div>
			<div class="xs">{{text}}</div>
		</div>
	</div>
</template>

<script>
	export default {
	    props: {
	        text: {
	            type: String,
	            default: '正在拼命加载中...'
	        },
	        show: {
	        	require: true,
		        type: Boolean,
		        default: false,
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
	            timeoutid: false
	        }
	    },
	    methods: {
	    	showLoading(){

	    		// 倒计时关闭
	    		if(this.duration&&this.duration!=0) {
	    			this.timeoutid = setTimeout(function() {
	    			
    					this.$dispatch('cancelloading', this.name);
	    				
	    			}.bind(this), this.duration);
	    		

	    		}
	    	}
	    	
	    },
	    ready() {
	    	this.showLoading()
	    }
	}



</script>

<style lang="scss">
	@import '../../../css/px2rem.scss';

	.loading-container {
	    // &.active {
	        display: block;
	    // }
	    // &.visible {
	        // visibility: visible;
	    // }

	    &.loading-enter,
	    &.loading-leave {
			display: none;
	    }
	    position: fixed;
	    left: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    z-index: 1099;
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
	    // visibility: hidden;
	    // opacity: 0;
	    .loading {
	        background-color: rgba(40,40,40,.75);
			color: #fff;
			text-align: center;
			text-overflow: ellipsis;
			font-size: 1.1rem;
			-webkit-border-radius: 10px;
			-moz-border-radius: 10px;
			border-radius: 10px;
		    padding: 2rem 0;
		    position: relative;
	        min-width: 10rem;
	    }

	    .spinner {
	        width: 4rem;
	        height: 4rem;
		    z-index: 2000000000;
	        display: inline-block;
    		position: relative;
		    // margin-bottom: 0.5rem;
		    .loading-leaf {
	    	    position: absolute;
			    top: 1rem;
			    left: 0;
			    right: 0;
			    bottom: 0;
			    opacity: .25;
			    &:before{
			        content:" ";
			        position: absolute;
			        width: px2rem(16.28px);
			        height: px2rem(6.16px);
			        background: rgb(209, 209, 213);
			        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px px2rem(2px);
			        border-radius: 1px;
			        transform-origin: left 50% 0px;
			    }
			    @for $i from 0 through 11 {
				  &.loading-leaf-#{$i} { 
				  		-webkit-animation: opacity-60-25-#{$i}-12 1.25s linear infinite;
    					animation: opacity-60-25-#{$i}-12 1.25s linear infinite;
    					&:before{
				            transform: rotate(#{30*$i}deg) translate(px2rem(15.84px), 0px);
				        }
				  }	
				}
		    }
		}

		.xs {
			
			font-size: 1rem;
		}
	}
	@-webkit-keyframes opacity-60-25-0-12 {
	  0% { opacity: 0.25; }
	  0.01% { opacity: 0.25; }
	  0.02% { opacity: 1; }
	  60.01% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-1-12 {
	  0% { opacity: 0.25; }
	  8.34333% { opacity: 0.25; }
	  8.35333% { opacity: 1; }
	  68.3433% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-2-12 {
	  0% { opacity: 0.25; }
	  16.6767% { opacity: 0.25; }
	  16.6867% { opacity: 1; }
	  76.6767% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-3-12 {
	  0% { opacity: 0.25; }
	  25.01% { opacity: 0.25; }
	  25.02% { opacity: 1; }
	  85.01% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-4-12 {
	  0% { opacity: 0.25; }
	  33.3433% { opacity: 0.25; }
	  33.3533% { opacity: 1; }
	  93.3433% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-5-12 {
	  0% { opacity: 0.270958333333333; }
	  41.6767% { opacity: 0.25; }
	  41.6867% { opacity: 1; }
	  1.67667% { opacity: 0.25; }
	  100% { opacity: 0.270958333333333; }
	}@-webkit-keyframes opacity-60-25-6-12 {
	  0% { opacity: 0.375125; }
	  50.01% { opacity: 0.25; }
	  50.02% { opacity: 1; }
	  10.01% { opacity: 0.25; }
	  100% { opacity: 0.375125; }
	}@-webkit-keyframes opacity-60-25-7-12 {
	  0% { opacity: 0.479291666666667; }
	  58.3433% { opacity: 0.25; }
	  58.3533% { opacity: 1; }
	  18.3433% { opacity: 0.25; }
	  100% { opacity: 0.479291666666667; }
	}@-webkit-keyframes opacity-60-25-8-12 {
	  0% { opacity: 0.583458333333333; }
	  66.6767% { opacity: 0.25; }
	  66.6867% { opacity: 1; }
	  26.6767% { opacity: 0.25; }
	  100% { opacity: 0.583458333333333; }
	}@-webkit-keyframes opacity-60-25-9-12 {
	  0% { opacity: 0.687625; }
	  75.01% { opacity: 0.25; }
	  75.02% { opacity: 1; }
	  35.01% { opacity: 0.25; }
	  100% { opacity: 0.687625; }
	}@-webkit-keyframes opacity-60-25-10-12 {
	  0% { opacity: 0.791791666666667; }
	  83.3433% { opacity: 0.25; }
	  83.3533% { opacity: 1; }
	  43.3433% { opacity: 0.25; }
	  100% { opacity: 0.791791666666667; }
	}@-webkit-keyframes opacity-60-25-11-12 {
	  0% { opacity: 0.895958333333333; }
	  91.6767% { opacity: 0.25; }
	  91.6867% { opacity: 1; }
	  51.6767% { opacity: 0.25; }
	  100% { opacity: 0.895958333333333; }
	}
</style>