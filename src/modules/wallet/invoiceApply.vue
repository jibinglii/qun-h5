<template>
	<div class>
		<x-header title="申请开票"></x-header>
		<van-cell-group title="发票信息">
			<van-cell title="单位名称" :value="billInfo.bill.company" />
			<van-cell title="可申请金额" :value="'￥'+billInfo.apply_amount" />
		</van-cell-group>
		<van-cell-group title="申请信息">
			<van-field
				label="开票金额"
				input-align="right"
				v-model="invoice.amount"
				placeholder="请输入开票金额"
			/>
		</van-cell-group>
		<div class="btn">
			<van-button type="primary" hairline size="large" @click="next()"
				>提交申请</van-button
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
	import Button from "vant/lib/button";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			"van-button": Button,
			"van-field": Field
		},
		data () {
			//这里存放数据
			return {
        billInfo:{},
				invoice: {
					amount: "",
					bill_id: ""
				}
			};
		},
		computed: {},
		watch: {},
		methods: {
			getBillInfo () {
				this.$http.get('api/v2/alliance/billing').then(data => {
					this.billInfo = data.data.record
				})
			},
      next () {//提交开票信息
        if(this.billInfo.apply_amount <= 0 && this.invoice.amount <= 0){
          this.$alert('暂无法开票')
          return false
        }
        this.$toast.loading();
        this.invoice.bill_id = billInfo.bill.id
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
		mounted () {
			this.getBillInfo()
		}
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
