<template>
  <div
    class="pane"
    :id="paneID"
  >
    <div class="handle">
      .
    </div>
    <textarea
      class="content"
      @input="updatePane"
      v-on:keydown.8="deleteKey"
    >{{ content }}</textarea>
  </div>
</template>

<script>
import Draggable from 'draggable'
export default {
  props: [ 'containerID', 'index', 'paneID', 'content' ],
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      var options = {
        setPosition: false,
        handle: this.$el.querySelector('.handle'),
        onDragEnd: this.dragEnd,
      }
      new Draggable(this.$el, options)
    })
  },
  methods: {
    updatePane () {
      this.$store.commit('updatePane', {
        paneID: this.paneID,
        content: this.$el.querySelector('.content').value,
      })
    },
    dragEnd (element, x, y, e) {
      const droppedContainer = e.path.find(el => {
        return el.classList ? el.classList.value.indexOf('container') !== -1 : false
      })
      if (droppedContainer) {
        this.$store.commit('movePane', {
          paneID: this.paneID,
          containerID: droppedContainer.getAttribute('id'),
        })
      }
      else console.log('dropped outside')
    },
    deleteKey () {
      if (this.$el.querySelector('.content').innerHTML === '') {
        this.$store.commit('deletePane', this.paneID)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pane {
  position: relative;
  z-index: 1;
  padding: 10px;
  width: 100%;
}

textarea {
  outline: none;
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
