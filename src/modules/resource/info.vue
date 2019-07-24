<template>
	<div class="resource-info">
		<x-header title="资源详情" url=""></x-header>
		<x-cell-group>
			<info-cell title="资源名称">在线发货</info-cell>
			<info-cell title="规格">在线发货</info-cell>
			<info-cell title="分类">在线发货</info-cell>
			<info-cell title="资源类型">在线发货</info-cell>
			<info-cell title="地区">在线发货</info-cell>
			<info-cell title="所属用户">在线发货</info-cell>
		</x-cell-group>
		<div class="op" @click="$router.push({ name: 'resource.create' })">
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
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader, InfoCell, XCellGroup, XGroup, XButton
		},
		data () {
			//这里存放数据
			return {

			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
      getInfo(){
        this.$http.get('').then(({data})=>{

        });
      }
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {

		},
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.resource-info {
		position: relative;
		.op a { 
			width: 75%;
			height: 50px;
			line-height: 50px;
      margin-top: 40px;
			margin-left: 50px;
			font-size: 14px;
			border-radius: 60px;
		}
	}
</style>