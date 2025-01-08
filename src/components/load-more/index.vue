<template>
  <div class="comp-load-more">
    <slot></slot>
    <div ref="loadingRef">
      <slot name="loading" v-if="status === LOADING_STATUS.LOADING">
        <div class="def-loading-wrap">
          <van-loading size="20px" />
          <span>加载中...</span>
        </div>
      </slot>
      <slot name="error" v-else-if="status === LOADING_STATUS.ERROR">
        <div class="def-error" @click="$emit('load')">加载失败，点击重试</div>
      </slot>
      <slot name="finished" v-else-if="status === LOADING_STATUS.FINISHED && showFinished">
        <div class="def-no-more">没有更多了</div>
      </slot>
      <div v-else-if="status === LOADING_STATUS.SUCCESS" class="placeholder"></div>
    </div>
  </div>
</template>

<script>
/**
 * 加载更多
 *
 * @description
 * 页面滚动到底时加载更多
 */

const isSupprotIO = typeof IntersectionObserver === 'function'

export const LOADING_STATUS = {
  LOADING: 'loading',
  FINISHED: 'finished',
  SUCCESS: 'success',
  ERROR: 'error'
}

export default {
  name: 'LazyComponent',
  props: {
    // 如果设置为 '0px'，组件会在视口刚可见时加载，设置为大于0的值可更快加载
    offset: {
      type: String,
      default: '10px'
    },
    status: {
      type: String,
      validator(val) {
        return [
          LOADING_STATUS.LOADING,
          LOADING_STATUS.SUCCESS,
          LOADING_STATUS.ERROR,
          LOADING_STATUS.FINISHED
        ].includes(val)
      },
      default: LOADING_STATUS.LOADING
    },
    showFinished: {
      type: Boolean,
      default: true
    }
  },
  emits: ['load'],
  data() {
    return {
      io: null,
      ready: false,
      LOADING_STATUS
    }
  },
  watch: {
    status: {
      handler(val) {
        if (!this.ready) return
        this.unobserve()
        if ([LOADING_STATUS.SUCCESS].includes(val)) {
          this.observe()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.observe()
    this.ready = true
  },
  beforeUnmount() {
    this.unobserve()
  },
  methods: {
    observe() {
      if (!isSupprotIO) {
        // eslint-disable-next-line no-console
        console.warn('浏览器不支持IntersectionObserver')
      }
      if (!isSupprotIO || !this.$refs.loadingRef) return

      this.io = new IntersectionObserver(
        (entries) => {
          const entry = entries?.[0]
          if (entry?.isIntersecting) {
            this.$emit('load')
          }
        },
        { rootMargin: this.offset }
      )

      this.io.observe(this.$refs.loadingRef)
    },
    unobserve() {
      this.io?.disconnect?.()
    }
  }
}
</script>

<style>
.comp-load-more {
  .def-loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 40px;
    color: #999;
    font-size: 14px;
  }
  .def-no-more,
  .def-error {
    color: #999;
    font-size: 14px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .placeholder {
    height: 1px;
  }
}
</style>
