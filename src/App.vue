<template>
  <div id="app">
    <Container
      v-for="container, index in containers"
      :key="index"
      :x="container.x"
      :y="container.y"
      :id="index"
      :panes="container.panes"
    />
  </div>
</template>

<script>
import Container from './components/Container'
export default {
  name: 'app',
  components: { Container, },
  data () {
    return {
      containers: {},
    }
  },
  mounted () {
    let storedContainers = window.localStorage.getItem('containers')
    if (storedContainers === 'undefined') storedContainers = null
    console.log(storedContainers)
    this.containers = storedContainers ? JSON.parse(storedContainers) 
    : {
      'pane1' : {
        x: 20,
        y: 30,
        panes: [
          'hi',
          '2',
          '3!!'
        ]
      }
    }
    this.$store.commit('naiveSet', { containers: this.containers })
    this.updateContainersInStorage()
  },
  methods: {
    updateContainersInStorage () {
      const toStore = JSON.stringify(this.$store.state.containers)
      window.localStorage.setItem('containers', toStore)
    }
  }
}
</script>

<style lang="scss">
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
