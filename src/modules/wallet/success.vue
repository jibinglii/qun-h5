<template>
  <div class="success">
    <x-header title="支付成功"></x-header>
    <div class="content">
      <img src="../../assets/images/success.png" alt>
      <p>支付成功</p>
      <span>
        你已支付成功，你的专属营销顾问将在15分钟
        内联系你，请注意接听电话
      </span>
    </div>
    <div class="btn">
      <van-button type="primary" hairline size="large">好的</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Button from "vant/lib/button";
import "vant/lib/button/style";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-button": Button
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.content {
  background: #fff;
  text-align: center;
  font-size: 14px;
  img {
    width: 74px;
    margin: 30px 0 10px 0;
  }
  span {
    padding: 26px 10px;
    display: block;
  }
}
.btn {
      padding: 30px;
}
</style>
