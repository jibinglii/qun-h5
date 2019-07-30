<template>
	<div class="task-info">
		<x-header title="任务详情"></x-header>
		<van-cell-group title="任务概览">
			<div class="info">
				<div class="info-type">
					<label for="">投放行业</label>
					<span>{{ taskInfo.show_category_label}}</span>
				</div>
				<div class="info-type">
					<label for="">投放类型</label>
					<span>{{ taskInfo.show_type_label}}</span>
				</div>
				<div class="info-type">
					<label for="">投放区域</label>
					<span>{{ taskInfo.show_area_id }}</span>
				</div>
				<div class="info-type">
					<label for="">投放价格</label>
					<span>￥{{ taskInfo.max_show_price }}</span>
				</div>
				<div class="info-type">
					<label for="">点击价格</label>
					<span>￥{{ taskInfo.max_click_pric }}</span>
				</div>
				<div class="info-type"></div>
			</div>
		</van-cell-group>
		<x-group>
			<info-cell title="推广链接">
				<span>http://baidu.com</span>
				<button class="btns">复制链接</button>
				<button class="btns">广告链接</button>
			</info-cell>
		</x-group>
		<van-cell-group title="推广进度">
			<div class="progress">
				<van-circle
					v-model="currentRate"
					color="#07c160"
					fill="#fff"
					size="120px"
					layer-color="#ebedf0"
					:text="text"
					:rate="rate"
					:speed="100"
					:clockwise="false"
					:stroke-width="70"
				/>
			</div>
		</van-cell-group>
		<div class="op">
			<x-button type="primary" text="上传投放凭证"></x-button>
		</div>
		<van-cell-group title="投放记录">
			<van-cell
				:is-link="true"
				:title="text"
				:inlineDesc="rate"
				:link="'/task/info/' + 1"
			></van-cell>
		</van-cell-group>
	</div>
</template>

<script>
	import XHeader from '$components/XHeader';
	import Cell from "vant/lib/cell";
	import XGroup from "$components/XGroup";
  import CellGroup from "vant/lib/cell-group";
  import 'vant/lib/cell/style';
  import 'vant/lib/cell-group/style';
	import XButton from "$components/XButton";
	import InfoCell from "$components/InfoCell";
	import Circel from "vant/lib/circle";
	import "vant/lib/circle/style";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
      XHeader, XGroup, XButton, InfoCell,
      'van-cell':Cell, 
      'van-cell-group':CellGroup, 
			'van-circle': Circel
		},
		data () {
			//这里存放数据
			return {
				currentRate: 50,
				text: '',
        rate: 50,
        taskInfo:{},
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
      getTaskInfo(){
        let res_id = this.$route.params.id
        this.$http.get('api/v2/alliance/flow/task/info',
        {params:{task_id:res_id,include:'target,assign',append:'show_type_label,show_category_label'}})
        .then(({ data }) => {
          this.taskInfo = data.task_info
        })
      }
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
      this.text = this.currentRate.toFixed(0) + '%'
      this.getTaskInfo();
		},
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.task-info {
		position: relative;
		.info {
			height: 180px;
			padding: 10px;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.info-type {
				flex: 3;
				label,
				span {
					display: block;
					width: 100px;
					padding: 8px;
					font-size: 0.6rem;
					text-align: center;
				}
			}
		}
		.btns {
			width: 100px;
			height: 30px;
			margin-left: 5px;
			line-height: 30px;
			background-color: #fff;
			border: 1px solid #000;
			border-radius: 10px;
		}
		.progress {
			width: 100%;
			height: 200px;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.op {
			width: 90%;
			margin: 0 auto;
			padding: 20px 0 20px 0;
		}
		.op a {
			height: 50px;
			line-height: 50px;
		}
	}
</style>