<template>
	<view class="page-container">
		<view class="cover-container">
			<view class="cover-title">NETS第五级考试笔试样卷</view>
			<view class="userinfo">
				<view class="userinfo-item">
					<text>考生姓名：</text><input type="text">
				</view>
				<view class="userinfo-item">
					<text>准考证号：</text><input type="text">
				</view>
			</view>
			<view class="notice">
				<view class="notice-title">{{notice.title}}</view>
				<view class="notice-item-container">
					<view class="notice-item" v-for="(item,index) in notice.content" :key="index">
						<view class="title">{{item.title}}</view>
						<view class="options">
							<view class="option" v-for="(citem,cindex) in item.items" :key="cindex">
								{{citem}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<tui-button height="80rpx" type="primary" @click="start">开始考试</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				notice:{
					title:'考生注意事项',
					content:[
						{
							title:'一、在答题前，请认真完成以下事项：',
							items:[
								'1. 请检查答题卡的印刷质量，如有问题及时向监考员反映。',
								'2. 请在试题册正面指定位置填写姓名和准考证号。',
								'3. 请在答题卡1和答题卡2指定位置用黑色字迹签字笔填写学校名称、姓名、试卷号和准考证号，并用2B铅笔将对应试卷号和准考证号的信息点涂黑。'
							]
						},
						{
							title:'二、在考试过程中，请注意以下事项：',
							items:[
								'1. 所有题目必须在答题卡上作答，在试题册上的作答一律无效。',
								'2. 请在规定时间内依次完成写作B节、听力部分、阅读部分和写作A节各部分考试，其中写作B节和听力部分在答题卡1上作答，阅读部分和写作A节在答题卡2上作答。',
								'3. 写作B节试题内容印在试题册背面，作答该题期间不得翻阅试题册，听力部分开始时方可翻阅。',
								'4. 作答听力部分时，考生可先将答案写或划在试题册上，听力部分结束前有3分钟的时间将答案转涂或誊写到答题卡1上。听力录音播放完毕后，请立即停止作答，监考员将收回答题卡1。考生在得到监考员指令后方可继续作答其余部分的题目。',
								'5. 选择题均为单选题，错选、不选或多选将不得分，作答时必须使用2B铅笔在答题卡上相应位置填涂，修改时须用橡皮擦净。',
								'6. 听力B节和写作部分必须用黑色字迹签字笔在答题卡指定区域内作答。',
								'7. 考试结束铃响，监考员收回答题卡2和试题册。待监考员完成清点并确认无误后，考生方可离开。'
							]
						}
					]
				}
			}
		},
		methods: {
			start(){
				this.router.push('exam-paper-listen-A')
			}
		}
	}
</script>

<style lang="stylus">
.page-container
	padding 50rpx
.cover-container
	.cover-title
		font-size 48rpx
		font-weight bold
		text-align center
	.userinfo	
		background #f0f0f0
		padding 25rpx
		margin 36rpx 0
		.userinfo-item
			display flex
			margin 36rpx 0
			input
				border-bottom 1rpx solid #bbb
	.notice	
		margin 32rpx 0
		.notice-title
			font-size 40rpx
			font-weight bold
			text-align center
			margin-bottom 36rpx
		.notice-item-container	
			.notice-item
				margin-bottom 32rpx
				.title
					font-size 32rpx
					font-weight bold
					margin-bottom 24rpx
				.options	
					.option
						line-height 1.8
						margin-bottom 24rpx
</style>
