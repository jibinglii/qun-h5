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
						<router-link :to="{ name: 'resource.create',params:{id:0} }">
							<img src="/images/me/dianpu.png" alt />
							<label for>添加资源</label>
						</router-link>
					</div>

					<div class="fast-con">
						<router-link :to="{ name: 'brokerage' }">
							<img src="/images/me/account.png" alt />
							<label for>佣金管理</label>
						</router-link>
					</div>

					<div class="fast-con">
						<router-link :to="{ name: 'me.helps' }">
							<img src="/images/me/order.png" alt />
							<label for>我的订单</label>
						</router-link>
					</div>

					<div class="fast-con">
						<router-link :to="{ name: 'me.helps' }">
							<img src="/images/me/help.png" alt />
							<label for>帮助中心</label>
						</router-link>
					</div>
				</div>
			</van-cell>
		</van-cell-group>
		<van-cell-group title="最新任务">
			<van-cell
				v-for="(item, index) in maxNewTask"
				:key="index"
				:title="item.task.title"
				value="去处理"
				:label="item.approval.start_at+'至'+item.approval.close_at"
			/>
		</van-cell-group>
		<van-cell-group title="公共任务">
			<van-cell
				v-for="(item, index) in commonTask"
				:key="index"
				is-link
				:title="item.title"
				:label="item.approval.start_at+'至'+item.approval.close_at"
			/>
		</van-cell-group>
		<infinite-loading @infinite="getTask" spinner="spiral">
			<div slot="no-more">没有更多数据啦...</div>
			<div slot="no-results">没有数据</div>
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
			XHeader, InfiniteLoading
		},
		data () {
			return {
				commonTask: [],
        maxNewTask: [],
        flow:{},
			};
		},
		computed: {},
		created () {
			this.getCommonTask()
		},
		methods: {
      flowInfo(){
          this.$http.get('api/v2/alliance/flow/show').then( data =>{
            this.flow = data.data.data_count
          })
      },
			getCommonTask ($state) {
				this.$http.get('api/v2/alliance/flow/common/task').then(({ data }) => {
					this.commonTask = data.tasks.data
				})
			},
			getTask ($state) {
				this.$http.get("api/v2/alliance/flow/task",
					{ params: { page: this.page, status: -1, include: 'task,approval' } })
					.then(({ data }) => {
						if (data.tasks.data.length > 0) {
							this.maxNewTask.push(...data.tasks.data);
							$state.loaded();
						}
						if (data.tasks.per_page > data.tasks.data.length) {
							$state.complete();
						}
					});
			}
		},
		mounted () {
			if (this.inArray('广告主', this.$store.getters.currentUser.roles)) {
				this.$router.push({ name: 'home.ad' })
      }
      this.flowInfo()
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
