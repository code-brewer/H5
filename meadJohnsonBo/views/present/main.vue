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
                        path: '/presentMes',
                        img: 'src/images/giftMesManageImg.png',
                        text: '礼品信息管理'
                    },{
                        path: '/rosterManage',
                        img: 'src/images/giftListManageImg.png',
                        text: '兑礼名单管理'
                    }
                ]
            }
        }
    }
</script>