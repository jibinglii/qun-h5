<template>
	<div class>
		<x-header title="发票服务"></x-header>
		<van-cell-group>
			<van-cell class="tips">
				<h4>温馨提示：</h4>
				<p>一、发票换开：</p>
				<p>1、订单完成后一年内可支持换开发票一次。</p>
				<p>2、不支持“企业抬头”变更。</p>
				<p>二、补开发票规则：</p>
				<p>
					1、增值税普通发票订单完成后1年内可补开发票，增值税专用发票订单完成10天后，1年内可以补开发票。
				</p>
			</van-cell>
		</van-cell-group>
		<x-cell-group title="开票记录">
			<x-cell
				v-for="(item, index) in list"
				:key="index"
				:is-link="false"
				:title="item.bill.name"
				:value="'￥'+item.amount"
				:inlineDesc="item.bill.mobile + '/' + item.created_at"
			>
			</x-cell>
		</x-cell-group>
		<infinite-loading @infinite="getBillrecord" spinner="spiral">
			<div slot="no-more">没有更多数据啦...</div>
			<div slot="no-results">没有数据</div>
		</infinite-loading>
		<div class="op" @click="apply()">
			<x-button type="primary" text="开票申请"></x-button>
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
	import XButton from "$components/XButton";
	import InfiniteLoading from "vue-infinite-loading";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			XButton,
			XCell,
			XCellGroup,
			InfiniteLoading
		},
		data () {
			//这里存放数据
			return {
				list: [],
				page: 1,
			};
		},
		computed: {},
		watch: {},
		methods: {
			apply () {
				this.$router.push({
					name: 'wallet.invoiceinfo'
				})
			},
			getBillrecord ($state) {
				this.$http.get('api/v2/alliance/bill/record', { params: { include: 'bill' } }).then(({ data }) => {
					if (data.bills.data.length > 0) {
						this.page += 1
						this.list.push(...data.bills.data)
						$state.loaded()
					}
					if (data.bills.per_page > data.bills.data.length) {
						$state.complete();
					}
				})
			}
		},
		created () { },
		mounted () { }
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.tips {
		p {
			color: #999;
			font-size: 12px;
		}
	}
	.op {
		width: 90%;
		margin: 0 auto;
	}
	.op a {
		height: 50px;
		line-height: 50px;
		font-size: 14px;
	}
</style>
