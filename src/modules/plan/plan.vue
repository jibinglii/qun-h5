<template>
	<div class="my-task">
		<x-header title="推广计划管理"></x-header>
		<van-tabs @click="tabClick" v-model="active" color="#191717">
			<van-tab
				v-for="(item, index) in tasksType"
				:key="index"
				:title="item.name"
			>
				<x-cell-group>
					<x-cell v-if="active == 0"
						:title="inner.task.title"
						:inlineDesc="'状态:'+inner.status_label+' 生成时间:'+inner.created_at +' 持续:'+ inner.task.duration+'天'"
						v-for="(inner, index) in plans"
						:key="index"
						:is-link="true"
						v-show="true"
						:router="item.router"
						:routerParams="{ id: inner.id }"
					/>
          <x-cell v-if="active == 1"
						:title="inner.task.title"
						:inlineDesc="inner.start_at"
						v-for="(inner, index) in plans"
						:key="index"
						:is-link="true"
						v-show="true"
						:router="item.router"
						:routerParams="{ id: inner.id }"
					/>
				</x-cell-group>
				<infinite-loading
					:identifier="infiniteId"
					@infinite="infiniteHandler"
					spinner="waveDots"
				>
					<div slot="no-more">没有更多数据啦...</div>
					<div class="no-results" slot="no-results">没有数据</div>
				</infinite-loading>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XCell from "$components/XCell";
	import XGroup from "$components/XGroup";
	import XCellGroup from "$components/XCellGroup";
	import InfiniteLoading from "vue-infinite-loading";
	import { mapGetters } from "vuex";
	import Tab from 'vant/lib/tab';
	import Tabs from 'vant/lib/tabs';
	import 'vant/lib/tab/style';
	import 'vant/lib/tabs/style'

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCell,
			XCellGroup,
			XGroup,
			InfiniteLoading,
			'van-tabs': Tabs,
			'van-tab': Tab,
		},
		data () {
			//这里存放数据
			return {
				active: 0,
				tasksType: [
					{
						name: '进行中',
						router: 'plan.planingdetails'
					},
					{
						name: '未开始',
						router: 'plan.plandetails'
					},
				],
				plans: [],
				page: 1,
				infiniteId: +new Date(),
			}
		},
		//监听属性 类似于data概念
		computed: {
			...mapGetters(['currentUser'])
		},
		//监控data中的数据变化
		watch: {

		},
		//方法集合
		methods: {
			tabClick (name, title) {
				this.active = name;
				this.page = 1;
				this.plans = [],
					this.infiniteId += 1;
			},
			infiniteHandler ($state) {
				let params = { page: this.page, include: 'task',append:'status_label' }
				if (this.active == 1) {
					params = { page: this.page, include: 'task', status: '1' ,append:'status_label' }
					this.url = "plan.plandetails";
				}
				this.$http.get("api/v2/alliance/advertiser/task", { params: params })
					.then(({ data }) => {
						if (data.tasks.data.length > 0) {
							let info = data.tasks.data;
              this.page += 1
							this.plans.push(...info);
							$state.loaded();
						}
						if (data.tasks.per_page > data.tasks.data.length) {
							$state.complete();
						}
					});
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
			let active = this.$route.params.active;
			if (active != undefined) this.active = active;
		}
	}

</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	/deep/.vux-label-desc {
		font-size: 12px;
	}
</style>
