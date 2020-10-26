<template>
	<view>
		<view class="page-container">
			<view class="header">
				Read the following three texts. For Questions 36–50, choose the answer (A, B, C or D) which fits best according to the text. Mark your answers on your ANSWER SHEET 2.
			</view>
			<tui-divider dividerColor="#5677fc" color="#5677fc">正文</tui-divider>
			<view class="main">
				<view class="content-container">
					<view class="content">
						{{part.detail}}
					</view>
				</view>
				<view class="select-container">
					<view class="select-item" v-for="(item,index) in part.info" :key="index">
						<view class="title">{{index + 1}}. {{item.name|formatContent}}</view>
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
import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"

export default {
	components: {
		menuList,
		helangCheckbox
	},
	data() {
		return {
			part:{},
		}
	},
	onLoad(option) {
		let index = 0
		const paper = uni.getStorageSync('paper')
		if(option.id){
			index = option.id - 221
		}
		
		this.part = paper.thispaper.thisrb.text[index]
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
	methods: {
		valueChange(index){
			let data = this.$refs.subject[index].get();   // 组件返回的数据
			console.log(data);
		}
	}
};
</script>

<style lang="stylus">

</style>
