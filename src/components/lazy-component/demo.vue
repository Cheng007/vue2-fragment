<template>
  <lazy-component @ready="ready" @changeIntersecting="changeIntersecting">
    <children-component />
  </lazy-component>
</template>

<script setup>
import { h } from 'vue'
import LazyComponent from './index.vue'

defineOptions({
  name: 'DemoLazyCompoentBase'
})

const ready = () => {
  console.log('lazy children component ready')
}

const changeIntersecting = (isIntersecting) => {
  console.log(`交叉状态:${isIntersecting ? '进入' : '离开'}`)
}

const ChildrenComponent = {
  beforeCreate() {
    console.log('lazy component before create')
  },
  mounted() {
    console.log('lazy component mounted')
  },
  render: () => h('div', 'hello lazy component')
}
</script>
