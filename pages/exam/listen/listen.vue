<template>
	<view v-if="current.detail">
		<view class="time-wrapper">
			{{timetranFormat}}
		</view>
		<view class="voice-wrapper">
			<image class="voice" :src="voice" mode="" @click="broadcast()"></image>
			<view class="content">{{current.detail|formatContent}}</view>
			<view class="reply-wrapper">
				<view class="title">请作答：</view>
				<view class="option"><input type="text" v-model="answer"></view>
			</view>
		</view>
		<view class="answer-wrapper" v-if="showResult">
			<tui-icon :name="item.name" :size="item.size" :color="item.color || '#999'"></tui-icon>
			<text>{{current.rightanswer}}</text>
		</view>
		<view class="btn-wrapper">
			<view class="tui-btn-box">
				<tui-button @click="submit" :loading="unusable" :disabled="unusable">{{submintTitie}}</tui-button>
			</view>
		</view>
		<view class="count-wrapper">
			{{index+1}} / {{list.length}}
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
	data() {
		return {
			showResult:false,
			list:[],
			index:0,
			answer:'',
			voice:voiceImgs.stop,
			item: results.ok,
			unusable:false,
			timetran:0,
			result:{
				rightnum:0,
				errornum:0,
				usetime:0,
				level:5
			},
			interval:''
		};
	},
	onLoad() {
		this.getList()
		this.getCurrentTime()
	},
	onUnload() {
		clearInterval(this.interval)
	},
	methods: {
		getList(){
			this.tui.request('/user/listest','POST',{level:5}).then((res) => {
				if(res.code === Config.SUCCESS){
					this.list = res.results.data
				}
			})
		},
		broadcast() {
			myaudio.src = this.current.voicefile
			myaudio.autoplay = true

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
			if(this.index < 19){
				if(!this.answer){
					this.tui.toast('请先提交本题答案')
				} else {
					this._action()
					setTimeout(()=>this._next(),1000)
				}
			} else {
				this._action()
				clearInterval(this.interval)
				this.result.usetime = this.timetran
				this.tui.request('/user/lisresultcreate','POST',this.result).then((res) => {
					if(res.code === Config.SUCCESS){
						let content = `本次测试已提交，正确${this.result.rightnum}个，错误${this.result.errornum}个`
						uni.showModal({
							title:'测试结果',
							content:content,
							success: (res) => {
								if(res.confirm){
									uni.switchTab({
										url:'/pages/exam/exam'
									})
								}
							}
						})
					}
				})
			}
		},
		_action(){
			this.showResult = true
			this.unusable = true
			if(this.current.rightanswer === this.answer){
				this.item = results.ok
				this.result.rightnum += 1
			} else {
				this.item = results.no
				this.result.errornum += 1
			}
		},
		_next(){
			this.index += 1
			this.answer = ['']
			this.showResult = false
			this.unusable = false
		},
		getCurrentTime(){
			this.interval = setInterval(() => {
				this.timetran ++
			},1000)
		},
		
		_checkAnswerIsRight(){
			return this.current.rightanswer === this.answer
		},
	},
	computed:{
		current(){
			if(this.list.length > 0){
				return this.list[this.index]
			}
			return {}
		},
		submintTitie(){
			return this.index < 19?'提交并进入下一题':'提交测试结果'
		},
		timetranFormat(){
			return this.util.formatSeconds(this.timetran)
		}
	}
};
</script>

<style lang="stylus">
		
</style>
