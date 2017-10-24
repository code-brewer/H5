<template>
	<div class="userList-view"> 
	 <div class="container">
		<div class="title">
			奖品列表
		</div>
	 	<div class="content">
		  	 <prize :set-prize="false">
							 	
			</prize>
	 	</div>
	 </div>
</div>
</template>
<style lang="scss">
	  @import '../css/bootstrap/_variables.scss';
	  .userList-view{
	  		width: 100%;
			background-color: #f1f4f5;
			.container{
				.modal-user-body{
					 position: relative;
					 .modal-user-box{
					 	    width: 490px;
   							margin: 60px auto;
   							label{width: 70px;text-align: right;}
   							input{
   								width: 400px;
   							    display: inline-block;
   							}
   							a{
  						    	margin-left: 74px!important;
  						    }
  						    .checkbox-ripple{
  						    	width: 80px;
  						    }
					 }
					 .modal-title{
					 	height: 40px;
					    background-color: #419ce9;
					    text-align: center;
					    p{
					    	color: #fff;
  						    line-height: 40px;
					    }
					    button{
					    	   margin: -40px 20px 0px 0px;
							   color: #fff;
							   opacity: .9;
					    }
					 }
				}
				.title{
					height: 86px;
					font-size: 12px;
					text-indent: 10px;
					line-height: 11;
				}
				.content{
					height: 790px;
					width: 100%;
				    padding: 0px 60px;
  					background-color: #fff;
  					box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
				}
			}
	  }
</style>
<script>
	import prize from '../components/web/prize-new.vue'
	import datepicker from '../components/bootstrap/Datepicker.vue'
	import snackbar from '../components/web-base/snackbar'
	import modal from '../components/bootstrap/Modal'
    import dropdown from '../components/bootstrap/Dropdown.vue'
    import Pager from '../components/web-base/Pager.vue'
  	import Checkbox from '../components/web-base/checkbox.vue'
  	import radio from '../components/web-base/radio.vue'
  	import api from '../api/index.js'
    export default{
    	components:{
    		datepicker,
    		dropdown,
    		Pager,
    		modal,
    		Checkbox,
    		snackbar,
    		prize,
    		radio
    	},
    	data() {
    		return {
    			allCheck : false,
    			is_error : false,
    			err_msg : "",
    			show : false,
    			pname : '',
    			title : '添加奖品',
    			beginDate :'2016-04-26',
    			endDate :'2016-11-26',
    			pagerConfig : {
    				pageNum:1,
    				pageSize:100,
    				total:0
    			},
    			isAuto : 'false',
    			prize : {
    				types:'',
    				pname:'',
    				count:1,
    				sidPre:'',
    			},
    			typeList :[],
    			List :[],
    		} 
    	},
    	watch:{
    		'pagerConfig.pageNum'() {
				this.getList();
			},
			allCheck(v){
			    for(var i=0;i<this.List.length;i++){
			    	 this.List[i].select=v;
			    }
			}
    	},
    	methods:{
    		removeList(gid){
    			var l = -1;
    			for(var i = 0; i < this.List.length; i++){
    				if(this.List[i].gid == gid)
    				{
    					l = i;
    					break;
    				}
    			}
    			return l;
    		},
    		selectChecked($index) {
    			if(this.List[$index].select == undefined)
    				this.$set('List['+ $index +'].select',false);
	  			return  this.List[$index].select;
    		},
    		prizeTypes(){
    			api.prizeTypes(this, {'types':'1'},(data)=>{
    		 		if(data.resCode == 0){
    		 			this.typeList = data.repBody;
    		 			this.prize.types=this.typeList[0].tid;
    		 		}
    		 	});
    		},
    		add(){
    			 this.show=true;
    		},
    		getList(){    	
    		 	api.getPrizeList(this,{"pageNum":this.pagerConfig.pageNum,"pageSize":this.pagerConfig.pageSize,'pname':this.pname,'startTime':this.beginDate,'endTime':this.endDate},(data)=>{
    		 		 if(data.resCode==0&&data.repBody.total!=0)
				 	{	
				 		this.List=data.repBody.list;
				 		this.pagerConfig.total=data.repBody.total;
				 	}
				 	else if(data.resCode==0&&data.repBody.total==0)
				 	{
				 		this.List=[];
				 		this.pagerConfig.total=0;
				 	}
				 	else
				 	{
				 		this.pagerConfig.total=0;
				 	 	this.List=data.repBody.list;
				 	 	this.err_msg=data.resMsg;
	    				this.is_error=true;
				 	}
				});
    		},
    		allDet(){
    			var gidItem="";
    			for(var i = 0;i < this.List.length; i++){
    				if(this.List[i].select)
    					 gidItem += this.List[i].gid+",";
    			}
    			if(gidItem.length>0) 
    				this.del(gidItem.substring(0,gidItem.length-1))
    		},
    		del(gid){
	    		 api.bathDelPrize(this,{'gid':gid},(data) => {
	    		 	if(data.resCode == "0"){
	    		 	 this.getList();
	    			}
	    		});
    		}
    		,save(){
 				 if(this.isAuto) this.prize.sidPre="";
 				 api.addOrUpdatePrize(this,this.prize,(data) => {
	    		 	 if(data.resCode=="0"){
	    		 	 	this.getList();
	    		 	 	this.show=false;
	    		 	 	this.err_msg=data.resMsg;
	    				this.is_error=true;
	    		 	 }
	    		});
    		} 
    	},
    	ready(){
    	//  this.getList();
    	//  this.prizeTypes();
    	}
    }
</script>