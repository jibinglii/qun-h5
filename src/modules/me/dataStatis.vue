<template>
	<div class="details">
		<x-header title="数据统计"></x-header>
		<van-cell-group title="数据报表">
			<van-cell>
				<div class="top">
					<div class="top-con" v-for="(item, index) in tops" :key="index">
						<span>{{ item.num }}</span>
						<label for>{{ item.label }}</label>
					</div>
				</div>
			</van-cell>
		</van-cell-group>
		<van-cell-group title="历史点击统计">
			<van-cell>
				<bar :params="barShow" ref="bar" />
			</van-cell>
		</van-cell-group>
		<van-cell-group title="历史投放统计">
			<van-cell>
				<bar :params="barClick" ref="bar1" />
			</van-cell>
		</van-cell-group>
		<van-cell-group title="历史消费统计">
			<van-cell>
				<bar :params="barCast" ref="bar2" />
			</van-cell>
		</van-cell-group>
	</div>
</template>

<script>
	import Nav from "$components/Nav";
	import XHeader from "$components/XHeader";
	import Bar from "$components/Bar";
	import Cell from "vant/lib/cell";
	import "vant/lib/cell/style";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import { mapGetters } from "vuex";
	import InfiniteLoading from "vue-infinite-loading";
	import Loading from "vant/lib/loading";
	import "vant/lib/loading/style";

	export default {
		components: {
			"van-cell": Cell,
			"van-cell-group": CellGroup,
			XHeader,
			Bar
		},
		data () {
			return {
				barShow: {
					id: "bar_show",
					type: "bar",
					showName: false,
					name: "",
					width: "100%",
					height: "300px",
					showLegend: true,
					xAxis: [0],
					data: [[0]]
				},
				barClick: {
					id: "bar_click",
					type: "line",
					showName: false,
					name: "",
					width: "100%",
					height: "300px",
					showLegend: true,
					xAxis: [0],
					data: [[0]]
				},
				barCast: {
					id: "bar_cast",
					type: "bar",
					showName: false,
					name: "",
					width: "100%",
					height: "300px",
					showLegend: true,
					xAxis: [0],
					data: [[0]]
				},
				tops: [
					{
						num: 0,
						label: "今日投放金额"
					},
					{
						num: 0,
						label: "正在投放广告"
					},
					{
						num: 0,
						label: "今日投放次数"
					},
					{
						num: 0,
						label: "总投放金额"
					},
					{
						num: 0,
						label: "历史投放次数"
					},
					{
						num: 0,
						label: "总点击次数"
					}
				]
			};
		},
		computed: {},
		created () { },
		methods: {
			statistics () {
				this.$http.get('api/v2/alliance/ads/statistics').then(data => {
					let res = data.data.statistics
					this.tops[0].num = res.day[0].serving_money_day != '' ? res.day[0].serving_money_day : 0
					this.tops[1].num = res.day[0].ads_num[0].ads_num_day
					this.tops[2].num = res.day[0].serving_num_day
					this.tops[3].num = res.all[0].serving_money !='' ? res.all[0].serving_money : 0
					this.tops[4].num = res.all[0].serving_num
					this.tops[5].num = res.all[0].click_num
					if (res.history_click.length > 0) {
						this.barShow.xAxis = []
						this.barShow.data[0].splice(0, 1)
					}
					if (res.history_result.length > 0) {
						this.barClick.xAxis = []
						this.barClick.data[0].splice(0, 1)
					}
					if (res.history_settle.length > 0) {
						this.barCast.xAxis = []
						this.barCast.data[0].splice(0, 1)
					}
					res.history_click.map((item, index) => {
						this.barShow.xAxis.push(item.day)
						this.barShow.data[0].push(item.num)
					})
					this.$refs['bar'].drawBar()
					res.history_result.map((item, index) => {
						this.barClick.xAxis.push(item.day)
						this.barClick.data[0].push(item.num)
					})
					this.$refs['bar1'].drawBar()
					res.history_settle.map((item, index) => {
						this.barCast.xAxis.push(item.day)
						this.barCast.data[0].push(item.money)
					})
					this.$refs['bar2'].drawBar()
				})
			}
		},
		mounted () {
			this.statistics()
		}
	};
</script>
<style lang="scss" scoped>
	.details {
		position: relative;
		.top {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			flex-wrap: wrap;
			.top-con {
				text-align: center;
				width: 33.3%;
				margin: 15px 0;
				span,
				label {
					display: block;
				}
			}
		}
	}
</style>
