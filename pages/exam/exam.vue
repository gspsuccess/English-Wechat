<template>
	<view class="container">
		<block v-for="(item,index) in cards" :key="index">
		<tui-card class="tui-card" :title="item.title" :tag="item.tag" :header="item.header" @click="detail(item.name)">
			<template v-slot:body>
				<view class="tui-article">
					<image :src="item.banner.url" class="tui-article-img"></image>
				</view>
			</template>
			<template v-slot:footer>
				<view class="tui-default tui-flex">
					<text>{{item.count}}</text>
					<tui-icon name="arrowright" :size="20" color="#ccc" class="tui-right"></tui-icon>
				</view>
			</template>
		</tui-card>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cards: [
					{
						name:'paper',
						banner: {
							url: "http://img.intelirri.com/paper.jpg"
						},
						title: {
							text: "NETS模拟问卷"
						},
						tag: {
							text: "2308人已测试"
						},
						header: {
							line: true,
							bgcolor: "#fafafa"
						},
						count:'212份模拟试卷'
					},
					{
						name:'listen',
						banner: {
							url: "http://img.intelirri.com/listen.jpg"
						},
						title: {
							text: "NETS听力能力辅助测试"
						},
						tag: {
							text: "2118人已测试"
						},
						header: {
							line: true,
							bgcolor: "#fafafa"
						},
						count:'4212段听力素材'
					},
					{
						name:'word',
						banner: {
							url: "http://img.intelirri.com/word.jpg"
						},
						title: {
							text: "NETS单词能力辅助测试"
						},
						tag: {
							text: "4598人已测试"
						},
						header: {
							line: true,
							bgcolor: "#fafafa"
						},
						count:'10988个英语单词'
					}
				]
			}
		},
		methods: {
			detail(name) {
				this.router.push('exam-' + name)
			}
		}
	}
</script>

<style>
	page {
		background: #f0f0f0;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-card {
		margin:30rpx 30rpx 10rpx 30rpx
	}
	.tui-card:last-child{
		margin-bottom:40rpx
	}
	.tui-title {
		width: 100%;
		padding: 70rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		line-height: 30rpx;
		color: #666;
	}

	.tui-default {
		padding: 20rpx 30rpx;
	}
	
	.tui-default text {
		color:#f60;
		font-weight:bold;
	}

	.tui-article {
		position: relative;
	}

	.tui-article-img {
		width: 100%;
		height: 300rpx;
		display: block;
	}

	.tui-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-mr {
		margin-right: 20rpx;
	}

	.tui-content {
		padding: 0rpx 30rpx 20rpx 120rpx;
		box-sizing: border-box;
		font-size: 34rpx;
		font-weight: 400;
		color: #333;
	}
</style>
