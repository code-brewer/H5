<template>
	<div class="wap-find-color">
		<div v-for="item in list" :style="{width: item.placehold, height: item.placehold}">
			<span :style="{background: item.color, borderRadius: item.radius}"></span>
		</div>
	</div>
</template>

<script>


	export default {
		data() {
			return {
				grid: 5,
				currColor: '#EB4863',
				list: []
			}
		},
		created() {
			this.list = this.getList()
		},
		methods: {
			getList() {

				let arr = []
				for (var i = 0; i < this.grid * this.grid; i++) {
					var item = {placehold: 100 / this.grid + '%', radius: 100 / this.grid / 50 + 'rem', is: false}
					item.color = this.currColor
					if(i==10) {
						item.color = '#f56079'
					}
					arr.push(item);
				};
				
				return arr;
			},

		}
	}
		
</script>
