<template>
    <!-- 视图切换栏组件 -->
    <div class="component-view-toggle">
        <div class="view-toggle-title">视图:</div>
        <div class="view-toggle-list">
            <ul>
                <li class="view-toggle-item" @click="selectedView('horizontal')">
                    <div class="view-toggle-item-horizontal" :class="{selected: viewModel == 'horizontal'}"></div>
                </li>
                <li class="view-toggle-item" @click="selectedView('vertical')" v-show="vertical">
                    <div class="view-toggle-item-vertical" :class="{selected: viewModel == 'vertical'}"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
	export default {
	    props: {
	        // 视图显示的方式, 需包含一下2个属性
	        viewModel: {
	            type: String,
	            default: 'horizontal'
	        },
			vertical:{
				type : Boolean,
				default : false
			}
	    },

	    data() {
	        return {}

	    },

	    methods: {
	        selectedView(modelName) {
	            this.viewModel = modelName;
	        }
	    }
	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.component-view-toggle {
	    display: inline-block;
	    height: 25px;
	    font-size: 0;
	    .view-toggle-title {
	        display: inline-block;
	        width: 40px;
	        margin-right: 10px;
	        font-size: 12px;
	        vertical-align: middle;
	    }
	    .view-toggle-list {
	        display: inline-block;
	        vertical-align: middle;
	        > ul {
	            padding: 0;
	            margin: 0
	        }
	        .view-toggle-item {
	            position: relative;
	            display: inline-block;
	            width: 40px;
	            height: 25px;
	            font-size: 12px;
	            background-color: #fff;
	            cursor: pointer;
	            margin-right: 10px;
	            .view-toggle-item-horizontal {
	                position: relative;
	                top: 50%;
	                left: 50%;
	                width: 28px;
	                height: 16px;
	                transform: translate(-50%, -50%);
	                -ms-transform: translate(-50%, -50%);
	                -webkit-transform: translate(-50%, -50%);
	                -moz-transform: translate(-50%, -50%);
	                -o-transform: translate(-50%, -50%);
	                background: #fff url(../../assets/view-toggle-bg.png) 0 -16px no-repeat;
	                &.selected {
	                    background: #fff url(../../assets/view-toggle-bg.png) 0 0 no-repeat;
	                }
	            }
	            .view-toggle-item-vertical {
	                position: relative;
	                top: 50%;
	                left: 50%;
	                width: 38px;
	                height: 9px;
	                transform: translate(-50%, -50%);
	                -ms-transform: translate(-50%, -50%);
	                -webkit-transform: translate(-50%, -50%);
	                -moz-transform: translate(-50%, -50%);
	                -o-transform: translate(-50%, -50%);
	                background: url(../../assets/view-toggle-bg.png) -30px 0 no-repeat;
	                &.selected {
	                    background: url(../../assets/view-toggle-bg.png) -30px -11px no-repeat;
	                }
	            }
	        }
	    }
	}
</style>
