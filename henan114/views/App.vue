<template>
	<div :class="direct">
		<router-view transition="slide"></router-view>
	</div>

	<div v-if="isLoading">
		<loading :text="loading.text" :show.sync="loading.show" :icon="loading.icon" :duration="loading.duration" :name="loading.name" v-for="loading in loadingdata.loadings"></loading>
	</div>
</template>
<script>
	import {router} from '../index'

	import Loading from '../../src/components/Loading.vue'

	import api from '../data/api.js'
	export default {
		components: {
			Loading
		},
		data() {
			return {
				routeHistory: [],
				direct: 'right-left',

				loadingdata: {loadings:[]},
				isLoading: false,

				// 经度
				shopx: '',
				// 纬度
				shopy: '',

				// 当前城市
				currCity: {
					areaName: '加载中'
				},

				citys: []
			}
		},

		created() {
			var that = this;

			if (navigator.geolocation) { 

				// navigator.geolocation.getCurrentPosition(function(position) {
				// 	// that.shopx = position.coords.longitude;
				// 	// that.shopy = position.coords.latitude;
				// 	// http://lbs.juhe.cn/api/getaddressbylngb?lngx=116.407431&lngy=39.914492
				// 	api.getaddressbylngb(that, {lngx: String(position.coords.longitude), lngy: String(position.coords.latitude)}, (back)=> {
				// 		that.currCity.areaName = back.row.result.addressComponent.city;
				// 		that.getArea();
				// 	})
				// }, function(error) {
				// 	that.getArea();
				// });
				that.currCity.areaName = '郑州'
				that.getArea();
		    }
		    else {
		    	this.getArea();
		    }

		    
		    
		},

		ready() {
			var that = this;
			router.afterEach(function(transition) {
				var to = transition.to.path;

				var index = that.routeHistory.indexOf(to);

				if(index>-1) {
					that.routeHistory = that.routeHistory.slice(0, index+1);
					that.direct = 'left-right';
				}
				else {
					that.routeHistory.push(to);
					that.direct = 'right-left';
				}

			});

			this.$on('loadingclean', () => {
				that.loadingdata.loadings = [];
				that.isLoading = that.loadingdata.loadings.length>0;
			});
			
			this.$on('loading', (loading) => {
				if(!loading.name){
					loading.name = 'tip';
				}
				if(!loading.icon){
					loading.icon = false;
				}
				for (var i = 0; i <= this.loadingdata.loadings.length - 1; i++) {
					var item = this.loadingdata.loadings[i];
					if(!item || !item.show){
						this.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				this.loadingdata.loadings.push(loading);
				this.isLoading = this.loadingdata.loadings.length>0;
			});
			this.$on('cancelloading', (name) => {
				for (var i = 0; i <= this.loadingdata.loadings.length - 1; i++) {
					var item = this.loadingdata.loadings[i];
					if(item && item.name && item.name == name){
						item.show = false;
						this.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				this.isLoading = this.loadingdata.loadings.length>0;
				if(!this.isLoading){
					document.querySelector('.view-wrap').classList.remove('open');
				}
				
			});
		},

		methods: {
			getArea() {
				var that = this;
				api.getarea(this, {}, (back)=> {
					if(!back) return;

					if(back.code=="00000") {
						that.citys = back.data;
						var isHas = false;

						for (var i = 0; i < back.data.length; i++) {
							var city = back.data[i];

							if(city.areaName==that.currCity.areaName) {
								that.currCity = city;
								isHas = true;
								break;
							}
						}

						if(!isHas) {
							that.currCity = back.data[0];
						}
					}
			
					
				})
			}
		}
	}
</script>