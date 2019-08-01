<template>
	<div class="my-task">
		<x-header title="计划详情"></x-header>
		<van-cell-group>
			<van-cell
				title="总投放数"
				:value="taskInfo.result_num"
				is-link
				:to="{ name: 'plan.serving' }"
			/>
			<van-cell
				title="总浏览数"
				:value="taskInfo.click_num"
				is-link
				:to="{ name: 'plan.totalview' }"
			/>
			<van-cell title="对应推广内容" :value="title" is-link />
		</van-cell-group>
		<x-cell-group title="历史投放广告">
			<x-cell is-link :title="ads.title" :inlineDesc="ads.created_at"></x-cell>
		</x-cell-group>
		<x-cell-group title="历史流转情况">
			<x-cell
				is-link
				v-for="(item, index) in approval"
				:key="index"
				:title="item.created_at"
				:inlineDesc="
					'投放' + '1000次' + '   点击' + '100次' + '   总消费' + '1000元'
				"
			></x-cell>
		</x-cell-group>
		<div class="btn">
			<van-button type="primary" hairline size="normal" @click="servingClick"
				>再次投放</van-button
			>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import CellGroup from "vant/lib/cell-group";
	import Cell from "vant/lib/cell";
	import Button from "vant/lib/button";
	import "vant/lib/button/style";
	import "vant/lib/cell/style";
	import XCell from "$components/XCell";
	import XCellGroup from "$components/XCellGroup";
	import DropdownMenu from "vant/lib/dropdown-menu";
	import "vant/lib/dropdown-menu/style";
	import DropdownItem from "vant/lib/dropdown-item";
	import "vant/lib/dropdown-item/style";
	import { mapGetters } from "vuex";


	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			"van-button": Button,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			"van-dropdown-menu": DropdownMenu,
			"van-dropdown-item": DropdownItem,
			XCell,
			XCellGroup
		},
		data () {
			//这里存放数据
			return {
				taskInfo: {},
				ads: {},
				target: {},
				approval: {},
				title: '',
			};
		},
		computed: {
			...mapGetters(['currentUser'])
		},
		methods: {
			servingClick () { },
			editClick () { },
			getTaskInfo () {
				let id = this.$route.params.id
				this.$http.get('api/v2/alliance/advertiser/info/' + id, { params: { include: 'target,approval,ads' } }).then(({ data }) => {
					this.taskInfo = data.task
					this.ads = data.task.ads
					this.target = data.task.target
					this.approval = data.task.approval
					this.title = data.task.target.title
				})
			}
		},
		mounted () {
			this.getTaskInfo();
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

	/deep/.van-dropdown-menu {
		height: 24px;

		.van-dropdown-menu__item {
			display: inline-block;
		}

		.van-hairline--top-bottom::after {
			border-width: 0px;
		}

		.van-dropdown-menu__title::after {
			display: none;
		}

		.van-cell__title {
			text-align: left;
			font-weight: normal;
		}
	}
	.van-hairline--top-bottom::after {
		border-width: 0px;
	}
	.btn {
		text-align: center;
		/deep/button {
      width: 90%;
			margin: 45px 20px 0 20px;
			padding: 0 30px;
			height: 50px;
			line-height: 38px;
			font-size: .8rem;
		}
	}
</style>