<template>
	<div class="my-task">
		<x-header title="我的计划"></x-header>
		<van-tabs @click="tabClick" v-model="active" color="#191717">
			<van-tab
				v-for="(item, index) in statusTypes"
				:key="index"
				:title="item.title"
			>
				<x-cell-group>
					<x-cell
						v-for="(item, index) in myTasks"
						:key="index"
						:is-link="true"
						:title="item.title"
						:inlineDesc="
							item.show_type_label +
								'/' +
								item.show_area_id +
								'/' +
								item.show_category_label
						"
						:value="item.approval.str_status"
						:link="'/task/info/' + item.id"
					></x-cell>
				</x-cell-group>
			</van-tab>
		</van-tabs>
		<infinite-loading
			:identifier="infiniteId"
			@infinite="infiniteHandler"
			spinner="spiral"
		>
			<div slot="no-more">没有更多数据啦...</div>
			<div slot="no-results">没有数据</div>
		</infinite-loading>
	</div>
</template>

<script>
	import XHeader from '$components/XHeader';
	import XCell from "$components/XCell";
	import XGroup from "$components/XGroup";
	import XCellGroup from "$components/XCellGroup";
	import XButton from "$components/XButton";
	import Tab from 'vant/lib/tab';
	import Tabs from 'vant/lib/tabs';
	import 'vant/lib/tab/style';
	import 'vant/lib/tabs/style'
	import InfiniteLoading from "vue-infinite-loading";
	import { mapGetters } from "vuex";


	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader, XCell, XCellGroup,
			'van-tabs': Tabs,
			'van-tab': Tab,
			InfiniteLoading,
		},
		data () {
			//这里存放数据
			return {
				active: -1,
				statusTypes: [
					{ title: '全部' },
					{ title: "审核中" },
					{ title: "投放中" },
					{ title: "已结束" },
				],
				myTasks: [],
				page: 1,
				status: -1,
				infiniteId: +new Date(),
			};
		},
		//监听属性 类似于data概念
		computed: {
			...mapGetters(['currentUser'])
		},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			tabClick (name, title) {
				if (name == 1) {
					this.status = 0
				} else {
					this.status = name;
				}
				this.active = name;
				this.page = 1;
				this.myTasks = [];
				this.infiniteId += 1;
			},
			infiniteHandler ($state) {
				this.$http.get("api/v2/alliance/flow/task",
					{ params: { page: this.page, status: this.status, include:'approval',append: 'show_type_label,show_category_label' } })
					.then(({ data }) => {
						if (data.tasks.data.length > 0) {
							this.page += 1;
							this.myTasks.push(...data.tasks.data);
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

		},
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
</style>