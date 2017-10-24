<template lang="html">
  <div class="" @click="go()">
    go to => Flash page
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {

    })
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    go: function() {
      this.$router.push({
        name: 'Flash'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
Error: Source sample is missing.
</style>
