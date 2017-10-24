F<template>
	
	<div class="User-detail">
        <div class="User-detail-top">用户信息</div>
        <div class="User-detail-body">
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="20%">用户名</th>
                            <th width="10%">会员等级</th>
                            <th width="10%">成长值</th>
                            <th width="10%">贝壳币</th>
                            <th width="15%">个人信息</th>
                            <th width="15%">操作</th>
                            <th width="20%">详情</th>
                       </tr>
                        <tr>
                            <td>{{list.nick}}</td>
                            <td>{{list.grade}}</td>
                            <td><a href="javascript:;" class="link" v-link="{path: '/chengzhang/'+this.openid}">{{list.integral}}</a></td>
                            <td><a href="javascript:;" class="link" v-link="{path: '/coin/'+this.openid}">{{list.score}}</a></td>
                            <td>
                                <a href="javascript:;" class="link" v-link="{path: '/persontex/'+this.openid}">查看及修改</a>
                            </td>
                            <td>
                                <a href="javascript:;" class="lockBtn" style="color: black; line-height: 22px;" @click="updateUserLS">{{lockText[list.lockstatus]}}</a>
                            </td>
                            <td>
                                <a href="javascript:;" class="link" v-link="{path: '/invite/'+this.openid}">邀请好友详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
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
                list: '',
				openid: '',
                show: '',
                text: '',
                lockText: Object.freeze(['拉黑', '取消拉黑'])
			}
		},

		ready() {
            this.openid = this.$route.params.openid;
            this.queryUserInfo();
		},

        methods: {
            /**
             * [拉黑操作]
             */
            updateUserLS() {
                api.updateUserLS(this, {openid: this.openid, 'lockstatus': +(!+this.list.lockstatus) + ''}, back => {
                    if (back.resCode === '0') {
                        this.show = true;
                        this.text = '操作成功';
                        this.queryUserInfo();
                    } else {
                        this.$dispatch('errorHandle', '拉黑操作', back.resCode);
                    }
                })
            },
            /**
             * [获取用户的个人等级、贝壳币、成长值]
             */
            queryUserInfo() {
                api.queryUserInfo(this, {openid: this.openid}, back => {
                    if (back.resCode === '0') {
                        this.list = back.repBody.list[0];
                        back.repBody.total === 0 && (this.show = true,this.text = '暂无数据');
                    } else {
                        this.$dispatch('errorHandle', '获取用户信息', back.resCode);
                    }
                })
            }
        }
	}
</script>
<style>
    .lockBtn {
        width:58px;height:22px;border:1px solid #ccc;text-align:center;line-height:22px;display:inline-block;border-radius: 12px;text-decoration:none;margin-top: 1px;
    }
</style>