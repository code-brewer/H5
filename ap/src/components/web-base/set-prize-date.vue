<template>
	<div class="set-prize-view">
		<div class="main">
			<div class="prize-date" v-for="list in divList" :class="'prize-date-'+list.name" :style="{'width':list.width+'%','background-color':'#'+($index%2==0?'f3f3f3':'419ce9')}">
			</div>
			<a class="prize-move" v-for="list in aList" :style="{left: list.left+'px'}" @mousedown="down(list,$event)" @mousemove="move(list,$event)" @mouseup="seup(list,$event)"></a>
		</div>
		<div class="setting" @click="addSelect">
			
		</div>
	</div>
</template>
<style lang="scss">
	.set-prize-view{
		width: 100%;
	    position: relative;
	    font-size: 0;
		.main{
			display: inline-block;
			width: 80%;
			height: 20px;
			.prize-date{
				display: inline-block;
			    background-color: gray;
			    width: 33.3%;
			    height: 20px;
			}
			a{
				display: block;
			    width: 20px;
			    height: 20px;
			    background-color: blue;
			    border-radius: 10px;
			    position: absolute;
			    top: 0;
			}
		}
		.setting{
			width: 20%;
			height: 20px;
			display: inline-block;
			background-color:red;
		}
	}
</style>
<script>
	export default{
		data(){
			return{
				aList:[],
				divList:[
					{
						width:100,
						regionidL:0,
						regionidR:100,
						name:1
					}
				],
				isAdd:true,
				count:100,
				prizecount:1
			}
		},
		watch:{
			divList(v){
				var l=v.length;
				if(this.isAdd){
					for(var i=0; i<l; i++)
					{
						if(i==(l-2)){
						 	v[i].width/=2;
						 	v[i].regionidR/=2;
						}
						if(i==(l-1)){
						 	v[i].width = v[i-1].width;
						 	v[i].regionidR = v[i-1].regionidR * 2;
						 	v[i].regionidL= v[i-1].regionidR + 1;
						}
					}
				}
			},
			aList(v){
			   
			}
		},
		methods:{
			down(list,event){
				list.drag_=true;
				list.x = event.clientX;
				list.x1 = event.currentTarget.offsetLeft;
			},
			move(list,event){
				if(!list.drag_)
					return false;
				else{
					var left = list.x1 + event.clientX - list.x ;
					var mainW = event.currentTarget.parentNode.offsetWidth;
					var top = (()=>{
						var preEl = event.toElement.previousElementSibling;
						if(preEl)
							return preEl.className == "prize-move" ? ~~preEl.style.left.substring(0,preEl.style.left.length-2):-10;
						return -10;
					})()
					var bottom = (()=>{
						var nextEl=event.toElement.nextElementSibling;
						if(nextEl)
							return nextEl.className =="prize-move" ? ~~nextEl.style.left.substring(0,nextEl.style.left.length-2):mainW-10;
						return mainW-10;
					})()
					if(bottom > left && left > top)
						list.left = left;
				}
					
			},
			seup(list,event){
				list.drag_=false;
			},
			addSelect(){
				this.prizecount+=1;
				this.divList.push({
					width:100,
					regionidL:0,
					regionidR:10,
					name:this.prizecount
				});
				this.$nextTick(()=>{
					var s= document.querySelector(".prize-date-"+this.divList[this.divList.length-1].name);
					this.aList.push({
						x:0,
						x1:0,
						left:s.offsetLeft-10,
						drag_:false
					});
				})
				
			}
		},
		ready(){
//			this.setMove(".prize-move-1");
		}
	}
</script>