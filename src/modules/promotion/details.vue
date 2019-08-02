<template>
	<div class>
		<x-header title="内容详情" @click-right="edit">
			<div slot="right" class="right">
				<van-icon name="records" />
			</div>
		</x-header>
		<x-cell-group>
			<x-cell
				:is-link="false"
				:title="details.title"
				:inlineDesc="details.content"
			></x-cell>
		</x-cell-group>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import XCell from "$components/XCell";
	import XCellGroup from "$components/XCellGroup";
	import Icon from "vant/lib/icon";
	import 'vant/lib/icon/style';

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XCell,
			XCellGroup,
			"van-icon": Icon
		},
		data () {
			//这里存放数据
			return {
				details: {},
			};
		},
		computed: {},
		watch: {},
		methods: {
			edit () {
				this.$router.push({
          name: 'promotion.edit',
          params: {id:this.details.id}
				})
			},
			getAdsTarget () {
				let adsId = this.$route.params.id
				this.$http.get('api/v2/alliance/advertiser/adstarget/info/'+adsId).then(data => {
          this.details = data.data.target
				})
			}
		},
		created () { },
		mounted () {
      this.getAdsTarget()
     }
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	/deep/.weui-cells {
		margin-top: 0;
		.vux-label {
			line-height: 3;
		}
		.vux-label-desc {
			font-size: 12px;
		}
	}
	/deep/.van-icon {
		font-size: 20px;
		color: #333;
	}
</style>
