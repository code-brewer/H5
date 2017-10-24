<template>
	<div class="data-right">
		<div class="pie-view">
				<p  class="title">访客分析</p>
				 <div class="toggle row">
				 	<div class="left col-md-2">
							指标:访客量(UV)
						</div>
					<div class="right col-md-10">
							<chartist-toggle></chartist-toggle>
					</div>
			 	</div>
			 	<div class="pie-panel">
			 		<div class="count-data col-md-8">
			 			 	<count-data-source></count-data-source>
			 		</div>
			 		<div class="chartist-pie col-md-4">
			 			<chartist-pie :values='values' id-chart="chart-pie"  ratio="ct-chart" ></chartist-pie>
			 		</div>
			 	</div>
		</div>
		<div class="data-panel">
			<div class="panel-content">
				<p class="titile">实时访客</p>
			</div>
			<div class="panel-content">
				<p class="titile">新老访客比</p>
			</div>
		</div>
	</div>
</template>
<script>
	import countDataSource from '../components/web/count-data-source.vue'
    import chartistPie from '../components/web/chartist-pie.vue'
    import chartistToggle from '../components/web/chartist-toggle.vue'
    export default{
    	components:{
    		chartistPie,
    		chartistToggle,
    		countDataSource
    	},data(){
			return{
			 	values:[40,20,10,30,5],
			}
		}

    }
</script>
<style lang="scss">
	.data-right{
		.data-panel{
			margin-top:20px;
			font-size:0;
			.panel-content{
				box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
					width: 49%;
					height: 500px;
					background-color: white;
					display: inline-block;
					padding: 43px 60px 43px 60px;
					font-size: 14px;
					&:first-child{
						margin-right: 2%;
					}
			}
		}
		.pie-view{
			box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 450px;
	  		background-color: white;
			padding: 43px 60px 43px 60px;
			.pie-panel{
				    padding-top: 20px;
				.count-data{
				    display: inline-block;
					ul{
						padding-left: 0px;
					}
				}.chartist-pie{
					display: inline-block;
				}
			}
	   		.title{
				color: #419ce9;
				font-size: 14px;
				border-bottom: 1px solid #e8e8e8;
				padding-bottom: 22px;
			}
			.toggle{
				margin:31px 0 0 0;
	  			width: 100%;
	  			text-align: right;
				text-align: -webkit-right;
				.left{
				    line-height: 26px;
				    font-size: 14px;
				    text-align: left;
				    padding: 0;
				}
				.right {
					width: auto
				}
	  		}
		}
	}
</style>
