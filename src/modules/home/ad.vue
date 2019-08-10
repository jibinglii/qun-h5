<template>
  <div class="page-home">
    <x-header title="搜瓜群盟" :allowBack="false"></x-header>
    <div class="top_info">
      <div class="top-con">
        <span>{{ adsCount.task_count }}</span>
        <label for>推广任务</label>
      </div>
      <div class="top-con">
        <span>{{ adsCount.order_count }}</span>
        <label for>推广订单</label>
      </div>
      <div class="top-con">
        <span>{{ adsCount.result_show_count }}</span>
        <label for>投放数量</label>
      </div>
      <div class="top-con">
        <span>{{ adsCount.result_click }}</span>
        <label for>展现数量</label>
      </div>
    </div>
    <van-cell-group title="快捷入口">
      <van-cell>
        <div class="fast">
          <div class="fast-con">
            <router-link :to="{ name: 'promotion.addevent' }">
              <img src="/images/me/dianpu.png" alt />
              <label for>发起新推广</label>
            </router-link>
          </div>
          <div class="fast-con">
            <router-link :to="{ path: '/plan/plan' }">
              <img src="/images/me/goods.png" alt />
              <label for>推广中心</label>
            </router-link>
          </div>
          <div class="fast-con">
            <router-link :to="{ name: 'promotion.promotion-content' }">
              <img src="/images/me/order.png" alt />
              <label for>推广内容</label>
            </router-link>
          </div>
          <div class="fast-con">
            <router-link :to="{ name: 'me.helps' }">
              <img src="/images/me/help.png" alt />
              <label for>使用帮助</label>
            </router-link>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="进行中推广">
      <van-cell
        v-for="(item, index) in ads"
        :key="index"
        :title="item.task.title"
        is-link
        :label="'状态:'+item.status_label+' 生成时间:'+item.created_at +' 持续:'+ item.task.duration+'天'"
        :to="{ name: 'plan.planingdetails', params: { id: item.id } }"
      />
    </van-cell-group>

    <infinite-loading @infinite="adInfo"  spinner="waveDots">
      <div class="no-more" slot="no-more">没有更多数据啦...</div>
      <div class="no-results" slot="no-results">没有数据</div>
    </infinite-loading>
    <nav-block />
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import Nav from "$components/Nav";
import XHeader from "$components/XHeader";
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import Cell from "vant/lib/cell";
import CellGroup from "vant/lib/cell-group";
import Loading from "vant/lib/loading";
import Icon from "vant/lib/icon";

export default {
  components: {
    Tab,
    "nav-block": Nav,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-icon": Icon,
    XHeader,
    InfiniteLoading
  },
  data() {
    return {
      ads: [],
      adsCount: {
        task_count: 0,
        order_count: 0,
        result_show_count: 0,
        result_click: 0
      }
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  created() {},
  methods: {
    adInfo($state) {
      this.$http
        .get("api/v2/alliance/advertiser/show", { params: { include: "task",append:'status_label' } })
        .then(({ data }) => {
          this.adsCount = data.count_data;
          if (data.task.data.length > 0) {
            this.ads = data.task.data;
            $state.loaded();
          }
          if (data.task.per_page > data.task.data.length) {
            $state.complete();
          }
        });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.page-home {
  position: relative;
  .top_info {
    padding: 0px 0 20px 0;
    background: #3399ff;
    color: #ffffff;
    font-size: 0.7rem;
    .title {
      font-size: 0.8rem;
      line-height: 50px;
      text-align: center;
      border-bottom: solid 1px #4169e1;
    }
    .top-con {
      display: inline-block;
      width: 50%;
      height: 60px;
      padding-top: 20px;
      text-align: center;
      span {
        display: block;
        font-size: 1rem;
      }
      label {
        display: block;
        color: #e0ffff;
      }
    }
  }
  .fast {
    display: flex;
    height: 100px;
    justify-content: center;
    flex-flow: wrap;
    .fast-con {
      flex: 1;
      text-align: center;
      padding-top: 10px;
      img {
        width: 50px;
        height: 50px;
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        margin: 0 auto;
      }
      label {
        display: block;
        width: 70px;
        height: 30px;
        margin: 0 auto;
      }
    }
  }
}
</style>
