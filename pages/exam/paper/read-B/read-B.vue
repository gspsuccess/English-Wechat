<template>
	<view>
		<view class="page-container">
			<view class="header">
				{{part.content}}
			</view>
			<tui-divider dividerColor="#5677fc" color="#5677fc">正文</tui-divider>
			<view class="main">
				<view class="content-container">
					<view class="content" v-for="(item,index) in part.subject.content" :key="index">
						{{item}}
					</view>
				</view>
				<view class="select-container">
					<view class="select-item" v-for="(item,index) in part.subject.list" :key="index">
						<view class="title">{{index + 1}}. {{item.title|formatContent}}</view>
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
const menuList = Config.menuList

import mixTree from '@/components/mix-tree/mix-tree'
import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"

export default {
	filters:{
		formatContent(value){
			return value.replace(/{!}/g,'______')
		}
	},
	components: {
		mixTree,
		helangCheckbox
	},
	data() {
		return {
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
				"content":"Read the following three texts. For Questions 36–50, choose the answer (A, B, C or D) which fits best according to the text. Mark your answers on your ANSWER SHEET 2.",
				"subject":{
					"content":[
						"Babies begin to develop their social reasoning skills at 5 months, and they learn to reason about human behavior as early as 6 to 9 months, a new study has found. University of Chicago researcher Amanda Woodward, assistant professor of psychology, has confirmed her first evidence of the early ability of reasoning by infants as yoking as 5 months. \"This is a question that needed to be answered,\" she said. \"Some-thing really neat is going on.\"",
						"Woodward began her experiments in 1994. She has observed 136 babies for her latest project, with parents \"eagerly\" participating. Previous research had determined that babies are aware' of their environment and understand that two objects can't occupy the same space. But Woodward has found that infants younger than 12 months can reliably follow points of gaze and understand action as directed at an object. \"Early in life, infants begin to set up a system of knowledge of human action that has features in common with more mature understandings, and that is distinct from their knowledge of inanimate object motion,\" Woodward says in her research paper, printed in the current issue of the journal Cognition. That system of knowledge \"likely provides the foundation on which later knowledge is built\", according to her theory.",
						"The \"actors\" in Woodward's study were University of Chicago undergraduates who participated in her experiments. Babies saw an actor move and grasp a multicolored ball or a white teddy bear that had been placed side by side. After the toys were switched, the babies watched the actor changing his path of motion and watched the actor grabbing a toy. With the toys as objects, the babies focused on the toys instead of the actor's movements.",
						"In one experiment, half of the 6-month-old babies watched as a claw tool grasped a toy; the other half watched as a hand grasped a toy. Babies who saw the hand focused on the relation between the hand and the object. Babies who saw the claw attended more to the path of motion taken by the claw.",
					],
					"list":[
						{
							"title":"Amanda Woodward believed that {!}",
							"items":[
								{"option":"A","text":"A. babies had already acquired social skills at 6 months"},
								{"option":"B","text":"B. something needed to be done to help babies develop social skills"},
								{"option":"C","text":"C. earlier studies on the ability of reasoning in infants were unreliable"},
								{"option":"D","text":"D. five-month-old babies showed signs of social interaction"}
							]
						},
						{
							"title":"The fact that babies can follow points of gaze indicates that {!}",
							"items":[
								{"option":"A","text":"A. they are well aware that two objects can't occupy the same space"},
								{"option":"B","text":"B. they can distinguish human action from non-human action"},
								{"option":"C","text":"C. they have a system of knowledge about their environment"},
								{"option":"D","text":"D. eager parental participation in their developmental process is crucial"}
							]
						},
						{
							"title":"What Woodward says in Paragraph 2 makes it clear that {!}",
							"items":[
								{"option":"A","text":"A. babies are able to tell human action from non-human action"},
								{"option":"B","text":"B. babies' knowledge of human action and inanimate object motion is quite mature"},
								{"option":"C","text":"C. knowledge of inanimate object motion is the basis for that of human action"},
								{"option":"D","text":"D. babies do not have knowledge of human action early in their life"}
							]
						},
						{
							"title":"Woodward's conclusion that babies begin to develop social reasoning skills is based on her observation that babies {!}",
							"items":[
								{"option":"A","text":"A. usually ignore inanimate object motion"},
								{"option":"B","text":"B. watch eagerly when toys are removed from their sides"},
								{"option":"C","text":"C. can not tel1 a human hand from a claw"},
								{"option":"D","text":"D. pay attention to the relation between the hand and the object"}
							]
						},
						{
							"title":"In light of Woodward's findings, earlier research {!}",
							"items":[
								{"option":"A","text":"A. was incomplete"},
								{"option":"B","text":"B. had no scientific basis"},
								{"option":"C","text":"C. needed to be overthrown"},
								{"option":"D","text":"D. focused too much on the environment"}
							]
						}
					]
				}
			}
		};
	},
	mounted(){
	    this.$nextTick(()=>{
			for(let i = 0; i < this.part.subject.list.length; i++){
				this.$refs.subject[i].set({
				    type:'radio',   // 类型：单选框
				    // index:1,        // 默认选中的项
				    column:1,       // 分列
				    list:this.part.subject.list[i].items
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
	.content-container
		.content
			line-height 1.8
			margin-bottom 24rpx
	.select-container
		margin 50rpx 0
		.select-item
			margin-bottom 40rpx
			.title
				line-height 1.8
				font-weight bold
				margin-bottom 24rpx		
</style>
