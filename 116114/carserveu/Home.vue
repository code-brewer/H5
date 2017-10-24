<template>
	<div class="app-view" id="home-page" v-el:sdiv>
		<Banner></Banner>
		<div class="mian-content">
			<div class="title">
				<span class="arrow" :class="{graycolor:carindex==0}" id="left" @click="left()">〈</span>
				<div class="title-text" v-if="cars.length>carindex">
					<i style="margin-right: 8%;">
						<img :src="$root.activityBasePath+'/images/refresh-icon.png'" @click="refresh()" />
					</i>
					{{cars[carindex].plateplace+cars[carindex].platenumber}}
					<i style="margin-left: 8%;">
						<img :src="$root.activityBasePath+'/images/edit-icon.png'" @click="edit()" />
					</i>
					<i style="margin-left: 4%;">
						<img :src="$root.activityBasePath+'/images/delete-icon.png'" @click="del()" />
					</i>

				</div>
				<div class="title-text" v-if="carindex==cars.length" style="text-align: center;" @click="edit()">
					<i><img :src="$root.activityBasePath+'/images/add-icon.png'"></i>
					<span style="vertical-align: middle;">您还可以绑定{{maxcount-cars.length}}辆车</span>
				</div>
				
				<span class="arrow"  :class="{graycolor:cars.length<3?carindex>=cars.length:carindex==2}" id="right" @click="right()">〉</span>
			</div>
			<div class="row" v-if="cars.length>carindex">
				<p>违章<span>{{illegalCount}}</span></p>
				<p>罚款<span>{{fineM}}</span></p>
				<p>扣分<span>{{fineS}}</span></p>
			</div>
			<div class="row" style="text-align: center; color: #8f8f8f;" v-if="carindex==cars.length">
				<div>暂无车辆信息</div>
				
			</div>
			<div class="row-section" v-if="cars.length>carindex" >
				<div v-if="records.length>0">
					<div class="row-wrap" v-for="item in records">
						<p>{{item.degree}}分<span>{{item.count}}元</span></p>
						<p class="name">{{item.reason}}</p>
						<p class="font-s">{{item.location}}</p>
						<p class="font-s">{{item.time}}</p>
					</div>
				</div>
				<div v-if="records.length==0">
					<div class="no-illegal">
						<i style="margin-left: 4%;"><img :src="$root.activityBasePath+'/images/icon-checked.png'"></i>
						<p>恭喜你，没有违章记录</p>
					</div>
				</div>
			</div>

			<div class="footer">
				<a @click="openAccessMessage()" :class="{gray:isaccount}" >{{isaccount?'您已开通此业务':'开通短信提醒'}}</a>
				<a @click="carHandle()" :class="{gray:records.length==0||this.carindex>=this.cars.length}">违章代缴</a>
			</div>
		</div>
		<modal :show.sync="delModal" :box="false" :bg="false">
			<div class="modal-body" id="del-modal">
				<p  style="font-size: 30px;text-align: center;line-height: 80px;">是否删除车辆<span v-if="cars.length>carindex" style="color: #1483ff;">{{cars[carindex].plateplace}}{{cars[carindex].platenumber}}</span>的信息？</br>数据一经删除，无法恢复。</p>
				<div id="dialog-btn-div" >
					<a id="dialog-del-left" @click="delsure()">删除</a>
					<a id="dialog-del-right" @click="delModal=false;">取消</a>
				</div>
			</div>
		</modal>
	</div>
</template>

