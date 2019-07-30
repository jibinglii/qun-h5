<template>
  <div class>
    <x-header title="编辑文案"></x-header>
    <van-cell-group>
      <van-field label="文案标题" v-model="title" placeholder="请输入用户名"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="message" type="textarea" placeholder="请输入文案内容" rows="8" autosize/>
    </van-cell-group>
    <van-cell-group>
      <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
    </van-cell-group>
    <van-cell-group>
      <van-field label="推广链接" v-model="links" placeholder/>
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="save()">保存</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Uploader from "vant/lib/uploader";
import "vant/lib/uploader/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-uploader": Uploader,
    "van-button": Button
  },
  data() {
    //这里存放数据
    return {
      title: "2222",
      message: "",
      links: "",
      fileList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    save() {}
  },
  created() {},
  mounted() {}
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
  width: 90%;
  position: fixed;
  bottom: 30px;
  left: 5%;
  .van-button--primary {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
}
</style>
