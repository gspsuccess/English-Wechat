<template>
	<view>
		<view class="voice-wrapper">
			<image class="voice" :src="voice" mode="" @click="broadcast()"></image>
			<input type="text" placeholder="输入听到的单词" class="underline-input" v-model="answer" />
		</view>
		<view class="answer-wrapper" v-if="showResult">
			<tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
			<text>{{word.name}}</text>
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
	data() {
		return {
			showResult:false,
			answer:'',
			word: {
				name: 'good',
				voicefile: 'http://api.zesi.com.cn/word.mp3'
			},
			voice:voiceImgs.stop,
			item: results.ok
		};
	},
	methods: {
		broadcast() {
			myaudio.src = this.word.voicefile;
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
			this.showResult = true
			if(this.word.name === this.answer){
				this.item = results.ok
			} else {
				this.item = results.no
			}
		},
		
		next(){
			this.word = {
				name: 'worse',
				voicefile: 'http://api.zesi.com.cn/word.mp3'
			}
			this.answer = ''
			this.showResult = false
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
	.underline-input
		margin 50rpx 50rpx 0 50rpx
		height 64px
		line-height 64px
		font-size 20px
		border-bottom 1px solid #ddd
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
