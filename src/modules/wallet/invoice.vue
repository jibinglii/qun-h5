<template>
  <div class>
	<x-header
      title="发票服务"
      @click-right="info"
    >
      <div
        slot="right"
        class="right"
      >
        <van-icon size="1rem" name="cash-on-deliver" />
      </div>
    </x-header>
    <van-cell-group title="温馨提示">
      <van-cell class="tips">
        <h4></h4>
        <p>1、订单完成后一年内可支持换开发票一次。</p>
        <p>2、不支持“企业抬头”变更。</p>
        <p>3、增值税普通发票订单完成后1年内可补开发票。</p>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="开票记录">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :is-link="false"
        :title="item.bill.name"
        :value="'￥'+item.amount"
        :label="item.bill.mobile + '/' + item.created_at"
      >
      </van-cell>
    </van-cell-group>
    <infinite-loading
      @infinite="getBillrecord"
      spinner="waveDots"
    >
      <div slot="no-more">没有更多数据啦...</div>
      <div
        class="no-results"
        slot="no-results"
      >没有数据</div>
    </infinite-loading>
    <div class="btn">
      <van-button type="primary" :disabled="saving" hairline size="large" @click="apply()">申请开票</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import InfiniteLoading from "vue-infinite-loading";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import Icon from "vant/lib/icon";
import "vant/lib/icon/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    InfiniteLoading
  },
  data() {
    //这里存放数据
    return {
		saving: false,
      list: [],
      page: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    info() {
      this.$router.push({
        name: 'wallet.invoiceinfo'
      })
	},
	apply() {
      this.$router.push({
        name: 'wallet.invoiceapply'
      })
    },
    getBillrecord($state) {
      this.$http.get('api/v2/alliance/bill/record', { params: { include: 'bill' } }).then(({ data }) => {
        if (data.bills.data.length > 0) {
          this.page += 1
          this.list.push(...data.bills.data)
          $state.loaded()
        }
        if (data.bills.per_page > data.bills.data.length) {
          $state.complete();
        }
      })
    }
  },
  created() { },
  mounted() { }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.tips {
  p {
    color: #999;
    font-size: 12px;
  }
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
