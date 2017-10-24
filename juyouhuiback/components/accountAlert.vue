<template>
	<div class="alert" v-if="show">
		<button type="button" class="close" @click="show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<h3 >{{mytype}}</h3>
		<div class="form-group position"> 
      <label for="exampleInputName2">&nbsp账&nbsp&nbsp&nbsp&nbsp号&nbsp：</label> <input type="text" class="form-control myID" id="exampleInputName2" placeholder="easier" v-model="myForm.name"> 
      <label for="exampleInputName2">所属单位：</label> <input type="text" class="form-control myID" id="exampleInputName2" v-model="myForm.company" placeholder="广州易杰"> 
      <label for="exampleInputName2">所属部门：</label> <input type="text" class="form-control myID" id="exampleInputName2" v-model="myForm.department" placeholder="客服部"> 
      <label for="exampleInputName2">角色描述：</label> <input type="text" class="form-control myID" id="exampleInputName2" v-model="myForm.roles"  placeholder="管理员"> 
      <div v-if="mytype ==='增加角色'">
      	<label for="exampleInputName2">设置密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.psw" placeholder="Jane Doe"> 
      <label for="exampleInputName2">确认密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.checkPsw" placeholder="Jane Doe"> 
      </div>
      <div v-else>
      	<label for="exampleInputName2">设置密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.psw" placeholder="如需要修改密码,则填写"> 
      <label for="exampleInputName2">确认密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.checkPsw" placeholder="如需要修改密码,则填写"> 
      </div>
      </div>
      <div class="clearfix">
      	<div style="float: right" >
     		<button type="button" class="btn btn-primary" @click="show=false">取消</button>
     		<button type="button" class="btn btn-success" @click="confirm">确定</button>
     	</div>
      </div>
	</div>
</template>
<style lang="scss" scoped>
	.alert {
			position: fixed;
			top: 30%;
			left: 50%;
			background-color: #eee;
			transform: translateX(-50%);
      width: 360px;
			z-index: 888;
			h3 {
				padding: 10px 0 ;
				text-align: center;

			}
		  .form-group {
        text-align: center;
        input {
          display: inline-block;
          width: 70%;
          height: 25px;
          margin-top: 5px;
        }
      }
			p {
				text-align: center;
				margin-bottom: 10px;
			}
    	}
</style>
<script type="text/javascript">
	export default {
		props : {
			show : {
				type : Boolean,
				default : false,
			},
	      mytype : {
	         type: String,
	        required: true,
	      },
	      myForm : {
	      	type : Object ,
	      	default : {
	      		name : '',
				company : '',
				department : '',
				roles : '',
				psw : '',
				checkPsw : '',
	      	},
	      }
		},
		data () {
			return {
				 	
			}
		},
		ready () {
		},
		methods : {
			confirm () {
				if (this.mytype ==='增加角色') {
					if (this.myForm.name.trim().length==0||this.myForm.company.trim().length==0||this.myForm.department.trim().length==0||this.myForm.roles.trim().length==0||this.myForm.psw.trim().length==0||this.myForm.checkPsw.trim().length==0) return  window.alert('请把信息填完整')
					this.$dispatch('addUser',this.myForm)

				}else {
					if (this.myForm.name.trim().length==0||this.myForm.company.trim().length==0||this.myForm.department.trim().length==0||this.myForm.roles.trim().length==0) return  window.alert('请把信息填完整')
						console.log(this.myForm.psw)

					this.myForm.psw.trim()===this.myForm.checkPsw.trim() ? this.$dispatch('edit',this.myForm) : alert ('两次密码不一致')
				}
					
					
			},
		}

	}
</script>