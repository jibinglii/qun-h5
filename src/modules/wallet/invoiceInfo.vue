<template>
	<div class>
		<x-header title="收票人信息"></x-header>
		<van-cell-group>
			<van-cell title="发票类型：" is-link>
				<van-dropdown-menu>
					<van-dropdown-item v-model="invoice.type" :options="contents" />
				</van-dropdown-menu>
			</van-cell>
			<van-field
				label="发票内容："
				v-model="invoice.content"
				disabled
				label-width="110px"
			/>
			<van-field
				label="开票金额："
				v-model="invoice.amount"
				label-width="110px"
			/>
			<van-cell title="发票抬头：" is-link>
				<van-dropdown-menu>
					<van-dropdown-item v-model="invoice.type2" :options="contents2" />
				</van-dropdown-menu>
			</van-cell>
			<van-field
				label="单位地址："
				v-model="invoice.address"
				placeholder="请输入单位地址"
				label-width="110px"
			/>
			<van-field
				label="税号："
				v-model="invoice.no"
				placeholder="请输入税号"
				label-width="110px"
			/>
		</van-cell-group>
		<van-cell-group>
			<van-field
				label="收票人姓名："
				v-model="invoice.name"
				placeholder="请输入收票人姓名"
				label-width="110px"
			/>
			<van-field
				label="收票人手机号："
				v-model="invoice.mobile"
				placeholder="请输入收票人手机号"
				label-width="110px"
			/>
			<van-field
				readonly
				clickable
				label="收票人地区："
				:value="areaValue"
				placeholder="选择区域"
				label-width="110px"
				@click="showArea = true"
			/>
			<van-popup v-model="showArea" position="bottom">
				<van-area
					:area-list="areaList"
					:columns-num="3"
					@confirm="onConfirmArea"
				/>
			</van-popup>
			<van-field
				label="详细地址："
				v-model="invoice.postal_address"
				placeholder="请输入详细地址"
				label-width="110px"
			/>
		</van-cell-group>
		<div class="btn">
			<van-button type="primary" hairline size="large" @click="next()"
				>提交</van-button
			>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import "vant/lib/cell/style";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import XCell from "$components/XCell";
	import XCellGroup from "$components/XCellGroup";
	import Button from "vant/lib/button";
	import "vant/lib/button/style";
	import DropdownMenu from "vant/lib/dropdown-menu";
	import "vant/lib/dropdown-menu/style";
	import DropdownItem from "vant/lib/dropdown-item";
	import "vant/lib/dropdown-item/style";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import Area from "vant/lib/area";
	import "vant/lib/area/style";
	import Popup from "vant/lib/popup";
	import "vant/lib/popup/style";
	import Picker from "vant/lib/picker";
	import "vant/lib/picker/style";
	import AreaList from "../../api/area";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCell,
			XCellGroup,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			"van-button": Button,
			"van-dropdown-menu": DropdownMenu,
			"van-dropdown-item": DropdownItem,
			"van-field": Field,
			"van-popup": Popup,
			"van-picker": Picker,
			"van-area": Area
		},
		data () {
			//这里存放数据
			return {
				title: "2019-7-20充值",
				label: "2019-7-20 12:00",
				showPicker: false,
				areaValue: "",
				showArea: false,
				areaList: AreaList,
				invoice: {
					type: "0",
					type2: "0",
					content: "明细",
					address: "",
					no: "",
					name: '',
					mobile: '',
					postal_address: '',
					amount: ''
				},
				contents: [
					{
						value: "0",
						text: "普通发票"
					},
					{
						value: "1",
						text: "专用发票"
					}
				],
				contents2: [
					{
						value: "0",
						text: "单位"
					},
					{
						value: "1",
						text: "餐饮"
					}
				]
			};
		},
		computed: {},
		watch: {},
		methods: {
			onConfirm (value, index) {
				this.value = value;
				this.invoice.type = index;
				this.showPicker = false;
			},
			onConfirmArea (value) {
				let _value = "";
				value.map(function (item, index) {
					_value += item.name + " ";
				});
				this.areaValue = _value;
				this.invoice.postal_address = _value + this.invoice.postal_address;
				this.showArea = false;
			},
			next () {
				this.$http.post('api/v2/alliance/bill/apply', this.invoice).then(data => {
					if (data.code == 200) {
						this.$alert(data.message)
						this.$router.push({ name: 'wallet.invoice' })
					}
				}).catch(fail => {
					this.$alert(fail.response.data.message)
				})
			}
		},
		created () { },
		mounted () { }
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	/deep/.top {
		.weui-cells {
			margin-top: 0;
		}
	}
	.van-cell-group {
		margin-bottom: 10px;
	}
	/deep/.vux-label-desc {
		font-size: 12px;
	}
	/deep/.van-cell__value {
		flex: 2;
		text-align: left;
	}
	/deep/.van-dropdown-menu {
		height: 24px;

		.van-dropdown-menu__item {
			display: inline-block;
		}

		.van-hairline--top-bottom::after {
			border-width: 0px;
		}
		.van-dropdown-menu__title {
			font-size: 15px;
		}
		.van-dropdown-menu__title::after {
			display: none;
		}

		.van-cell__title {
			text-align: left;
			font-weight: normal;
		}
	}
	.van-hairline--top-bottom::after {
		border-width: 0px;
	}
	.btn {
		width: 90%;
		margin: 30px auto;
		.van-button--primary {
			height: 48px;
			line-height: 48px;
			font-size: 14px;
		}
	}
</style>
