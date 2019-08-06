<template>
  <div class>
    <x-header :title="title"></x-header>
    <van-cell-group>
      <van-field label="标题" v-model="params.title" placeholder="请输入文案标题" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="params.content" type="textarea" placeholder="请输入文案内容" rows="8" autosize />
    </van-cell-group>
    <van-cell-group>
      <x-uploader title="相关图片" v-model="params.attachment" :limit="2"></x-uploader>
    </van-cell-group>
    <van-cell-group>ß
      <van-field label="推广链接" v-model="params.link" placeholder="请输入推广链接" />
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" :disabled="saving" hairline size="large" @click="save()">保存</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import XUploader from "$components/XUploader";
import Button from "vant/lib/button";
import "vant/lib/button/style";
import { fail } from "assert";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    XUploader,
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button
  },
  data() {
    //这里存放数据
    return {
      params: {
        title: "",
        content: "",
        link: "",
        attachment: []
      },
      title: "添加文案",
      saving: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm(value, index) {
      this.value = value;
      this.showPicker = false;
    },
    save() {
      this.saving = true;
      let url = "api/v2/alliance/advertiser/add/adstarget";
      if (this.$route.params.id != 0 && this.$route.params.id != undefined) {
        url = url + "/" + this.$route.params.id;
      }
      this.$http
        .post(url, this.params)
        .then(data => {
          if (data.code == 201 || data.code == 200) {
            this.$alert("保存成功");
            this.$router.push({ name: "promotion.promotion-content" });
          }
        })
        .catch(fail => {
          this.saving = false;
          this.$alert(fail.response.data.message);
        });
    },
    getAdsTarget() {
      this.$toast.loading();
      let adsId = this.$route.params.id;
      this.$http
        .get("api/v2/alliance/advertiser/add/adstarget/" + adsId)
        .then(data => {
          this.params = data.data.target;
          this.$toast.clear();
        });
    }
  },
  created() {},
  mounted() {
    if (this.$route.params.id) {
      this.getAdsTarget();
      this.title = "编辑文案";
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.weui-cells {
  margin-top: 0;
  .vux-label {
    line-height: 3;
  }
  .vux-label-desc {
    font-size: 12px;
  }
}
/deep/.van-uploader__wrapper {
  margin: 10px;
  justify-content: space-between;
  .van-uploader__preview {
    margin: 10px 0 0;
  }
  .van-uploader__upload {
    margin: 10px 0 10px 0;
  }
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
