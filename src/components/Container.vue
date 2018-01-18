<template>
  <div
    class="container"
    :style="`top: ${y}px; left: ${x}px;`"
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
import Pane from './Pane'
export default {
  props: [ 'x', 'y', 'panes', 'id', ],
  components: { Pane, },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.container {
  position: absolute;
  z-index: 1;
  background: #fff;
  padding: 30px;
  width: 300px;
}

</style>
