<template>
	
	<div class="User-detail">
        <div class="User-detail-top">个人信息</div>
        <div class="User-detail-body">
            <div>
                <div class="formRow">
                    <div class="label">
                        <span>姓名</span>
                    </div>
                    <input type="text" v-model="list.name" :value="list.name"></input>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>电话</span>
                    </div>  
                    <input type="text" v-model="list.mobile" :value="list.mobile"></input>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>地址</span>
                    </div>
                    <input type="text" v-model="list.addr" :value="list.addr"></input>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>宝宝性别</span>
                    </div>
                    <input type="text" v-model="list.babygender" :value="list.babygender"></input>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>宝宝生日</span>
                    </div>
                    <input type="text" v-model="list.babybirthday" :value="list.babybirthday"></input>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>我的职业</span>
                    </div>
                    <input type="text" v-model="list.job" :value="list.job"></input>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>用户备注</span>
                    </div>
                    <textarea v-model="list.remark" :value="list.remark"></textarea>
                </div>
                <div style="display:relative;">
                    <a class="btnSubmit" @click="updateUserFile">修改资料</a>
                </div>
            </div>
            <snackbar :show.sync="show" :text="text"></snackbar>
        </div>
    </div>

</template>
<script>
    import api from '../api'
    import snackbar from '../components/snackbar.vue'

	export default {
        components: {
            snackbar
        },
		data() {
			return {
				list: [],
                show: false,
                text: ''
			}
		},

		ready() {
            this.queryUserFile();
		},

        methods: {
            /**
             * [更新个人档案信息]
             */
            updateUserFile() {
                this.list.babygender === '男' ? '1' : '2';
                api.updateUserFile(this, this.list, back => {
                    if (back.resCode === '0') {
                        this.show = true;
                        this.text = '更新成功';
                    } else {
                        this.$dispatch('errorHandle', '更新信息', back.resCode);
                    }
                })
            },
            /**
             * [获取个人档案信息]
             */
            queryUserFile() {
                api.queryUserFile(this, {openid: this.$route.params.openid}, back => {
                    if (back.resCode === '0') {
                        this.list = back.repBody.list[0];
                        this.list.babygender = this.list.babygender === '1' ? '男' : '女';
                        this.list['openid'] = this.$route.params.openid;
                    } else {
                        this.$dispatch('errorHandle', '获取信息', back.resCode);
                    }
                })
            }

        }
	}
</script>