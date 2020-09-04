<template>
	<view class="page-wrapper">
		<image :src="brand.thumb" mode="widthFix"></image>
		<view class="content">
			<block v-for="(item, index) in brand.content" :key="index">
				<view class="p">{{ item }}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				brand:{
					thumb:'http://img.intelirri.com/brand.jpg',
					content:[
						'深圳壹点壹客食品有限公司于2010年创立，专注于打造欧式蛋糕西点，目前已迅速成为南中国生日蛋糕知名品牌。壹点壹客从创立之初走到现在，始终坚持每一个蛋糕，为每一个客户用心定做。以“选材超优质、生产零库存、品质精工艺、冷链闪送达、顾客优体验”作为企业的宗旨，并在2014年成为国内首个获得“HACCP”国际食品安全认证的电商企业，让每一口蛋糕都享受国际宇航员级别的待遇。',
						'公司共拥有3500平米的厂区、60名资深研发团队、50余辆自有配送专车及配送团队。从产品研发、生产、销售、配送以及完善的售后服务，采用一体化经营，确保优质的产品和服务。',
						'2017年，壹点壹客进行品牌升级，致力于打造成为中国首家生日主题的IP蛋糕品牌，提供贴心温暖的许愿精灵生日会私享服务，唤醒人们过生日时曾经丢失的存在感、仪式感、文化感，构建生日文化超级IP产业链，传播生日文化、庆生文化，将欢乐、幸福、喜悦带给消费者。'
					]
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="stylus">
.page-wrapper
	padding 25rpx 25rpx 50rpx 25rpx
	image
		width 700rpx
		border-radius 12rpx
	.content
		view.p
			font-size 32rpx
			line-height 1.8
			margin-top 32rpx
</style>
