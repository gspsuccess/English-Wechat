<template>
	<view class="container">
		<block v-if="count > 0">
			<tui-list-view title="测试记录">
				<tui-list-cell :lineLeft="false" @click="detail" v-for="(item,index) in list" :key="index">
					<view class="tui-item-box">
						<view class="tui-msg-box">
							<image v-if="item.rightnum >= 12" src="/static/images/my/listen_success.png" class="tui-msg-pic" mode="widthFix"></image>
							<image v-else src="/static/images/my/listen_error.png" class="tui-msg-pic" mode="widthFix"></image>
							<view class="tui-msg-item">
								<view class="tui-msg-name">{{item.usetime|formatSeconds}}</view>
								<view class="tui-msg-content">
									<text class="success">正确：{{item.rightnum}}</text>
									<text class="error">错误：{{item.errornum}}</text>
								</view>
							</view>
						</view>
						<view class="tui-msg-right">
							<view class="tui-msg-time">{{item.date_joined|formatDateJoined}}</view>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
			<!--内容部分-->
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
				count:0
			}
		},
		onLoad() {
			this.getAll()
		},
		methods: {
			getAll(){
				this.tui.request('/user/lisresultinfo','GET',{page:this.pageIndex}).then((res) => {
					if(res.code === Config.SUCCESS){
						this.list = this.list.concat(res.results)
						this.count = res.count
						this.pageIndex += 1
					}
				})
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
				return Math.ceil(this.count/10)
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

	.tui-logo {
		height: 52rpx;
		width: 52rpx;
		flex-shrink: 0;
	}

	.tui-flex {
		display: flex;
		align-items: center;
	}

	.tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: block;
		margin-right: 24rpx;
		flex-shrink: 0;
	}

	.tui-msg-item {
		max-width: 500rpx;
		min-height: 80rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		line-height: 1;
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26rpx;
		line-height: 1;
		color: #9397a4;
	}
	
	.tui-msg-content text.success{
		color:#19be6b;
		margin-right:24rpx;
	}
	
	.tui-msg-content text.error{
		color:#EB0909
	}

	.tui-msg-right {
		height: 88rpx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tui-right-dot {
		height: 76rpx !important;
		padding-bottom: 10rpx !important;

	}

	.tui-msg-time {
		width: 100%;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #9397a4;
	}
</style>
