<template>
  <div class="demo">
    <div class="item" v-ratio="1 / 1" style="width: 200px">固定宽高比</div>
    <input type="range" min="1" max="6" step="1" v-model="value" />
    <span>{{ value }} / 3</span>
    <div class="item" v-ratio="ratio" style="width: 100px">可变宽高比</div>
  </div>
</template>

<script>
import ratio from '.'

export default {
  name: 'DirectiveRatio',
  directives: {
    ratio
  },
  data() {
    return {
      value: 3
    }
  },
  computed: {
    ratio() {
      return this.value / 3
    }
  }
}
</script>

<style scoped>
.demo {
  height: 600px;
}
.item {
  background: gray;
  margin-bottom: 30px;
}
</style>
