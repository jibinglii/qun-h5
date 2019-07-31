<template>
  <div class="">
    <x-header title="历史任务"></x-header>
    <x-cell-group>
      <x-cell
        v-for="(item, index) in historys"
        :key="index"
        :is-link="true"
        :title="item.title"
        :inlineDesc="item.date"
        :link="item.url"
      ></x-cell>
    </x-cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCell from "$components/XCell";
import XCellGroup from "$components/XCellGroup";


export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCell,
    XCellGroup
  },
  data() {
    //这里存放数据
    return {
      historys: [
        {
          title: "2019-07-07兴趣定向",
          date: "2019-07-07",
          url: ""
        },
        {
          title: "2019-07-07兴趣定向",
          date: "2019-07-07",
          url: ""
        }
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
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
    font-weight: 500;
  }
  .vux-label-desc {
    font-size: 12px;
  }
}



</style>
