<template>
	<div class="question-view">
		<span class="question-icon">?</span>
		<div class="question-content" v-show="show">
			<slot>查看排名:勾选后，用户查看排名时需要关注企业公众账号.</slot>
		</div>
	</div>
</template>
<style lang="scss">
.question-view{
	position: relative;
	.question-icon {
	    margin-left: 10px;
	    color: white;
	    background-color: #838383;
	    border-radius: 10px;
	    width: 20px;
	    font-size: 14px;
	    text-align: center;
	    line-height: 20px;
	    display: block;
	    cursor: pointer;
	}
	.question-content{
		    background-color: #4d4d4d;
		    color: white;
		    min-width: 300px;
		    min-height: 100px;
		    position: absolute;
		    top: 18px;
		    left: 30px;
		    padding: 10px;
		    z-index: 3;
	}
}
</style>
<script>
	import jQuery from 'jquery'
	export default{
		data(){
			return{
				show:false
			}
		},
		ready(){
			this.init();
		},
		methods:{
			init(){
				jQuery(this.$el).find(".question-icon").bind("mouseover",()=>{
					this.show=true;
				}).bind("mouseout",()=>{
					this.show=false;
				});
			}
		}
	}
</script>