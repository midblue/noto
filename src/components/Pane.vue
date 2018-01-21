<template>
  <div
    class="pane"
    :id="paneID"
  >
    <div class="handle">
      .
    </div>
    <div
      class="content"
      contenteditable="true"
      @input="updatePane"
      v-on:keydown.8="deleteKey"
    ></div>
  </div>
</template>

<script>
import Draggable from 'draggable'
export default {
  props: [ 'containerID', 'index', 'paneID', 'initialContent', ],
  data () {
    return {
      content: this.initialContent,
      contentObject: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.contentObject = this.$el.querySelector('.content')
      this.contentObject.innerHTML = this.content
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
        content: this.contentObject.innerHTML,
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
      else {
        console.log('dropped outside')
        this.$store.commit('movePane', {
          paneID: this.paneID,
          containerID: 'floater',
        })
      }
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

.handle {
  width: 6px;
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

</style>
