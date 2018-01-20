<template>
  <div
    class="container"
    :style="`top: ${y}px; left: ${x}px;`"
    :id="id"
  >
    <Pane
      v-for="pane, index in panes"
      :key="index"
      :id="id"
      :index="index"
    >
      {{ pane }}
    </Pane>
  </div>
</template>

<script>
import Draggable from 'draggable'

import Pane from './Pane'
export default {
  props: [ 'x', 'y', 'panes', 'id', ],
  components: { Pane, },
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      var options = {
        grid: 20,
        smoothDrag: false,
        filterTarget: this.checkDragTarget,
        onDragEnd: this.dragEnd,
      }
      new Draggable(this.$el, options)
    })
  },
  methods: {
    dragEnd (e) {
      this.$store.commit('updateContainerCoords', {
        id: this.id,
        x: parseInt(window.getComputedStyle(e).getPropertyValue('left')),
        y: parseInt(window.getComputedStyle(e).getPropertyValue('top'))
      })
    },
    checkDragTarget (e) {
      return e === this.$el
    }
  }
}
</script>

<style lang="scss">
.container {
  position: absolute;
  z-index: 1;
  background: #fff;
  padding: 15px;
  width: 300px;
  box-shadow: 1px 3px 5px rgba(black, .1);
}


</style>
