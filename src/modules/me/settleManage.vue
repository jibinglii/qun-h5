<template>
  <div class="storeManage">
    <x-header
      title="佣金管理"
      url="me.me"
      right-text="提现记录"
      @click-right="$router.push({ name: 'withdraw.history' })"
    ></x-header>
    <div class="store_banner">
      <div class="store_banner_t">
        <span>可提现金额</span>
        <p>
          <sup>￥</sup>
          {{ currentUser.wallet.amount | formatMoney }}
        </p>
        <van-button
          plain
          hairline
          type="primary"
          class="withdraw"
          @click="withdraw"
          >申请提现</van-button
        >
      </div>
    </div>
    <div class="settle">
      <settle-filter @confirm="confirm"></settle-filter>
      <van-cell-group title="佣金结算明细">
        <van-cell
          v-for="item in items"
          :key="item.id"
          :title="item.order_id"
          :value="item.settle_amount | formatMoney"
          :label="item.created_at"
        />
        <infinite-loading
          :identifier="infiniteId"
          @infinite="infiniteHandler"
          spinner="waveDots"
        >
          <div slot="no-more">没有更多数据啦...</div>
          <div slot="no-results">没有数据</div>
        </infinite-loading>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import InfiniteLoading from "vue-infinite-loading";
import SettleFilter from "./components/SettleFilter";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";

import { mapGetters } from "vuex";

export default {
  name: "settleManage",
  components: {
    XHeader,
    "van-button": Button,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    InfiniteLoading,
    SettleFilter
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  data() {
    return {
      info: {},
      items: [],
      page: 1,
      month: "",
      infiniteId: +new Date()
    };
  },
  created() {
    let currentData = new Date();
    let month = currentData.getMonth() + 1;
    if (month < 10) month = "0" + month;
    this.month = currentData.getFullYear() + month;
    this.getInfo();
    this.$store.dispatch("loadUser");
  },
  methods: {
    confirm(date) {
      this.month = date;
      this.changeMonth();
    },
    changeMonth() {
      this.items = [];
      this.page = 1;
      this.infiniteId += 1;
    },
    withdraw() {
      this.$router.push({
        name: "withdraw.withdraw"
      });
    },
    async getInfo() {
      await this.$http.get("api/v2/user/settles/total").then(({ data }) => {
        this.info = data;
      });
    },
    async infiniteHandler($state) {
      let param = {
        params: {
          month: this.month,
          page: this.page,
          include: "order"
        }
      };
      this.$http.get("api/v2/user/settles", param).then(({ data }) => {
        if (data.settles.data.length > 0) {
          this.page += 1;
          this.items.push(...data.settles.data);
          $state.loaded();
        }
        if (data.settles.per_page > data.settles.data.length) {
          $state.complete();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.storeManage {
  .right-box {
    display: none;
  }
  .store_banner {
    width: 100%;
    background: #fff;
    text-align: center;
    .store_banner_t {
      line-height: 1.4;
      padding: 0.826667rem 0;
      span {
        font-size: 0.7rem;
        color: #333;
      }
      p {
        font-size: 1.408rem;
        sup {
          font-size: 0.597333rem;
          font-weight: 400;
        }
      }
      .withdraw {
        height: 1.493333rem;
        line-height: 1.493333rem;
        border: solid 1px #000;
        background-color: transparent;
        font-size: 0.512rem;
        margin: 0.426667rem 0 0.853333rem;
        border-radius: 0.213333rem;
      }
    }
  }
  .settle {
    margin-top: 10px;
  }
}
.title {
  background-color: white;
  padding: 10px 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .select {
    select {
      padding: 10px;
      border: solid 1px #f2f2f2;
      outline: none;
    }
  }
}
</style>
