<template>
  <div class="resources">
    <x-header
      title="资源管理"
      @click-right="$router.push({ name: 'resource.create', params:{ id:0 } })"
    >
      <i class="iconfont icon-add" slot="right"></i>
    </x-header>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in resources"
        :key="index"
        :is-link="true"
        :title="item.name"
        :inlineDesc="item.area_id + '/' + item.size + '人'"
        :value="item.type_label"
        router="resource.info"
        :routerParams="{'id': item.id}"
      ></x-cell>
    </x-cell-group>
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="$router.push({ name: 'resource.create' , params: {id:0}})"
      >添加资源</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCell from "$components/XCell";
import XGroup from "$components/XGroup";
import XCellGroup from "$components/XCellGroup";
import InfiniteLoading from "vue-infinite-loading";
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCell,
    XCellGroup,
    XGroup,
    InfiniteLoading,
    "van-button": Button,
  },
  data() {
    //这里存放数据
    return {
      resources: [],
      page: 1
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    infiniteHandler($state) {
      this.$http
        .get("api/v2/alliance/resources", {
          params: { page: this.page, append: "type_label" }
        })
        .then(({ data }) => {
          if (data.resources.data.length > 0) {
            this.page += 1;
            this.resources.push(...data.resources.data);
            $state.loaded();
          }
          if (data.resources.per_page > data.resources.data.length) {
            $state.complete();
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.resources {
  position: relative;

  .btn {
    width: 100%;
    position: fixed;
    bottom: 0px;
  }
}
</style>