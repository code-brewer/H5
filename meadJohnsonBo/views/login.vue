<template>

	<div class="out" :class="direct">
		<router-view transition="slide"></router-view>

		<div class="MJohnson-BGheader">
			<!-- 顶部 -->
            <a href="javascript:;" class="MJohnson-logo"></a>
            <h1>美赞臣管理后台</h1>
            <a href="" class="UserName">用户名:wanrenni</a>
            <a href="" class="set">设置</a>
            <a href="" class="logout">退出</a>
			
			<!-- 数据部分 -->
			<!-- 菜单 -->
			 <div class="nav">
                <ul>
                    <li class="active UserManager">
                        <span class="UserMag-logo"></span><a href="" class="UserMag">用户管理</a>
                    </li>
                    <li class="CloseOrder-li">
                        <span class="CloseOrder-logo"></span><a href="" class="CloseOrder">核销订单</a>
                    </li>
                </ul>
                   
            </div>

			<!-- 列表 -->
            <router-view transition="slide"></router-view>

			<!-- 底部 -->
			<div class="MJohnson-foot">
            	版权所有:广州易杰数码有限公司
        	</div>
        </div>
	</div>

</template>
<script>
	import {router} from '../index'

	export default {
		data() {
			return {
				
			}
		},

		ready() {
			
		}
	}
</script>