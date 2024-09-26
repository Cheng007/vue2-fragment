<script setup lang="ts">
import { onMounted, shallowRef, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const modules: Record<string, { default: Component }> = import.meta.glob('@/**/Demo*.vue', {
  eager: true
})

interface Comp {
  name: string
  component: Component
}

const comps = shallowRef<Comp[]>([])

comps.value = Object.entries(modules).map(([filePath, component], idx) => {
  const name = filePath.split('/').slice(-1)[0].replace('.vue', '') ?? `Demo${idx}`
  return {
    name,
    component: component.default
  }
})

const toView = (item: Comp) => {
  router.replace({
    name: route.name,
    query: {
      target: item.name
    }
  })
}

onMounted(() => {
  const { target } = route.query
  if (target) {
    const el = `#${target}`
    document.querySelector(el)?.scrollIntoView()
  }
})
</script>

<template>
  <div class="demo-wrap">
    <div v-for="i of comps" :key="i.name">
      <div class="title" @click="toView(i)" :id="i.name">{{ i.name }}</div>
      <div class="comp">
        <component :is="i.component"></component>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.demo-wrap {
  .title {
    position: relative;
    text-indent: 20px;
    cursor: pointer;
    &::before {
      position: absolute;
      left: 10px;
      content: '';
      background: rgba(4, 4, 255, 0.973);
      width: 4px;
      height: 100%;
      border-radius: 2px;
    }
  }
  .comp {
    margin: 10px;
    padding: 10px;
    border: 1px solid gainsboro;
  }
}
</style>
