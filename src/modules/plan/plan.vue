<template>
	<div class="my-task">
		<x-header title="推广计划管理"></x-header>
		<x-cell-group
			v-for="(item, index) in plans"
			:key="index"
			:title="item.approval.str_status"
			v-show="true"
		>
			<x-cell
				:title="inner.title"
				:inlineDesc="inner.approval.start_at + '至' + inner.approval.close_at"
				v-for="(inner, index) in plans"
				:key="index"
				:is-link="true"
				:link="'/plan/plandetails/' + inner.id"
				v-show="true"
			/>
		</x-cell-group>
		<infinite-loading @infinite="infiniteHandler" spinner="spiral">
			<div slot="no-more">没有更多数据啦...</div>
			<div slot="no-results">没有数据</div>
		</infinite-loading>
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
			}
		},
		//监听属性 类似于data概念
		computed: {
			...mapGetters(['currentUser'])
		},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			infiniteHandler ($state) {
				let user_id = this.$store.getters.currentUser.id
				this.$http.get("api/v2/alliance/advertiser/task/" + user_id,
					{ params: { page: this.page, include: 'approval' } })
					.then(({ data }) => {
						if (data.tasks.data.length > 0) {
							this.page += 1;
							this.plans.push(...data.tasks.data);
							$state.loaded();
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
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	/deep/.vux-label-desc {
		font-size: 12px;
	}
</style>
