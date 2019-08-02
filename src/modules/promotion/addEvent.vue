<template>
	<div class>
		<x-header title="选择文案"></x-header>
		<x-cell-group>
			<x-cell
				v-for="(item, index) in list"
				:key="index"
				:is-link="false"
				:title="item.title"
				:inlineDesc="item.content"
			>
				<template slot="value">
					<van-button slot="button" size="small" type="primary" @click="select(item.id)"
						>选择</van-button
					>
				</template>
			</x-cell>
		</x-cell-group>
		<infinite-loading @infinite="infiniteHandler" spinner="spiral">
			<div slot="no-more">没有更多数据啦...</div>
			<div slot="no-results">没有数据</div>
		</infinite-loading>
		<div class="op" @click="next()">
			<x-button type="primary" text="添加文案"></x-button>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XButton from "$components/XButton";
	import Cell from "vant/lib/cell";
	import "vant/lib/cell/style";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import XCell from "$components/XCell";
	import XCellGroup from "$components/XCellGroup";
	import Button from "vant/lib/button";
	import "vant/lib/button/style";
	import InfiniteLoading from "vue-infinite-loading";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XButton,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			"van-button": Button,
			XCell,
			XCellGroup,
			InfiniteLoading
		},
		data () {
			//这里存放数据
			return {
				list: []
			};
		},
		computed: {},
		watch: {},
		methods: {
			infiniteHandler ($state) {
				this.$http.get("api/v2/alliance/advertiser/adstarget",
					{ params: { page: this.page } })
					.then(({ data }) => {
						if (data.ads_targets.data.length > 0) {
							this.page += 1
							this.list.push(...data.ads_targets.data);
							$state.loaded();
						}
						if (data.ads_targets.per_page > data.ads_targets.data.length) {
							$state.complete();
						}
					});
			},
			next () {
        this.$router.push({name:'promotion.edit'})
      },
      select(targetId){
        this.$router.push({name:'promotion.add',params:{id:targetId}})
      }
		},
		created () { },
		mounted () { }
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	/deep/.weui-cells {
		margin-top: 10px;
		.vux-label {
			font-size: 16px;
			font-weight: 500;
			line-height: 3;
		}
		.vux-label-desc {
			font-size: 12px;
			width: 90%;
			display: inline-block;
		}
	}
	.op {
		width: 90%;
		margin: 30px auto;
	}
	.op a {
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		border-radius: 0px;
	}
</style>
