<template>
	<div class="app-view"
	     :style="{background: (activityConfig.success.bgUrl!=''?'url('+activityConfig.success.bgUrl+')':1), 'background-size':'100% 100%', 'overflow':'auto'}">
		<logo></logo>
		<activity-box></activity-box>
		<success-title></success-title>
		<div class="success-prize">
			<div v-if="!prize"
			     class="gift"
			     :style="{'background-image': 'url(http://157.255.23.23/images/fsd/ap/20170413/88_64898d61_d628_414a_ae29_d50a939fd7ae.png)'}"></div>
			<div v-else
			     class="gift"
			     :style="{'background-image': 'url('+ gift +')'}"></div>
			<number-of-dolucky :times.sync="times"></number-of-dolucky>
			<success-btn v-ref:dolucky></success-btn>
			<success-music-btn></success-music-btn>
		</div>
		<rule-link></rule-link>
		<div class="bg"
		     v-show="showModal">
			<div class="dolucky"
			     v-show="dolucky == 1">
				<div class="con">
					<modal-lucky-title></modal-lucky-title>
					<modal-lucky-con :pname.sync="pname"></modal-lucky-con>
					<modal-lucky-btn v-ref:lucky></modal-lucky-btn>
				</div>
			</div>
			<div class="dolucky"
			     v-show="dolucky == 2">
				<div class="con">
					<modal-unlucky-title></modal-unlucky-title>
					<modal-unlucky-con></modal-unlucky-con>
					<modal-unlucky-btn v-ref:unlucky></modal-unlucky-btn>
				</div>
			</div>
			<div class="dolucky"
			     v-show="dolucky == 3">
				<div class="con">
					<modal-nochange-title></modal-nochange-title>
					<modal-nochange-con></modal-nochange-con>
					<modal-nochange-btn v-ref:nochange></modal-nochange-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Statistics from '../statistics.js'
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	export default {
		components: {
			'logo': require('../../../components/logo-new/logo'),
		 	'rule-link': require('../../../components/success-new/rule-link-new.vue'),
			'success-title': require('../../../components/success-new/success-title.vue'),
			'success-btn': require('../../../components/success-new/success-btn.vue'),
			'success-music-btn': require('../../../components/success-new/success-music-btn.vue'),
			'number-of-dolucky': require('../../../components/success-new/number-of-dolucky.vue'),
			'modal-lucky-btn': require('../../../components/success-modal-lucky/success-modal-btn.vue'),
			'modal-lucky-title': require('../../../components/success-modal-lucky/success-modal-title.vue'),
			'modal-lucky-con': require('../../../components/success-modal-lucky/success-modal-con.vue'),
			'modal-unlucky-btn': require('../../../components/success-modal-unlucky/success-modal-btn.vue'),
			'modal-unlucky-title': require('../../../components/success-modal-unlucky/success-modal-title.vue'),
			'modal-unlucky-con': require('../../../components/success-modal-unlucky/success-modal-con.vue'),
			'modal-nochange-btn': require('../../../components/success-modal-noChange/success-modal-btn.vue'),
			'modal-nochange-title': require('../../../components/success-modal-noChange/success-modal-title.vue'),
			'modal-nochange-con': require('../../../components/success-modal-noChange/success-modal-con.vue'),
			'activity-box': require('../../../components/activity-box/activity-box'),
		},
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				usid: '',
				activity_usid: '',
				activity: {},
				picList: [],
				userPicList: [],
				hasLiked:false,
				showModal:false,
				dolucky:0,//1代表中奖，2代表不中奖，3代表机会用光
				gift:'http://157.255.23.23/images/fsd/ap/20170413/88_1856350a_0020_4369_b346_adc3c4ef08d3.png',
				prize: false,
				times: 0,
				iclick: false,
				pname:'',

			}
		},
		
		methods: {
			close(){
				this.showModal = false;
				this.dolucky = 0;
				
			},
			isClick(){
				if(!this.iclick && this.times !=0) {
					this.userDolucky();
				}else{
					this.showModal = true;
					this.dolucky = 3;
				}
			},
			userDolucky(){
				var that = this;
				that.$dispatch('loading', {
					name: 'dolucky',
					icon: true,
					text: '抽奖中...',
					show: true,
					duration: 20 * 1000
				});
				that.iclick = true; //不能点击
				sapi.doLucky(this, {
				}, (back) => {
					that.$dispatch('cancelloading', 'dolucky');
					that.getActUserTimes();
					if(back.resCode == '0') {
						that.pname = back.repBody[0].pname;
						that.showModal = true;
						that.dolucky = 1;
						that.prize = true;
						that.gift = back.repBody[0].imgurl?back.repBody[0].imgurl:'';

				}
				else if (back.resCode == '1006') {
					this.showModal = true;
					this.dolucky = 2;
					this.prize = true;
				}
				else {
					that.$dispatch('handle_server_error', back);
				}
				that.iclick = false;
			});
		},
		// 获取剩下的次数    
		getActUserTimes() {
			var that = this;
			sapi.queEveryDay(this, {}, (back) => {
				if (back.resCode == 0 || back.resCode == "0") {
					that.times = parseInt(back.repBody[0].player);
				} else {
					that.$dispatch('handle_server_error', back);
				}
			})
		},
	},
	ready() {
		this.$refs.lucky.setLuckyListener(this.close);
		this.$refs.unlucky.setUnluckyListener(this.close);
		this.$refs.nochange.setNochangeListener(this.close);
		this.$refs.dolucky.setDoluckyListener(this.isClick);
		this.getActUserTimes();
		Statistics.successPage(); // 统计答题成功页面pv/uv 
	},
}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
@import '../../../../css/px2rem.scss';
@import '../../../_base_config.scss'
</style>
