<template>
  <div class="page-box">
    <x-header title="搜瓜群盟" :allowBack="false"></x-header>
    <div class="desc" v-show="!waiting">
      <i class="weui-icon-info weui-icon_msg"></i>
      <div class="con">
        欢迎使用搜瓜群盟
      </div>
      <van-button @click="$router.push({ path: '/apply/advertisers'})" type="primary" size="large">申请成为广告主</van-button>
    </div>
    <div class="desc" v-show="waiting">
      <i class="weui-icon-waiting weui-icon_msg"></i>
      <div class="con">
        您的申请已提交<br />请等待商务人员与您联系！
      </div>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import { Button } from "vant";

export default {
  components: {
    XHeader,
    "van-button" : Button
  },
  data(){
    return{
      waiting: false
    }
  },
  mounted() {
    this.$parent.hideFab();
  }
};
</script>
<style lang="scss" scoped>
.page-box {
  position: relative;
  .desc{
    text-align: center;
    padding:50px 20px;
    .con{
      font-size: .8rem;
      padding:20px 0;
    }
  }
}
</style>
