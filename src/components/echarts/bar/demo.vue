<template>
  <demo ref="refDemo" class="container" :dataset="dataset" :ratio="1"></demo>
  <div>实例的 height: {{ height }}</div>
</template>

<script>
import Demo from './index.vue'
export default {
  name: 'DemoChartBar',
  components: {
    Demo
  },
  data() {
    return {
      // 数据集配置，详见：https://echarts.apache.org/handbook/zh/concepts/dataset
      dataset: {
        // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
        // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
          { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
          { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
          { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
          { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
        ]
      },
      height: ''
    }
  },
  mounted() {
    const chartInstance = this.$refs.refDemo.chart

    // 拿到 echart 实例了，你可以调用实例方法，比如获取容器高度
    this.height = chartInstance.getHeight()
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 300px;
}
</style>
