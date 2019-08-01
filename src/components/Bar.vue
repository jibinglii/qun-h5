<template>
  <div :id="params.id" :style="{height:params.height,width:params.width}"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入折线图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "Bar",
  props: {
    params:{
      type: [Object,Array],
      default:{
        id: 'my_bar',
        type: 'bar', //bar\line
        showName: false,
        name: 'my_bar',
        width: '100%',
        height: '300px',
        showLegend: true,
        xAxis: [],
        data: []
      }
    }
  },
  data() {
    return {
      charts: null,
      series:[]
    };
  },
  mounted() {
    Object.keys(this.params.data).forEach((item, index) => {
        this.series.push({
            type: this.params.type,
            data: this.params.data[item]
        })
    });
    this.$nextTick(function() {
      this.drawBar();
    });
  },
  methods: {
    drawBar() {
      this.charts = echarts.init(document.getElementById(this.params.id));
      this.charts.setOption({
        title: {
          show: this.params.showName,
          text: this.params.name,
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          left: "center",
          top: "0",
        },
        xAxis: [
          {
            type: "category",
            data: this.params.xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.series
      });
      window.addEventListener("resize", function() {
        this.charts.resize();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
