<template>
  <div :id="params.id" :style="{height:params.height,width:params.width}"></div>
</template>

<script>
//引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件，图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
  props: {
    params:{
      type: [Object,Array],
      default:{
        id: 'my_pie',
        name: '',
        width: '100%',
        height: '300px',
        showLegend: true,
        legend: [],
        data: [],
        color: []
      }
    }
  },
  data() {
    return {
      charts: null,
    };
  },
  watch:{
  },
  computed: {},
  created() {},
  methods: {
    drawPie() {
      this.charts = echarts.init(document.getElementById(this.params.id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: this.showlegend,
          orient: "vertical",
          x: "left",
          data: this.params.legend
        },
        series: [
          {
            name: this.params.name,
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            color: this.params.color,
            label: {
              normal: {
                show: true,
                position: "line",
                formatter: "{b}\r\n{d}%"
              },
              emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.params.data
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie();
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
