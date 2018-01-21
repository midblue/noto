<template>
  <div class="menu">
    <div @click="$store.commit('newContainer')">+</div>
    <div @click="$store.commit('newPane')">.</div>
  </div>
</template>

<script>
export default {
  props: [ ],
  components: {},
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
$width: 50px;

.menu {
  position: fixed;
  z-index: 100;
  background: #fff;
  border-right: 1px solid #ddd;
  width: $width;
  height: 100vw;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > * {
    cursor: pointer;
    width: $width;
    height: $width;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;

    &:hover {
      background: rgba(black, .1);
    }
  }
}

</style>
