<template>
  <template v-if="showSlot">
    <DefaultSlot ref="slotRef" />
  </template>
  <div v-else ref="placeholderRef" :style="{ height: placeholderHeight }" />
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'

/**
 * 组件懒加载
 *
 * @description
 * 页面内组件很多时，不可见的组件不用马上加载渲染
 * @example
 * <lazy-component>
 *  <your-component />
 * </lazy-component>
 */

const isSupprotIO = typeof IntersectionObserver === 'function'

const props = defineProps({
  // 如果设置为 '0px'，组件会在视口刚可见时加载，设置为大于0的值可更快加载
  offset: {
    type: String,
    default: '200px'
  },
  // 是否启用组件懒加载
  lazy: {
    type: Boolean,
    default: true
  },
  // 组件未加载时的占位元素高度，防止多个组件堆积全都一次性加载，
  // 大多数情况下你应该不用单独设置该属性
  placeholderHeight: {
    type: String,
    default: '100vh'
  }
})

const emits = defineEmits(['changeIntersecting', 'ready'])

const slots = useSlots()
const DefaultSlot = slots?.default?.()?.[0]

const ready = ref(false)
const placeholderRef = ref()
const slotRef = ref()
let io = null

const showSlot = computed(() => {
  return !props.lazy || !isSupprotIO || ready.value
})

const observe = () => {
  io = new IntersectionObserver(
    (entries) => {
      const entry = entries?.[0]
      if (entry?.isIntersecting) {
        if (!ready.value) {
          emits('ready')
          ready.value = true
        }
      }
      if (entry.target === slotRef.value?.$el) {
        emits('changeIntersecting', entry.isIntersecting)
      }
    },
    { rootMargin: props.offset }
  )
}

const unobserve = () => {
  io?.disconnect()
}

// 只监听一次 ready 从 false -> true
// 此时需要移除对占位元素的监听，并添加对 slot 的监听
watch(
  ready,
  async () => {
    io.unobserve(placeholderRef.value)
    await nextTick()
    io.observe(slotRef.value.$el)
  },
  { once: true }
)

onMounted(() => {
  if (!isSupprotIO) {
    console.warn('浏览器不支持IntersectionObserver，懒加载将降级为常规加载')
  }
  if (!props.lazy || !isSupprotIO) return

  observe()
  io.observe(placeholderRef.value)
})

onBeforeUnmount(() => {
  unobserve()
})
</script>
