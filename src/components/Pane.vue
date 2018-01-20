<template>
  <div
    class="pane"
    contenteditable="true"
    @input="updatePane"
  >
    <div class="handle">
      .
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Draggable from 'draggable'
export default {
  props: [ 'id', 'index', ],
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      var options = {
        setPosition: false,
        onDragEnd: this.dragEnd,
      }
      new Draggable(this.$el, options)
    })
  },
  methods: {
    updatePane () {
      this.$store.commit('updatePane', {
        id: this.id,
        index: this.index,
        content: this.$el.innerHTML,
      })
    },
    dragEnd (element, x, y, e) {
      const droppedContainer = e.path.find(el => {
        return el.classList ? el.classList.value.indexOf('container') !== -1 : false
      })
      if (droppedContainer) {
        this.$store.commit('movePane', {
          from: this.id,
          to: droppedContainer.getAttribute('id'),
          content: this.$el.querySelector('.content').innerHTML,
        })
      }
    }
  }
}
</script>

<style lang="scss">
.pane {
  position: relative;
  z-index: 1;
  padding: 10px;
  width: 100%;
}

.handle {
  width: 6px;
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

</style>
