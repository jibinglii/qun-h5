<template>
  <div class>
    <x-header title="发票服务"></x-header>
    <van-cell-group>
      <van-cell class="tips">
        <h4>温馨提示：</h4>
        <p>一、发票换开：</p>
        <p>1、订单完成后一年内可支持换开发票一次。</p>
        <p>2、不支持“企业抬头”变更。</p>
        <p>二、补开发票规则：</p>
        <p>1、增值税普通发票订单完成后1年内可补开发票，增值税专用发票订单完成10天后，1年内可以补开发票。</p>
      </van-cell>
    </van-cell-group>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in list"
        :key="index"
        :is-link="false"
        :title="item.title"
        :inlineDesc="item.label"
      >
      <template slot="value">
        <van-button slot="button" size="small" type="primary" @click="apply">申请发票</van-button>
      </template>
      </x-cell>
    </x-cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    XCell,
    XCellGroup,
  },
  data() {
    //这里存放数据
    return {
      list: [
        {
          title: "2019-7-20充值",
          label: "2019-7-20 12:00",
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    apply () {
      this.$router.push({
        name: 'wallet.invoiceinfo'
      })
    }
  },
  created() {},
  mounted() {}
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
</style>
