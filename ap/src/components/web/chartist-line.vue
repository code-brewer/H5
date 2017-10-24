<template>
	<div style="position:relative">
		<chartist :id-chart="idChart" :ratio="ratio" :type="chartis.type" :data="chartis.data">
		</chartist>
	</div>
</template>
<style>
	.chartist-lin-btn:after {
		border-color: transparent transparent transparent #3385ff;
		border-width: 9px;
		border-style: dashed solid dashed dashed;
		margin-left: 0 auto;
		left: 41px;
		transform: rotate(90deg);
		content: ' ';
		display: block;
		position: absolute;
		margin: 0 auto;
	}
	
	.ct-point {
		cursor: pointer;
	}
	
	.chartist-lin-btn {
		z-index: 999;
		display: none;
		width: 100px;
		background-color: #3385ff;
		border-radius: 5px;
		position: absolute;
		padding: 5px 20px;
		color: white;
		text-align: center;
	}
	
	.ct-series-a .ct-point,
	.ct-series-a .ct-line,
	.ct-series-a .ct-bar,
	.ct-series-a .ct-slice-donut {
		stroke: #3385ff;
	}
	
	.ct-chart-line .ct-label {
		fill: #000!important;
		font-size: 1.5rem!important;
		color: #000!important;
	}
</style>
<script>
	import chartist from '../chartist-vuejs/chartist-vuejs.vue'
	export default {
		props: {
			data: {
				type: Object,
				default: function() {
					return {
						labels: ['1', '2', '3', '4', '5', '6'],
						series: [{
							name: 'pv',
							data: [0, 0, 0, 0, 0, 0, 0]
						}, {
							name: 'uv',
							data: [100, 40, 40, 40, 40, 41]
						}, {
							name: 'join',
							data: [1, 2, 3, 5, 2, 10]
						}, {
							name: 'win',
							data: [1, 2, 3, 5, 2, 5]
						}, {
							name: 'share',
							data: [1, 2, 3, 5, 2, 0]
						}]
					}
				},
				required: true
			},
			idChart: {
				type: String,
				required: true
			},
			ratio: {
				type: String
			},
		},
		components: {
			chartist
		},
		data() {
			return {
				chartis: {
					data: {
						labels: ['1', '2', '3', '4', '5', '6'],
						series: [{
							name: 'Fibonacci sequence',
							data: [1, 2, 3, 5, 8, 13000]
						}]
					},
					type: 'Line',
				},
			}
		},
		methods: {
			//注册鼠标事件
			addEventListenerList(arr, funName, callback) {
				if(typeof funName !== 'string') return;
				if(typeof callback !== 'function') return;
				var fn = document.addEventListener ? 'addEventListener' : 'attachEvent';
				for(var i = 0; i < arr.length; i++) {
					arr[i][fn](funName, callback);
				}
			},
			removeEventListener(arr, funName, callback) {
				if(typeof funName !== 'string') return;
				if(typeof callback !== 'function') return;
				var fn = document.removeEventListener ? 'removeEventListener' : 'detachEvent';
				for(var i = 0; i < arr.length; i++) {
					arr[i][fn](funName, callback);
				}
			},
			bindMouse(e) {
				document.querySelector("#" + this.idChart + ' .chartist-lin-vaule').innerHTML = e.toElement.getAttribute("ct:value") ? e.toElement.getAttribute("ct:value") : 0;
				var hid = document.querySelector("#" + this.idChart + " .chartist-lin-btn");
				hid.style.display = "block";
				var h = hid.offsetHeight + 15,
					w = (hid.offsetWidth / 2),
					x = e.toElement.getAttribute("x1"),
					y = e.toElement.getAttribute("y1");
				hid.style.left = (x - w) + 'px';
				hid.style.top = (y - h) + 'px';
			},
			mouseoutEvent() {
				var hid = document.querySelector("#" + this.idChart + " .chartist-lin-btn");
				hid.style.display = "none";
			}
		},
		events: {
			changeEvent() {
				this.removeEventListener(document.querySelectorAll("#" + this.idChart + " .ct-point"), 'mouseenter', this.bindMouse);
				this.removeEventListener(document.querySelectorAll("#" + this.idChart + " .ct-point"), 'mouseenter', this.mouseoutEvent);
				setTimeout(() => {
					this.addEventListenerList(document.querySelectorAll("#" + this.idChart + " .ct-point"), 'mouseenter', this.bindMouse);
					this.addEventListenerList(document.querySelectorAll("#" + this.idChart + " .ct-point"), 'mouseout', this.mouseoutEvent);
				}, 100);
			}
		},
		ready() {
			var that = this;
			this.chartis.data = this.data;
			var html = "<div class='chartist-lin-btn' style='left:0px;top:0px;'><span class='chartist-lin-vaule'>50</span></div>";
			var el = document.querySelector("#" + that.idChart + ".ct-chart");
			el.innerHTML += html;
			setTimeout(function() {
				that.addEventListenerList(document.querySelectorAll("#" + that.idChart + " .ct-point"), 'mouseenter', that.bindMouse);
				that.addEventListenerList(document.querySelectorAll("#" + that.idChart + " .ct-point"), 'mouseout', that.mouseoutEvent);
			}, 1000);
		}
	}
</script>