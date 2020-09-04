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
				<view class="blank-container">
					<view class="blank-item">
						{{part.subject.content|formatContent}}
					</view>
					<view class="blank-answer-container">
						<block v-for="item in options" :key="item">
							<view class="option"><text>{{item + 1}}.</text><input type="text" v-model="answer[item].value"></view>
						</block>
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

export default {
	components: {
		mixTree
	},
	filters:{
		formatContent(value){
			return value.replace(/{!}/g,'______')
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
			answer:[],
			startIndex:21,
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
				content:'You will hear a talk about apple pie. For Questions 21–25, fill out the outline with the information you have heard. Use no more than three words or numbers for each blank. You will hear the recording twice.',
				subject:{
					content:'Blue is a cool color. The traditional {!} in the United States is the opposite of red hot music. Blue is {!} and soulful. The color green is natural for trees and grass. But it {!} for humans. A person who {!} may say she feels a little green. A passenger on a boat who is feeling sick from high waves may look very green. The color black is used often in expressions. People describe a day in which everything goes wrong as {!}. The date of a tragedy is remembered as a black day. '
				}
			}
		};
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
		_getMatchNumbers(str,re){
			return ((str || '').match(re) || []).length
		}
	},
	computed:{
		options(){
			return this._getMatchNumbers(this.part.subject.content,/{!}/g)
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
	.blank-container
		.blank-item
			margin-bottom 40rpx
			line-height 1.8	
	.blank-answer-container
		.option
			display flex
			margin-top 24rpx
			input
				border-bottom 1px solid #ddd
				margin-left auto
				width 100%
				text-align center	
</style>
