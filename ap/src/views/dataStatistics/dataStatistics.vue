<template>
    <div class="my-activity">
        <component :is="currentView"></component>
    </div>
</template>
<script>
    import dataStatisticsNew from './dataStatistics-new.vue'
    import dataStatisticsLongscreen from './dataStatistics-longscreen.vue'
    import dataStatisticsOld from './dataStatistics-old.vue'
    export default {
        components: {
            dataStatisticsOld,
            dataStatisticsNew,
            dataStatisticsLongscreen
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
                    this.currentView = 'data-statistics-new'
                    break
                case 'longscreen': 
                case 'shortscreen': 
                    this.currentView = 'data-statistics-longscreen'
                    break
                default: 
                    this.currentView = 'data-statistics-old'
            }
        }
    }
</script>