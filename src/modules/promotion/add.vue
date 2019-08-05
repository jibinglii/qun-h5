<template>
  <div class="resource">
    <x-header title="添加推广计划"></x-header>
    <van-cell-group>
      <router-link :to="{ name: 'promotion.addevent' }">
        <van-cell
          title="选择推广内容"
          :value="targetName"
          is-link
        />
      </router-link>
    </van-cell-group>
    <van-cell-group title="计划概况">
      <van-field
        label="标题"
        v-model="params.title"
        placeholder="请输入标题"
      />
      
      <van-field
        is-link
        readonly
        clickable
        label="投放种类"
        :value="typeValue"
        placeholder="选择类型"
        @click="showTypePicker = true"
      />
      <van-popup
        v-model="showTypePicker"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @cancel="showTypePicker = false"
          @confirm="onTypeConfirm"
        />
      </van-popup>

      <van-field
        is-link
        readonly
        clickable
        label="投放区域"
        :value="areaValue"
        placeholder="选择区域"
        @click="showAreaPicker = true"
      />
      <van-popup
        v-model="showAreaPicker"
        position="bottom"
      >
        <van-area
          title="投放区域"
          :area-list="areaList"
          :columns-num="2"
          @cancel="showAreaPicker = false"
          @confirm="onAreaConfirm"
        />
      </van-popup>
    </van-cell-group>
    <van-cell-group title="投放行业">
      <x-checkbox
        type="radio"
        :data="resource"
        v-model="params.show_category"
      ></x-checkbox>
    </van-cell-group>
    <van-cell-group
      title="投放数量"
      class="groups"
    >
      <van-field v-model="params.show_num" />
      <p>群数量</p>
    </van-cell-group>
    <van-cell-group title="价格设置">
      <div class="price">
        <div class="interval">
          <van-field
            label="投放价格"
            v-model="params.min_show_price"
          />至
          <van-field v-model="params.max_show_price" />元/次
        </div>
        <p>建议价格：0.5~1元</p>
      </div>
      <div class="price">
        <div class="interval">
          <van-field
            label="点击价格"
            v-model="params.min_click_price"
          />至
          <van-field v-model="params.max_click_price" />元/次
        </div>
        <p>建议价格：0.1~1元</p>
      </div>
      <div class="price">
        <div class="interval">
          <van-field
            label="推广预算"
            v-model="params.budget"
          />元
        </div>
        <p>预算不能低于500元</p>
      </div>
    </van-cell-group>
    <van-cell-group title="投放期限">
      <x-checkbox
        type="radio"
        :data="limits"
        v-model="params.duration"
      ></x-checkbox>
    </van-cell-group>
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="next()"
      >保存并提交审核</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import XCheckbox from "$components/XCheckbox";
import { Cell, CellGroup, Field, Button } from "vant";
import Area from "vant/lib/area";
import Popup from "vant/lib/popup";
import Picker from "vant/lib/picker";
import "vant/lib/button/style";
import "vant/lib/field/style";
import "vant/lib/area/style";
import "vant/lib/popup/style";
import "vant/lib/picker/style";
import AreaList from "../../api/area";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XCheckbox,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button,
    "van-popup": Popup,
    "van-picker": Picker,
    "van-area": Area
  },
  data() {
    //这里存放数据
    return {
      params: {
        targetId: 0,
        title: "",
        show_type: "",
        show_category: "",
        show_area_id: "",
        show_num: 100,
        min_show_price: "0.1",
        max_show_price: "5",
        min_click_price: "0.1",
        max_click_price: "1",
        duration: 1,
        budget: "1000"
      },
      targetName: "请选择",
      typeValue: "请选择",
      showTypePicker: false,
      typeColumns: ["微信群", "QQ群", "自媒体", "网站"],
      areaValue: "",
      showAreaPicker: false,
      areaList: AreaList,
      limits: { 0: "1天", 1: "3天", 2: "7天" },
      resource: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onTypeConfirm(value, index) {
      this.typeValue = value;
      this.params.show_type = index;
      this.showTypePicker = false;
    },
    onAreaConfirm(value) {
      let _value = "";
      value.map(function (item, index) {
        _value += item.name + " ";
      });
      this.areaValue = _value;
      this.params.show_area_id = value[1].code;
      this.showAreaPicker = false;
    },
    getCategory() {
      this.$http.get("api/v2/alliance/qun/category").then(({ data }) => {
        this.resource = data.category;
      });
    },
    getAdsTarget() {
      let adsId = this.$route.params.id;
      this.$http
        .get("api/v2/alliance/advertiser/adstarget/info/" + adsId)
        .then(data => {
          this.targetName = data.data.target.title;
        });
    },
    next() {
      if (this.params.targetId == 0) {
        this.$alert("请选择推广文案");
        return false;
      }
      this.$toast("保存中");
      this.$http
        .post("api/v2/alliance/advertiser/add/task", this.params)
        .then(data => {
          if (data.code == 200) {
            this.$alert(data.message);
            this.$router.push({ path: '/plan/plan' })
          }
        })
        .catch(fial => {
          this.$alert(fial.response.data.message);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.params.targetId = this.$route.params.id;
    this.getAdsTarget();
    this.getCategory();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.resource {
  position: relative;
  .btn {
    padding: 10px;
  }
}
/deep/.groups {
  .van-field__control {
    text-align: center;
    font-size: 30px;
    width: 40%;
    margin: 20px auto 0;
  }
  .van-cell:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 40%;
    border-bottom: 1px solid #000;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    width: 20%;
  }
  p {
    text-align: center;
    padding: 10px 0 30px 0;
  }
}
.price {
  padding: 10px 0;
  .interval {
    display: flex;
    font-size: 0.7rem;
    align-items: center;
    /deep/.van-cell {
      width: inherit;
      line-height: 40px;
      .van-field__control {
        width: 75px;
        height: 40px;
        text-align: center;
        background: #f2f2f2;
      }
    }

    .van-cell:not(:last-child)::after {
      border: none;
    }
  }
  p {
    padding-left: 103px;
    font-size: 12px;
    color: #999;
  }
}
.time {
  display: flex;
  .interval {
    /deep/.van-cell {
      .van-field__control {
        width: 105px;
        font-size: 12px;
      }
    }
  }
}
/deep/.vux-label {
  font-weight: 500;
}
</style>
