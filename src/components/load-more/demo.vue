<template>
  <div>
    <LoadMore
      @load="getData"
      :status="customer.status"
      :show-finished="!!customer.list.length"
    >
      <div
        v-for="(i, index) of customer.list"
        :key="index"
      >
        {{ index }}： {{ i }}
      </div>
    </LoadMore>
  </div>
</template>
<script>
import LoadMore, { LOADING_STATUS } from './index.vue';

const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

export default {
  name: 'LoadMoreDemo',
  components: {
    LoadMore,
  },
  data() {
    return {
      customer: {
        status: LOADING_STATUS.LOADING,
        list: [],
        finished: false,
      },
    };
  },
  methods: {
    async getData() {
      console.log('加载更多数据中。。。');
      this.customer.status = LOADING_STATUS.LOADING;
      await wait(2000);
      const arr = Array.from({ length: 20 }).map((i, idx) => `${new Date().toLocaleTimeString()}-${idx}`);
      this.customer.list = [...this.customer.list, ...arr];
      this.customer.status = LOADING_STATUS.SUCCESS;
      if (this.customer.list.length >= 50) {
        this.customer.status = LOADING_STATUS.FINISHED;
      }
    },
  },
};
</script>
