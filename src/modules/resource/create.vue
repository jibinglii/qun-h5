<template>
	<div class="resource">
		<x-header title="添加资源" url></x-header>
		<x-cell-group>
			<van-field
				readonly
				clickable
				label="类型"
				:value="value"
				placeholder="请选择..."
				@click="showPicker = true"
			/>
			<van-popup v-model="showPicker" position="bottom">
				<van-picker
					show-toolbar
					:columns="columns"
					@cancel="showPicker = false"
					@confirm="onConfirm"
				/>
			</van-popup>
			<van-field
				label="名称"
				v-model="params.name"
				placeholder="请输入资源名称"
			></van-field>
			<van-field
				label="规格"
				v-model="params.size"
				placeholder="如群人数/粉丝数/日访问量"
			></van-field>
			<van-field
				readonly
				clickable
				label="区域"
				:value="areaValue"
				placeholder="选择区域"
				@click="showArea = true"
			/>
			<van-popup v-model="showArea" position="bottom">
				<van-area
					:area-list="areaList"
					:columns-num="2"
					@confirm="onConfirmArea"
				/>
			</van-popup>
		</x-cell-group>
		<x-cell-group>
			<x-checkbox
				title="资源类型"
				type="radio"
				:data="resource"
				v-model="params.category"
			></x-checkbox>
		</x-cell-group>
		<x-cell-group>
			<van-field
				v-model="params.desc"
				label="资源描述"
				type="textarea"
				placeholder="请简单描述资源"
				rows="3"
				autosize
			/>
		</x-cell-group>
		<x-cell-group>
			<van-switch-cell v-model="checked" title="是否同意入群" @change="onChange" />
		</x-cell-group>
		<x-cell-group>
			<x-uploader
				title="资源截图"
				v-model="params.attachment"
				:limit="2"
			></x-uploader>
		</x-cell-group>
		<div class="op" @click="next()">
			<x-button type="primary" text="提交审核"></x-button>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XCellGroup from "$components/XCellGroup";
	import XButton from "$components/XButton";
	import XCheckbox from "$components/XCheckbox";
	import TextCell from "$components/TextCell";
	import XUploader from "$components/XUploader";
	import { fail } from "assert";
	import Area from "vant/lib/area";
	import "vant/lib/area/style";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import Popup from "vant/lib/popup";
	import "vant/lib/popup/style";
	import Picker from "vant/lib/picker";
	import "vant/lib/picker/style";
	import AreaList from "../../api/area";
	import SwitchCell from 'vant/lib/switch-cell';
	import "vant/lib/switch-cell/style";

	import * as services from "$modules/resource/services";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCellGroup,
			XButton,
			XCheckbox,
			"van-field": Field,
			"van-popup": Popup,
			"van-picker": Picker,
			"van-area": Area,
			"van-switch-cell": SwitchCell,
			TextCell,
			XUploader
		},
		data () {
			//这里存放数据
			return {
				value: "",
				showPicker: false,
				columns: ["微信群", "QQ群", "自媒体", "网站"],
				areaValue: "",
				showArea: false,
				areaList: AreaList,
				params: {
					name: "",
					size: "",
					area_id: "",
					type: "",
					category: 0,
					attachment: [],
          desc: "",
          is_open:0,
				},
				resource: {},
				upResource: 102,
				checked: false,
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onConfirm (value, index) {
				this.value = value;
				this.params.type = index;
				this.showPicker = false;
			},
			onConfirmArea (value) {
				let _value = "";
				value.map(function (item, index) {
					_value += item.name + " ";
				});
				this.areaValue = _value;
				this.params.area_id = _value;
				this.showArea = false;
			},
			getCategory () {
				this.$http.get("api/v2/alliance/qun/category").then(({ data }) => {
					this.resource = data.category;
				});
			},
			getResource () {
				if (this.$route.params.id != 0) {
					this.$toast.loading();
					this.$http
						.get("api/v2/alliance/resources/add/" + this.$route.params.id)
						.then(({ data }) => {
							this.upResource = data.resource;
							this.value = this.columns[this.upResource.type];
							this.areaValue = this.upResource.area_id;
							this.params = this.upResource;
							this.$toast.clear();
						});
				}
			},
			next () {
				let url = "api/v2/alliance/resources/add";
				if (this.$route.params.id != 0) {
					url = "api/v2/alliance/resources/add/" + this.$route.params.id;
				}
        this.$toast.loading("资源保存中");
				this.$http
					.post(url, this.params)
					.then(data => {
						this.$toast.clear();
						if (data.code == 200) {
							this.$router.push({ name: "resources" });
						}
					})
					.catch(fail => {
						this.$toast.loading(fail.response.data.message);
					});
			},
			onChange (checked) {
				this.$confirm({
					title: '提醒',
					content: '已同意入群'
				}).then(() => {
          this.checked = checked;
          this.params.is_open = 1;
				}).catch(fail=>{
          this.checked = false;
        })
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () { },
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
			this.getCategory();
			if (this.$route.params.id != 0) {
				this.getResource();
      }
		}
	};
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
		.footer {
			font-size: 12px;
			text-align: center;
			color: #676767;
			padding: 50px 0px 10px 0px;
		}
		.op {
			width: 90%;
			margin: 20px auto;
		}
		.op a {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			border-radius: 6px;
		}
	}
</style>