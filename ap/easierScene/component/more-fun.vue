<template>
	<div class="more-fun" :style="{'overflow':(showdel?'initial':'hidden')}" style="overflow: inherit;">
		<div class="icon-items">
			<ul>
				<li class="dm"></li>
				<li class="xx"></li>
				<li class="tp"></li>
				<li class="qd"></li>
				<li class="sq" v-show="showConfig.sq.show">
					<i @click.stop="showdelfun($event,1)"></i>
					<span>{{showConfig.sq.num}}</span>
				</li>
				<li class="hb" v-show="showConfig.hb.show">
					<i @click.stop="showdelfun($event,2)"></i>
					<span>{{showConfig.hb.num}}</span>
				</li>
				<li class="cj" v-show="showConfig.cj.show">
					<i @click.stop="showdelfun($event,3)"></i>
					<span>{{showConfig.cj.num}}</span>
				</li>
				<delete-fun :show.sync="showdel" :left.sync="left" :item.sync="item" :type="type"></delete-fun>
			</ul>
		</div>
		<div class="more-content">
			<div class="left-tbs">
				<ul>
					<li class="momey" @click="tbsIndex=0" :class="{'select':tbsIndex==0}">数钱</li>
					<li class="wechatred" @click="tbsIndex=1" :class="{'select':tbsIndex==1}">微信红包</li>
					<li class="luck" @click="tbsIndex=2" :class="{'select':tbsIndex==2}">抽奖</li>
				</ul>
			</div>
			<div class="right-content">
				<div class="fun-content momey-content" v-if="tbsIndex==0">
					<p class="title">基础配置</p>
					<p>
						<span>活动名称</span>
						<input type="text" v-model="momeyInfo.title" class="form-control" style="width: 250px;" placeholder="活动名称" />
					</p>
					<p>
						<span>游戏结果显示</span>
						<input type="number" disabled="disabled" v-model="momeyInfo.size" class="form-control" placeholder="" />
						<span>名</label>
					</p>
					<p class="title">条件配置</p>
					<p>
						<span>时间设置</span>
						<input type="number" v-model="momeyInfo.second" class="form-control" placeholder="" />
						<span>秒</label>
					</p>
					<p>
						<span>进行轮数</span>
						<input type="number" v-model="momeyInfo.num" class="form-control" placeholder="" />
						<span>轮</label>
					</p>
					<p class="fun-btn" @click="saveMoney">
						 <button-ripple color="button-danger" style="height: 24px;line-height: 24px;font-size: 12px;width: 100px;">添加</button-ripple>
					</p>
				</div>
				<div class="fun-content wechatred-content"  v-if="tbsIndex==1">
					<p class="title">基础配置</p>
					<p>
						<span>活动名称</span>
						<input type="text" v-model="wechatredInfo.title" class="form-control" style="width: 250px;" placeholder="活动名称" />
					</p>
					<p class="title">条件配置</p>
					<p>
						<span>活动金额</span>
						<input type="number" v-model="wechatredInfo.totalmoney" class="form-control" placeholder="" />
						<span>(单次金额不能小于1元)</label>
					</p>
					<p>
						<span>红包数量</span>
						<input type="number" v-model="wechatredInfo.size" class="form-control" placeholder="" />
						<span>(平均金额最低1元)</label>
					</p>
					<p>
						<span>公司名称</span>
						<input type="text" v-model="wechatredInfo.sendname" class="form-control" style="width: 250px;" placeholder="公司名称" />
					</p>
					<p>
						<span>公司祝福</span>
						<input type="text" v-model="wechatredInfo.wishing" class="form-control" style="width: 250px;" placeholder="公司祝福" />
					</p>
					<p class="fun-btn" @click="saveWechatred">
						<button-ripple color="button-danger" style="height: 24px;line-height: 24px;font-size: 12px;width: 100px;">添加</button-ripple>
					</p>
				</div>
				<div class="fun-content luck-content" v-if="tbsIndex==2">
					<p class="title">基础配置</p>
					<p>
						<span>活动名称</span>
						<input type="text"  v-model="luckInfo.title" class="form-control" style="width: 250px;" placeholder="活动名称" />
					</p>
					<p>
						<span>奖品数量</span>
						<input type="number"  v-model="luckInfo.size" class="form-control" placeholder="" />
						<span>份</label>
					</p>
					<p>
						<span>每次抽取</span>
						<input type="number"  v-model="luckInfo.num"  disabled="disabled"class="form-control" placeholder="" />
						<span>人</label>
					</p>
					<p class="fun-btn" @click="saveluck">
						 <button-ripple color="button-danger" style="height: 24px;line-height: 24px;font-size: 12px;width: 100px;">添加</button-ripple>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import buttonRipple from '../../src/components/web-base/button-ripple.vue'
	import deleteFun from './delete-fun.vue'
	import api from '../api'
	import utils from '../utils/index.js'
	export default {
		methods:{
			//根据id查询主题插件
			selectByMoid(){
				api.selectByMoid(this,{'moid':this.item.moid},(back)=>{
					if(back.resCode=="000000")
					{
						utils.extend(this.item,back.repBody);
						this.setPlugins();
						this.$broadcast('newPluginsByMoid');
					}
				})
			},
			//显示删除的时候弹出来样式位置
			showdelfun(el,type){
				if(this.type==type) this.showdel =! this.showdel;
				else this.showdel=true;
				this.left = el.target.parentNode.offsetLeft-76;
				this.type = type;
			},
			//设置红包显示数量
			setPlugins(){
				this.showConfig.hb.show=false;
				this.showConfig.sq.show=false;
				this.showConfig.cj.show=false; 
				if(this.item.plugins.indexOf(";")!=-1){
					var js = this.item.plugins.substring(0,this.item.plugins.length-1);
					var item = js.split(";");
					for(var i = 0;i<item.length;i++){
						var id= item[i].split("_")[1]=="红包"?"hb":  item[i].split("_")[1]=="数钱"?"sq":"cj";
						this.showConfig[id].show=true;
						this.showConfig[id].num=item[i].split("_")[0];		 
					}
				}
			},
			//新增插件
			addActivity(){
				api.addActivity(this,{
						moid :this.info.moid,
						second : this.info.second,
				   	    mid	 :this.info.mid,
						title : this.info.title,
						type : this.info.type,
						num : this.info.num, 
						size : this.info.size, 
						sendname : this.info.sendname,
						wishing : this.info.wishing,
						remark : this.info.remark,
						totalmoney : this.info.totalmoney,
						winrate : this.info.winrate
					},(back)=>{
					if(back.resCode=="000000")
					{
						this.$root.loadConfig.show = true;
						this.$root.loadConfig.msg = "添加成功";
						this.selectByMoid();
					}else{
						this.$root.loadConfig.show = true;
						this.$root.loadConfig.msg = back.resMsg;
					}
				})
			},
			//保存数钱插件
			saveMoney(){
				if(this.validateMomeyInfo()){
					this.info.moid = this.item.moid;
					utils.extend(this.info,this.momeyInfo,true);	
					this.addActivity();
				}
			},
			//保存红包插件
			saveWechatred(){
				if(this.validateWechatred()){
					this.info.moid = this.item.moid;
					utils.extend(this.info,this.wechatredInfo,true);	
					this.addActivity();
				}
			},
			//保存红包插件
			saveluck(){
				if(this.validateLuck()){
					this.info.moid = this.item.moid;
					utils.extend(this.info,this.luckInfo,true);	
					this.addActivity();
				}
			},
			//验证抽奖表单
			validateLuck(){
				if(this.luckInfo.title.length>10){
					this.$root.loadConfig.show = true;
					this.$root.loadConfig.msg = "活动名称不能超过10个字";
					return false;
				}
				if(~~this.luckInfo.num<=0)
				{
					this.$root.loadConfig.msg="奖品数量要大于0";
					this.$root.loadConfig.show = true;
					return false;
				}
				if(~~this.luckInfo.size<=0||~~this.luckInfo.size>10)
				{
					this.$root.loadConfig.msg="中奖人数要大于0并且小于10";
					this.$root.loadConfig.show = true;
					return false;
				}
				return true;
			},
			//验证数钱表单
			validateMomeyInfo(){
				if(this.momeyInfo.title.length>10){
					this.$root.loadConfig.show = true;
					this.$root.loadConfig.msg = "活动名称不能超过10个字";
					return false;
				}
				if(~~this.momeyInfo.second<=0)
				{
					this.$root.loadConfig.msg="游戏时间要大于0秒";
					this.$root.loadConfig.show = true;
					return false;
				}
				if(~~this.momeyInfo.num<=0)
				{
					this.$root.loadConfig.msg="游戏轮数要大于0";
					this.$root.loadConfig.show = true;
					return false;
				}
				return true;
			},
			//验证红包表单
			validateWechatred(){
				if(this.wechatredInfo.title.length>10){
					this.$root.loadConfig.show = true;
					this.$root.loadConfig.msg = "活动名称不能超过10个字";
					return false;
				}
				if(~~this.wechatredInfo.totalmoney<1)
				{
					this.$root.loadConfig.msg="活动金额不能小于1元";
					this.$root.loadConfig.show = true;
					return false;
				}
				if(~~this.wechatredInfo.size<1)
				{
					console.log(22333)
					this.$root.loadConfig.msg="红包数量不能小于1个";
					this.$root.loadConfig.show = true;
					return false;
				}
				return true;
			}
		},
		events:{
			changePlugins(){
				this.setPlugins();
			}
		},
		components: {
			buttonRipple,
			deleteFun 
		},
		props:{
			item:{
				Object,
				default:function(){
					return {}
				}
			}
		},
		data() {
			return {
				momeyInfo:{//数钱model
					mid:1,
					title:'easier现场',
					type:'数钱',
					second:30,
					num:5,
					size:10,
				},
				luckInfo:{//抽奖model
					mid:3,
					title:'easier现场',
					type:'抽奖',
					num:1,
					size:1,
				},
				wechatredInfo:{//红包model
					mid:2,
					title:'easier现场',
					sendname:'easier现场',
					wishing:'快乐生活每一天',
					type:'红包',
					totalmoney:1,
					num:1,
					size:1,
					winrate:100
				},
				tbsIndex: 0,//选中那个插件
				left:0,//显示删除偏离位置
				type:0,//插件类型
				plugins:[],//主题插件列表
				showdel:false,
				showConfig:{
					hb:{
						show:false,
						num:0,
						del:false
					},
					sq:{
						show:false,
						num:0,
						del:false
					},
					cj:{
						show:false,
						num:0,
						del:false
					},
				},
				info:{
				    moid:0,
				    mid:0,
					title:"",
					second:0,
					type:"",
					num:0, 
					size:0, 
					sendname:"",
					wishing:"",
					remark:"",
					totalmoney:0,
					winrate:0
				}
			}
		},
		ready(){
			this.setPlugins();
		}
	}
