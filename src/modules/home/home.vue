<template>
	<div class="page-home">
		<x-header title="搜瓜群盟" :allowBack="false"></x-header>
		<div class="top_info">
			<div class="top-con">
				<span>{{ flow.resource_count }}</span>
				<label for>资源数</label>
			</div>
			<div class="top-con">
				<span>{{ flow.task }}</span>
				<label for>完成任务量</label>
			</div>
			<div class="top-con">
				<span>{{ flow.money }}</span>
				<label for>佣金金额</label>
			</div>
			<div class="top-con">
				<span>{{ flow.hot }}</span>
				<label for>热度</label>
			</div>
		</div>
		<van-cell-group title="快捷入口">
			<van-cell>
				<div class="fast">
					<div class="fast-con">
						<router-link :to="{ name: 'resource.create', params: { id: 0 } }">
							<img src="/images/me/dianpu.png" alt />
							<label for>添加资源</label>
						</router-link>
					</div>

					<div class="fast-con">
						<router-link :to="{ name: 'task.tasks' }">
							<img src="/images/me/order.png" alt />
							<label for>我的任务</label>
						</router-link>
					</div>
					<div class="fast-con">
						<router-link :to="{ name: 'task.shop' }">
							<img src="/images/me/help.png" alt />
							<label for>高级群任务</label>
						</router-link>
					</div>
					<div class="fast-con">
						<router-link :to="{ name: 'me.settlemanage' }">
							<img src="/images/me/account.png" alt />
							<label for>佣金管理</label>
						</router-link>
					</div>
				</div>
			</van-cell>
		</van-cell-group>
		<van-cell-group title="最新任务">
			<van-loading v-show="maxNewTask.length == 0" class="loading" size="24px"
				>加载中...</van-loading
			>
			<van-cell
				v-for="(item, index) in maxNewTask"
				:key="index"
				is-link
				:title="item.task.title"
				value="去处理"
				:label="item.created_at"
				:to="{ name: 'task.info', params: { id: item.id } }"
			/>
		</van-cell-group>
		<van-cell-group title="公共任务">
			<van-cell
				v-for="(item, index) in commonTask"
				:key="index"
				is-link
				:title="item.task.title"
				:label="item.approval.start_at + '至' + item.approval.close_at"
				:to="{ name: 'task.info', params: { id: item.id } }"
			/>
		</van-cell-group>
		<infinite-loading @infinite="getCommonTask" spinner="waveDots">
			<div slot="no-more">没有更多数据啦...</div>
			<div class="no-results" slot="no-results">没有数据</div>
		</infinite-loading>
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
			"van-loading": Loading,
			XHeader,
			InfiniteLoading
		},
		data () {
			return {
				commonTask: [],
				maxNewTask: [],
				flow: {
					resource_count: 0,
					task: 0,
					money: 0,
					hot: 0
				}
			};
		},
		computed: {},
		methods: {
			flowInfo () {
				this.$http.get("api/v2/alliance/flow/show").then(data => {
					this.flow = data.data.data_count;
				});
			},
			getCommonTask ($state) {
				//公共任务
				this.$http.get("api/v2/alliance/flow/common/task").then(({ data }) => {
					if (data.tasks.data.length > 0) {
						this.page += 1
						this.commonTask = data.tasks.data;
						$state.loaded();
					}
					if (data.tasks.per_page > data.tasks.data.length) {
						$state.complete();
					}
				});
			},
			getTask ($state) {
				//最新任务
				this.$http
					.get("api/v2/alliance/flow/task", {
						params: { page: 1, status: -1, include: "task,approval" }
					})
					.then(({ data }) => {
						this.maxNewTask.push(...data.tasks.data);
					});
			}
		},
		created () {
			this.flowInfo();
			this.getTask();
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
		.loading {
			text-align: center;
			line-height: 50px;
		}
	}
</style>
