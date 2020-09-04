<template>
	<view>
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
	mounted(){
		setTimeout(() => {
			this.treeList = menuList;
		}, 500);
	},
	data() {
		return {
			leftDrawer: false,
			treeList: [],
			treeParams: {
				defaultIcon: '/static/images/i2.png', // 默认图标
				currentIcon: '/static/images/i1.png', // 展开图标
				lastIcon: '/static/images/i3.png', //最后一级图标
				border: true // 边框， 默认不显示
			}
		}
	},
	methods:{
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
			let { id, name, parentId } = item;
			uni.showModal({
				content: `点击了${parentId.length + 1}级菜单, ${name}, id为${id}, 父id为${parentId.toString()}`
			});
			console.log(item);
		}
	}
}
</script>

<style>
	
</style>
