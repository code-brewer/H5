<template>
	<div class="view" style="background-color: #fff;color: #fff;">
		<h2 class="title"><a href="javascript: history.go(-1)"></a>当前城市-{{$root.currCity.areaName}}</h2>
		<div class="content location-content">
			<p class="l-title">点击选择城市</p>
			<section class="list-wrap">
				<ul>
					<li :class="{active: $root.currCity.areaName==item.areaName}" v-for="item in $root.citys" @click="setCity(item)"><a href="javascript:;">{{item.areaName}}</a></li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>
	import api from '../data/api.js'

	export default {
		data() {
			return {}
		},
		ready() {
			document.querySelector('.content').style.minHeight = (window.innerHeight - 30)+'px';
		},
		created() {
			var that = this;

			// this.$dispatch('loading', {name:'local', text: '加载中...', icon: true, show: true, duration: 10*1000});

			// api.getarea(this, {}, (back)=> {
			// 	console.log(back)
			// 	that.$dispatch('cancelloading', 'local');

			// 	if(!back) return;

			// 	if(back.code=="00000") {
			// 		that.list = back.data;
			// 	}
		
				
			// })
			
		},

		methods: {
			setCity(item) {
				console.log(this.$root.currCity)
				console.log(item)
				this.$root.currCity = item;
			}
		}
	}
</script>