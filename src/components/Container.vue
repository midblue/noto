<template>
  <div
    class="container"
    :style="`top: ${y}px; left: ${x}px;`"
    :id="containerID"
  >
    <div class="handle button"></div>
    <div class="content">
      <h3
        class="title"
        contenteditable
        @input="updateTitle"
        v-on:keydown.8="deleteKey"
      >{{ title }}</h3>
      <Pane
        v-for="pane, index in panes"
        :key="index"
        :containerID="containerID"
        :paneID="pane.paneID"
        :index="index"
        :initialContent="pane.content"
      ></Pane>
    </div>
    <div
      class="add button"
      @click="$store.commit('newPane', containerID)"
    >+</div>
  </div>
</template>

<script>
import Draggable from 'draggable'

import Pane from './Pane'
export default {
  props: [ 'x', 'y', 'initialTitle', 'panes', 'containerID', ],
  components: { Pane, },
  data () {
    return {
      title: this.initialTitle,
    }
  },
  mounted () {
    this.$nextTick(() => {
      const options = {
        grid: 20,
        smoothDrag: false,
        handle: this.$el.querySelector('.handle'),
        onDragStart () { console.log('d') },
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
      console.log(e)
      return e === this.$el
    },
    updateTitle () {
      this.$store.commit('updateContainer', {
        containerID: this.containerID,
        title: this.$el.querySelector('.title').innerHTML
      })
    },
    deleteKey () {
      if (this.$el.querySelector('.title').innerHTML === '') {
        this.$store.commit('deleteContainer', this.containerID)
      }
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
  box-shadow: 1px 3px 8px rgba(black, .2);
  user-select: none;

  .handle {
    cursor: move;
    padding: 5px 0;
  }

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
  }
}


</style>
