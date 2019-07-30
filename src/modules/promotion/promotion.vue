<template>
  <div class>
    <x-header title="推广内容"></x-header>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in promotions"
        :key="index"
        :is-link="false"
        :title="item.title"
        :inlineDesc="item.date"
        :link="item.url"
      ></x-cell>
    </x-cell-group>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="add()">添加文案</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCell,
    XCellGroup,
    "van-button": Button
  },
  data() {
    //这里存放数据
    return {
      promotions: [
        {
          id: "1",
          title: "2019-07-07兴趣定向",
          url: "../../promotion/details",
          date:
            "SwitchCell 组件将在 3.0 版本中废弃，请直接使用 Cell 和 Switch 组件代替SwitchCell 组件将在 3.0 版本中废弃，请直接使用 Cell 和 Switch 组件代替"
        },
        {
          id: "2",
          title: "2019-07-07兴趣定向",
          url: "../../promotion/details",
          date:
            "SwitchCell 组件将在 3.0 版本中废弃，请直接使用 Cell 和 Switch 组件代替SwitchCell 组件将在 3.0 版本中废弃，请直接使用 Cell 和 Switch 组件代替"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    add() {}
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
