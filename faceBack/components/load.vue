<template>
	<div class="load" v-if="show">
		<div class="el-loading-spinner">
			<svg viewBox="25 25 50 50" class="circular">
				<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
			</svg>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			show: {
				type : Boolean,
				default : false,
			},

		}
	}
</script>
<style lang="scss" scoped>
	.load {
		position: relative;
		z-index: 999;
		margin-top: 30px;
		margin-bottom: 20px;
		.el-loading-spinner {
			    margin-top: -21px;
			    text-align: center;
			    .circular {
		    	    width: 42px;
				    height: 42px;
				    animation: loading-rotate 2s linear infinite;
				    transform-origin: 50% 50% 0px;
				    .path {
				    	animation: loading-dash 1.5s ease-in-out infinite;
					    stroke-dasharray: 90,150;
					    stroke-dashoffset: 0;
					    stroke-width: 2;
					    stroke: #20a0ff;
					    stroke-linecap: round;
					    cx: 50;
					    cy: 50;
					    r: 20;
					    fill: none;
					    transform-origin: 0px 0px 0px;
					    text-align: center;
				    }
			    }
		}

	}
	@keyframes loading-rotate
	{
		    transform: rotate(1turn);
	}
	@keyframes loading-dash
	{
		    0% {
			    stroke-dasharray: 1,200;
			    stroke-dashoffset: 0;
			}
			50% {
			    stroke-dasharray: 90,150;
			    stroke-dashoffset: -40px;
			}
			100% {
			    stroke-dasharray: 90,150;
			    stroke-dashoffset: -120px;
			}
	}
</style>