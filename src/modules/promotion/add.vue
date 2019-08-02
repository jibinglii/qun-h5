<template>
	<div class="resource">
		<x-header title="添加推广计划" url></x-header>
		<x-cell-group>
			<router-link :to="{ name: 'promotion.addevent' }">
				<x-cell title="选择推广内容" is-link v-model="targetId" />
			</router-link>
		</x-cell-group>
		<x-cell-group>
			<van-field label="标题" v-model="params.title" placeholder="请输入标题" />
			<van-field
				readonly
				clickable
				label="投放种类"
				:value="value"
				placeholder="选择类型"
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
				readonly
				clickable
				label="投放区域"
				:value="areaValue"
				placeholder="选择区域"
				@click="showArea = true"
			/>
			<van-popup v-model="showArea" position="bottom">
				<van-area
					:area-list="areaList"
					:columns-num="3"
					@confirm="onConfirmArea"
				/>
			</van-popup>
		</x-cell-group>
		<x-cell-group title="投放行业(多选)">
			<x-checkbox
				type="radio"
				:data="resource"
				v-model="params.show_category"
			></x-checkbox>
		</x-cell-group>
		<x-cell-group title="投放群数量" class="groups">
			<van-field v-model="params.show_num" />
			<p>群数量</p>
		</x-cell-group>
		<x-cell-group title="价格设置">
			<div class="price">
				<div class="interval">
					<van-field label="投放价格" v-model="params.min_show_price" />至
					<van-field v-model="params.max_show_price" />元/个
				</div>
				<p>建议价格：1个/1元~1个/10元</p>
			</div>
			<div class="price">
				<div class="interval">
					<van-field label="点击价格" v-model="params.min_click_price" />至
					<van-field v-model="params.max_click_price" />元/个
				</div>
				<p>建议价格：1个/1元~1个/10元</p>
			</div>
			<div class="price">
				<div class="interval">
					<van-field label="推广预算" v-model="params.budget" />
				</div>
				<p>预算不能低于500元</p>
			</div>
			<van-popup v-model="showPicker" position="bottom">
				<van-picker
					show-toolbar
					:columns="columns"
					@cancel="showPicker = false"
					@confirm="onConfirm"
				/>
			</van-popup>
		</x-cell-group>
		<x-cell-group title="投放期限">
			<x-checkbox
				type="radio"
				:data="limits"
				v-model="params.duration"
			></x-checkbox>
		</x-cell-group>
		<div class="op" @click="next()">
			<x-button type="primary" text="提交审核"></x-button>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XCellGroup from "$components/XCellGroup";
	import XCell from "$components/XCell";
	import XButton from "$components/XButton";
	import XCheckbox from "$components/XCheckbox";
	import TextCell from "$components/TextCell";
	import XUploader from "$components/XUploader";
	import Agree from "$components/Agree";
	import { fail } from "assert";
	import Area from "vant/lib/area";
	import "vant/lib/area/style";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import Popup from "vant/lib/popup";
	import "vant/lib/popup/style";
	import Picker from "vant/lib/picker";
	import "vant/lib/picker/style";
	import Switch from "vant/lib/switch";
	import "vant/lib/switch/style";
	import AreaList from "../../api/area";

	import * as services from "$modules/resource/services";
	import { constants } from 'crypto';

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCellGroup,
			XCell,
			XButton,
			XCheckbox,
			"van-field": Field,
			"van-popup": Popup,
			"van-picker": Picker,
			"van-area": Area,
			"van-switch": Switch,
			TextCell,
			Agree
		},
		data () {
			//这里存放数据
			return {
				value: "",
				showPicker: false,
				checked: false,
				columns: ["微信群", "QQ群", "自媒体", "网站"],
				areaValue: "",
				showArea: false,
				areaList: AreaList,
				params: {
					title: '',
					show_num: 0,
					show_type: '',
					show_category: '',
					show_area_id: "",
					min_show_price: '',
					max_show_price: '',
					min_click_price: '',
					max_click_price: '',
					duration: '',
					budget: '',
				},
				resource: {},
        limits: { 0: '3天', 1: '1周', 2: '1月', 3: '长期' },
        targetId:this.$route.params.id,
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
				this.params.show_type = index;
				this.showPicker = false;
			},
			onConfirmArea (value) {
				let _value = "";
				value.map(function (item, index) {
					_value += item.name + " ";
				});
				this.areaValue = _value;
				this.params.show_area_id = _value;
				this.showArea = false;
			},
			onInput (checked) {
				this.$alert('是否立即执行？'
				).then(() => {
					this.checked = checked;
				});
			},
			getCategory () {
				this.$http.get("api/v2/alliance/qun/category").then(({ data }) => {
					this.resource = data.category;
				});
			},
			next () {
        if(this.targetId == ''){
            this.$alert('请选择文案');
            return false;
        }else{
          this.params.ads_target_id = this.targetId
        }
				this.$http.post('api/v2/alliance/advertiser/add/task', this.params).then(data => {
					if (data.code == 200) {
						this.$alert(data.message);
					}
				}).catch(fial => {
					this.$alert(fial.response.data.message)
				})
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () { },
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
      this.getCategory();
		}
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.resource {
		position: relative;
		.op {
			width: 90%;
			margin: 30px auto;
		}
		.op a {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			border-radius: 0px;
		}
	}
	/deep/.groups {
		.van-field__control {
			text-align: center;
			font-size: 30px;
			width: 40%;
			margin: 20px auto 0;
		}
		.van-cell:not(:last-child)::after {
			position: absolute;
			box-sizing: border-box;
			content: " ";
			pointer-events: none;
			right: 0;
			bottom: 0;
			left: 40%;
			border-bottom: 1px solid #000;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			width: 20%;
		}
		p {
			text-align: center;
			padding: 10px 0 30px 0;
		}
	}
	.price {
		padding: 10px 0;
		.interval {
			display: flex;
			align-items: center;
			/deep/.van-cell {
				width: inherit;
				line-height: 40px;
				.van-field__control {
					width: 75px;
					height: 40px;
					text-align: center;
					background: #f2f2f2;
				}
			}

			.van-cell:not(:last-child)::after {
				border: none;
			}
		}
		p {
			padding-left: 103px;
			font-size: 12px;
			color: #999;
		}
	}
	.time {
		display: flex;
		.interval {
			/deep/.van-cell {
				.van-field__control {
					width: 105px;
					font-size: 12px;
				}
			}
		}
	}
	/deep/.vux-label {
		font-weight: 500;
	}
	/deep/.x-spec-input-item {
		width: 20%;
	}
</style>
