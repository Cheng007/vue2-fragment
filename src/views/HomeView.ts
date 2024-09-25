import { defineComponent, h, type Component } from 'vue'

const modules: Record<string, { default: Component }> = import.meta.glob('@/**/Demo*.vue', {
  eager: true
})

export default defineComponent({
  render() {
    const children = Object.entries(modules).map(([filePath, component]) => {
      const name = filePath.split('/').slice(-1)[0].replace('.vue', '')
      const h1 = h('h1', name)
      const content = h(
        'div',
        {
          style: 'padding: 10px;'
        },
        [h(name, h(component.default))]
      )
      return h('div', [h1, content])
    })

    return h('div', children)
  }
})
