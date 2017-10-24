<template>
	<div style="">
		 <chartist  :id-chart="idChart"
				    :ratio="ratio"
				    :type="chartisPie.type"
				    :data="chartisPie.data" >  
	    </chartist> 
	</div>
</template>
<style>
	.chartist-ydy{
		fill: #000000;
	}
	.chartist-wxq{
			fill: #67c13a;
	}
	.chartist-pyq{
			fill: #5774ed;
	}
	.chartist-gzh{
			fill: #fc2f4c;
	}
	.chartist-else{
			fill: #ffc868;
	}	
    .ct-label{
		fill:#fff!important;
		font-size: 1.5rem!important;
		color: #fff!important;
	}
	.ct-chart{
		height: 200px;
	}
</style>
<script>
    import chartist from '../chartist-vuejs/chartist-vuejs.vue'
	export default{
		props:{
			values:{
				type:Array,
				default:function(){ 
					return [10,20,30,40,50]
				},
				required: true 
			},
			idChart: { type: String, required: true },
            ratio: { type: String },
		},
	    components: {
	        chartist
	    },
		data(){
	        return {
	        	chartisPie:{
	        		data:{ 
					  labels: [],
					  series: [{
						    value: 0,
						    name: 'ydy',
						    className: 'chartist-ydy',
						    meta: 'ydy'
						  }, {
						    value: 0,
						    name: 'wxq',
						    className: 'chartist-wxq',
						    meta: 'wxq'
						  }, {
						    value: 0,
						    name: 'pyq',
						    className: 'chartist-pyq',
						    meta: 'pyq'
						  }, {
						    value: 0,
						    name: 'gzh',
						    className: 'chartist-gzh',
						    meta: 'gzh'
						  }, {
						    value: 0,
						    name: 'else',
						    className: 'chartist-else',
						    meta: 'else'
						  }]
					},
					type:'Pie',
	        	},
	        }
	    },
	    ready(){
	      console.log(this.values);
	      var labelsArray=[];
	      var varluesArray= this.values;
	      var count=0;
	      for(var i=0;i<varluesArray.length;i++){
	      		count+=varluesArray[i];
	      		this.chartisPie.data.series[i].value=varluesArray[i];
	      }
	      console.log(count);
	      for(var i=0;i<varluesArray.length;i++){
	      		 if(varluesArray[i]/count>0.15)
	      		 	labelsArray.push(varluesArray[i]+"%");
	      		 else 	labelsArray.push(" ");
	      }
	      this.chartisPie.data.labels=labelsArray;
	    }
	}
</script>
