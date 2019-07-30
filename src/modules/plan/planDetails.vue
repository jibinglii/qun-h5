<template>
  <div class="my-task">
    <x-header title="计划详情"></x-header>
    <van-cell-group>
      <van-cell title="总投放数" value="" v-model="serving" is-link :to="{name: 'plan.serving'}"/>
      <van-cell title="总浏览数" value="" v-model="views" is-link :to="{name: 'plan.totalview'}"/>
      <van-cell title="对应推广内容" is-link>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="contents"/>
        </van-dropdown-menu>
      </van-cell>
    </van-cell-group>
    <x-cell-group title="历史投放广告">
      <x-cell
        v-for="(item, index) in servings"
        :key="index"
        :is-link="true"
        :title="item.title"
        :inlineDesc="item.date"
        :link="item.name"
      ></x-cell>
    </x-cell-group>
    <x-cell-group title="历史流转情况">
      <x-cell
        v-for="(item, index) in circulas"
        :key="index"
        :is-link="true"
        :title="item.date"
        :inlineDesc="'投放：'+item.serving + '\xa0\xa0\xa0' +'点击：' + item.click + '\xa0\xa0\xa0' + '       总消费：' + item.total"
        :link="item.name"
      ></x-cell>
    </x-cell-group>
    <div class="btn">
      <van-button type="primary" hairline size="normal" @click="servingClick">再次投放</van-button>
      <van-button type="primary" hairline size="normal" @click="editClick">编辑广告</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Cell from "vant/lib/cell";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import "vant/lib/cell/style";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";
import DropdownMenu from "vant/lib/dropdown-menu";
import "vant/lib/dropdown-menu/style";
import DropdownItem from "vant/lib/dropdown-item";
import "vant/lib/dropdown-item/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    XCell,
    XCellGroup
  },
  data() {
    //这里存放数据
    return {
      value: "0",
      serving: "6000",
      views: "1250",
      servings: [
        {
          title: "七夕活动推广",
          date: "2019-07-07",
          name: ""
        }
      ],
      circulas: [
        {
          date: "2019-07-07",
          serving: "1000次",
          click: "1000次",
          total: "1000.00",
          name: ""
        },
        {
          date: "2019-07-07",
          serving: "1000次",
          click: "1000次",
          total: "1000.00",
          name: ""
        }
      ],
      contents: [
        {
          value: "0",
          text: "标题"
        },
        {
          value: "1",
          text: "标题22"
        },
        {
          value: "2",
          text: "标题33"
        }
      ]
    };
  },
  methods: {
    servingClick () {},
    editClick () {},
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.weui-cells {
  margin-top: 0;
  .vux-label {
    font-weight: 500;
  }
  .vux-label-desc {
    font-size: 12px;
  }
}

/deep/.van-dropdown-menu {
  height: 24px;

  .van-dropdown-menu__item {
    display: inline-block;
  }

  .van-hairline--top-bottom::after {
    border-width: 0px;
  }

  .van-dropdown-menu__title::after {
    display: none;
  }

  .van-cell__title {
    text-align: left;
    font-weight: normal;
  }
}
.van-hairline--top-bottom::after {
  border-width: 0px;
}
.btn{
  text-align: center;
  /deep/button{
    margin: 45px 20px 0 0;
    padding: 0 30px;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
  }
}
</style>
