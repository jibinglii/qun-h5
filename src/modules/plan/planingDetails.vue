<template>
  <div class="details">
    <x-header title="任务详情"></x-header>
    <van-cell-group title="任务概况">
      <van-cell>
        <div class="top">
          <div class="top-con" v-for="(item, index) in tops" :key="index">
            <span>{{item.num}}</span>
            <label for>{{item.label}}</label>
          </div>
        </div>
      </van-cell>
      <van-cell is-link title="推广内容" :to="{name: 'plan.romotion'}"/>
      <van-cell is-link title="投放广告"/>
    </van-cell-group>
    <van-cell-group title="任务进度">
      <van-cell>
        <pie/>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="投放情况">
      <van-cell>
        <bar :xname="xname" :yname="yname" :bardata="bardata"></bar>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import Nav from "$components/Nav";
import XHeader from "$components/XHeader";
import Pie from "$components/Pie";
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
    Pie,
    Bar
  },
  data() {
    return {
      xname: "",
      yname: "",
      bardata: {

      },
      tops: [
        {
          num: 0,
          label: "预算金额"
        },
        {
          num: 60,
          label: "投放次数"
        },
        {
          num: 3000,
          label: "点击数量"
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.details {
  position: relative;
  .top {
    display: flex;
    height: 50px;
    justify-content: center;
    flex-flow: wrap;
    margin: 10px 0;
    .top-con {
      flex: 1;
      text-align: center;
      span,
      label {
        display: block;
        width: 70px;
        height: 30px;
        margin: 0 auto;
      }
    }
  }
  .fast {
    display: flex;
    height: 100px;
    justify-content: center;
    flex-flow: wrap;
    .fast-con {
      flex: 1;
      text-align: center;
      padding-top: 20px;
      img {
        width: 40px;
        height: 40px;
        border: 1px solid #000;
        border-radius: 5px;
        margin: 0 auto;
      }
      label {
        display: block;
        width: 70px;
        height: 30px;
        margin: 0 auto;
      }
    }
  }
}
</style>
