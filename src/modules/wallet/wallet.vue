<template>
  <div class>
    <x-header title="我的钱包"></x-header>
    <van-cell-group>
      <div class="top">
        <div class="content">
          <span>
            <b>{{amount}}</b> 元
          </span>
          <label>账户余额</label>
        </div>
      </div>
      <div class="wallet">
        <router-link :to="{name:'wallet.recharge'}" class="left">
          <van-icon name="passed"/>充值
        </router-link>
        <router-link :to="{name:'wallet.invoice'}" class="right">
          <van-icon name="label-o"/>发票服务
        </router-link>
      </div>
      <van-tabs>
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item.title">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              :key="index"
              :title="item.title"
              :value="item.value"
              :label="'交易时间：'+item.label"
            />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Icon from "vant/lib/icon";
import "vant/lib/icon/style";
import Tab from "vant/lib/tab";
import "vant/lib/tab/style";
import Tabs from "vant/lib/tabs";
import "vant/lib/tabs/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-icon": Icon,
    "van-tab": Tab,
    "van-tabs": Tabs
  },
  data() {
    //这里存放数据
    return {
      amount:"8000.00",
      tabs: [
        {
          title: "订单管理"
        },
        {
          title: "充值记录"
        }
      ],
      list: [
        {
          title: "2019-7-20充值",
          label: "2019-7-20 12:00",
          value: "+2000"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.top {
  display: flex;
  height: 160px;
  justify-content: space-around;
  align-items: center;
  .content {
    text-align: center;
    color: #666;
    label {
      display: block;
      margin: 0 auto;
      font-size: 14px;
      text-align: center;
    }
    span {
      display: block;
      font-size: 0.8rem;
      text-align: center;
      line-height: 60px;
      b {
        font-size: 1.4rem;
      }
    }
  }
}
.wallet {
  display: flex;
  align-items: center;
  border-top: solid 1px #f2f2f2;
  .left,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 20px 0;
    position: relative;
    font-size: 14px;
    /deep/.van-icon {
      font-size: 18px;
      padding-right: 10px;
    }
  }
  .left::after {
    content: "";
    position: absolute;
    right: 0px;
    width: 1px;
    height: 34px;
    border-right: solid 1px #f2f2f2;
  }
}
/deep/.van-tabs__line {
  background: #000;
  height: 1px;
}
</style>
