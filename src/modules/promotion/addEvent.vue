<template>
  <div class>
    <x-header title="选择活动"></x-header>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in list"
        :key="index"
        :is-link="false"
        :title="item.title"
        :inlineDesc="item.label"
      >
        <template slot="value">
          <van-button slot="button" size="small" type="primary" @click="select">选择</van-button>
        </template>
      </x-cell>
    </x-cell-group>
    <div class="op" @click="next()">
      <x-button type="primary" text="创建活动"></x-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XButton from "$components/XButton";
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
    XButton,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    XCell,
    XCellGroup
  },
  data() {
    //这里存放数据
    return {
      list: [
        {
          title: "2019-7-20充值",
          label: "活动时间：即日起至2019年9月01号即日起至2019年9月01号"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    select() {
      this.$router.push({
        name: ""
      });
    },
    next() {

    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.weui-cells {
  margin-top: 10px;
  .vux-label {
    font-size: 16px;
    font-weight: 500;
    line-height: 3;
  }
  .vux-label-desc {
    font-size: 12px;
    width: 90%;
    display: inline-block;
  }
}
.op {
  width: 90%;
  margin: 30px auto;
}
.op a {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  border-radius: 0px;
}
</style>
