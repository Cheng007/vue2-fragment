<template>
  <lazy-component @changeIntersecting="changeIntersecting">
    <card :title="title">
      <template #default>
        <slot />
      </template>
      <template #right>
        <slot name="right" />
      </template>
      <template #left>
        <slot name="left" />
      </template>
    </card>
  </lazy-component>
</template>

<script>
/**
 * 卡片懒加载
 *
 * @description
 * 卡片组件懒加载
 */
import Card from '@/components/card'
import LazyComponent from '@/components/lazy-component'
import { isEqual, isNull } from 'lodash-es'

export default {
  name: 'LazyCard',
  components: {
    Card,
    LazyComponent
  },
  props: {
    // 依赖项，在依赖项改变且进入视口时，会触发 change 回调
    deps: {
      type: [Array, Object, String, Number],
      default: null
    },
    // ready 也是触发 change 回调的前提之一
    ready: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  data() {
    return {
      isIntersecting: false,
      lastTriggerDeps: Symbol('lastTriggerDeps')
    }
  },
  computed: {
    callbackDeps() {
      return {
        deps: this.deps,
        isIntersecting: this.isIntersecting
      }
    }
  },
  watch: {
    callbackDeps: {
      handler({ deps: newDeps, isIntersecting }, { deps: oldDeps }) {
        if (!isIntersecting || !this.ready) return
        if (
          (isNull(newDeps) && isNull(oldDeps) && !isNull(this.lastTriggerDeps)) ||
          !isEqual(newDeps, oldDeps) ||
          !isEqual(newDeps, this.lastTriggerDeps)
        ) {
          this.$emit('change')
          this.lastTriggerDeps = newDeps
        }
      },
      deep: true
    }
  },
  methods: {
    changeIntersecting(isIntersecting) {
      this.isIntersecting = isIntersecting
    }
  }
}
</script>
