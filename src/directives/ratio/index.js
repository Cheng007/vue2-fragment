import { addStylesheetRules } from './util'

const isSupportAspectRatio = CSS.supports('aspect-ratio', '1 / 1')

const className = 'js_just_for_aspect_ratio_polify'
const cssVarPaddingTop = '--aspect-ratio-polify-padding-top'

const rules = [
  `.${className}::before{float:left;padding-top:var(${cssVarPaddingTop});content:''}`,
  `.${className}::after{display:block;content:'';clear:both}`
]

let isAddStylesheetRules = false

function handle(el, binding) {
  const numberType = [NaN, Infinity, -Infinity, 0]
  if (typeof binding.value !== 'number' || numberType.includes(binding.value)) return

  if (isSupportAspectRatio) {
    el.style['aspect-ratio'] = binding.value
  } else {
    if (!isAddStylesheetRules) {
      // 为什么要通过 stylesheet 添加样式：
      // 1. js不能直接操作::before等伪元素，
      // 2. 不想直接再添加一个容器元素来设置样式
      addStylesheetRules(rules)
      isAddStylesheetRules = true
    }

    const paddingTop = `${(1 / binding.value) * 100}%`
    el.classList.add(className)
    el.style.setProperty(cssVarPaddingTop, paddingTop)
  }
}

/**
 * css aspect-ratio 设置元素宽高兼容指令
 */
const ratio = {
  beforeMount: handle,
  beforeUpdate: handle
}

export default ratio
