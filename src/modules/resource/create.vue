<template>
	<div class="resource">
		<x-header title="添加资源" url=""></x-header>
		<x-cell-group>
			<van-picker
				show-toolbar
				title="类型"
				:columns="columns"
				@change="onChange"
			/>
			<input-cell
				title="资源名称"
				v-model="params.name"
				placeholder="请输入资源名称"
			></input-cell>
			<input-cell
				title="资源规格"
				v-model="params.size"
				placeholder="请输入资源规格"
			></input-cell>
			<van-picker
				show-toolbar
				title="地区"
				:columns="areaList"
				@change="onChange"
			/>
		</x-cell-group>
		<x-cell-group>
			<x-checkbox
				title="资源类型(多选)"
        type="checkbox"
				:data="resource"
				v-model="params.relation_type"
			></x-checkbox>
		</x-cell-group>
		<x-cell-group>
			<x-uploader
        title="群截图"
        desc="点击以下图标上传附件，限传2张"
				v-model="params.attachment"
				:limit="2"
			></x-uploader>
		</x-cell-group>
    <div class="footer">
      <input id="weuiAgree" type="checkbox" v-model="isagree" checked class="weui-agree__checkbox">
      <span class="weui-agree__text">
        <a @click="showAgree" href="javascript:void(0)">我以阅读并同意《群盟服务条款》</a>
      </span>
    </div>
    <agree title="" ref="agree"/>

    <div class="op" @click="next()">
        <x-button type="primary" text="提交审核"></x-button>
    </div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XGroup from "$components/XGroup";
	import XCellGroup from "$components/XCellGroup";
	import RadioCell from "$components/RadioCell";
	import InputCell from "$components/InputCell";
	import InfoCell from "$components/InfoCell";
	import XButton from "$components/XButton";
	import XCheckbox from "$components/XCheckbox"
	import TextCell from "$components/TextCell";
  import XUploader from "$components/XUploader";
  import Agree from "$components/Agree";
	import XPicker from "$components/XPicker";
	import { fail } from 'assert';

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader, XGroup, XCellGroup, RadioCell, InfoCell, InputCell, XButton, XCheckbox,
			"van-picker": XPicker, TextCell, XUploader,Agree
		},
		data () {
			//这里存放数据
			return {
				isagree: false,
				columns: ['微信群', 'QQ群', '自媒体', '网站'],
				areaList: [],
				params: {
					name: '',
					size: '',
					area: '',
					type: '',
					relation_type: '',
					attachment: [],
					desc: ''
				},
				resource: {},
			};
		},
		//监听属性 类似于data概念
		computed: {

		},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onChange (picker, value, index) {
				Toast(`当前值：${value}, 当前索引：${index}`);
			},
			getCategory () {
				this.$http.get('api/v2/alliance/qun/category').then(({ data }) => {
					this.resource = data.category
				});
      },
      next(){

      },
			showAgree () {
				this.$refs.agree.show();
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
			this.getCategory();
		},
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.resource {
		position: relative;

		.screenshot {
			text-align: center;
			font-size: 0.6rem;
			color: #000;
			padding: 5px 5px;
		}
    .footer{
      font-size: 12px;
      text-align: center;
      color: #676767;
      padding: 50px 0px 10px 0px;
    }
    .op a{
      width: 75%;
      height: 50px;
      line-height: 50px;
      margin-left: 50px;
      font-size: 14px;
      border-radius: 60px;
    }
	}
</style>