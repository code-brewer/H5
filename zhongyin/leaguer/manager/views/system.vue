<template>
	<div class="content-title">系统设置 &gt 密码修改</div>
	<div class="modifypass">
		<div class="passdiv">
			<span>原有密码:</span><input type="password" v-model="oldpwd" placeholder="请输入原密码" />
		</div>
		<div class="passdiv">
			<span>新设密码:</span><input type="password" v-model="newpwd" placeholder="请输入新密码"/>
		</div>
		<div class="passdiv">
			<span>确认密码:</span><input type="password" v-model="agin" placeholder="请输入新密码"/>
		</div>
		<div>
			<a class="check" @click="ti" >提交</a>
		</div>
	</div>
	<modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
        <div class="close"><span @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:50px;box-sizing:border-box">
            <p style="line-height:30px;text-align:center;">{{doubleStatus.msg}}</p>
        </div>
        <div style="padding:0px 50px;text-align:center;">
            <!-- <a class="actiontong" @click="tijiao()">确定</a> -->
            <a @click="this.doubleStatus.showMsg = false" class="nothx">确定</a>
        </div>
    </modale>
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
        <div class="close"><span @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:50px;box-sizing:border-box">
            <p style="line-height:30px;text-align:center;">{{UploadStatus.msg}}</p>
        </div>
        <div style="padding:0px 50px;text-align:center;">
            <a class="actiontong" @click="tijiao()">确定</a>
            <a @click="this.UploadStatus.showMsg = false" class="nothx">确定</a>
        </div>
    </modale>
</template>
<script>
	import api from '../api/index.js'
	import Modale from '../components/Modale.vue'
	export default {
		components: {
			Modale
		},
		data() {
			return {
				oldpwd:'', 
				newpwd:'',
				agin:'',
				doubleStatus: { //单选确认
	                msg: "",
	                showMsg: false,
	                errorShow: true,
	                event: null
            	},
            	UploadStatus: { //双选确认
	                msg: "",
	                showMsg: false,
	                errorShow: true,
	                event: null
            	}
			}
		},
		created() {
		},
		methods: {
			ti(){
				if(this.newpwd !== this.agin){
					this.doubleStatus.showMsg = true;
					this.doubleStatus.msg = "新设密码要与确认密码一致!"
					return;
				}
				api.modpwd(this, {oldpwd:this.oldpwd,newpwd:this.newpwd}, back => {
					if (back.resCode === '0') {
						this.doubleStatus.showMsg = true;
						this.doubleStatus.msg = "新密码修改成功!"
                	}else{
                		this.doubleStatus.showMsg = true;
                		this.doubleStatus.msg = back.resMsg
                	}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
.check{
	    background: #fe7c71;
}
</style>