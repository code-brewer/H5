<template>
	<a :href="href ? href : 'javascript:;'" class="button">
		<slot></slot>
	</a>
</template>
<script>
	export default {
		props: {
			href: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	.button {
		display: inline-block;
		min-width: 200px;
		margin: 20px auto;
		padding: 10px 20px;
		color: white;
		font-size: 34px;
		font-weight: 700;
		text-align: center;
		line-height: 60px;
		border-radius: 40px;
		background: #e20001;
		box-shadow: 0 6px 0 black;
		transition: all .1s linear;
		&:active {
			transform: translate(0, 6px) translateZ(0);
			box-shadow: none;
		}
	}
</style>