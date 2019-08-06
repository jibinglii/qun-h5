<template>
  <div>
    <x-header title="推广内容"></x-header>
    <div class="skeleton" v-show="showSkeleton">
      <van-skeleton :row="3"></van-skeleton>
    </div>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in promotions"
        :key="index"
        :is-link="true"
        :title="item.title"
        :inlineDesc="item.created_at"
        router="promotion.details"
        :routerParams="{ id: item.id }"
      ></x-cell>
    </x-cell-group>
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>ß
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="$router.push({ name: 'promotion.edit' })"
      >添加新文案</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";
import InfiniteLoading from "vue-infinite-loading";
import Button from "vant/lib/button";
import Skeleton from "vant/lib/skeleton";
import { mapGetters } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCell,
    XCellGroup,
    "van-button": Button,
    "van-skeleton": Skeleton,
    InfiniteLoading
  },
  data() {
    //这里存放数据
    return {
      showSkeleton: true,
      promotions: [],
      page: 1
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  watch: {},
  methods: {
    infiniteHandler($state) {
      this.$http
        .get("api/v2/alliance/advertiser/adstarget", {
          params: { page: this.page }
        })
        .then(({ data }) => {
          if (data.ads_targets.data.length > 0) {
            this.page += 1;
            this.promotions.push(...data.ads_targets.data);
            $state.loaded();
          }
          if (data.ads_targets.per_page > data.ads_targets.data.length) {
            $state.complete();
          }
          this.showSkeleton = false;
        });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.weui-cells {
  margin-top: 0;
  .vux-label {
    line-height: 3;
  }
  .vux-label-desc {
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
.skeleton {
  background: #fff;
  padding: 10px;
}
</style>
