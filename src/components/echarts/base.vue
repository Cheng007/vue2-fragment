<template>
  <div ref="chartRef" v-clickoutside="hideTooltip"></div>
</template>

<script setup>
/**
 * 图表工厂组件
 *
 * @description
 * 工厂组件统一处理了组件注册、初使化、销毁、刷新、resize 等
 * 其它图表均可由工厂组件生成，只需传入 option 无需重复做其它逻辑
 */
import './register'
import * as echarts from 'echarts/core'
import { debounce } from 'lodash-es'
import clickoutside from '@/directives/clickoutside'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const vClickoutside = clickoutside
const props = defineProps({
  option: {
    type: Object,
    default: () => {}
  }
})
const chartRef = ref()
// 不要使用ref或reactive等响应式对象包装，使用通常的变量或是 shallowRef，避免深层监听 echarts 实例
let chart = null
let debounceResize = null
const expose = {}
defineExpose(expose)

const setOption = () => chart?.setOption(props.option)
const handleResize = () => chart?.resize()
const hideTooltip = () => {
  // 点击图表外面时关闭 tooltip (移动端echarts自己有时关不了，这里手动处理一下)
  chart?.dispatchAction({
    type: 'hideTip'
  })
}

onMounted(() => {
  chart = echarts.init(chartRef.value, 'young', {
    renderer: 'svg'
  })
  expose.chart = chart
  setOption()
  debounceResize = debounce(handleResize, 50)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', debounceResize)
  chart?.dispose()
})
</script>
