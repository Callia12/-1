<template>
	<view class="box1">
		<view style="display: flex;">
			<view style="position: relative;">
				<button class="circle" @click="onChooseAvatar">
					<image :src="this.$url + info.avatar" class="circle"></image>
				</button>
				<image src="@/static/icon/nan.svg" class="sex_icon" v-if="info.sex==='男'"></image>
				<image src="@/static/icon/nv.svg" class="sex_icon" v-if="info.sex==='女'"></image>
			</view>
			<view style="display: flex;flex-direction: column;justify-content: center;">
				<text class="text_name" :style="[{color:(isblack?'#fff': '#333')}]">{{info.username}} </text>
				<text class="text_college">{{info.phone_number}}</text>
			</view>
		</view>
		<image src="../static/icon/icon_light.svg" class="right_icon"></image>
	</view>
	<uni-rate :readonly="true" :value="info.score" :size="14" activeColor="#0F77FF" color="#B1B5B8" margin="-2"
		v-if="!isblack" />
	<view class="box2" :style="[{color:(isblack?'#fff': '#333')}]" v-if="info.role!=='teacher'">
		<view class="block">
			<text class="text_college">学院</text>
			<text>{{info.faculty==null?'-':info.faculty}}</text>
		</view>
		<view class="block" style="text-align: center;">
			<text class="text_college">专业</text>
			<text>{{info.subject==null?'-':info.subject}}</text>
		</view>
		<view class="block">
			<text class="text_college">毕业届</text>
			<text>{{info.graduation_year==null?'-':info.graduation_year}}</text>
		</view>
	</view>
	<view class="box2" :style="[{color:(isblack?'#fff': '#333')}]" v-else>
		<view class="block">
			<text class="text_college">职务</text>
			<text>{{info.role?'教师':'-'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "visitCard",
		props: {
			isblack: Boolean,
			info: Object
		},
		data() {
			return {

			};
		},
		methods: {
			onChooseAvatar(e) {
				/* var fr = new FileReader();
				fr.readAsDataURL(file); */
				wx.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					maxDuration: 30,
					camera: 'back',
					success: (res) => {
						let tempFilePaths = res.tempFiles[0].tempFilePath;
						const token = uni.getStorageSync("TOKEN");
						let header = {
							Authorization: "JWT " + token,
							'Content-Type': 'multipart/form-data;'
						}
						uni.uploadFile({
							url: this.$url + 'user/upload_avatar/', // 上传图片的接口地址
							header: header,
							filePath: tempFilePaths,
							name: 'avatar',
							success: (res) => {
								const data = JSON.parse(res.data);
								this.info.avatar = data.avatar
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	button {
		padding: 0;
	}

	.box1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.circle {
		width: 128rpx;
		height: 128rpx;
		background: #fff;
		border-radius: 100px;
		margin-right: 24rpx;
	}

	.sex_icon {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		bottom: 10rpx;
		right: 25rpx;
	}

	.box2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: $uni-font-size-tr;
		margin-top: 28rpx;
		font-weight: bold;

		.block {
			display: flex;
			flex-direction: column;
		}

		.text_college {
			margin: 0;
		}
	}
</style>