<template>
	<div class="page-home">
		<x-header title="搜瓜群盟" :allowBack="false"></x-header>
		<div class="top_info">
			<div class="top-con">
				<span>10</span>
				<label for>资源数</label>
			</div>
			<div class="top-con">
				<span>10</span>
				<label for>完成任务量</label>
			</div>
			<div class="top-con">
				<span>10</span>
				<label for>佣金金额</label>
			</div>
			<div class="top-con">
				<span>10</span>
				<label for>热度</label>
			</div>
		</div>
		<van-cell-group title="快捷入口">
			<van-cell>
				<div class="fast">
					<div class="fast-con">
						<img src="/images/me/dianpu.png" alt />
						<label for>添加资源</label>
					</div>
					<div class="fast-con">
						<img src="/images/me/account.png" alt />
						<label for>佣金管理</label>
					</div>
					<div class="fast-con">
						<img src="/images/me/order.png" alt />
						<label for>我的订单</label>
					</div>
					<div class="fast-con">
						<img src="/images/me/help.png" alt />
						<label for>帮助中心</label>
					</div>
				</div>
			</van-cell>
		</van-cell-group>
		<van-cell-group title="最新任务">
			<van-cell
				title="【任务】群推广-QQ-西安"
				value="去处理"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				title="【任务】群推广-QQ-西安"
				value="去处理"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				title="【任务】群推广-QQ-西安"
				value="去处理"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				title="【任务】群推广-QQ-西安"
				value="去处理"
				label="2019-07-01至2019-07-03"
			/>
		</van-cell-group>
		<van-cell-group title="公共任务">
			<van-cell
				is-link
				title="【任务】群推广-QQ-西安"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				is-link
				title="【任务】群推广-QQ-西安"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				is-link
				title="【任务】群推广-QQ-西安"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				is-link
				title="【任务】群推广-QQ-西安"
				label="2019-07-01至2019-07-03"
			/>
			<van-cell
				is-link
				title="【任务】群推广-QQ-西安"
				label="2019-07-01至2019-07-03"
			/>
		</van-cell-group>
		<nav-block />
		<tab></tab>
	</div>
</template>

<script>
	import Tab from "$components/Tab";
	import Nav from "$components/Nav";
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import "vant/lib/cell/style";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import { mapGetters } from "vuex";
	import InfiniteLoading from "vue-infinite-loading";
	import Loading from "vant/lib/loading";
	import "vant/lib/loading/style";
	export default {
		name: "home",
		components: {
			Tab,
			"nav-block": Nav,
			"van-cell": Cell,
			"van-cell-group": CellGroup,
			XHeader
		},
		data () {
			return {};
		},
		computed: {},
		created () { },
		methods: {},
		mounted () {
			if (this.$store.getters.currentUser.roles[0] == '广告主') {
				this.$router.push({ name: 'home.ad' })
			}
		}
	};
</script>
<style lang="scss" scoped>
	.page-home {
		position: relative;
		.top_info {
			padding: 0px 0 20px 0;
			background: #3399ff;
			color: #ffffff;
			font-size: 0.7rem;
			.title {
				font-size: 0.8rem;
				line-height: 50px;
				text-align: center;
				border-bottom: solid 1px #4169e1;
			}
			.top-con {
				display: inline-block;
				width: 50%;
				height: 60px;
				padding-top: 20px;
				text-align: center;
				span {
					display: block;
					font-size: 1rem;
				}
				label {
					display: block;
					color: #e0ffff;
				}
			}
		}
		.fast {
			display: flex;
			height: 100px;
			justify-content: center;
			flex-flow: wrap;
			.fast-con {
				flex: 1;
				text-align: center;
				padding-top: 10px;
				img {
					width: 50px;
					height: 50px;
					border: 1px solid #d3d3d3;
					border-radius: 5px;
					margin: 0 auto;
				}
				label {
					display: block;
					width: 70px;
					height: 30px;
					margin: 0 auto;
				}
			}
		}
	}
</style>
