<template>
  <div class="task-info">
    <x-header title="任务详情"></x-header>
    <van-cell-group title="任务概览">
      <div class="info">
        <div class="info-type">
          <label for>投放行业</label>
          <span>{{ taskInfo.show_category_label }}</span>
        </div>
        <div class="info-type">
          <label for>投放类型</label>
          <span>{{ taskInfo.show_type_label }}</span>
        </div>
        <div class="info-type">
          <label for>投放区域</label>
          <span>{{ taskInfo.show_area_id }}</span>
        </div>
        <div class="info-type">
          <label for>投放价格</label>
          <span>￥{{ taskInfo.max_show_price }}</span>
        </div>
        <div class="info-type">
          <label for>点击价格</label>
          <span>￥{{ taskInfo.max_click_price }}</span>
        </div>
        <div class="info-type"></div>
      </div>
    </van-cell-group>
    <x-group>
      <info-cell title="推广链接">
        <span class="tg">{{ tg_url }}</span>
        <button class="btns">复制链接</button>
        <button class="btns">广告链接</button>
      </info-cell>
    </x-group>
    <van-cell-group title="任务进度">
      <van-cell>
        <pie :params="pieProgress" ref="pie" />
      </van-cell>
    </van-cell-group>
    <van-cell-group title="任务完成">
      <van-field
        readonly
        clickable
        label="相关资源"
        :value="value"
        placeholder="请选择..."
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <x-uploader title="上传投放凭证" desc="请上传你完成任务的投放凭证" v-model="fileList" :limit="1"></x-uploader>
    </van-cell-group>
    <div class="op" @click="upProof()">
      <x-button type="primary" text="提交投放凭证"></x-button>
    </div>
    <van-cell-group title="投放记录">
      <van-cell
        v-for="(item, index) in taskInfo.result"
        :key="index"
        :title="taskInfo.title"
        :label="item.created_at"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Cell from "vant/lib/cell";
import XGroup from "$components/XGroup";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell/style";
import "vant/lib/cell-group/style";
import XButton from "$components/XButton";
import InfoCell from "$components/InfoCell";
import Circel from "vant/lib/circle";
import "vant/lib/circle/style";
import XUploader from "$components/XUploader";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Popup from "vant/lib/popup";
import "vant/lib/popup/style";
import Picker from "vant/lib/picker";
import "vant/lib/picker/style";
import Pie from "$components/Pie";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XGroup,
    XButton,
    InfoCell,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-circle": Circel,
    XUploader,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker,
    Pie
  },
  data() {
    //这里存放数据
    return {
      currentRate: 50,
      text: "",
      rate: 50,
      resource: {},
      taskInfo: {},
      fileList: [],
      resourceId: "",
      tg_url: "",
      showPicker: false,
      columns: [],
      value: "",
      pieProgress: {
        id: "pie_progress",
        name: "执行进度",
        width: "100%",
        height: "300px",
        showLegend: true,
        legend: ["未执行", "已完成"],
        data: [],
        color: ["#d3d3d3", "#228B22"]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onConfirm(value, index) {
      this.value = value;
      this.resourceId = this.findKey(this.resource, value);
      this.showPicker = false;
    },
    getTaskInfo() {
      let res_id = this.$route.params.id;
      this.$http
        .get("api/v2/alliance/flow/task/info", {
          params: {
            task_id: res_id,
            include: "target",
            append: "show_type_label,show_category_label"
          }
        })
        .then(({ data }) => {
          this.taskInfo = data.task_info;
          this.tg_url = data.task_info.target.link;
          this.pieProgress.data = [
            { name: "未执行", value: 100 - data.task_info.speed },
            { name: "已完成", value: data.task_info.speed }
          ];
          this.$refs["pie"].drawPie();
        });
    },
    upProof() {
      let params = {
        task_id: this.taskInfo.id,
        resource_id: this.resourceId,
        attachment: this.fileList
      };
      this.$http
        .post("api/v2/alliance/flow/accept", params)
        .then(data => {
          if (data.code == 201) {
            this.$toast.loading(data.message);
            this.$router.push({ name: "task.tasks" });
          } else {
            this.$toast.loading(data.message);
          }
        })
        .catch(faill => {
          this.$toast.loading(fail.response.data.message);
        });
    },
    getResource() {
      this.$http.get("api/v2/alliance/resources").then(({ data }) => {
        data.resources.data.map((item, index) => {
          this.resource[item.id] = item.name;
          this.columns.push(item.name);
        });
      });
    },
    findKey(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value));
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.text = this.currentRate.toFixed(0) + "%";
    this.getTaskInfo();
    this.getResource();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.task-info {
  position: relative;
  height: auto;
  .info {
    height: 180px;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .info-type {
      flex: 3;
      label,
      span {
        display: block;
        width: 100px;
        padding: 8px;
        font-size: 0.6rem;
        text-align: center;
      }
    }
  }
  .btns {
    width: 80px;
    height: 30px;
    margin-left: 5px;
    line-height: 30px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 10px;
  }

  .op {
    width: 80%;
    margin: 10px auto;
  }
  .op a {
    height: 46px;
    line-height: 46px;
    font-size: 14px;
  }
}
</style>