<template>
	<view>
		<view class="page-container">
			<view class="header">
				{{part.name}}
			</view>
			<view class="main">
				<view class="voice-container">
					<image class="voice" :src="voice" mode="widthFix" @click="broadcast()"></image>
				</view>
				<view class="blank-container">
					<view class="blank-item">
						{{part.detail|formatContent}}
					</view>
					<view class="blank-answer-container">
						<block v-for="item in options" :key="item">
							<view class="option"><text>{{item + 1}}.</text><input type="text" v-model="answer[item].value"></view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<menu-list></menu-list>
	</view>
</template>

<script>
import {Config} from '@/common/config'
import menuList from '@/common/components/menu-list.vue'
const myaudio = wx.createInnerAudioContext();
const voiceImgs = Config.voiceImgs

export default {
	components: {
		menuList
	},
	data() {
		return {
			startIndex:21,
			voice:voiceImgs.stop,
			part:{}
		};
	},
	onLoad() {
		const paper = uni.getStorageSync('paper')		
		this.part = paper.thispaper.thislb
	},
	methods: {
		broadcast() {
			myaudio.src = this.part.voicefile;
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
		}
	},
	computed:{
		options(){
			return this.util.getMatchNumbers(this.part.detail,/{!}/g)
		},
		answer(){
			let result = []
			for (var i = 0; i < this.options; i++) {
				var item = {value: ''};
				result.push(item);
			}
			
			return result
		}
	}
};
</script>

<style lang="stylus">

</style>
