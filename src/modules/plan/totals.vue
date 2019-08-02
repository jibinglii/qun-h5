<template>
	<div class="my-task">
		<x-header title="总浏览数"></x-header>
		<x-cell-group>
			<x-cell
				v-for="(item, index) in clicks"
				:key="index"
				:is-link="false"
				:value="item.value"
				:title="item.user.nickname"
				:inlineDesc="item.ip + '/' + item.area"
			></x-cell>
		</x-cell-group>
		<infinite-loading @infinite="getClick" spinner="spiral">
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
				clicks: [],
				page: 1
			};
		},
		computed: {},
		watch: {},
		methods: {
			getClick ($state) {
				let taskId = this.$route.params.taskId
				console.log(taskId)
				if (taskId != '' || taskId != undefined) {
					this.$http.get('api/v2/alliance/advertiser/click', { params: { task_id: taskId, include: 'user' } })
						.then(({ data }) => {
							if (data.click.data.length > 0) {
								this.page += 1;
								this.clicks.push(...data.click.data)
							}
							if (data.click.per_page > data.click.data.length) {
								$state.complete();
							}
						})
				}
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
