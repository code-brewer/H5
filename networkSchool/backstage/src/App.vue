<template>
    <div id="app">
	    <keep-alive>
	      <router-view></router-view>
	    </keep-alive>
    </div>
</template>
<script type="text/javascript">
     export default { 
         created(){
            // this.handleHamburger()
            // this.$bus.on('alertMes',(mes,type)=>{
            //     this.alertMes(mes,type)
            // })
        },
        data () {
            return {
                // showSidebar : true,
            }
        },
        methods : {
           
            // }
        }
     }
</script>
<style>
    @import "../static/css/main.css";
    @import "../static/font/iconfont.css";
    /*@import "../static/css/color-dark.css";     深色主题*/
    @import "../static/css/theme-green/color-green.css";   /*浅绿色主题*/
    #app {
    	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .hamburger {
            vertical-align: sub;
            padding-right: 10px;
    }
    .el-loading-mask {
        height: 100% !important;
    }
    .el-loading-spinner {
            top : 35% !important;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-del {
        border-color: #bfcbd9;
        color: #999;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .tableTop {
        padding-bottom: 20px;
        font-size: 14px;
        color: rgb(72, 106, 106);
    }

    .table.bottom {
        margin-top: 30px;
    }

    .img {
        padding: 10px;
        height: 126px;
    }

    .img img {
        border-radius: 6px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader>.el-upload--text {
        width: auto;
        height: auto;
        box-sizing: border-box;
    }

    .avatar-uploader {
        box-sizing: border-box;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        display: block;
    }

    .el-icon-plus:before {
        line-height: 100px;
    }

    .add {
        margin: 10px 0px;
    }
</style>