<template>
	<div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><i v-bind:class="[icon]"></i> {{className}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    props: {
      icon : {
        default : 'el-icon-setting',
        type : String
      },
      className : {
        require : true ,
        type : String
      }
    },
    data () {
    	return {
    		
    	}
    },
 	created(){
        
    },
    methods : {
    	
    }
  }
</script>

<style scoped>


</style>
