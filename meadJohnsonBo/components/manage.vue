<template>
	<div class="User-detail">
        <div class="User-detail-top">管理模块</div>
        <div class="User-detail-body module-manage">
            <div v-for="list in options" v-link="{path: list.path}">
                <img :src="list.img">
                <p>{{list.text}}</p>
            </div>  
        </div>
    </div>

</template>
<script>
    export default {
        props: {
            options: {
                type: Array
            }
        }
    }
</script>
<style lang="scss">
    .module-manage {
        > div {
            display: inline-block;
            text-align: center; 
            cursor: pointer;
        }
        img {
            display: block;
            width: 80px;
            height: 80px;
            margin: 20px 40px;
        }
        p {
            display: inline-block;
            text-align: center;
        }
    }
</style>