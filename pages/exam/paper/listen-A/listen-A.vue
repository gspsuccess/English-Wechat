<template>
	<view>
		<view class="page-container">
			<view class="header">
				{{part.content}}
			</view>
			<view class="main">
				<view class="voice-container">
					<image class="voice" :src="voice" mode="widthFix" @click="broadcast()"></image>
				</view>
				<view class="select-container">
					<view class="select-item" v-for="(item,index) in part.info" :key="index">
						<view class="title">{{index + 1}}.</view>
						<helang-checkbox ref="subject" @change="valueChange(index)"></helang-checkbox>
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

import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"

export default {
	components: {
		menuList,
		helangCheckbox
	},
	data() {
		return {
			voice:voiceImgs.stop,
			part:{}
		}
	},
	mounted(){
	    this.$nextTick(()=>{
			for(let i = 0; i < this.part.info.length; i++){
				this.$refs.subject[i].set({
				    type:'radio',   // 类型：单选框
				    // index:1,        // 默认选中的项
				    column:1,       // 分列
				    list:this.part.info[i].select_format
				})
			}
	    })
	},
	onLoad(option) {
		let index = 0
		const paper = uni.getStorageSync('paper')
		if(option.id){
			index = option.id - 111
		}

		this.part = paper.thispaper.thisla.voice[index]
		let name = (index == 0)?'1-' + this.part.info.length:option.name
		this.part.content = 'Questions ' + name + ' are based on the news report on climate change you have just heard.'
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
		},
		valueChange(index){
			let data = this.$refs.subject[index].get();   // 组件返回的数据
			console.log(data);
		}
	}
};
</script>

<style lang="stylus">
	
</style>
