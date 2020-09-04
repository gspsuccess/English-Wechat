<template>
	<view>
		<view class="page-container">
			<view class="header">
				{{part.content}}
			</view>
			<tui-divider dividerColor="#5677fc" color="#5677fc">正文</tui-divider>
			<view class="main">
				<view class="blank-container">
					<view class="blank-item" v-for="(item,index) in part.subject.content" :key="index">
						{{item|formatContent}}
					</view>
					<view class="blank-answer-container">
						<block v-for="item in options" :key="item">
							<view class="option"><text>{{item + 1}}.</text><input type="text" v-model="answer[item].value"></view>
						</block>
					</view>
					<view class="blank-options-container">
						<view class="option" v-for="(item,index) in part.options" :key="index">
							{{item.key}}. {{item.value}}
						</view>
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
				content:'Read the following text with ten numbered gaps (26–35). Choose from the words (A–O) the one which best fits each gap. There are five extra words which you do not need to use. Do not use any word more than once.',
				subject:{
					content:[
						"Happiness is becoming a {!} area in psychological research and even in government {!}，with the UK government {!} a “happiness index”. It’s {!} , though，to {!} exactly what happiness is，and what makes us happy. ",
						"There are two {!} ways of looking at happiness: short-term happiness (a great cookie，a bottle of wine) and long-term happiness ({!})  security，{!} your goals). Both types of happiness are {!}，and important. The problem is，they're often in {!}."
					]
				},
				options:[
					{
						key : 'A',
						value : 'tremendous'
					},
					{
						key : 'B',
						value : 'policy'
					},
					{
						key : 'C',
						value : 'exploring'
					},
					{
						key : 'D',
						value : 'tough'
					},
					{
						key : 'E',
						value : 'define'
					},
					{
						key : 'F',
						value : 'broad'
					},
					{
						key : 'G',
						value : 'financial'
					},
					{
						key : 'H',
						value : 'achieving'
					},
					{
						key : 'I',
						value : 'valid'
					},
					{
						key : 'J',
						value : 'conflict'
					},
					{
						key : 'K',
						value : 'avoid'
					},
					{
						key : 'L',
						value : 'specific'
					},
					{
						key : 'M',
						value : 'primary'
					},
					{
						key : 'N',
						value : 'interfere'
					},
					{
						key : 'O',
						value : 'remembering'
					}
				]
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
			return this._getMatchNumbers(this.part.subject.content.join(','),/{!}/g)
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
	.blank-options-container
		background #f0f0f0
		padding 25rpx
		margin-top 32rpx
		.option
			line-height 1.8	
			border-bottom 1rpx solid #bbb
			margin-bottom 12rpx
			padding-bottom 12rpx
</style>
