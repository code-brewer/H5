<template>
    <div class="rule-content">
		<div class="scroll">
			<h2>活动规则</h2>
			<p>一、活动时间: 2017年4月1日~2017年6月30日。</p>
			<p>二、活动内容:</p>
			<ol>
				<li><p>非会员用户可免费领取第一波会员礼包，体验30天沃音乐会员权益及获得1个免费铃音盒。次月会员到期后，续订即可参与第二波礼包抽奖。</p></li>
				<li><p>第二波礼包福利仅限会员用户及首月免会员中次月续订的用户参与。1元话费、5元话费、10元话费、华为P8手机、iphone6随机抽取，100%中奖!</p></li>
				<li><p>活动期间，每个会员每月可获赠一次抽奖机会，会员年中奖概率100%。</p></li>
			</ol>
			<p>三、奖品发放</p>
			<ol>
				<li><p>话费奖品于中奖后五个工作日内充值到用户手机号码中。</p></li>
				<li><p>手机奖品下个月15日前统一发放(手机中奖用户领奖时需要提供个人身份证明以便核验)。</p></li>
			</ol>
			<p>四、注意事项:</p>
			<ol>
				<li><p>如出现违规作弊行为，经查实，取消参加活动资格。</p></li>
				<li><p>本次活动在法定范围内，最终解释权归联通沃音乐平台所有。</p></li>
			</ol>
		</div>
    </div>
</template>
<script>
    export default {
		data() {
			return {
			}
		},
		methods: {
			getAward() {
				this.$parent.close()
			}
		}
	}
</script>
<style lang="scss">
	@import '../../css/px2rem.scss';
	.rule-content {
		height: 800px;
		overflow: scroll;
		overflow-x: hidden;
		p {	
			text-align: left;
			font-size: px2rem(40px);
			line-height: 1.8;
		}

		ol {
			padding-left: px2rem(50px);

			li {
				list-style-type: decimal; 
				font-size: px2rem(40px);
			}
		}
	}
</style>