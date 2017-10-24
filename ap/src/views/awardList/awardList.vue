<template>
    <div class="my-activity">
        <component :is="currentView"></component>
    </div>
</template>
<script>
    import awardListNew from './awardList-new.vue'
    import awardListOld from './awardList-old.vue'
    import awardListLongscreen from './awardList-longscreen.vue'
    export default {
        components: {
            awardListNew,
            awardListOld,
            awardListLongscreen
        },
        data() {
            return {
                type: this.$route.params.type,
                currentView: ''
            }
        },
        created() {
            switch(this.type) {
                case 'song':
                    this.currentView = 'award-list-new'
                    break
                case 'longscreen': 
                case 'shortscreen': 
                    this.currentView = 'award-list-longscreen'
                    break
                default: 
                    this.currentView = 'award-list-old'
            }
        }
    }
</script>