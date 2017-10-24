<template>
	<div>
        <manage :options="options"></manage>
    </div>
</template>
<script>
    import manage from '../../components/manage.vue'
    export default {
        components: {
            manage
        },
        data() {
            return {
                options: [
                    {
                        path: '/activityManage',
                        img: 'src/images/BANNER.png',
                        text: '活动管理'
                    },
                    {
                        path: '/orderManage',
                        img: 'src/images/gundong.png',
                        text: '订单管理'
                    },
                    // {
                    //     path: '/userManage',
                    //     img: 'src/images/gundong.png',
                    //     text: '客户管理'
                    // },
                    // {
                    //     path: '/dataManage',
                    //     img: 'src/images/gundong.png',
                    //     text: '数据管理'
                    // },
                    // {
                    //     path: '/logisticsManage',
                    //     img: 'src/images/gundong.png',
                    //     text: '物流管理'
                    // }
                ]
            }
        }
    }
</script>