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
				content:'Read the text below and write a summary of it in no more than 80 words in English. You should summarize the text and include the main points of it in your own words. You should neither copy any sentence from the text nor express your personal opinions. You should write your summary on your ANSWER SHEET 2.',
				subject:{
					content:[
						"The folk songs have long been recognized as important keys to the thoughts and feelings of a people, but the dime novels, though sought by the collector and referred to in a general way by the social historians, are dismissed with a smile of amusement by almost everyone else. Neither folk songs nor dime novels were actually created by the plain people of America. But in their devotion to the ways of expression, the people made them their own. The dime novels, intended as it was for the great masses and designed to fill the pockets of both author and publisher, quite naturally sought the lowest common standard: themes that were found to be popular and attitudes that met with the most general approval. Moreover, the dime novels, reflecting a much wider range of attitudes and ideas than the folk songs, are the nearest thing we have had in this country to a true “proletarian” literature, that is, a literature written for the great masses of people and actually read by them.",
						"Although a study of our dime novels alone cannot enable anyone to determine what are the essential characteristics of the American tradition, it can contribute greatly to that end. Sooner or later, the researchers who have done much work in American literature will almost certainly turn their attention to these novels and all that kind. Let no one think, however, that these novels once so eagerly devoured by soldiers, lumberjacks, trainmen, hired girls, and adolescent boys now make exciting or agreeable reading even for the historians. As for the crowds today who get the thrill from the movies and the media, I fear that they would find these books of an earlier age deadly dull."
					]
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
			margin-bottom 40rpx
			line-height 1.8	
	.blank-answer-container
		textarea
			background #f0f0f0
			padding 25rpx
			width 600rpx	
</style>
