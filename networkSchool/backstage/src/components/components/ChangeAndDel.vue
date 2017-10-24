<template>
  <div>
    <el-button size="small"
          v-bind:class="{ active: editing&&scope.$index==editing-1 }"
          @click.native="handleEdit(scope.$index, scope.row)">{{editing&&scope.$index==editing-1? '完成' : '修改'}}</el-button>
          <slot></slot>
    <el-button size="small" type="danger"
          @click.native="handleDelete(scope.$index, scope.row)">删除</el-button>
  </div> 
</template>

<script>
  export default {
    props: {
      scope : {
        require : true ,
        type : Object
      },
      editing : {
        default : false,
      },
      handleEdit : {
        type : Function,
      },
      handleDelete : {
        type : Function,
      }
    },
    data () {
    	return {
    		
    	}
    },
 	  created(){
        console.log(this.scope)
    },
    methods : {
    	
    }
  }
</script>

<style scoped>
  button.active {
    color: #00d1b2;
    border-color: #00d1b2;
  } 

</style>
