<template>
	<div class="my-task">
		<x-header title="推广计划管理"></x-header>
		<div v-if="isShow">
			<x-cell-group title="进行中">
				<x-cell
					:title="inner.task.title"
					:inlineDesc="inner.start_at + '至' + inner.close_at"
					v-for="(inner, index) in plans"
					:key="index"
					:is-link="true"
					v-show="true"
					router="plan.planingdetails"
					:routerParams="{ id: inner.id }"
				/>
			</x-cell-group>
			<infinite-loading @infinite="infiniteHandler" spinner="spiral">
				<div slot="no-more">没有更多数据啦...</div>
				<div slot="no-results">没有数据</div>
			</infinite-loading>
		</div>
		<div v-if="isShow2">
			<x-cell-group title="未开始">
				<x-cell
					:title="inner.task.title"
					:inlineDesc="inner.start_at + '至' + inner.close_at"
					v-for="(inner, index) in plans2"
					:key="index"
					:is-link="true"
					v-show="true"
					router="plan.plandetails"
					:routerParams="{ id: inner.task.id }"
				/>
			</x-cell-group>
			<infinite-loading @infinite="infiniteHandler2" spinner="spiral">
				<div slot="no-more">没有更多数据啦...</div>
				<div slot="no-results">没有数据</div>
			</infinite-loading>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XCell from "$components/XCell";
	import XGroup from "$components/XGroup";
	import XCellGroup from "$components/XCellGroup";
	import InfiniteLoading from "vue-infinite-loading";
	import { mapGetters } from "vuex";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCell,
			XCellGroup,
			XGroup,
			InfiniteLoading
		},
		data () {
			//这里存放数据
			return {
				plans: [],
				plans2: [],
				isShow: true,
				isShow2: true,
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
			infiniteHandler ($state) {
				this.$http.get("api/v2/alliance/advertiser/task",
					{ params: { page: this.page, include: 'task' } })
					.then(({ data }) => {
						if (data.tasks.data.length > 0) {
							this.page += 1
							this.plans.push(...data.tasks.data);
							$state.loaded();
						} else {
							//this.isShow = false
						}
						if (data.tasks.per_page > data.tasks.data.length) {
							$state.complete();
						}
					});
			},
			infiniteHandler2 ($state) {
				this.$http.get("api/v2/alliance/advertiser/task",
					{ params: { page: this.page, status: '1', include: 'task' } })
					.then(({ data }) => {
						if (data.tasks.data.length > 0) {
							this.page += 1
							this.plans2.push(...data.tasks.data);
							$state.loaded();
						} else {
							//this.isShow2 = false
						}
						if (data.tasks.per_page > data.tasks.data.length) {
							$state.complete();
						}
					});
			},
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {

		}
	}

</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	/deep/.vux-label-desc {
		font-size: 12px;
	}
</style>
