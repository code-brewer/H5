<template>
    <div class="new-sign-in">
        <router-view></router-view>
        <div class="btnGroup">
            <a v-link="{path: '/groupRule'}"><img :src="'images/groupShop/btnGroup.png'" alt=""></a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
            }
        },
        created() {
        },
        methods: {
            
        }
}
</script>
<style lang="sass" scoped>
.btnGroup {
    position: fixed;
    right: 0;
    bottom: 0;
    /* width: 100%; */
    padding: 5px 0;
    z-index: 10;
}
</style>
