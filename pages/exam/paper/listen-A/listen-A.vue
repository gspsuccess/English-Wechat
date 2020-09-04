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
					<view class="select-item" v-for="(item,index) in part.list" :key="index">
						<view class="title">{{index + 1}}. {{item.title}}</view>
						<helang-checkbox ref="subject" @change="valueChange(index)"></helang-checkbox>
					</view>
				</view>
			</view>
		</view>
		<tui-fab :left="left" :right="right" :bottom="bottom" :bgColor="bgColor" :btnList="btnList" @click="lDrawer"></tui-fab>
		<!--左抽屉-->
		<tui-drawer mode="left" :visible="leftDrawer" @close="closeDrawer">
			<view class="d-container">
				<view class="tree">
					<mix-tree :list="treeList" :params="treeParams" @treeItemClick="treeItemClick"></mix-tree>
				</view>
				<tui-button height="80rpx" type="primary" @click="closeDrawer">关闭</tui-button>
			</view>
		</tui-drawer>
	</view>
</template>

<script>
import {Config} from '@/common/config'
const myaudio = wx.createInnerAudioContext();
const voiceImgs = Config.voiceImgs
const menuList = Config.menuList

import mixTree from '@/components/mix-tree/mix-tree'
import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"

export default {
	components: {
		mixTree,
		helangCheckbox
	},
	data() {
		return {
			voice:voiceImgs.stop,
			left: 0,
			right: 64,
			bottom: 64,
			bgColor: '#5677fc',
			btnList: [],
			leftDrawer: false,
			treeList: [],
			treeParams: {
				defaultIcon: '/static/images/i2.png', // 默认图标
				currentIcon: '/static/images/i1.png', // 展开图标
				lastIcon: '/static/images/i3.png', //最后一级图标
				border: true // 边框， 默认不显示
			},
			part:{
				voicefile:'http://api.zesi.com.cn/word.mp3',
				content:'Questions 1-3 are based on the news report on climate change you have just heard.',
				list:[
					{
						title:'Which of the following is true according to the passage?',
						items:[
							{option:'A',text:"A. storms"},
							{option:'B',text:"B. drought"},
							{option:'C',text:"C. forest fire"},
							{option:'D',text:"D. tsunami"}
						]
					},
					{
						title:'Which of the following is NOT mentioned as a likely result of obesity?',
						items:[
							{option:'A',text:"A. to cut the water use"},
							{option:'B',text:"B. to find more water"},
							{option:'C',text:"C. to download more fresh data"},
							{option:'D',text:"D. to build more dams"}
						]
					},
					{
						title:'What comments agree with the notion in the quoted blog?',
						items:[
							{option:'A',text:"A. It is difficult"},
							{option:'B',text:"B. It is controversial"},
							{option:'C',text:"C. It is meaningless"},
							{option:'D',text:"D. It is rewarding"}
						]
					}
				]
			}
		};
	},
	mounted(){
	    this.$nextTick(()=>{
			for(let i = 0; i < this.part.list.length; i++){
				this.$refs.subject[i].set({
				    type:'radio',   // 类型：单选框
				    // index:1,        // 默认选中的项
				    column:1,       // 分列
				    list:this.part.list[i].items
				})
			}
	    })
	},
	onLoad() {
		setTimeout(() => {
			this.treeList = menuList;
		}, 500);
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
		closeDrawer(e) {
			this.leftDrawer = false;
			this.rightDrawer = false;
		},
		rDrawer() {
			this.rightDrawer = true;
		},
		lDrawer() {
			this.leftDrawer = true;
		},
		//点击最后一级时触发该事件
		treeItemClick(item) {
			let { id, name, parentId, namekey } = item
			
			let url = 'exam-paper-' + namekey
			this.router.push(url,{openType:"redirect"})
		},
		valueChange(index){
			let data = this.$refs.subject[index].get();   // 组件返回的数据
			console.log(data);
		}
	}
};
</script>

<style lang="stylus">
.page-container
	padding 50rpx
.header
	line-height 1.8
.btn-box
	padding 30rpx
.btn-box:first-child
	margin-top 50rpx
.d-container
	width 400rpx
	padding 48rpx 30rpx
	.tree
		margin-bottom 64rpx
.main
	.voice-container
		margin 32px auto 32px auto
		text-align center
		vertical-align middle
		.voice
			width 240rpx
			height 240rpx
	.select-container
		margin 50rpx 0
		.select-item
			margin-bottom 40rpx
			.title
				line-height 1.8
				font-weight bold
				margin-bottom 24rpx		
</style>
