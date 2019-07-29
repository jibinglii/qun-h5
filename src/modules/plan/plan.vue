<template>
  <div class="my-task">
    <x-header title="推广计划管理"></x-header>
    <cell-group :title="item.title" v-for="(item, index) in plans" :key="index" v-show="item.show">
      <cell
        :title="inner.title"
        :date="inner.date"
        :url="inner.url"
        v-for="(inner, index) in item.sub"
        :key="index"
        v-show="inner.show"
      />
    </cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "./components/CellGroup";
import Cell from "./components/Cell";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data() {
    //这里存放数据
    return {
      plans: [
        {
          title: "进行中",
          show: true,
          sub: [
            {
              title: "2019-7-05兴趣定向",
              date: "2019-7-05至2019-7-05",
              url: "plan.plan",
              show: true
            }
          ]
        },
        {
          title: "未开始任务",
          show: true,
          sub: [
            {
              title: "2019-7-05兴趣定向",
              date: "2019-7-05至2019-7-05",
              url: "plan.plandetails",
              show: true
            }
          ]
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
