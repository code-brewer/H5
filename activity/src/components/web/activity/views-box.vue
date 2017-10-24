<template>
	<div class="ams-views-box">
		<div class="header">活动页面</div>
		<div class="content">
			<ul>
	<!-- 			<li class="active">
					<div class="inner">
						<p class="name">首页</p>
						<div class="index"><span>1</span></div>
					</div>
				</li> -->
				<li v-for="view in views" :class="{active: view.path == currpath}">
					<a href="{{'#!'+view.path}}" class="inner">
						<p class="name">{{view.name}}</p>
						<div class="index"><span>{{$index+1}}</span></div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			views: {
				require: true,
				type: Array
			}
		},
		data() {
			return {
				currpath: '/'
			}
		},
		created() {
			var that = this;

			// 监听hash变化
			that.currpath = location.hash.replace('#!', '');
			window.addEventListener('hashchange', ()=> {
				that.currpath = location.hash.replace('#!', '');
			})
		},
		ready() {
			require(['iscroll'], (IScroll)=> {
				window.IScroll = IScroll;
				// var myScroll = new IScroll('.ams-views-box .content',{
				//     scrollbars: true,
				//     fadeScrollbars: true,
				//     scrollX: true,
				//     scrollY: true,
				//     resize: false
				// });

			});

			
			
		},
	}
</script>

<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	@import '../../../css/bootstrap/_mixins.scss';

	.ams-views-box {
		max-width: 100%;
		position: relative;
		@include transition(all .5s ease);

		@media (min-width: $screen-lg-min) {
		    width: 160px;
		    height: 700px;
		}

		> .header {
			height: 30px;
			line-height: 30px;
			text-align: center;
			color: #fff;
			background: $brand-primary;
		}
		
		> .content {
			position: absolute;
			top: 30px;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
			background: #f0f3f4;
			padding-top:0;
			> ul {
				width: 100%;
				padding: 4px 0;
				> li {
					padding: 4px 8px;
					position: relative;
					.inner {
						height: 90px;
						width: 100%;
						border: 1px solid #d6d6d6;
						text-align: center;
						position: relative;
						display: block;
						text-decoration: none;
						.name {
							line-height: 90px;
							color: #000;
						}
						.index {
							position: absolute;
							right: 0;
							bottom: 0;
							color: #fff;
							display: block;
							width: 36px;
							height: 36px;
							overflow: hidden;
							text-align: right;
							&::before {
							    content: '';
							    width: 50px;
							    height: 50px;
							    -webkit-transform: rotate(45deg);
							    transform: rotate(45deg);
							    background: desaturate($brand-primary, 50);
							    position: absolute;
							    right: -25px;
							    bottom: -25px;
							}

							span {
								line-height: 47px;
								z-index: 2;
								position: relative;
								padding-right: 7px;
							}
						}
					}

					&.active {
						.inner {
							background: #fff;
							.index::before {
								background: $brand-primary;
							}
						}
					}
				}
			}
		}

		@media (max-width: $screen-lg-min) {
		    width: 100%;
		    height: 100px;
		    margin-bottom: 20px;
		    > .header {
				display: none;
		    }
		    > .content {
		    	top: 0;
   				> ul {
   					white-space: nowrap;
   					display: inline-block;
   					width: auto;
   					padding: 0;
   					margin: 0;
   					> li {
   						display: inline-block;
   						width: 100px;
   						p {
   							margin-bottom: 0;
   						}
   					}
   				}
		    }
		}
	}
</style>