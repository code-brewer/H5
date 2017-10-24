<template>
	<div class="money-line">
		<div class="time-out">
			距离结束还有<span>{{sec}}</span>秒
		</div>
		<div class="main-panl">
			<ul v-for="item in list">
				<li>
					<p class="score">{{item.score}}</p>
					<i class="first" :style="{'margin-bottom':(item.score<=10?'-6px':'-19px')}"></i>
					<i v-for="i in (item.score==0?0:(Math.ceil((item.score-10)/10)))" :style="{'z-index':Math.ceil((1000/(i+1)))}"></i>
					<img :src="item.headimg" />
					<p>{{item.uname}}</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="disable"  @click.stop="">
		
	</div>
</template>
<script>
	export default {
		data() {
				return {
					sec: 10,
					time: {},
					sendTime: {},
					lv: 1,
					list: []
				}
			},
			watch: {
				sec(v) {
					if(v == 0) {
						clearInterval(this.time);
						this.$root.router.go({
							path: '/money-rank'
						})
					}
				}
			},
			beforeDestroy() {
				clearInterval(this.time);
				clearInterval(this.sendTime);
			},
			ready() {
				this.sec = this.$root.activity.second;
				this.init();
			},
			events: {
				line(data) {
					var data = JSON.parse(data.text);
					this.list = data;
				}
			},
			methods: {
				send() {
					var data = {};
					data["from"] = uid; //发送者id
					data["fromName"] = ""; //发送送者昵称
					data["to"] = 0; //接受者id,群发值为0
					data["type"] = 3; //消息类型：1文本消息； 2图文消息；3系统指令（客户端不展示消息，执行某个指令操作）
					data["text"] = "{aid:'" + this.$root.activity.aid + "',types:'数钱',lv:'" + (this.$root.activity.nonum + 1) + "'}"; //发送内容
					data["operat"] = 4; //发送内容
					data["no"] = this.$root.moid; //群号
					this.$root.socket.send(JSON.stringify(data))
				},
				init() {
					this.time = setInterval(() => {
						this.sec -= 1;
					}, 1000)
					this.sendTime = setInterval(() => {
						this.send();
					}, 300)
				},

			}
	}
</script>
<style lang="scss">
	.disable{
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 11;
		top: 0;
		left: 0;
	}
	.money-line {
		width: 1230px;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 0 auto;
		position: relative;
		text-align: center;
		.time-out {
			position: absolute;
			top: 40px;
			width: 100%;
			text-align: center;
			font-size: 36px;
			color: #000000;
			span {
				color: #ff3939;
			}
		}
		.main-panl {
			position: absolute;
			width: 100%;
			bottom: 50px;
			ul {
				list-style: none;
				margin: 0;
				padding: 0;
				width: 100px;
				display: inline-block;
				li {
					width: 100%;
					position: relative;
					.score {
						position: absolute;
						top: -35px;
						width: 100%;
						font-weight: 700;
						font-size: 30px;
					}
					.first {
						height: 40px;
						background-position: 19px 0px;
						z-index: 1001;
						margin-bottom: -19px;
					}
					i {
						display: block;
						background: url(../image/money.png);
						background-repeat: no-repeat;
						width: 100%;
						height: 20px;
						background-position: 50% -60px;
						margin-top: -12px;
						position: relative;
						&:last-child {
							margin-bottom: 0px!important;
						}
					}
					img {
						border-radius: 40px;
						height: 60px;
						width: 60px;
						margin: 5px 0px;
					}
					p {
						margin: 0;
						text-align: center;
						font-size: 12px;
						margin: 0px;
						color: #ff3838;
						&:last-child {
							color: #000;
						}
					}
				}
			}
		}
	}
</style>