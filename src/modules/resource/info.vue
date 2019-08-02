<template>
  <div class="resource-info">
    <x-header title="资源详情" url></x-header>
    <x-cell-group>
      <info-cell title="资源名称">{{ resourceInfo.name }}</info-cell>
      <info-cell title="规格">{{ resourceInfo.size }}</info-cell>
      <info-cell title="分类">{{ resourceInfo.type_label }}</info-cell>
      <info-cell title="资源类型">{{ resourceInfo.category_label }}</info-cell>
      <info-cell title="地区">{{ resourceInfo.area_id }}</info-cell>
      <info-cell title="描述">{{ resourceInfo.desc }}</info-cell>
      <info-cell title="附件"><div @click="preview()">点击查看</div></info-cell>
    </x-cell-group>
    <div class="op" @click="$router.push({ name: 'resource.create',params:{id:resourceInfo.id} })">
      <x-button type="primary" text="更新资源"></x-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import InfoCell from "$components/InfoCell";
import XGroup from "$components/XGroup";
import XCellGroup from "$components/XCellGroup";
import XButton from "$components/XButton";
import ImagePreview from 'vant/lib/image-preview'
import 'vant/lib/image-preview/style'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    InfoCell,
    XCellGroup,
    XGroup,
	XButton,
	ImagePreview
  },
  data() {
    //这里存放数据
    return {
      resourceInfo: {},
      userName: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getInfo() {
	  this.$toast.loading()
      let res_id = this.$route.params.id;
      this.$http
        .get("api/v2/alliance/resources/info", {
          params: {
            id: res_id,
            include: "user",
            append: "type_label,category_label"
          }
        })
        .then(({ data }) => {
		  this.resourceInfo = data.resource;
		  console.log(this.resourceInfo.id);
		  this.userName = data.resource.user.nickname;
		  this.$toast.clear();
        });
	},
	preview(){
		ImagePreview(this.resourceInfo.attachment)
	}
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getInfo();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.resource-info {
  position: relative;
  .op {
    width: 90%;
    margin: 0 auto;
  }
  .op a {
    height: 50px;
    line-height: 50px;
    margin-top: 40px;
    font-size: 14px;
    border-radius: 60px;
  }
}
</style>