<template>
  <div
    class="pane"
    :class="{'in-container': containerID && !dragging, dragging: dragging}"
    :id="paneID"
    :style="`top: ${y}px; left: ${x}px;`"
  >
    <div class="handle button">
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
  props: [ 'containerID', 'index', 'paneID', 'initialContent', 'x', 'y' ],
  data () {
    return {
      content: this.initialContent,
      contentObject: null,
      draggableObject: null,
      dragging: false,
      targetedContainer: null,
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.contentObject = this.$el.querySelector('.content')
      this.contentObject.innerHTML = this.content
      const options = {
        setPosition: false,
        handle: this.$el.querySelector('.handle'),
        onDragStart: () => { this.dragging = true },
        onDrag: this.drag,
        onDragEnd: this.dragEnd,
      }
      this.draggableObject = new Draggable(this.$el, options)
    })
  },
  methods: {
    updatePane () {
      this.$store.commit('updatePane', {
        paneID: this.paneID,
        content: this.contentObject.innerHTML,
      })
    },
    drag (element, x, y, e) {
      const underMouse = this.allElementsUnderMouse(e.clientX, e.clientY)
      const droppedContainer = underMouse.find(el => {
        return el.classList ? el.classList.value.indexOf('container') !== -1 : false
      })
      if (droppedContainer) {
        this.targetedContainer = droppedContainer
        droppedContainer.classList.add('targeted')
      }
      else {
        this.untargetContainer()
      }
    },
    dragEnd (element, x, y, e) {
      const underMouse = this.allElementsUnderMouse(e.clientX, e.clientY)
      const droppedContainer = underMouse.find(el => {
        return el.classList ? el.classList.value.indexOf('container') !== -1 : false
      })
      if (droppedContainer) {
        this.$store.commit('movePaneToContainer', {
          paneID: this.paneID,
          containerID: droppedContainer.getAttribute('id'),
        })
      }
      else {
        console.log('dropped outside')
        this.$store.commit('movePane', {
          paneID: this.paneID,
          x: e.clientX,
          y: e.clientY,
        })
      }
      this.untargetContainer()
      this.dragging = false
    },
    deleteKey () {
      if (this.$el.querySelector('.content').innerHTML === '') {
        this.$store.commit('deletePane', this.paneID)
      }
    },
    untargetContainer () {
      if (!this.targetedContainer) return
      this.targetedContainer.classList.remove('targeted')
      this.targetedContainer = null
    },
    allElementsUnderMouse (x, y) {
      var stack = [], el
      do {
        el = document.elementFromPoint(x, y)
        stack.push(el)
        el.classList.add('pointer-events-off')
      } while(el.tagName !== 'HTML')
      /* Now clean it up */
      for(let i  = 0; i < stack.length; i += 1)
        stack[i].classList.remove('pointer-events-off')
      // console.log(x, y, stack)
      return stack
    }
  }
}
</script>

<style lang="scss" scoped>
.pane {
  position: relative;
  display: flex;
  align-items: stretch;
  z-index: 1;
  padding: 0 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 250px;
  background: white;

  &.in-container {
    top: 0px !important;
    left: 0px !important;
  }
  &:not(.in-container) {
    position: absolute;
  }
  &.dragging {
    z-index: 90;
  }

}

.handle {
  width: 6px;
  flex: 0;
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

.content {
  flex: 1;
  height: 100%;
}

</style>
