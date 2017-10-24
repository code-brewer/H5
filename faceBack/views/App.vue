<template>
    <router-view></router-view>
    
</template>
<style lang="scss">
    @import url('../css/common.scss');
    html ,body {
        width: 100%;
        height: 100%;
    }
    input {
    	text-align: center;
    }
</style>
<script type="text/javascript">
    import resetCss from '../css/reset.css'
    import load from '../components/load.vue'
    export default {
    	components : {
    		load
    	},
		  watch: {
	        '$route' (to, from) {
	         	if (this.login===false) {
	         		this.$router.go({path :'/login/'})
	         	} 

	        }
	      },
    	data () {
    		return {
    			login : false,
    			user : '',
                isRefresh : { //判断下面三个页面是否进去时要刷新
                    message : false,
                    statistics : false,
                    log : false,
                }

    		}
    	},
    	ready () {
    		this.$on('login',(res) =>{ //登录事件监听
    			this.login = true;
    			this.user = res;
    			window.sessionStorage.setItem('user',res)
				this.$router.go({path : '/home/spending'});
			})
			this.$on('quite',()=>{
				this.login= false;
				this.user='';
				window.sessionStorage.removeItem('user')
				this.$router.go({path :'/login/'})
			})
            this.$on('refresh',()=>{
                this.isRefresh = { //判断下面三个页面是否进去时要刷新
                    message : true,
                    statistics : true,
                    log : true,
                }

            })
			if (window.sessionStorage.getItem('user')) {
				this.login = true;
			  this.user = window.sessionStorage.getItem('user')
			  // this.$router.go({path :'/login/'})

			}
          
    	},
    }
</script>