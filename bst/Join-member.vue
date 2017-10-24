<template>
	
	<div class="components-join-member">
		<div class="box">
			<a :href="$root.fmappurl" class="join-btn" style="background:url(a/images/join-btn.png) center center; background-size: 100% 100%;">下载饭盟APP</a>
			<span style="display: none;" class="text" @click="memberIntroduce.show=true">会员介绍</span>
		</div>

		<modal :show.sync="memberIntroduce.show" :bg="false">
			<div class="introduce-box" style="background:url(a/images/bg-border-2.png) center center; background-size: 100% 100%;">
				<p class="title">会员介绍</p>
				<section class="special" style="background:url(a/images/bg-member.png) center center; background-size: 100% 100%;">
					<div class="special-item one">
						<p class="special-text">特权一</p>
						<p class="special-text">内容特权</p>
						<span class="text">百万首高清热歌,<br/>MV免费播放和下载。</span>
					</div>

					<div class="special-item two">
						<p class="special-text">特权二</p>
						<p class="special-text">流量特权</p>
						<span class="text">沃音乐WAP门户<br/>和手机客户端流量全免。</span>
					</div>

					<div class="special-item three">
						<p class="special-text">特权三</p>
						<p class="special-text">炫铃特权</p>
						<span class="text">炫铃和单曲免费, <br/>另可获专享铃音盒！</span>
					</div>

					<div class="special-item four">
						<p class="special-text">特权四</p>
						<p class="special-text">明星特权</p>
						<span class="text">优先获得演唱会, 歌友<br/>会和见面会等特权。</span>
					</div>
					
				</section>

				<section class="intro">
					<dl style="height: 300px;overflow-y: auto;">
						<!-- <dt>开通沃音乐会员后，您将享受到下列权益：</dt> -->
						<dd>• 开通沃音乐会员后，您将享受到下列权益：在沃音乐门户上免费播放、下载歌曲和MV；订购炫铃单曲免费，获得1个免费的会员专享铃音盒；免流量使用沃音乐手机客户端和沃音乐wap门户；优先获得沃音乐提供的明星演唱会、歌友会、见面会的机会。</dd>
						<dd>• 全国2/3G炫铃用户开通沃音乐会员资费1元/月，全国2/3G非炫铃用户和全国4G用户开通会员资费6元/月。（福建、安徽4G用户需另收5元/月炫铃功能费）</dd>
						<dd>• 目前4G用户退订沃音乐高级会员会将炫铃功能一同退订，需要炫铃功能的4G用户只需在沃音乐门户上单独开通即可。</dd>
						<dd>• 除广东、上海、吉林、甘肃以外的2/3G非炫铃用户开通沃音乐会员产品，话单上会显示“5元炫铃功能”和“1元沃音乐特惠会员”两项产品。</dd>
						<dd>• 用户开通“沃音乐会员”业务生效后，根据不同省分的不同网络收取相应的包月信息费，包月权益按自然月为用户提供服务；户当月重复开通、退订，只收取1次包月费用。</dd>
						<dd>• 会员用户在沃音乐wap门户和客户端上享受流量包月服务，2G/3G用户上网流量上限为6G，当月流量超出上限后，联通将自动关闭上网功能，下月自动开通；4G用户包含6G定向流量包，超出部分按照用户所选套餐标准收取流量费。</dd>
					</dl>
				</section>

				<img class="close-img" :src="'a/images/close-2.png'" @click="memberIntroduce.show = false">
			</div>
		</modal>
	</div>

</template>

<script>
	import modal from './../src/components/Modal.vue'

	export default{
		components: {
			modal
		},
		props: {
			memberIntroduce: {
				type: Object,
				default: function(){
					return {
						show: false
					}
				}
			},

			joinMember: {
				type: Object,
				default: function(){
					return {
						show: false
					}
				}
			}
			
		},

		ready() {
			this.$root.showMusic = false;
		}
	}
</script>

<style lang="sass">
	.components-join-member{
		width: 100%;

		.box{
			position: relative;

			.join-btn{
				display: block;
				width: 291px;
				height: 84px;
				margin: 0 auto;
				line-height: 72px;
				text-align: center;
				font-size: 36px;
				color: #fff;
				text-shadow: 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561, 0 0 10px #003561;
			}

			.text{
				position: absolute;
				left: 50%;
				top: 50%;
				font-size: 24px;
				color: #fff;
				text-shadow: 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f, 0 0 10px #b2451f;
				transform: translate(170px, -50%);
			}
		}

		.introduce-box{
			position: relative;
			width: 568px;
			height: 801px;
			padding-top: 14px;

			.title{
				width: 100%;
				margin-bottom: 40px;
				text-align: center;
				font-size: 38px;
				color: #e36c00;
				text-shadow: 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09, 0 0 10px #2a0a09;
			}

			.special{
				position: relative;
				width: 528px;
				height: 312px;
				margin: 0 auto;

				.special-item{

					&.one{
						position: absolute;
						left: 0;
						top: 0;
						transform: translate(10px, 10px);

						.special-text{
							text-shadow: 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500, 0 0 10px #8a3500;
						}
					}

					&.two{
						position: absolute;
						left: 50%;
						top: 0;
						transform: translate(68px, 10px);

						.special-text{
							text-shadow: 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758, 0 0 10px #163758;
						}
					}

					&.three{
						position: absolute;
						left: 0;
						top: 50%;
						transform: translate(10px, 10px);

						.special-text{
							text-shadow: 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55, 0 0 10px #520b55;
						}
					}

					&.four{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(68px, 10px);

						.special-text{
							text-shadow: 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03, 0 0 10px #214e03;
						}
					}

					.special-text{
						color: #fff;
						font-size: 26px;
						line-height: 30px;
					}

					.text{
						display: inline-block;
					    font-size: 18px;
					    margin-top: 10px;
					    line-height: 30px;
					}

				}
			}

			.intro{
				width: 100%;
				padding: 0 40px;
				margin-top: 40px;
				text-align: center;

				dt,
				dd{
					color: #1e0000;
					text-align: left;
					font-size: 22px;
				    font-weight: 800;
    				line-height: 34px;
				}

				dt{
					margin-bottom: 28px;
				}
			}

			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 56px;
				max-height: 50px;
			}
		}
	}
</style>