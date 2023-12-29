<template>
	<view class="list_block">
		<view class="box1" @click="gotoDetail">
			<image :src="this.$url+obj.avatar" class="circle" v-if="obj.color==='grey'"></image>
			<image :src="this.$url+obj.avatar" class="circle" v-else
				:style="[{border:(obj.color==='orange'?'4rpx solid #FF8000':'4rpx solid #FDF8D5')}]"></image>
			<image src="@/static/icon/nan.svg" class="sex_icon" v-if="obj.sex==='男'"></image>
			<image src="@/static/icon/nv.svg" class="sex_icon" v-if="obj.sex==='女'"></image>
		</view>
		<view class="box2">
			<view @click="gotoDetail">
				<view class="box2_top">
					<text class="text_name">{{obj.username}}</text>
					<view class="year_orange" v-if="obj.graduation_year">{{obj.graduation_year}}届</view>
					<view class="year_orange" style="color:#0F77FF; background-color:#e4effe;" v-if="obj.great_alumni">
						杰出校友</view>
					<view class="year_orange" style="color:#ffffff; background-color:#fc5531"
						v-if="obj.role==='teacher'">
						教师</view>
				</view>
				<view class="text_college" v-if="obj.role!=='teacher'"><text
						class="rg">{{obj.faculty}}</text>{{obj.subject}}</view>
			</view>
			<view class="right_two_box" @click="gotoAppeal">
				<block v-if="!isApply">
					<view style="display: flex;align-items: center;">
						<block v-if="obj.color==='orange'">
							<image src="@/static/icon/lampO.svg" class="right_icon"></image>
						</block>
						<block v-else>
							帮TA点亮
							<image src="@/static/icon/lampG.svg" class="right_icon" v-if="obj.color==='grey'"></image>
							<image src="@/static/icon/lampY.svg" class="right_icon" v-if="obj.color==='yellow'"></image>
						</block>
					</view>
				</block>
				<slot name='right'></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "alumn",
		props: {
			obj: Object,
			isApply: Boolean
		},
		data() {
			return {

			};
		},
		methods: {
			gotoDetail() {
				if (this.obj.send_user) {
					if (this.isApply) {
						this.$emit('gotoDetail', this.obj.send_user)
					}
				} else {
					if (!this.isApply) {
						console.log("jdirej")
						this.$emit('gotoDetail', this.obj.id)
					}
				}



			},
			gotoAppeal() {
				if (this.obj.color === "orange") {
					uni.showToast({
						title: '该用户已经被认证',
						icon: 'none',
						duration: 2000
					})
				} else {
					this.$emit('gotoAppeal', this.obj)

				}
			},
		},
	}
</script>

<style lang="scss">
	.list_block {
		display: flex;
		padding-top: 24rpx;
	}

	.box1 {
		position: relative;
		padding: 0 24rpx 24rpx 0;

		.circle {
			width: 90rpx;
			height: 90rpx;
			border-radius: 45px;
		}

		.sex_icon {
			width: 35rpx;
			height: 35rpx;
			position: absolute;
			bottom: 30rpx;
			right: 15rpx;
		}
	}

	.box2 {
		padding-bottom: 22rpx;
		width: 100%;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.box2_top {
			display: flex;
			align-items: center;
		}

		.right_two_box {
			font-size: $uni-font-size-fo;
			color: #808080;
		}
	}

	.year_bg {
		background: #F7F7F7;
		color: #808080;
	}

	.text_name1 {
		color: #808080;
	}
</style>