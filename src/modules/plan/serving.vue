<template>
	<div class="my-task">
		<x-header title="投放明细"></x-header>
		<x-cell-group>
			<x-cell
				v-for="(item, index) in servings"
				:key="index"
				:is-link="true"
				:title="item.name"
				:inlineDesc="item.desc"
			></x-cell>
		</x-cell-group>
		<infinite-loading @infinite="getResource" spinner="spiral">
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
        servings: [],
        page:1,
			};
		},
		computed: {},
		watch: {},
		methods: {
			getResource ($state) {
				let taskId = this.$route.params.taskId
				if (taskId != '' || taskId != undefined) {
					this.$http.get('api/v2/alliance/advertiser/resources', { params: { task_id: taskId, include: 'result', append: 'type_label' } })
						.then(({ data }) => {
							if (data.resource.data.length > 0) {
                this.page +=1
								this.servings.push(...data.resource.data)
								$state.loaded();
							}
							if (data.resource.per_page > data.resource.data.length) {
								$state.complete();
							}
						})
				}
			}
		},
		created () { },
		mounted () {

		}
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
