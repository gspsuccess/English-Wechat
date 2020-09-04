<template>
	<view>
		<view class="voice-wrapper">
			<image class="voice" :src="voice" mode="" @click="broadcast()"></image>
			<view class="content">{{data.content|formatContent}}</view>
			<view class="reply-wrapper">
				<view class="title">请作答：</view>
				<block v-for="item in options" :key="item">
					<view class="option"><text>{{item + 1}}.</text><input type="text" v-model="answer[item].value"></view>
				</block>
			</view>
		</view>
		<view class="answer-wrapper" v-if="showResult">
			<tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
			<text>{{answerResult}}</text>
		</view>
		<view class="btn-wrapper">
			<view class="tui-btn-box">
				<tui-button @click="submit">提交</tui-button>
			</view>
			<view class="tui-btn-box">
				<tui-button type="white" @click="next" class="mt12">下一个</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
import {Config} from '@/common/config'	
const myaudio = wx.createInnerAudioContext();
const voiceImgs = Config.voiceImgs
const results = Config.results
export default {
	filters:{
		formatContent(value){
			return value.replace(/{!}/g,'_______')
		}
	},
	created() {
		 for (var i = 0; i < this.options; i++) {
			var item = {value: ''};
			this.answer.push(item);
		}
	},
	data() {
		return {
			showResult:false,
			answer:[],
			data: {
				content: 'Life is a journey, not the {!}, but the {!} along the should be and the mood at the view.',
				voicefile: 'http://api.zesi.com.cn/word.mp3',
				answer:['good','bad']
			},
			voice:voiceImgs.stop,
			item: results.ok
		};
	},
	methods: {
		broadcast() {
			myaudio.src = this.data.voicefile;
			myaudio.autoplay = true;

			myaudio.play();

			//开始监听
			myaudio.onPlay(() => {
				this.voice = voiceImgs.play
			});

			//结束监听
			myaudio.onEnded(() => {
				this.voice = voiceImgs.stop
			});
		},
		
		submit(){
			let result = this._checkAnswerIsRight()
			this.showResult = true
			if(result){
				this.item = results.ok
				this.answerResult = this.data.answer.join(',')
			} else {
				this.item = results.no
			}
		},
		
		next(){
			this.data = {
				content: 'Life is a journey, not the {!}, but the {!} along the should be and the mood at the view.',
				voicefile: 'http://api.zesi.com.cn/word.mp3',
				answer:['good','bad']
			}
			this.answer = []
			this.showResult = false
		},
		
		_checkAnswerIsRight(){
			return this.answerResult === this.util.arrayColumn(this.answer,'value').join(',')
		},
		
		_getMatchNumbers(str,re){
			return ((str || '').match(re) || []).length
		}
	},
	computed:{
		options(){
			return this._getMatchNumbers(this.data.content,/{!}/g)
		},
		answerResult(){
			return this.data.answer.join(',')
		}
	}
};
</script>

<style lang="stylus">
.voice-wrapper
	margin 32px auto 32px auto
	text-align center
	vertical-align middle
	.voice
		width 240rpx
		height 240rpx
	.content
		margin 50rpx 50rpx 0 50rpx
		text-align left
		line-height 1.5
		font-size 32rpx
	.reply-wrapper	
		margin 50rpx 50rpx 0 50rpx
		text-align left
		.title
			font-size 32rpx
			font-weight bold
		.option
			display flex
			margin-top 24rpx
			input
				border-bottom 1px solid #ddd
				margin-left auto
				width 100%
				text-align center
.btn-wrapper
	margin 50rpx
	.tui-btn-box
		margin-bottom 26rpx
.answer-wrapper
	display flex
	text-align center
	justify-content center
	text
		display inline-block
		font-size 48rpx
		margin-left 32rpx
</style>
