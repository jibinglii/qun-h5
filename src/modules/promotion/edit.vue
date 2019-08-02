<template>
	<div class>
		<x-header :title="title"></x-header>
		<van-cell-group>
			<van-field
				label="文案标题"
				v-model="params.title"
				placeholder="请输入用户名"
			/>
		</van-cell-group>
		<van-cell-group>
			<van-field
				v-model="params.content"
				type="textarea"
				placeholder="请输入文案内容"
				rows="8"
				autosize
			/>
		</van-cell-group>
		<van-cell-group>
			<x-uploader
				title="相关图片"
				v-model="params.attachment"
				:limit="2"
			></x-uploader>
		</van-cell-group>
		<van-cell-group>
			<van-field label="推广链接" v-model="params.link" placeholder />
		</van-cell-group>
		<div class="btn">
			<van-button type="primary" hairline size="large" @click="save()"
				>保存</van-button
			>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
  import XUploader from '$components/XUploader';
	import Button from "vant/lib/button";
	import "vant/lib/button/style";
	import { fail } from 'assert';
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,XUploader,
			"van-cell-group": CellGroup,
			"van-field": Field,
      "van-button": Button,
		},
		data () {
			//这里存放数据
			return {
				params: {
					title: "",
					content: "",
					link: "",
					attachment: []
        },
        title:'添加文案',
			};
		},
		computed: {},
		watch: {},
		methods: {
			onConfirm (value, index) {
				this.value = value;
				this.showPicker = false;
			},
			afterRead (file) {
				// 此时可以自行将文件上传至服务器
				console.log(file);
			},
			save () {
				this.$http.post('api/v2/alliance/advertiser/add/adstarget', this.params).then(data => {
            if(data.code == 201 || data.code == 200){
              this.$alert('添加添加成功')
              this.$router.push({name:'promotion.promotion-content'})
            }
				}).catch(fail => {
            this.$alert(fail.response.data.message)
				})
      },
      getAdsTarget () {
				let adsId = this.$route.params.id
				this.$http.get('api/v2/alliance/advertiser/add/adstarget/'+adsId).then(data => {
          this.params = data.data.target
				})
			}
		},
		created () { },
		mounted () { 
      if(this.$route.params.id){
        this.getAdsTarget()
        this.title = '编辑文案'
      }
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
	/deep/.van-uploader__wrapper {
		margin: 10px;
		justify-content: space-between;
		.van-uploader__preview {
			margin: 10px 0 0;
		}
		.van-uploader__upload {
			margin: 10px 0 10px 0;
		}
	}
	.btn {
		width: 90%;
		position: fixed;
		bottom: 30px;
		left: 5%;
		.van-button--primary {
			height: 48px;
			line-height: 48px;
			font-size: 14px;
		}
	}
</style>
