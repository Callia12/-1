<template>
	<view class="contain">
		<uni-forms ref="form" :modelValue="formData" :rules="rules" style="height: 50vh;">
			<uni-forms-item required name="phone_number">
				<input placeholder="请输入联系方式" v-model="formData.phone_number" />
			</uni-forms-item>
			<uni-forms-item required name="content">
				<textarea name="" id="" cols="50" maxlength="99999" placeholder="请输入你遇到的问题" auto-height="true"
					v-model="formData.content"></textarea>
			</uni-forms-item>
		</uni-forms>
	</view>
	<view class="btm_btnbg">
		<button class="blue_btn" @click="submint">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				formData: {
					phone_number: "",
					content: "",
					commit_user: "",
				},
				rules: {
					phone_number: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					content: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
				},
			}
		},
		onLoad() {
			this.formData.phone_number = uni.getStorageSync("userInfo").phone_number
		},
		methods: {
			submint() {
				this.$refs.form.validate().then(res => {
					this.formData.commit_user = uni.getStorageSync("user")
					let data = this.formData
					this.$api.postFeedback(data).then((res) => {
						this.$showmsg("提交成功")
						this.formData.content = ""
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.contain {
		padding: 32rpx;
	}

	input {
		background-color: #F7F7F7;
		border-radius: 8rpx;
		padding: 20rpx 24rpx;
		font-size: $uni-font-size-tr;
		height: auto;
	}

	textarea {
		min-height: 40vh;
		max-height: calc(100vh - 500rpx);
		margin-top: 48rpx;
		width: 100%;
		background-color: #F7F7F7;
		border-radius: 8rpx;
		padding: 20rpx 24rpx;
		font-size: $uni-font-size-tr;
		box-sizing: border-box;
	}
</style>
