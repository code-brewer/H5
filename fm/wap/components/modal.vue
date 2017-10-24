<template>
	<div class="modal-wrap" v-show="show">
		<div class="modal" transition="modal" v-show="show"><slot></slot></div>
		<div class="mask"></div>
	</div>
</template>
<script>
	export default {
		props: {
			show: {
				default: false
			}
		}
	}
</script>
<style lang="scss">
	.modal-wrap	{
		.modal {
			position: fixed;
			top: 50%;
			left: 50%;
			width: 80%;
			height:600px;
			// padding-bottom: 30px;
			border: 20px solid #f4e600;
			border-radius: 10px;
			background: #8a2fa0;
			// box-sizing: border-box;
			box-shadow: inset 0 0 5px #451750;
			z-index: 100;
			> div {
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				transform: translate(0, -50%);
			}
			h2 {
				padding: 20px 0;
				font-size: 60px;
				color: #f4e600;
				text-align: center;
				font-style: italic;
			}
			.modal-text {
				padding: 10px 50px;
				font-size: 32px;
				font-style: italic;
				color: white;
				font-weight: 700;
				.orange {
					color: #f4e600;
				}
				&.left {
					text-align: left;
				}
				&.center {
					text-align: center;
				}
			}
			p {
				padding: 10px 30px;
				color: white;
				font-size: 28px;
				line-height: 1.5;
				text-align: center;
			}
		}
		.modal-transition {
			transition: all .2s linear;
			transform: translate(-50%, -50%);
		}
		.modal-enter, .modal-leave {
			transform: translate(-50%, -75%);
		}
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .6);
			z-index: 99;
		}
	}
</style>