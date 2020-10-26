<template>
	<view>
		<view class="page-container" v-if="part.id">
			<view class="header">
				Read the following text with ten numbered gaps (26–35). Choose from the words (A–O) the one which best fits each gap. There are five extra words which you do not need to use. Do not use any word more than once.
			</view>
			<tui-divider dividerColor="#5677fc" color="#5677fc">正文</tui-divider>
			<view class="main">
				<view class="blank-container">
					<view class="blank-item">
						{{part.detail|formatContent}}
					</view>
					<view class="blank-answer-container">
						<block v-for="item in options" :key="item">
							<view class="option"><text>{{item + 1}}.</text><input type="text" v-model="answer[item].value"></view>
						</block>
					</view>
					<view class="blank-options-container">
						<view class="option" v-for="(item,index) in part.select_format" :key="index">
							{{item.key}}. {{item.value}}
						</view>
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
export default {
	components: {
		menuList
	},
	data() {
		return {
			part:{}
		}
	},
	onLoad() {
		const paper = uni.getStorageSync('paper')
		this.part = paper.thispaper.thisra
	},
	methods: {
		broadcast() {
			myaudio.src = this.part.voicefile
			myaudio.autoplay = true
			myaudio.play()
		
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
