/**
 * 添加样式至样式表
 * @param {*} rules
 * @example
 * addStylesheetRules([
 *  'body{background:red;}',
 *  '.item{color:blue;font-size:20px;}'
 * ])
 */
export function addStylesheetRules(rules = []) {
  // 获取样式表
  const styleSheet = document.styleSheets[0]

  // 遍历规则列表并添加
  rules.forEach((ruleText) => {
    // 检查规则是否已存在
    let ruleExists = false
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      if (styleSheet.cssRules[i].cssText === ruleText) {
        ruleExists = true
        break
      }
    }

    // 如果规则不存在，则添加到样式表中
    if (!ruleExists) {
      styleSheet.insertRule(ruleText, styleSheet.cssRules.length)
    }
  })
}
