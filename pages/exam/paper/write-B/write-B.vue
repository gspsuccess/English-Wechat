<template>
	<view>
		<view class="page-container">
			<view class="header">
				{{part.templatearticle}}
			</view>
			<tui-divider dividerColor="#5677fc" color="#5677fc">正文</tui-divider>
			<view class="main">
				<view class="blank-container">
					<view class="blank-item">
						{{part.detail}}
					</view>
					<view class="blank-content" v-if="part.image">
						<image :src="part.image" mode="widthFix"></image>
					</view>
					<view class="blank-answer-container">
						<textarea v-model="answer" placeholder="请输入" />
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
			answer:'',
			part:{}
		};
	},
	onLoad() {
		const paper = uni.getStorageSync('paper')
		this.part = paper.thispaper.thiswa
	},
	methods: {
		
	}
};
</script>

<style lang="stylus">

</style>
