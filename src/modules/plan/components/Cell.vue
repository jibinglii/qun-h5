<template>
  <router-link
    class="weui-cell weui-cell_access"
    :to="{name: url}"
  >
    <div class="weui-cell__bd">
      <p>{{title}}</p>
      <span>{{date}}</span>
    </div>
    <div class="weui-cell__ft"></div>
  </router-link>
</template>

<script>
export default {
  name: 'cell',
  props: ['title', 'url', 'date']
}
</script>

<style lang="scss" scoped>
.weui-cell {
  padding:.64rem 15px;
  .weui-cell__bd {
    p {
      font-size: 0.682667rem;
      font-weight: 600;
      line-height: 2;
    }
    span{
      font-size: .597333rem;
    }
  }
}
</style>
