<template>
  <div
    class="container"
    :style="`top: ${y}px; left: ${x}px;`"
    :id="containerID"
  >
    <div class="content">
      <h3
        class="title"
        contenteditable
        @input="updateTitle"
      >{{ title }}</h3>
      <Pane
        v-for="pane, index in panes"
        :key="index"
        :containerID="containerID"
        :paneID="pane.paneID"
        :index="index"
      >{{ pane.content }}</Pane>
    </div>
    <div
      class="add"
      @click="$store.commit('newPane', containerID)"
    >+</div>
  </div>
</template>

<script>
import Draggable from 'draggable'

import Pane from './Pane'
export default {
  props: [ 'x', 'y', 'title', 'panes', 'containerID', ],
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
    dragEnd (element) {
      this.$store.commit('updateContainer', {
        containerID: this.containerID,
        x: parseInt(window.getComputedStyle(element).getPropertyValue('left')),
        y: parseInt(window.getComputedStyle(element).getPropertyValue('top'))
      })
    },
    checkDragTarget (e) {
      return e === this.$el
    },
    updateTitle () {
      this.$store.commit('updateContainer', {
        containerID: this.containerID,
        title: this.$el.querySelector('.title').innerHTML
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  z-index: 1;
  background: #fff;
  width: 300px;
  box-shadow: 1px 3px 5px rgba(black, .1);

  .content {
    padding: 15px;
  }

  .title, .add {
    width: 100%;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  .add {
    cursor: pointer;
    padding: 5px 0;
    background: lighten(#f2efeb, 3%);
    transition: all .2s;

    &:hover {
      background: darken(#f2efeb, 3%);
    }
  }
}


</style>
