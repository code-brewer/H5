<template>
	<div class="list">
		<ul>
			<li v-for="item in list">
				
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			list: {
				type: Object
			},
			color: {
				default: 'white'
			}
		}
	}
</script>