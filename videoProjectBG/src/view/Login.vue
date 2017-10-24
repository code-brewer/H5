<style media="screen" scoped>
.header {
  margin: 0 auto;
}
</style>
<template>
<!-- <section> -->
<!-- <div class="header">
        <h3>h5网络视频测试后台</h3>
      </div> -->
<!-- </section> -->
<div style="width: 40%;height: 300px;margin: 0 auto;box-shadow: 3px 3px 20px #ddd;border-radius:10px">
  <Form ref="formInline" :model="formInline" :rules="ruleInline" block style="width:50%;margin:0 auto;margin-top: 80px;padding-top: 35px;">
    <div class="" style="margin-bottom: 45px;">
      <h1>H5网络视频测试后台</h1>
    </div>
    <Form-item prop="user" style="width:90%;margin-left:10px">
      <Input type="text" v-model="formInline.user" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password" style="width:90%;margin-left:10px">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
    </Form-item>
  </Form>
</div>
</template>
<script>
import api from '../api/config'
export default {
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 5,
            message: '密码长度不能小于5位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        var _this = this;
        var body = {
          pkAct: _this.formInline.user, //用户名   		(必填)
          pwd: _this.formInline.password //密码   		(必填)
        };
        api.login(_this, body, (res)=> {
          console.log(res.data.repBody.result);
          if (res.data.repBody.result == '信息正确') {
            _this.$Message.success('登录成功!');
            localStorage.setItem('user_name',res.data.repBody.pname)
            _this.$router.push({
              path: '/Home'
            });
          } else if(valid && res.data.repBody.result == '用户不存在'){
            _this.$Message.error('用户不存在!');
          }else if(valid && res.data.repBody.result == '用户或者密码错误'){
            _this.$Message.error('用户或者密码错误!');
          }
        });
      })
    }
  }
}
</script>
