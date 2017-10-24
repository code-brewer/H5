<template>
  <div class="ams-docs-section" :id="id">
    <h1 class="page-header">{{name}}</h1>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      required: true,
      type: String,
      default: null
    },
    name: {
      required: true,
      type: String,
      default: null
    }
  },
  created () {
    this._section = true
  }
}
</script>
