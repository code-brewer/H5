<template>
	<div class="wap-find-color">
		<div v-for="item in list" :style="{width: item.placehold, height: item.placehold}">
			<span :style="{background: item.color, borderRadius: item.radius}" @touchstart="next(item)"></span>
		</div>
	</div>
</template>

<script>

	import {Color} from './Color'
	import {Transforms} from './Transforms'

	console.log(Transforms)
	var times = 0;

	export default {
		props: {
			grid: {
				require: true,
				type: Number,
				default: 2
			},
			level: {
				require: true,
				type: Number,
				default: 1
			},
			colors: {
				type: Array,
				default: ['#EB4863', '#F7DB67', '#5F2B49', '#A7445C', '#3EB4BE']
			}
		},
		data() {
			return {
				list: [],
				// colors: ['#EB4863', '#F7DB67', '#5F2B49', '#A7445C', '#3EB4BE'],
				currColor: '',
				degree: 5,
				minDegree: 1.09,
				state: ''
			}
		},
		created() {
			this.initColor()
			this.list = this.getList()
			// console.log(new Color(this.colors[0]))
			// console.log(Transforms.darken(new Color(this.colors[0]), Math.abs(1.5)))
		},
		methods: {
			getList() {
				times++;

				let arr = []
				for (var i = 0; i < this.grid * this.grid; i++) {
					var item = {placehold: 100 / this.grid + '%', radius: 100 / this.grid / 50 + 'rem', is: false}
					item.color = this.currColor
					arr.push(item);
				};
				var diff = arr[Math.floor(Math.random()*arr.length)]
				diff.color = Transforms.lighten(new Color(this.currColor), Math.abs(this.degree))
				diff.is = true
				return arr;
			},
			next(item) {
				if(item.is) {
					// if(this.level>3) {
					// 	this.degree /= 1.1;
					// 	if(this.degree < this.minDegree) {
					// 		this.degree = this.minDegree;
					// 	}
					// 	console.log(this.degree)
					// }
			
					this.degree /= 1.3;
						console.log(this.degree)
					
					if(this.level > 3 && this.degree < this.minDegree) {
						this.grid++;
						this.degree = 5;
					}
					if(this.grid>=10) {
						this.grid = 10;
					}

					// if(times==3) {
					// 	this.grid++;
					// 	times = 0;
					// }

					this.level++;
					
					this.initColor()
					this.list = this.getList()
				}
				
			},
			initColor() {
				this.currColor = this.colors[Math.floor(Math.random()*this.colors.length)]
			}
		}
	}
		
</script>