<style lang="scss">
	.graycolor{
		color:#bbb !important;
	}
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	import Banner from './components/Banner.vue'
	import Modal from './components/Modal.vue'
	export default {
		components:{
			Banner,
			Modal
		},
	 	data(){
	 		return{
	 			maxcount:3,
	 			carindex:0,
	 			cars:[],
	 			records:[],
	 			illegalCount:0,
	 			fineM:0,
	 			fineS:0,
	 			delModal:false,
	 			isaccount:true
	 		}
	 	},
	 	computed: {
	 	},
	 	ready() {
	 		if(!this.$root.islogin){
	 			router.go('register');
	 			return;
	 		}
	 		this.getCarsByUser();
		},
	 	methods:{
	 		left(){
	 			if(this.carindex>0){
	 				--this.carindex;
	 				this.changeCar();
	 			}
	 		},
	 		right(){
	 			if(this.carindex<this.cars.length && this.carindex<this.maxcount-1){
	 				++this.carindex;
	 				this.changeCar();
	 			}
	 		},
	 		refresh(){
	 			this.changeCar();
	 		},
	 		getCarsByUser(){
	 			var that = this;
	 			that.$dispatch('loading', {name:'getCarsByUser', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.getCarsByUser(this, {}, (back) => {
	 				that.$dispatch('cancelloading', 'getCarsByUser');
	 				if(back.resCode!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					that.isaccount = back.repBody.isaccount+"" == "1";
	 					that.cars = back.repBody.list;
	 					that.changeCar();
	 					that.setFel();
	 				}
	 			});
	 		},
	 		setFel(){
	 			// var that = this;
	 			// if(that.$refs.ptr){
	 			// 	that.$refs.ptr.setFel(that.$els.sdiv);
	 			// }else{
	 			// 	setTimeout(that.setFel,100);
	 			// }
	 		},
	 		changeCar(){
	 			if(this.carindex>=this.cars.length){
	 				return;
	 			}
	 			this.records=[];
	 			this.illegalCount=0;
	 			this.fineM=0;
	 			this.fineS=0;
	 			this.carSearch(this.carindex);
	 		},
	 		carSearch(index){
	 			var that = this;
	 			// that.$dispatch('loading', {name:'carSearch', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.carSearch(this, this.cars[index], (back) => {
	 				// that.$dispatch('cancelloading', 'carSearch');
	 				if(back.resCode!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					that.records = back.repBody.records;
	 					that.illegalCount= that.records.length;
	 					for (var i = 0; i < that.records.length; i++) {
	 						that.fineS+=parseInt(that.records[i].degree);
	 						that.fineM+=parseInt(that.records[i].count);
	 					};
	 				}
	 			});
	 		},
	 		edit(){
	 			if(this.carindex<this.cars.length){
	 				sessionStorage.setItem("carinfo",JSON.stringify(this.cars[this.carindex]));
	 			}else{
	 				sessionStorage.setItem("carinfo","");
	 			}
	 			router.go('edit');
	 		},
	 		del(){
	 			this.delModal = true;
	 		},
	 		delsure(){
	 			this.delModal = false;
	 			var that = this;
	 			that.$dispatch('loading', {name:'car-del', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.carDel(this, "?id="+that.cars[that.carindex].id, (back) => {
	 				that.$dispatch('cancelloading', 'car-del');
	 				if(back.resCode!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					this.getCarsByUser();
	 					this.$dispatch('loading', {text: '删除成功', show: true, duration: 2000});
	 				}
	 			});
	 		},
	 		openAccessMessage(){
	 			if(this.isaccount)return;
	 			var that = this;
	 			if(this.cars.length==0){
	 				this.$dispatch('loading', {text: '没有绑定车辆', show: true, duration: 2000});
	 				return;
	 			}
	 			that.$dispatch('loading', {name:'checkphone', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.checkphone(this, "?phone="+that.cars[0].phone, (back) => {
	 				that.$dispatch('cancelloading', 'checkphone');
	 				// if(back.resCode == '19'){
	 				// 	this.$dispatch('loading', {text: '您非联通号码，开通不了此业务', show: true, duration: 3000});
	 				// }else 
	 				if(back.resCode!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					// if(back.repBody.G == "1"){
	 					// 	this.$dispatch('loading', {text: '您非联通号码，开通不了此业务', show: true, duration: 3000});
	 					// }else if(back.repBody.G == "4"){
	 					// 	this.$dispatch('loading', {text: '开通错误，请拨打116114开通此业务。', show: true, duration: 3000});
	 					// }else
	 					{
	 						sessionStorage.setItem("phone",that.cars[0].phone);
	 						router.go('oam');
	 					}
	 				}
	 			});
	 		},
	 		carHandle(){
	 			var that = this;
	 			if(that.records.length==0||that.carindex>=this.cars.length){
	 				// this.$dispatch('loading', {text: '没有绑定车辆', show: true, duration: 2000});
	 				return;
	 			}
	 			that.$dispatch('loading', {name:'carHandle', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.carHandle(this, that.cars[that.carindex], (back) => {
	 				that.$dispatch('cancelloading', 'carHandle');
	 				if(back.resCode!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					location.href = back.repBody;
	 				}
	 			});
	 		}
	 	}
	}
</script>