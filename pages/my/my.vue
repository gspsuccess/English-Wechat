<template>
	<view class="container">
		<view class="top-container">
			<view class="user">
				<open-data type="userAvatarUrl" class="avatar-img"></open-data>
				<view class="icon"></view>
				<view class="user-info-mobile">
					<open-data type="userNickName"></open-data>
				</view>
			</view>
		</view>
		<view class="bottom-container">
			<view class="ul-item">
				<view @tap="tapEvent" data-url="my-word" class="item" hover-class="opcity" :hover-stay-time="150">
					<image class="item-img" src="http://img.intelirri.com/word.png"></image>
					<text class="item-name">单词测试</text>
				</view>
				<view @tap="tapEvent" data-url="my-listen" class="item" hover-class="opcity" :hover-stay-time="150">
					<image class="item-img" src="http://img.intelirri.com/listen.png"></image>
					<text class="item-name">听力测试</text>
				</view>
				<view @tap="tapEvent" data-url="exam-true" class="item" hover-class="opcity" :hover-stay-time="150">
					<image class="item-img" src="http://img.intelirri.com/exam.png"></image>
					<text class="item-name">真题测试</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['isLogin', 'mobile']),
		data() {
			return {};
		},
		onShow: function() {},
		methods: {
			logout: function() {
				this.tui.modal("提示", "确定退出登录？", true, (res) => {
					if (res) {
						uni.clearStorage();
						uni.reLaunch({
							url: '/pages/common/login/login'
						});
					}
				})
			},
			tapEvent(e) {
				let url = e.currentTarget.dataset.url
				this.router.push(url)
			}
		}
	};
</script>

<style>
	.container {
		position: relative;
		padding-bottom: 100rpx;
	}

	.top-container {
		height: 440rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		background: #5677FC;
	}

	.bg-img {
		position: absolute;
		width: 100%;
		height: 440rpx;
	}

	.logout {
		width: 110rpx;
		height: 36rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 42rpx 0 24rpx 32rpx;
		position: relative;
		z-index: 2;
	}

	.logout-img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 11rpx;
	}

	.logout-txt {
		font-size: 28rpx;
		color: #fefefe;
		line-height: 28rpx;
	}

	.user-wrapper {
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.user {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.avatar-img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		align-self: center;
		position: relative;
		margin-top:80rpx;
	}
	.icon{
		position: absolute;
		height: 160rpx;
		width: 160rpx;
		border-radius: 50%;
		border: 36rpx solid #5677FC;
		margin-top:80rpx;
		top:-36rpx;
		align-self: center;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		align-items: center;
	}

	.user-info-mobile {
		margin-top: 30rpx;
		position: relative;
		font-size: 28rpx;
		color: #fefefe;
		line-height: 28rpx;
		align-self: center;
		padding: 0 50rpx;
	}

	.edit-img {
		position: absolute;
		width: 42rpx;
		height: 42rpx;
		right: 0;
		bottom: -4rpx;
	}

	.edit-img>image {
		width: 42rpx;
		height: 42rpx;
		padding-left: 25rpx;
	}

	.middle-container {
		height: 138rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 10rpx;
		background-color: #ffffff;
		margin: -30rpx 30rpx 26rpx 30rpx;
		box-shadow: 0 15rpx 10rpx -15rpx #efefef;
		position: relative;
		z-index: 2;
	}

	.middle-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.ticket-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 65rpx;
	}

	.middle-tag {
		font-size: 28rpx;
		color: #333333;
		line-height: 28rpx;
		font-weight: bold;
		padding-left: 22rpx;
	}

	.car-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 97rpx;
	}

	.bottom-container {
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40rpx 74rpx 40rpx 95rpx;
		margin: -30rpx 30rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx #efefef;
		position:relative;
		z-index:2;
	}

	.ul-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.item-img {
		width: 64rpx;
		height: 64rpx;
	}

	.item-name {
		padding-top: 13rpx;
		font-size: 24rpx;
		color: #666666;
		min-width: 80rpx;
		text-align: center;
	}

	.btn-feedback {
		background: transparent !important;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		border: 0;
	}

	.btn-feedback::after {
		border: 0;
	}
</style>
