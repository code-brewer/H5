<template>
	
	<div class="User-detail">
        <div class="User-detail-top">滚动信息管理</div>
        <div class="User-detail-body">
            <div>
                <form class="personTex">
                    <div class="personTexTop">
                        <span>标题</span>
                    </div>
                    <input placeholder="(限制50个字)" style="width:474px;" v-model="list.title">
                </form>
                <form class="personTex">
                    <div class="personTexTop">
                        <span >内容</span>
                    </div>  
                    <textarea placeholder="(限制100个字,可以添加链接)" style="width:474px;" v-model="list.content"></textarea>
                </form>
                <form class="personTex">
                    <div class="personTexTop">
                        <span>截止日期</span>
                    </div>
                    <datepicker :value.sync="list.endtime" format="yyyy-MM-dd" placeholder="年-月-日" width="474px" ></datepicker>
                </form>
                
                <a href="javascript:;" class="queding" @click="update">确定</a>
            </div>
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
    import api from '../api'
    import Datepicker from '../components/Datepicker.vue'
    import snackbar from '../components/snackbar.vue'

	export default {
        components: {
            Datepicker,
            snackbar
        },
		data() {
			return {
                list: {
                    id: this.$route.params.id,
                    endtime: '',
                    title: '',
                    content: ''
                },
                show: false,
                text: ''
			}
		},

		ready() {
            //根据id获取信息
            var mes = '';
            if (localStorage) {
                mes = eval('('+localStorage.getItem('rollMes')+')');
                mes = mes && (mes.id == this.list.id ? mes : '');
            }
            !!mes && (this.list = mes);
            this.list.endtime = this.list.endtime.split(' ')[0];
		},
        methods: {
            update() {
                if (this.list.title == "") {
                    this.text = '标题不能为空';
                    this.show = true;
                    return false;
                }
                if (this.list.title.length > 50) {
                    this.text = '字数不能超过50个字';
                    this.show = true;
                    return false;
                }
                if (this.list.content == "") {
                    this.text = '内容不能为空';
                    this.show = true;
                    return false;
                }
                if (this.list.content.length > 50) {
                    this.text = '内容不能超过100个字';
                    this.show = true;
                    return false;
                }
                if (this.list.endtime == "") {
                    this.text = '日期不能为空';
                    this.show = true;
                    return false;
                }
                api.updateRollMes(this, this.list, (back) => {
                    if (back.resCode == "0") {
                        this.$router.go({path: '/gundong'});
                    } else {
                        this.$dispatch('errorHandle', '更新', back.resCode);
                    }
                })
            }
        }
	}
</script>
<style lang="scss">
   .personTex{
        margin-bottom:20px;
        position: relative;
       .personTexTop{
            display:inline-block;
            width:50px;
            line-height: 26px;
            margin-right:20px;
            vertical-align: top;
            >span{
                float:right;
            }
       }
       >input{
            width:474px;
            height:26px;
            line-height:26px;
            padding-left:10px;
            box-sizing:border-box;
            color:#000;
       }
       >textarea{
            width:474px;
            height:158px;
            resize:none;
            padding:10px;
            box-sizing:border-box;
            color:#000;
        }
        .datepicker {
            top: 0;
            left: 0;
        }
    }
    .queding{
        display: block;
        width:80px;
        height:30px;
        margin: 10px auto;
        border-radius:30px;
        background:#fe7eaf;
        line-height:30px;
        text-align:center;
        color:#fff;
    }
</style>