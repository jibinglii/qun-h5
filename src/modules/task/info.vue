<template>
	<div class="task-info">
		<x-header title="任务详情"></x-header>
		<van-cell-group title="任务概览">
			<div class="info">
				<div class="info-type">
					<label for>投放行业</label>
					<span>{{ taskInfo.show_category }}</span>
				</div>
				<div class="info-type">
					<label for>投放类型</label>
					<span>{{ taskInfo.show_type }}</span>
				</div>
				<div class="info-type">
					<label for>投放区域</label>
					<span>{{ taskInfo.task.show_area_id }}</span>
				</div>
				<div class="info-type">
					<label for>投放价格</label>
					<span>￥{{ taskInfo.task.max_show_price }}</span>
				</div>
				<div class="info-type">
					<label for>点击价格</label>
					<span>￥{{ taskInfo.task.max_click_price }}</span>
				</div>
				<div class="info-type"></div>
			</div>
		</van-cell-group>
		<van-cell-group title="任务进度">
			<van-cell>
				<pie :params="pieProgress" ref="pie" />
			</van-cell>
		</van-cell-group>
		<van-cell-group title="推广内容">
			<van-cell title="推广广告" :value="taskInfo.ads.title" />
			<div class="tools">
				<van-button type="info">复制链接</van-button>
				<van-button type="warning" @click="showImg">查看广告图</van-button>
			</div>
		</van-cell-group>
		<van-cell-group title="完成任务">
			<van-field
				readonly
				clickable
				label="投放资源"
				:value="resource.name"
				placeholder="请选择..."
				@click="showResourcePicker = true"
			/>
			<van-popup v-model="showResourcePicker" position="bottom">
				<van-picker
					show-toolbar
					:columns="resource.nameItem"
					@cancel="showResourcePicker = false"
					@confirm="onResourceConfirm"
				/>
			</van-popup>
			<x-uploader
				title="上传投放凭证"
				v-model="fileList"
				:limit="1"
			></x-uploader>
			<div class="btns">
				<van-button type="primary" size="large" @click="upProof()"
					>提交投放凭证</van-button
				>
			</div>
		</van-cell-group>

		<van-cell-group title="投放记录">
			<van-cell
				v-for="(item, index) in taskInfo.result"
				:key="index"
				:title="item.resource.name"
				:label="item.created_at"
			></van-cell>
			<div v-show="taskInfo.result.length==0" class="no-results">暂无记录，请先提交投放凭证</div>
		</van-cell-group>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell/style";
	import "vant/lib/cell-group/style";
	import XUploader from "$components/XUploader";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import Button from "vant/lib/button";
	import Popup from "vant/lib/popup";
	import "vant/lib/popup/style";
	import Picker from "vant/lib/picker";
	import "vant/lib/picker/style";
	import Pie from "$components/Pie";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			XUploader,
			"van-cell": Cell,
			"van-cell-group": CellGroup,
			"van-field": Field,
			"van-button": Button,
			"van-popup": Popup,
			"van-picker": Picker,
			Pie
		},
		data () {
			//这里存放数据
			return {
				taskInfo: {
					show_category: '-',
					show_type: '-',
					result:[],
					task: {
						show_area_id: '-',
						max_show_price: '0',
						max_click_price: '0',
          },
          ads:{},
				},
				resource: {
					idItem: [],
					nameItem: [],
					id: "",
					name: ""
				},
				resourceIdItem: [],
				resourceNameItem: [],
				resourceId: "",
				resourceName: "",
				url: "",
				showInfo: {},
				fileList: [],
				showResourcePicker: false,
				pieProgress: {
					id: "pie_progress",
					name: "执行进度",
					width: "100%",
					height: "300px",
					showLegend: true,
					legend: ["未执行", "已完成"],
					data: [],
					color: ["#d3d3d3", "#228B22"]
        },
        resourceType:'',
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onResourceConfirm (value, index) {
				this.resource.name = value;
				this.resource.id = this.resource.idItem[index];
				this.showResourcePicker = false;
			},
			getTaskInfo () {
				let res_id = this.$route.params.id;
				this.$http
					.get("api/v2/alliance/flow/task/info", {
						params: {
							assign_id: res_id,
							include: "task.target,approval,approval.ads,task",
						}
					})
					.then(({ data }) => {
						this.taskInfo = data.task_info;
            this.taskInfo.task = data.task_info.task
            this.taskInfo.ads = data.task_info.approval.ads
            this.url = data.task_info.task.target.link;
            this.resourceType = data.task_info.task.show_category;
						this.pieProgress.data = [
							{ name: "未执行", value: 100 - data.task_info.speed },
							{ name: "已完成", value: data.task_info.speed }
            ];
            this.getResource(data.task_info.task.show_category)
						this.$refs["pie"].drawPie();
					});
			},
			upProof () {
				let params = {
					task_id: this.taskInfo.task_id,
					resource_id: this.resource.id,
					approval_id: this.taskInfo.approval.id,
					attachment: this.fileList
				};
				this.$toast.loading();
				this.$http
					.post("api/v2/alliance/flow/accept", params)
					.then(data => {
						this.$alert(data.message);
						if (data.code == 201) {
							location.reload();
						} 
					})
					.catch(faill => {
						this.$toast.loading(fail.response.data.message);
					});
			},
			getResource (type) {
				this.$http.get("api/v2/alliance/resources?category="+type).then(({ data }) => {
					data.resources.data.map((item, index) => {
						this.resource.idItem.push(item.id);
						this.resource.nameItem.push(item.name);
					});
				});
      },
      showImg(){
        this.$router.push({name:'task.showimg',params:{thumb:this.taskInfo.approval.ads.thumb}})
      }
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () { },
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {
			this.getTaskInfo();
		}
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.task-info {
		position: relative;
		height: auto;
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
		.tools {
			text-align: right;
			padding: 6px 0;
			button {
				margin-right: 10px;
			}
		}
		.btns {
			padding: 10px;
		}
		.no-results{
			display: block;
			text-align: center;
			font-size: .6rem;
			color:#999;
			padding:15px 0;
		}
	}
</style>