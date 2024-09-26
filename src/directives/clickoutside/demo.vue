<template>
  <div class="demo">
    <div class="wrap">
      <div
        v-clickoutside="() => handleClick('outside', 1)"
        @click="handleClick('inside', 1)"
        class="content"
        v-if="!isDestory"
      >
        内容 1
      </div>
      <div
        v-clickoutside="() => handleClick('outside', 2)"
        @click="handleClick('inside', 2)"
        class="content"
      >
        内容 2
      </div>
    </div>

    <button @click="handleDestory">{{ isDestory ? '创建' : '销毁' }}组件</button>
    <div class="log-box" ref="boxRef">
      <div v-for="(i, idx) of logs" :key="i">{{ idx }}: {{ i }}</div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import clickoutside from '.'

const vClickoutside = clickoutside
const isDestory = ref(false)
const logs = ref([])
const boxRef = ref()

const handleClick = async (position, flag) => {
  logs.value.push(`click ${position} ${flag}`)
  await nextTick()
  boxRef.value.scrollTo(0, boxRef.value.scrollHeight)
}

const handleDestory = () => {
  isDestory.value = !isDestory.value
}
</script>

<style scoped>
.demo {
  position: relative;
}
.wrap {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
.content {
  width: 100px;
  height: 100px;
  background: gray;
}
.log-box {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 240px;
  background: gainsboro;
  overflow: auto;
}
</style>
