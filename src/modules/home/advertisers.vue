<template>
  <div class="page-box">
    <x-header title="申请成为广告主" :allowBack="false"></x-header>
    <div class="apply">
      <van-cell-group>
        <van-field required v-model="params.nickname" placeholder="请输入您的姓名" />
        <van-field required v-model="params.mobile" placeholder="请输入您的电话" />
        <van-field required v-model="params.wechat" placeholder="请输入您的微信" />
        <van-field required v-model="params.qq" placeholder="请输入您的QQ" />
        <van-field v-model="params.desc" type="textarea" rows="2" autosize placeholder="请输入产品简要描述" />
      </van-cell-group>
    </div>
    <div class="btns">
      <van-button @click="next" type="primary" size="large">提交申请</van-button>
    </div>
    <div class="agree">
      <input id="weuiAgree" type="checkbox" v-model="isagree" checked class="weui-agree__checkbox" />
      <span class="weui-agree__text">
        <a @click="showAgree" href="javascript:void(0)">我以阅读并同意《{{protocolName}}》</a>
      </span>
    </div>
    <agree title ref="agree" :content="protocol" />
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Agree from "$components/Agree";
import { Button, Field, Cell, CellGroup } from "vant";
import protocol from "$api/protocol";

export default {
  components: {
    XHeader,
    Agree,
    "van-button": Button,
    "van-field": Field,
    "van-cell": Cell,
    "van-cell-group": CellGroup
  },
  data() {
    return {
      params:{
        nickname:'',
        mobile:'',
        wechat:'',
        qq:'',
        type: 1,
        desc:'',
      },
      isagree: true,
      protocolName: "群盟服务条款",
      protocolKey: "store_apply",
      protocol: ""
    };
  },
  methods: {
    next() {
      if (!this.isagree) {
        this.$alert("请同意《" + this.protocolName + "》");
      } else {
        this.$toast.loading("保存中");
        let url = "api/v2/alliance/apply";
        this.$http
          .post(url, this.params)
          .then(data => {
            this.$toast.clear();
            if (data.code == 200) {
              this.$router.push({ path: "/apply" });
            }
          })
          .catch(fail => {
            this.$toast.loading(fail.response.data.message);
          });
      }
    },
    showAgree() {
      this.$refs.agree.show();
    },
    getProtocol() {
      protocol.getProtocol(this.protocolKey).then(({ data }) => {
        this.protocol = data.content;
      });
    }
  },
  mounted() {
    this.$parent.hideFab();
    this.getProtocol();
  }
};
</script>
<style lang="scss" scoped>
.page-box {
  position: relative;
  .apply {
    margin: 20px 20px 0px 20px;
    border: solid 1px #d3d3d3;
  }
  .btns {
    margin: 0 20px;
  }
  .agree {
    text-align: center;
    padding: 8px 20px;
    font-size: 0.6rem;
  }
}
</style>
