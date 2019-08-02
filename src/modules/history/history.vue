<template>
	<div class="">
		<x-header title="历史任务"></x-header>
		<x-cell-group>
			<x-cell
				v-for="(item, index) in historys"
				:key="index"
				:is-link="true"
				:title="item.task.title"
				:inlineDesc="item.start_at+'至'+item.close_at"
        router="plan.plandetails"
         :routerParams="{'id': item.task.id}"
			></x-cell>
		</x-cell-group>
		<infinite-loading @infinite="getHistoryTask" spinner="spiral">
			<div slot="no-more">没有更多数据啦...</div>
			<div slot="no-results">没有数据</div>
		</infinite-loading>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XCell from "$components/XCell";
	import XCellGroup from "$components/XCellGroup";
	import InfiniteLoading from "vue-infinite-loading";


	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCell,
			XCellGroup,
			InfiniteLoading
		},
		data () {
			//这里存放数据
			return {
				historys: [],
			};
		},
		computed: {},
		watch: {},
		methods: {
			getHistoryTask ($state) {
				this.$http.get('api/v2/alliance/advertiser/history/task', { params: { include: 'task' } }).then(({ data }) => {
					if (data.tasks.data.length > 0) {
						this.historys = data.tasks.data
						$state.loaded();
					}
					if (data.tasks.per_page > data.tasks.data.length) {
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
	/deep/.weui-cells {
		margin-top: 0;
		.vux-label {
			font-weight: 500;
		}
		.vux-label-desc {
			font-size: 12px;
		}
	}
</style>
