# 说明

在vue3里，使用下面正常逻辑的方式拿不到 slot 里的 DOM 元素

```vue
<template>
  <slot></slot>
</template>
<script setup>
import { useSlots, onMounted } from 'vue'

const slots = useSlots()

onMounted(() => {
  // 这种方式不能拿到 DOM
  slots.default()?[0]?.el
})
</script>
```

解决方案：可以手动渲染获取到的插槽

```vue
<template>
  <DefaultSlot ref="slotRef" />
</template>

<script setup>
import { useSlots, onMounted, ref } from 'vue'

const slots = useSlots()
const DefaultSlot = slots?.default?.()?.[0]
const slotRef = ref()

onMounted(() => {
  // 这种方式可以拿到 DOM 了
  slotRef.value.$el
})
</script>
```
