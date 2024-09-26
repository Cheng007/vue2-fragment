const nodeList = []
const ctx = '@@clickoutsideContext'
let seed = 0

const handleBind = (el, binding) => {
  nodeList.push(el)
  seed += 1

  function handleClickOutside(event) {
    if (!el.contains(event.target)) {
      binding.value(event)
    }
  }

  el[ctx] = {
    id: seed,
    methodName: handleClickOutside
  }

  document.addEventListener('click', handleClickOutside)
}

const handleUnbind = (el) => {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].id === el.id) {
      document.removeEventListener('click', el[ctx].methodName)
      delete el[ctx]
      nodeList.splice(i, 1)
      break
    }
  }
}

const clickoutside = {
  created: handleBind,
  unmounted: handleUnbind
}

export default clickoutside
