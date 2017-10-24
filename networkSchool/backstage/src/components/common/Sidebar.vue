<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'iconfont icon-mudedi',
                        index: 'learnSchool',
                        title: '课程学堂'
                    },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'signin',
                    //     title: '签到'
                    // },
                    {
                        icon: 'iconfont icon-live',
                        index: 'video',
                        title: '网络学堂-视频'
                    },
                    {
                        icon: 'iconfont icon-picture',
                        index: 'ppt',
                        title: '网络视频-PPT'
                    },
                    {
                        icon: 'iconfont icon-yijianfankui',
                        index: 'questionnaireSurvey',
                        title: '问卷调查'
                    },
                    {
                        icon: 'iconfont icon-wodefankui',
                        index: 'feedback',
                        title: '意见建议'
                    },
                    {
                        icon: 'iconfont el-icon-star-off',
                        index: 'interaction',
                        title: '粉丝互动'
                    }
                    
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    .iconfont {
        margin-right: 10px;
    }
</style>
