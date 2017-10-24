 <template>
	<div class="app-view ranking-page award-page">
		<div class="content padding">
			<div class="rankingdbg">
				<div class="sorthead" >
					<p class="pfirst mypfirst">我的最高积分:<span>{{PrizeInfo.score}}</span> &nbsp;&nbsp;第<span>{{PrizeInfo.rn}}</span>名，获得了</p>
				</div>
				<p class="prize">{{PrizeInfo.pname}}</p>
				<input type="text" class="inputphone inputbg" autocomplete="off" value="输入手机号" @focus="inputmobiletip()" onblur="if(this.value == '') {this.value = '输入手机号';}" v-model="mobile" />
				<div class="codeline">
					<img :src="zcodeurl" @click="refreshzcode()" alt="">
					<input type="text" class="inputcheckcode inputbg" autocomplete="off" value="输入验证码" @focus="inputcodetip()" onblur="if(this.value == '') {this.value = '输入验证码';}" v-model="zcode" />
				</div>

				<p class="awardtip">{{tiptext}}</p>
				<!-- <div>
					<img :src="$root.basePath+'randomValidate/obtainValidateCode'" alt="">
					<input type="text" class="inputcheckcode inputbg" />
				</div> -->
				<div class="award">
					<a  @click="award()" class="button">
						<img :src="$root.basePath+'activity/SliderMoney/src/img/awardbtn2.png'" />
					</a>
					
				</div>
				
				
			</div>
			<div class="ranking-title">领奖</div>
			
		</div>
		<img :src="activityInfo.backgrounds.other"  class="bg">
	</div>
</template>

<style scoped>
	.mypfirst{
		margin-top: 90px;
	}
	.prize {
		width: 640px;
	    margin: auto;
	    color: #ff0000;
	    font-size: 35px;
	    height: 185px;
	    text-align: center;
	    /* line-height: 185px; */
	    padding: 0 40px;
	    margin-top: 10px;
	    vertical-align: middle;
	    display: table-cell;
	}
	.mytip{
		font-size: 26px;
		color: #ff0000;
	    font-weight: bold;
	    margin: 0;
	    padding: 0 80px 0 80px;
	}
	.inputphone{
		width: 378px;
	    height: 100px;
	    border: none;
	    padding-left: 15px;
	    padding-right: 15px;
	    text-align: center;
	    font-size: 50px;
	}
	.inputcheckcode{
		width: 125px;
	    height: 56px;
	    border: none;
	    vertical-align: top;
	    padding-left: 10px;
	    padding-right: 10px;
	    text-align: center;
	    font-size: 25px;
	}
	.sorthead{
		font-size: 30px !important;
	}
</style>

<script>

import sapi from './utils/serverapi.js'
import {router} from './index'

	export default {
		ready() {
			this.$dispatch('title', '领奖');
			this.activity = JSON.parse(localStorage.getItem('activity'));
			this.activityInfo = JSON.parse(this.activity.extbody);

			this.PrizeInfo = JSON.parse(localStorage.getItem('prizeinfo'));
		},
		data() {
			return {
				activity:{},
				activityInfo:{backgrounds:{other:''}},
				loadingCount:0,
				showtip:false,
				PrizeInfo:{"gid":"0","haveprize":"0","oid":"0","pid":"0","pname":"","rn":"0","score":"0","date":""},
				mobile:'',
				zcode:'',
				zcodeurl:basePath+'randomValidate/obtainValidateCode',
				tiptext:' '
			}
		},
		methods:{
			refreshzcode(){
				this.zcodeurl = basePath+'randomValidate/obtainValidateCode?'+Math.random();
			},
			inputmobiletip(){
				if(this.mobile == '输入手机号'){
					this.mobile = '';
				}
				this.tiptext = "";
			},
			inputcodetip(){
				if(this.zcode == '输入验证码'){
					this.zcode = '';
				}
				this.tiptext = "";
			},
			award(){
				// if(this.mobile.length != 11){

				// }
				if(this.mobile.length != 11 || !(/^\d+$/.test(this.mobile))){
					this.tiptext = "请输入正确的手机号码!";
					return;
				}
				if(this.zcode.length == 0 || this.zcode == '输入验证码'){
					this.tiptext = "请输入验证码!";
					return;
				}
				this.tiptext = "";
				this.bindPrizeMobile(this.PrizeInfo.gid,this.mobile,this.zcode);
			},
			bindPrizeMobile(id,mobile,content){
				var that = this;
                var body={id:id,content:content,mobile:mobile};
                that.$dispatch('loading', {name:'award_bindPrizeMobile', text: '加载中...', show: true, duration: 10*1000});
                sapi.bindPrizeMobile(that, body, (back)=> {
                	console.log(back)
                	// that.loadingCount--;
                	// if(that.loadingCount <=0){
                	// 	that.$dispatch('cancelloading', 'award_bindPrizeMobile');
                	// }
                	that.$dispatch('cancelloading', 'award_bindPrizeMobile');
					if(back.resCode=="0") {
						router.go({name: 'awardret'});
					}
					else if(back.resCode=="10005"){
						that.refreshzcode();
						that.tiptext = "验证码错误!";
					}
					else if (back.resCode=="10003") {
						that.$dispatch('login', window.location.search);
					}else{
						if(SSD_DEBUG){
							that.$dispatch('loading', {text: back.resCode, icon: false, show: true, duration: 1000});
						}
					}
				});
			}
        }
	}
</script>