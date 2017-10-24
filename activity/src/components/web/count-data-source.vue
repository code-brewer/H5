<template>
	<!-- 地区分布图 -->
	<div class="component-count-data-source">
		<div class="component-count-data-box">
			<ul>
				<li>
					<i class="icon" :style="{'background-color': lists[0].color}"></i>
					<span>一对一私聊：访客在微信一对一私聊中进入活动</span>
				</li>
				<li>
					<i class="icon" :style="{'background-color': lists[1].color}"></i>
					<span>微信群：访客在微信群中进入活动</span>
				</li>
				<li>
					<i class="icon" :style="{'background-color': lists[2].color}"></i>
					<span>朋友圈：访客在朋友圈中进入活动</span>
				</li>
				<li>
					<i class="icon" :style="{'background-color': lists[3].color}"></i>
					<span>公众号文章：访客在公众号推文中进入活动</span>
				</li>
				<li>
					<i class="icon" :style="{'background-color': lists[4].color}"></i>
					<span>其他：访客在微博等其它应用进入活动</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			lists: {
				type: Object,
				default: function() {
					return [
						{
							color: '#000000',
						},
						{
							color: '#67c13a',
						},
						{
							color: '#5774ed',
						},
						{
							color: '#fc2f4c',
						},
						{
							color: '#ffc868',
						}
					]
				}
			}
		}
	}
	
</script>

<style lang="scss">
	.component-count-data-source{
		width: 100%;
		
		.component-count-data-box{
			font-size: 0;
			padding: 5px 0;

			li{
				height: 22px;
				line-height: 22px;
				margin-bottom: 20px;

				.icon{
					display: inline-block;
					width: 22px;
					height: 22px;
					margin-right: 12px;
					vertical-align: middle;
				}

				> span{
					display: inline-block;
					font-size: 12px;
					vertical-align: middle;
				}

				&:last-child{
					margin-bottom: 0;
				}
			}
			
		}
	}
</style>