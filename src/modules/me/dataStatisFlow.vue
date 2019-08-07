<template>
  <div class="details">
    <x-header title="收益情况统计"></x-header>
    <van-cell-group title="数据报表">
      <van-cell>
        <div class="top">
          <div class="top-con" v-for="(item, index) in tops" :key="index">
            <span>{{item.num}}</span>
            <label for>{{item.label}}</label>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="历史点击统计">
      <van-cell>
        <bar :params="barShow"/>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="历史投放统计">
      <van-cell>
        <bar :params="barClick"/>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="历史消费统计">
      <van-cell>
        <bar :params="barCast"/>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import Nav from "$components/Nav";
import XHeader from "$components/XHeader";
import Bar from "$components/Bar";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import Loading from "vant/lib/loading";
import "vant/lib/loading/style";

export default {
  components: {
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    XHeader,
    Bar
  },
  data() {
    return {
      barShow: {
        id: "bar_show",
        type: "bar",
        showName: false,
        name: "",
        width: "100%",
        height: "300px",
        showLegend: true,
        xAxis: ["一", "二", "三", "四", "五", "六", "七"],
        data: [[120, 200, 150, 80, 70, 110, 130]]
      },
      barClick: {
        id: "bar_click",
        type: "line",
        showName: false,
        name: "",
        width: "100%",
        height: "300px",
        showLegend: true,
        xAxis: ["一", "二", "三", "四", "五", "六", "七"],
        data: [[120, 200, 150, 80, 70, 110, 130]]
      },
      barCast: {
        id: "bar_cast",
        type: "bar",
        showName: false,
        name: "",
        width: "100%",
        height: "300px",
        showLegend: true,
        xAxis: ["一", "二", "三", "四", "五", "六", "七"],
        data: [[120, 200, 150, 80, 70, 110, 130]]
      },
      tops: [
        {
          num: 0,
          label: "今日投放金额"
        },
        {
          num: 60,
          label: "正在投放广告"
        },
        {
          num: 3000,
          label: "今日投放次数"
        },
        {
          num: 0,
          label: "总投放金额"
        },
        {
          num: 60,
          label: "历史投放次数"
        },
        {
          num: 3000,
          label: "总点击次数"
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    stopTask() {}
  }
};
</script>
<style lang="scss" scoped>
.details {
  position: relative;
  .top {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    .top-con {
      text-align: center;
      width: 33.3%;
      margin: 15px 0;
      span,
      label {
        display: block;

      }
    }
  }
}
</style>
