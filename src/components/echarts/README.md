# echart 可视化图表

## 核心模块说明

- `register.js`
  主题注册，按需加载使用到的图表

- `theme-young.json`
  根据 UI，在 echart 主题编辑器生成，[see](https://echarts.apache.org/zh/theme-builder.html)
  其中`young.project.json` 为 echarts 主题编辑器“导出配置”，便于下次“导入配置”

- `base.vue`
  图表工厂组件，里面统一处理了组件注册、初使化、销毁、刷新、resize 等，
  所有的子组件均通过 `base.vue` 传入 echart 配置项 option 生成，无需重复做其它逻辑
