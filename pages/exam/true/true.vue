<template>
	<view class="container">
		<block v-if="list.length > 0">
			<tui-list-view title="真题列表">
				<tui-list-cell @click="detail(item.id)" :arrow="true" v-for="(item,index) in list" :key="index">
					<view class="tui-item-box">
						<tui-icon name="explore-fill" :size="24" color="#19be6b"></tui-icon>
						<view class="tui-list-cell_name">{{item.name}}</view>
						<view class="tui-ml-auto">
							<tui-tag v-if="item.status > 0" padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-green" shape="circle">查看结果</tui-tag>
							<tui-tag v-else padding="10rpx 12rpx" margin="0 30rpx 0 0" size="24rpx" type="light-orange" shape="circle">去测试</tui-tag>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
			<!--加载loadding-->
			<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
			<tui-nomore v-if="!pullUpOn" ></tui-nomore>
			<!--加载loadding-->
		</block>
		<block v-else>
			<tui-no-data :fixed="true" imgUrl="/static/images/toast/img_nodata.png">暂无数据</tui-no-data>
		</block>
	</view>
</template>

<script>
	import {Config} from '@/common/config.js'
	export default {
		data() {
			return {
				pageIndex:1,
				loadding: false,
				pullUpOn: true,
				list:[],
				count:0,
				paper:{}
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				this.tui.request('/user/papertruelist','POST',{level:5,pageIndex:this.pageIndex}).then((res) => {
					if(res.code === Config.SUCCESS){
						this.list = res.results
						this.count = res.count
						this.pageIndex += 1
					}
				})
			},
			detail(id) {
				this.getOne(id)
			},
			getOne(id) {
				if (id) {
					this.tui.request('/user/papertrue', 'POST', { level: 5, thispaper: id }).then(res => {
						if (res.code === Config.SUCCESS) {
							this.paper = res.results;
							this.setCurrentPaper()
							this.router.push('exam-paper')
						} else {
							this.tui.toast('获取题目错误')
						}
					});
				}
			},
			setCurrentPaper(){
				uni.setStorageSync('paper_menu',this.util.formatPaperMenu(this.paper.thispaper))
				uni.setStorageSync('paper',this.util.formatPaper(this.paper))
			}
		},
		onReachBottom() {
			if(this.pages >= this.pageIndex){
				this.loadding = true
				this.pullUpOn = true
				this.getAll()
			} else {
				setTimeout(() => {
					this.loadding = false
					this.pullUpOn = false
				}, 1000)
			}
		},
		computed:{
			pages(){
				return Math.ceil(this.count / 10)
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-ml-auto {
		margin-left: auto;
	}

	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}

	
</style>
