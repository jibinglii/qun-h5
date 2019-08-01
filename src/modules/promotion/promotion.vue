<template>
  <div class>
    <x-header title="推广内容"></x-header>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in promotions"
        :key="index"
        :is-link="true"
        :title="item.title+'/'+item.created_at"
        :inlineDesc="item.content"
        router="promotion.details" 
        :routerParams="{'id': item.id}"
      ></x-cell>
    </x-cell-group>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
				<div slot="no-more">没有更多数据啦...</div>
				<div slot="no-results">没有数据</div>
			</infinite-loading>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="$router.push({ name: 'promotion.edit'})">添加文案</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import InfiniteLoading from "vue-infinite-loading";
import { mapGetters } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCell,
    XCellGroup,
    "van-button": Button,
    InfiniteLoading
  },
  data() {
    //这里存放数据
    return {
      promotions: [],
      page:1,
    };
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  watch: {},
  methods: {
    infiniteHandler ($state) {
				this.$http.get("api/v2/alliance/advertiser/adstarget",
					{ params: { page: this.page } })
					.then(({ data }) => {
						if (data.ads_targets.data.length > 0) {
							this.page += 1
							this.promotions.push(...data.ads_targets.data);
							$state.loaded();
						}else{
              //this.isShow = false
            }
						if (data.ads_targets.per_page > data.ads_targets.data.length) {
							$state.complete();
						}
					});
			},
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
  width: 90%;
  position: fixed;
  bottom: 30px;
  left: 5%;
  .van-button--primary {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
}
</style>
