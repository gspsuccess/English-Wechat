<template>
	<view>
		<view class="page-container">
			<view class="header">
				{{part.content}}
			</view>
			<tui-divider dividerColor="#5677fc" color="#5677fc">正文</tui-divider>
			<view class="main">
				<view class="blank-container">
					<block v-for="(item,index) in part.subject.content" :key="index">
						<view class="blank-item-container">
							<view class="blank-item" v-for="(citem,cindex) in item" :key="cindex">
								{{citem}}
							</view>
						</view>
					</block>
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
						[
							"If you’re suffering from a bad boss, chances are he or she combines several of these traits and can be dealt with effectively if you use the right strategy. ",
							"The Bully.  During his first week on the job, a new account manager at a small Pennsylvania advertising agency agreed to return some materials to a client.  When he mentioned this at a staff meeting, the boss turned beet red, his lips began to quiver, and he shouted that the new employee should call his client and confess he didn’t know anything about the advertising business and would not be returning the materials.",
							"Over the next few months, as the account manager watched coworkers cower under the boss’s browbeating, he realized that the tyrant (暴君) fed on fear.  Employees who tried the hardest to avoid his fire were most likely to catch it.  “He was like a schoolyard bully,” the manager recalls, “and I’ve known since childhood that, when confronted, most bullies back down.”"
						],
						[
							"Armed with newfound confidence and growing knowledge of the ad business, he matched his boss’s behavior.  “If he raised his voice, I’d raise mine,” the manager recalls.  True to type, the boss started to treat him with grudging respect.  Eventually, the young man moved up the ranks and was rarely subjected to his boss’s outbursts. ",
							"Although standing up to the bully often works, it could make matters worse.  Mardy Grothe recommends a different strategy: reasoning with him after he’s calmed down.  “Some bosses have had a problem with temper control all their lives and are not pleased with this aspect of their personality,” he explains.  Want a litmus test?  If the boss attempts to compensate for an outburst by overreacting and trying to “make nice” the next day, says Grothe, he or she feels guilty about yesterday’s behavior. ",
							"Grothe suggests explaining to your boss how his temper got into you.  For instance, you might say, “I know you’re trying to improve my performance, but yelling makes me less productive because it upsets me.”"
						],
						[
							"Whatever strategy you choose, deal with the bully as soon as possible, because “once a dominant/subservient relationship is established, it becomes difficult to loosen,” warns industrial psychologist James Fisher.  Fisher also suggests confronting your boss behind closed doors whenever possible, to avoid being disrespectful.   ",
							"The Workaholic.  “Some bosses don’t know the difference between work and play,” says Nancy Ahlrichs, vice president of client services at the Indianapolis office of Right Associates, an international outplacement firm.  “If you want to reach them at night or on a Saturday, just call the office.”  Worse, such a boss invades your every waking hour, making it all but impossible to separate your own home life from the office. "
						],
						[
							"Ahlrichs advises setting limits on your availability.  Make sure the boss knows you can be reached in a crisis, but as a matter of practice go home at a set time.  If he responds angrily, reassure him that you will tackle any project first thing in the morning.  Get him to set the priorities, so you can decide which tasks can wait. "
						],
						[
							"If you have good a relation with the boss, says Mardy Grothe, consider discussing the problem openly.  Your goal is to convince him that just as he needs to meet deadlines, you have personal responsibilities that are equally important."
						]
					]
				},
				options:[
					{
						key : 'A',
						value : 'Usually a bad boss behaves terribly in many ways.'
					},
					{
						key : 'B',
						value : 'The boss became very angry when his manager gave his client a favor.'
					},
					{
						key : 'C',
						value : 'The harder a clerk tries not to offend his boss, the more likely he treats them worse.'
					},
					{
						key : 'D',
						value : 'When the manager became more experienced, he fought to win back the respect from his boss.'
					},
					{
						key : 'E',
						value : 'The expert advises us to discuss the problem with your boss in private.'
					},
					{
						key : 'F',
						value : 'A workaholic boss does not allow you to have any spare time.'
					},
					{
						key : 'G',
						value : 'If your boss is angry, you can make him believe he you can deal with the project as soon as possible.'
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
	},
	computed:{
		options(){
			return this.part.subject.content.length
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
		.blank-item-container
			padding 25rpx
			background #f0f0f0
			margin-bottom 32rpx
		.blank-item
			margin 20rpx 0
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
