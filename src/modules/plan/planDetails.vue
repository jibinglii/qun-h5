<template>
  <div class="my-task">
    <x-header
      title="推广计划详情"
      @click-right="del"
    >
      <div
        slot="right"
        class="right"
      >
        <van-icon name="delete" />
      </div>
    </x-header>
    <van-cell-group title="任务概况">
      <van-cell
        title="名称"
        :value="taskInfo.title"
      />
      <van-cell
        is-link
        title="推广内容"
        :value="taskInfo.target.title"
        :to="{ name: 'plan.romotion',params:{id:taskInfo.target.id}}"
      />
      <van-cell
        title="总预算"
        :value="'￥'+taskInfo.budget"
      />
      <van-cell
        title="投放预算"
        :value="'￥'+taskInfo.min_show_price+'~'+taskInfo.max_show_price"
      />
      <van-cell
        title="展现预算"
        :value="'￥'+taskInfo.min_click_price+'~'+taskInfo.max_click_price"
      />
    </van-cell-group>
    <van-cell-group title="推广概况">
      <van-cell
        title="总消费"
        :value="'￥'+0"
      />
      <van-cell
        title="总投放数"
        :value="taskInfo.result_num"
        is-link
        :to="{ name: 'plan.serving', params:{taskId:taskInfo.id} }"
      />
      <van-cell
        title="总浏览数"
        :value="taskInfo.click_num"
        is-link
        :to="{ name: 'plan.totalview', params:{taskId:taskInfo.id} }"
      />
    </van-cell-group>
    <van-cell-group title="历史投放广告">
      <van-cell
        is-link
        title="广告名称"
        label="时间"
      />
    </van-cell-group>
    <van-cell-group title="历史流转情况">
      <van-cell
        is-link
        title="流转时间"
        label='投放1000次  点击100次  总消费1000元'
      />
    </van-cell-group>
    <div class="btn">
      <van-button
        type="default"
        plain
        @click="stop"
      >停用</van-button>
      <van-button
        type="primary"
        hairline
        @click="again"
      >再次投放</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import Icon from "vant/lib/icon";
import Cell from "vant/lib/cell";
import Button from "vant/lib/button";
import Field from "vant/lib/field";
import "vant/lib/cell/style";
import DropdownMenu from "vant/lib/dropdown-menu";
import "vant/lib/dropdown-menu/style";
import DropdownItem from "vant/lib/dropdown-item";
import "vant/lib/dropdown-item/style";
import "vant/lib/button/style";
import { mapGetters } from "vuex";


export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-icon": Icon,
    "van-button": Button,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem
  },
  data() {
    //这里存放数据
    return {
      taskInfo: {
        title: ''
      },
    };
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    again() {
      this.$http.post('api/v2/alliance/advertiser/approval', { task_id: this.taskInfo.id })
        .then(data => {
          if (data.code = 201) {
            this.$alert(data.message)
            this.$router.push({ name: 'plan.plan' })
          }
        }).catch(fail => {
          this.$alert(fial.response.data.message)
        })
    },
    getTaskInfo() {
      this.$toast.loading();
      let id = this.$route.params.id
      this.$http.get('api/v2/alliance/advertiser/info/' + id, { params: { include: 'target,approval,ads' } }).then(({ data }) => {
        this.taskInfo = data.task;
        this.$toast.clear();
      })
    },
    del() {
      this.$confirm({
        title: "温馨提示",
        content: '您确定要删除该计划吗？',
        yesText: "取消", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "确定", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
      }).catch(() => {
        this.$toast.loading();
        let adsId = this.$route.params.id;
        // this.$http
        //   .get("api/v2/alliance/advertiser/del/task/" + adsId)
        //   .then(data => {
        //     this.$router.push({ name: "plan.plan", params:{active: 1} });
        //     this.$toast.clear();
        //   });
      });
    },
    stop() {
      this.$confirm({
        title: "温馨提示",
        content: '您确定要停用该计划吗？',
        yesText: "取消", // 左边按钮文本,
        yesStyle: { overflow: "inherit" },
        noText: "确定", // 设置右边按钮文本,
        noStyle: { overflow: "inherit" } // 设置右边按钮样式,
      }).then(function () {
      }).catch(() => {
        this.$toast.loading();
        let adsId = this.$route.params.id;
        // this.$http
        //   .get("api/v2/alliance/advertiser/del/task/" + adsId)
        //   .then(data => {
        //     this.$router.push({ name: "plan.plan", params:{active: 1} });
        //     this.$toast.clear();
        //   });
      });
    }
  },
  mounted() {
    this.getTaskInfo();
  }
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
.btn {
  display: flex;
  text-align: center;
  padding: 10px;
  .van-button {
    flex: 3;
    border: solid 1px #000;
    &:first-child {
      flex: 1;
      margin-right: 10px;
    }
  }
}
</style>