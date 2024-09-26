<template>
  <div class="wrap">
    <div class="sticky">
      <a href="#id1">定位至内容1</a>
      <a href="#id2">内容2</a>
    </div>

    <div class="item" id="id1">内容1</div>
    <div class="item" id="id2">内容2</div>
  </div>
</template>

<style scoped>
.wrap {
  .sticky {
    display: flex;
    gap: 20px;
    position: sticky;
    top: 0;
    background: #fff;
  }
  .item {
    height: 110vh;
    background: gray;
    margin-bottom: 10px;
  }
}
</style>
