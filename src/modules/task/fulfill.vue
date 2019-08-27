<template>
	<div class="fulfill">
		<x-header title="详情"></x-header>
		<van-cell-group title="任务概览">
			<div class="info">
				<div class="info-type">
					<label for>订单名称</label>
					<span>{{ showInfo.title }}</span>
				</div>
				<div class="info-type">
					<label for>价格</label>
					<span>￥{{ showInfo.price }}</span>
				</div>
				<div class="info-type">
					<label for>规格</label>
					<span>{{ showInfo.size }}</span>
				</div>
				<div class="info-type"></div>
			</div>
		</van-cell-group>
		<van-cell-group title="入群二维码">
			<van-image width="100" height="100" :src="showInfo.ads_code" />
		</van-cell-group>
		<van-cell-group title="完成任务">
			<x-uploader
				title="上传投放凭证"
				v-model="fileList"
				:limit="2"
			></x-uploader>
		</van-cell-group>
		<div class="btns">
			<van-button type="primary" size="large" @click="upProof()"
				>提交投放凭证</van-button
			>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell/style";
	import "vant/lib/cell-group/style";
	import XUploader from "$components/XUploader";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import Button from "vant/lib/button";
	import Image from "vant/lib/image";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			"van-cell": Cell,
			"van-cell-group": CellGroup,
			"van-field": Field,
			"van-button": Button,
			"van-image": Image,
			XUploader
		},
		data () {
			//这里存放数据
			return {
				fileList: [],
				showInfo: {
					title: '',
					price: '0.0',
					size: '0'
				}
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			upProof () {
				let id = this.$route.params.id
				this.$http.post('api/v2/alliance/fulfill/' + id, { attachment: this.fileList })
					.then(data => {
						if (data.code = 200) {
							this.$alert('已提交,请等待处理')
							this.$router.push({ name: 'task.shop' })
						}
					})
					.catch(fail => {
						this.$alert(fail.data.message)
					})
			},
			info () {
				let id = this.$route.params.id
				this.$http.get('api/v2/alliance/shop/info/' + id).then(data => {
					this.showInfo = data.data.order
				})
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
			this.info()
		},
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.fulfill {
		position: relative;
		.info {
			height: 80px;
			padding: 10px;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.info-type {
				flex: 1;
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
			padding: 10px;
		}
		/deep/.van-image {
			margin: 2px;
			padding: 2px;
		}
		/deep/.van-image__error {
			margin: 2px;
			padding: 2px;
		}
	}
</style>