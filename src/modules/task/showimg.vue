<template>
	<div class="show_img">
		<van-image width="100%" height="100%" :src="imgs.thumb" />
	</div>
</template>

<script>
	import Image from 'vant/lib/image'
	import 'vant/lib/image/style'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			'van-image': Image
		},
		data () {
			//这里存放数据
			return {
				imgs: {}
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {

		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
			this.imgs = this.$route.params
		}
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
  .show_img{
    position: relative;
    margin: 55px 0;
  }
</style>