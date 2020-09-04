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
						{{item}}
					</view>
					<view class="blank-content">
						<image :src="part.subject.image" mode="widthFix"></image>
					</view>
					<view class="blank-answer-container">
						<textarea value="" placeholder="请输入" />
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
				content:'注意：请于正式开考后半小时内在答题卡1上完成该部分，之后将进行听力考试。',
				subject:{
					content:[
						"Look at the drawing below and write an essay in no less than 120 words. In your essay, you should",
						"1) describe the drawing briefly;",
						"2) interpret its intended meaning; and",
						"3) give your comments on the phenomenon.",
						"You should write on your ANSWER SHEET 1."
					],
					image:'http://img.intelirri.com/write-partB.png'
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
			margin-bottom 24rpx
			line-height 1.8	
		.blank-content	
			margin 24rpx 0
			image
				width 650rpx
	.blank-answer-container
		textarea
			background #f0f0f0
			padding 25rpx
			width 600rpx
</style>
