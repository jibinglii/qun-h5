<template>
  <div class="details">
    <x-header title="任务详情"></x-header>
    <van-cell-group title="任务概况">
      <van-cell>
        <div class="top">
          <div
            class="top-con"
            v-for="(item, index) in tops"
            :key="index"
          >
            <span>{{item.num}}</span>
            <label for>{{item.label}}</label>
          </div>
        </div>
      </van-cell>
      <van-cell
        title="名称"
        value="推广标题"
      />
      <van-cell
        is-link
        title="推广内容"
        value="推广内容的标题"
        :to="{name: 'plan.romotion'}"
      />
      <van-cell
        is-link
        title="投放广告"
        value="投放广告的标题"
      />
    </van-cell-group>
    <van-cell-group title="任务进度">
      <van-cell>
        <pie :params="pieProgress" />
      </van-cell>
    </van-cell-group>
    <van-cell-group title="投放情况">
      <van-cell>
        <bar :params="barShow" />
      </van-cell>
    </van-cell-group>
    <van-cell-group title="浏览情况">
      <van-cell>
        <bar :params="barClick" />
      </van-cell>
    </van-cell-group>
    <van-cell-group title="消费情况">
      <van-cell>
        <bar :params="barCast" />
      </van-cell>
    </van-cell-group>

    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="normal"
        @click="stopTask()"
      >结束投放</van-button>
    </div>
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
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  components: {
    "van-button": Button,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    XHeader,
    Pie,
    Bar
  },
  data() {
    return {
      pieProgress: {
        id: "pie_progress",
        name: "执行进度",
        width: "100%",
        height: "300px",
        showLegend: true,
        legend: ["未执行", "已完成"],
        data: [
          {
            name: "未执行",
            value: "80"
          },
          {
            name: "已完成",
            value: "180"
          }
        ],
        color: ['#d3d3d3', '#228B22']
      },
      barShow: {
        id: "bar_show",
        type: "bar",
        showName: false,
        name: '',
        width: '100%',
        height: '300px',
        showLegend: true,
        xAxis: ['一', '二', '三', '四', '五', '六', '七'],
        data: [
          [120, 200, 150, 80, 70, 110, 130]
        ]
      },
      barClick: {
        id: "bar_click",
        type: "line",
        showName: false,
        name: '',
        width: '100%',
        height: '300px',
        showLegend: true,
        xAxis: ['一', '二', '三', '四', '五', '六', '七'],
        data: [
          [120, 200, 150, 80, 70, 110, 130]
        ]
      },
      barCast: {
        id: "bar_cast",
        type: "bar",
        showName: false,
        name: '',
        width: '100%',
        height: '300px',
        showLegend: true,
        xAxis: ['一', '二', '三', '四', '五', '六', '七'],
        data: [
          [120, 200, 150, 80, 70, 110, 130]
        ]
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
  created() { },
  methods: {
    stopTask() {
      this.$confirm({
        title: "温馨提示",
        content: '您确定要停止本次推广吗？',
        yesText: "取消", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "确定", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
      }).catch(() => {
        this.$toast.loading();
        let id = this.$route.params.id;
        this.$http
          .get("api/v2/alliance/approval/stop/" + id)
          .then(data => {
            this.$router.push({ name: "plan.plan" });
            this.$toast.clear();
          });
      });

    },
  }
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
  .btn {
    text-align: center;
    padding: 20px 30px;
    /deep/button {
      width: 100%;
    }
  }
}
</style>
