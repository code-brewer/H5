<template>
  <div>
      <div v-if="focus">
        <input
            class="input"
            type="text" 
            v-if="editing&&scope.$index==editing-1" 
            v-model="scope.row[attr]"
            v-focus
            >
        <div v-else>
              {{scope.row[attr]}}
        </div> 
      </div>
      <div v-else>
        <input
            class="input"
            type="text" 
            v-if="editing&&scope.$index==editing-1" 
            v-model="scope.row[attr]"
            >
        <div v-else>
              {{scope.row[attr]}}
        </div> 
      </div>
     
  </div> 
</template>

<script>
  import focus from '../../../static/js/focus.js'; //自动获取焦点指令
  export default {
    props: {
      scope : {
        require : true ,
        type : Object
      },
      editing : {
        default : false,
      },
      focus : {
        type : Boolean,
        default : false,
      },
      attr : {
        default : '',
        type : String
      }
     
    },
    mixins: [focus],
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
  .input {
        line-height: 24px;
        height: 24px;
        font-size: 14px;
        width: 100%;
    }

</style>
