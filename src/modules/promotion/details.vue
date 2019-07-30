<template>
  <div class>
    <x-header title="内容详情" @click-right="edit">
      <div slot="right" class="right">
        <van-icon name="records"/>
      </div>
    </x-header>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in details"
        :key="index"
        :is-link="false"
        :title="item.title"
        :inlineDesc="item.content"
      ></x-cell>
    </x-cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";
import Icon from "vant/lib/icon";
import 'vant/lib/icon/style';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCell,
    XCellGroup,
    "van-icon": Icon
  },
  data() {
    //这里存放数据
    return {
      details: [
        {
          title: "2019-07-07兴趣定向",
          content:
            "SwitchCell 组件将在 3.0 版本中废弃，请直接使用 Cell 和 Switch 组件代替SwitchCell 组件将在 3.0 版本中废弃，请直接使用 Cell 和 Switch 组件代替"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    edit () {
      this.$router.push({
        name: 'promotion.edit'
      })
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
  }
}
/deep/.van-icon {
  font-size: 20px;
  color: #333;
}
</style>
