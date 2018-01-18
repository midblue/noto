<template>
  <div
    class="pane"
    contenteditable="true"
    @input="updatePane"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [ 'id', 'index', ],
  data () {
    return {}
  },
  methods: {
    updatePane () {
      this.$store.commit('updatePane', {
        id: this.id,
        index: this.index,
        content: this.$el.innerHTML,
      })
    }
  }
}
</script>

<style lang="scss">
.pane {
  z-index: 1;
  padding: 10px;
  width: 100%;
}

</style>
