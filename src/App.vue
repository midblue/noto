<template>
  <div id="app">
    <Menu />
    <Container
      v-for="container, index in renderedContainers"
      :key="index"
      :x="container.x"
      :y="container.y"
      :initialTitle="container.title"
      :containerID="index"
      :panes="container.panes"
    />
    <Pane
      v-for="pane, index in floaters"
      :key="index"
      :containerID="undefined"
      :paneID="pane.paneID"
      :index="index"
      :initialContent="pane.content"
      :x="pane.x"
      :y="pane.y"
    ></Pane>
  </div>
</template>

<script>
import Container from './components/Container'
import Menu from './components/Menu'
import Pane from './components/Pane'
export default {
  name: 'app',
  components: { Container, Menu, Pane, },
  data () {
    return {
      renderedContainers: {},
      floaters: [],
    }
  },
  computed: {
    textChangeFlag () { return this.$store.state.textChangeFlag },
    containers () { return this.$store.state.containers },
    panes () { return this.$store.state.panes },
  },
  watch: {
    containers() { this.updateRenderedContainers() },
    panes() { this.updateRenderedContainers() },
  },
  mounted () {
    this.updateRenderedContainers()
  },
  methods: {
    updateRenderedContainers () {
      this.$nextTick(() => {
        if (this.textChangeFlag) return
        const containersWithPanes = this.containers
        const floaters = []
        for (let c in containersWithPanes) containersWithPanes[c].panes = []
        const panes = this.panes
        for (let p in panes) {
          if (panes[p].containerID && containersWithPanes.hasOwnProperty(panes[p].containerID)) {
            const paneInContainer = panes[p]
            paneInContainer.x = 0
            paneInContainer.y = 0
            containersWithPanes[panes[p].containerID].panes.push(panes[p])
            console.log('adding', containersWithPanes[panes[p].containerID])
          }
          else {
            floaters.push(panes[p])
            console.log('floater')
          }
        }
        this.floaters = floaters
        this.renderedContainers = containersWithPanes
        console.log('up')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
  background: #f2efeb;
  width: 100vw;
  height: 100vh;
}

</style>
