<template>
	<div class>
		<x-header title="财务管理"></x-header>
		<van-cell-group>
			<div class="top">
				<div class="content">
					<span>
						<b>{{ amount }}</b> 元
					</span>
					<label>账户余额</label>
				</div>
			</div>
			<div class="wallet">
				<router-link :to="{ name: 'wallet.recharge' }" class="left">
					<van-icon name="passed" />充值
				</router-link>
				<router-link :to="{ name: 'wallet.invoice' }" class="right">
					<van-icon name="label-o" />发票服务
				</router-link>
			</div>
		</van-cell-group>
		<van-cell-group class="tabs">
			<van-tabs @click="tabClick" v-model="active">
				<van-tab v-for="(item, index) in tabs" :key="index" :title="item.title">
					<van-cell-group>
						<van-cell
							v-for="(item, index) in list"
							:key="index"
							:title="item.title"
							:value="'￥' + item.amount"
							:label="'交易时间：' + item.created_at"
						/>
					</van-cell-group>
					<infinite-loading
						:identifier="infiniteId"
						@infinite="infiniteHandler"
						spinner="waveDots"
					>
						<div slot="no-more">没有更多数据啦...</div>
						<div slot="no-results">没有数据</div>
					</infinite-loading>
				</van-tab>
			</van-tabs>
		</van-cell-group>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import "vant/lib/cell/style";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import Icon from "vant/lib/icon";
	import "vant/lib/icon/style";
	import Tab from "vant/lib/tab";
	import "vant/lib/tab/style";
	import Tabs from "vant/lib/tabs";
	import "vant/lib/tabs/style";
	import InfiniteLoading from "vue-infinite-loading";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			"van-icon": Icon,
			"van-tab": Tab,
			"van-tabs": Tabs,
			InfiniteLoading
		},
		data () {
			//这里存放数据
			return {
				active: 0,
				amount: "0.00",
				tabs: [
					{
						title: "订单管理"
					},
					{
						title: "充值记录"
					}
				],
				list: [],
				page: 1,
				infiniteId: +new Date(),
			};
		},
		computed: {},
		watch: {

		},
		methods: {
			tabClick (name, title) {
				this.active = name;
				this.page = 1;
				this.list = [];
				this.infiniteId += 1;
			},
			infiniteHandler ($state) {
				if (this.active == 0) {
					this.getOrder($state)
				} else {
					this.getRecharge($state);
				}
			},
			getRecharge ($state) {
				this.$http.get('api/v2/alliance/advertiser/recharge').then(({ data }) => {
					if (data.recharge.data.length > 0) {
						this.page += 1;
						if (this.active == 1) {
							this.list.push(...data.recharge.data)
						}
						$state.loaded();
					}
					if (data.recharge.per_page > data.recharge.data.length) {
						$state.complete();
					}
				})
			},
			getOrder ($state) {
				this.$http.get('api/v2/alliance/order').then(({ data }) => {
					if (data.order.data.length > 0) {
						this.page += 1;
						this.list.push(...data.order.data)
						$state.loaded();
					}
					if (data.order.per_page > data.order.data.length) {
						$state.complete();
					}
				})
			}
		},
		created () { },
		mounted () {
			this.$http.get('api/v2/alliance/advertiser/recharge').then(({ data }) => {
				this.amount = data.total_amount
			})
		}
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.top {
		display: flex;
		height: 160px;
		justify-content: space-around;
		align-items: center;
		.content {
			text-align: center;
			color: #666;
			label {
				display: block;
				margin: 0 auto;
				font-size: 14px;
				text-align: center;
			}
			span {
				display: block;
				font-size: 0.8rem;
				text-align: center;
				line-height: 60px;
				b {
					font-size: 1.4rem;
				}
			}
		}
	}
	.wallet {
		display: flex;
		align-items: center;
		border-top: solid 1px #f2f2f2;
		.left,
		.right {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			padding: 20px 0;
			position: relative;
			font-size: 14px;
			/deep/.van-icon {
				font-size: 18px;
				padding-right: 10px;
			}
		}
		.left::after {
			content: "";
			position: absolute;
			right: 0px;
			width: 1px;
			height: 34px;
			border-right: solid 1px #f2f2f2;
		}
	}
	.tabs {
		margin-top: 10px;
	}
	/deep/.van-tabs__line {
		background: #000;
		height: 1px;
	}
	.show {
		display: none;
	}
</style>
