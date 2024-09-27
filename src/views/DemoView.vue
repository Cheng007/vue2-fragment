<script setup lang="ts">
import { onMounted, shallowRef, type Component } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const modules: Record<string, { default: Component }> = import.meta.glob(
  ['@/**/Demo*.vue', '@/**/demo*.vue'],
  {
    eager: true
  }
)

interface Comp {
  name: string
  href: string
  component: Component
}

const comps = shallowRef<Comp[]>([])

comps.value = Object.entries(modules).map(([filePath, component]) => {
  // vue 选项式api里的 name 属性
  const compName = component.default.name
  const name = compName || filePath.split('/').slice(-1)[0].replace('.vue', '')
  return {
    name,
    href: `#${name}`,
    component: component.default
  }
})

const toView = (item: Comp) => {
  // router.replace({
  //   name: route.name,
  //   query: {
  //     target: item.name
  //   }
  // })
}

onMounted(async () => {
  const { hash } = route
  if (hash) {
    console.log(hash)
    setTimeout(() => {
      const el = document.querySelector(hash)
      el?.scrollIntoView({
        behavior: 'smooth'
      })
    }, 500)
  }
})
</script>

<template>
  <div class="demo-wrap">
    <div v-for="i of comps" :key="i.name">
      <h2 class="title" @click="toView(i)" :id="i.name">
        <a :href="i.href">#</a>
        {{ i.name }}
      </h2>
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
    text-indent: 10px;
    margin: 20px 0;
  }
  .comp {
    margin: 10px;
    padding: 10px;
    border: 1px solid gainsboro;
    background: #fff;
  }
}
</style>
