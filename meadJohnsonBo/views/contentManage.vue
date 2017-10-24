<template>
	<div>
        <manage :options="options"></manage>
    </div>
</template>
<script>
    import manage from '../components/manage.vue'
    export default {
        components: {
            manage
        },
        data() {
            return {
                options: [
                    {
                        path: '/bannerMag2',
                        img: 'src/images/BANNER.png',
                        text: 'Banner管理'
                    },
                    {
                        path: '/gundong',
                        img: 'src/images/gundong.png',
                        text: '滚动信息管理'
                    },
                    {
                        path: '/datapush',
                        img: 'src/images/gundong.png',
                        text: '推送信息管理'
                    },
                     {
                        path: '/bannerWarehouse',
                        img: 'src/images/BANNER.png',
                        text: '素材管理'
                    }
                ]
            }
        }
    }
</script>