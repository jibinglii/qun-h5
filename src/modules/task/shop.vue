<template>
	<div class="shop-task">
		<x-header title="高级群任务"></x-header>
		<van-tabs @click="tabClick" v-model="active" color="#191717">
			<van-tab
				v-for="(item, index) in statusTypes"
				:key="index"
				:title="item.title"
			>
				<x-cell-group>
					<x-cell
						v-for="(item, index) in shopTask"
						:key="index"
						:is-link="true"
						:title="item.title"
						:inlineDesc="item.created_at"
						:value="item.status_label"
						router="task.fulfill"
						:routerParams="{ id: item.id }"
					>
					</x-cell>
				</x-cell-group>
			</van-tab>
		</van-tabs>
		<infinite-loading
			:identifier="infiniteId"
			@infinite="infiniteHandler"
			spinner="waveDots"
		>
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
	import Button from "vant/lib/button";
	import "vant/lib/button/style";
	import Tab from "vant/lib/tab";
	import Tabs from "vant/lib/tabs";
	import "vant/lib/tab/style";
	import "vant/lib/tabs/style";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader, XCell, XCellGroup, Button, InfiniteLoading,
			"van-tabs": Tabs,
			"van-tab": Tab,
		},
		data () {
			//这里存放数据
			return {
				statusTypes: [
          { title: "全部" },
					{ title: "待处理" },
					{ title: "已完成" }
				],
				page: 1,
				active: 0,
				infiniteId: +new Date(),
				shopTask: [],
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			tabClick (name, title) {
				this.active = name;
				this.shopTask = [];
				this.page = 1;
        this.infiniteId += 1;
			},
			infiniteHandler ($state) {
				this.$http.get('api/v2/alliance/shop_task', { params: { status: this.active, append: 'status_label' } })
					.then(({ data }) => {
						if (data.task.data.length > 0) {
							this.page += 1;
							this.shopTask.push(...data.task.data);
							$state.loaded();
						}
						if (data.task.per_page > data.task.data.length) {
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