</script>
<style lang="scss">
	.more-fun {
		height: 445px;
		width: 757px;
		overflow: hidden;
		.more-content {
			height: 380px;
			background-color: #f0f3f4;
			border: 1px solid #d6d6d6;
			border-radius: 10px;
			.right-content {
				width: 368px;
				height: 100%;
				display: inline-block;
				.fun-content {
					padding: 20px;
					height: 100%;
					position:relative;
					.fun-btn{
						position: absolute;
						bottom: 10px;
						left: 20px;
					}
					p{
						font-size: 12px;
						color: #000;
						display: flex;
						line-height: 35px;
					     margin-bottom: 10px;
						input{
							background-color: white;
							height: 35px;
							width:80px;
							line-height: 35px;
							margin: 0px 10px;
						}
					}
					.title{
						width: 320px;
						height: 28px;
						line-height: 28px;
						justify-content: center;
						color: white;
						background-color: #419ce9;
					}
				}
			}
			.left-tbs {
				width: 139px;
				height: 100%;
				display: inline-block;
				border-right: 1px solid #d6d6d6;
				vertical-align: top;
				ul {
					.select {
						color: white;
					}
					.luck.select {
						background-color: #f8571e;
					}
					.wechatred.select {
						background-color: #ef372e;
					}
					.momey.select {
						background-color: #bdab51;
					}
					li {
						margin: 0;
						position: relative;
						cursor: pointer;
						width: 100%;
						height: 40px;
						border-bottom: 1px solid #d6d6d6;
						border-radius: 0px;
						background-color: #f0f3f4;
						padding-left: 37px;
						line-height: 40px;
						font-size: 12px;
						&:first-child {
							border-radius: 10px 0px 0px 0px;
						}
						&:after {
							display: block;
							content: '';
							background: url(../image/icon-funitem.png);
							height: 21px;
							width: 21px;
							background-repeat: no-repeat;
							position: absolute;
							top: 9px;
							left: 13px;
							border-radius: 4px;
						}
					}
					.luck {
						&:after {
							background-color: #f8571e;
							background-position: -3.5px -78.5px;
						}
					}
					.wechatred {
						&:after {
							background-color: #ef372e;
							background-position: -3px -36px;
						}
					}
					.momey {
						margin-top:0px; 
						&:after {
							background-color: #bdab51;
							background-position: -4px 2px;
						}
					}
				}
			}
		}
		.icon-items {
			background-color: white;
			width: 100%;
			height: 67px;
			border-radius: 10px;
			position: relative;
			ul {
				list-style: none;
				width: 100%;
				padding-left: 15px;
				.dm {
					background-position: 0px 0px;
				}
				.xx {
					background-position: -45px 0px;
				}
				.tp {
					background-position: -89px 0px;
				}
				.qd {
					background-position: -132px 0px;
				}
				.sq {
					background-position: -176px 0px;
					span{
						background-color: #bdab51;
					}
				}
				.hb {
					background-position: -234px 0px;
					span{
						background-color: #ef372e;
					}
				}
				.cj {
					background-position: -292px 0px;
					span{
						background-color: #f8571e;
					}
				}
				li {
					width: 42px;
					height: 35px;
					display: inline-block;
					background-repeat: no-repeat;
					position: relative;
					margin-left: 5px;
					background: url(../image/icon-more-fun.png);
					span{
						position: absolute;
						right: -5px;
						bottom: -7px;
						height: 15px;
						width: 15px;
						border-radius: 8px;
						background-color: red;
						color: white;
						font-size: 8px;    
						text-align: center;
    					line-height: 15px;
					}
					i {
						height: 15px;
						width: 15px;
						background: url(../image/icon-remove.png);
						background-repeat: no-repeat;
						position: absolute;
						right: -5px;
						top: -7px;
						cursor: pointer;
						    z-index: 1;
					}
				}
			}
		}
	}
</style>