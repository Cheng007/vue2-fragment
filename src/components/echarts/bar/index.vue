<script setup>
import { onMounted, ref } from 'vue'
import { merge, cloneDeep } from 'lodash-es'
import BaseChart from '../base.vue'

const insRef = ref()

const props = defineProps({
  // 数据集配置，详见：https://echarts.apache.org/handbook/zh/concepts/dataset
  dataset: {
    type: Object,
    default: () => ({
      dimensions: [],
      source: []
    })
  },
  // 用于特殊情况自定义配置
  option: {
    type: Object,
    default: () => {}
  }
})

const expose = {}
defineExpose(expose)

const baseOption = {
  legend: {
    // 禁用图例选择
    selectedMode: false
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      showMaxLabel: true,
      rotate: 30
    }
  },
  yAxis: { type: 'category' }
}

const seriesItem = {
  type: 'bar',
  barGap: 0,
  label: {
    show: true,
    position: 'right',
    fontSize: 10
  }
}

const getMaxLabelSize = (dataset) => {
  const { dimensions = [], source = [] } = dataset
  const products = dimensions.slice(1)
  let max = 0
  products.forEach((product) => {
    const lengths = source.map((i) => String(i[product] ?? '').length ?? 0)
    max = Math.max(max, ...lengths)
  })
  return 14 + 5 * max
}

const len = props.dataset.dimensions.length
const series = new Array(len === 0 ? 0 : len - 1).fill(cloneDeep(seriesItem))
const grid = {
  bottom: getMaxLabelSize(props.dataset)
}

onMounted(() => {
  expose.chart = insRef.value.chart
})

const option = ref(
  merge({ series, dataset: props.dataset, grid }, cloneDeep(baseOption), props.option)
)
</script>

<template>
  <component v-bind="$attrs" :is="BaseChart" ref="insRef" :option="option"></component>
</template>
