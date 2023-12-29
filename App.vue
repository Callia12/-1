<script>
	import baseUrl from "@/utils/baseUrl.js"
	export default {
		globalData: {
			isAttest: false,
			schoolDetailItem: '',
			courseDetailItem: {},
			videoDetailItem: {},
			moreCourseName: '',
			myCollection: ''
		},
		onLaunch: function() {
			let token = uni.getStorageSync("TOKEN")
			if (token === "undefined" || token === "") {
				this.login()
			} else {
				if (uni.getStorageSync("userInfo")) {
					this.globalData.isAttest = uni.getStorageSync("userInfo").faculty !== "暂未认证"
					this.getUserInfo()
				} else {
					// 普通用户获取用户信息
					this.getUserInfo()
				}
			}
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			getUserInfo() {
				let id = uni.getStorageSync("user")
				this.$api.getUserInfo(id).then(res => {
					if (res.role === 'visitor') {
						uni.navigateTo({
							url: '/pages/public/attestSearch/attestSearch'
						})
					} else {
						this.globalData.isAttest = res.role !== 'visitor' //true，弹窗不显现
					}
					console.log(res)
					uni.setStorageSync('userInfo', res)
					console.log(uni.getStorageSync('userInfo'))
				})
			},
			login() {
				// debugger
				uni.login({
					success: (res) => {
						const code = res.code
						// const code = "jsdhsklds" 
						uni.request({
							url: baseUrl + 'wx_login/',
							data: {
								code: code
							},
							method: "post",
							success: (res) => {
								console.log(res)
								if (res.statusCode == "200") {
									const token = res.data.token; //取出token
									uni.setStorageSync('TOKEN', token);
									uni.setStorageSync('user', res.data.user);
									this.getUserInfo()
									if (getCurrentPages().length != 0) {
										//刷新当前页面的数据
										getCurrentPages()[getCurrentPages().length - 1]
											.onLoad()
									}
								}
							}
						})
					},
				})
			}
		},

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		height: 100vh;
		width: 100%;
		background: #ffffff;
		// overflow-y: hidden;
		font-family: PingFang SC !important;
	}

	uni-page-head .uni-page-head__title {
		font-size: 38rpx !important;
		line-height: 60rpx !important;
		font-weight: bo;
	}

	.text_null {
		text-align: center;
		font-size: $uni-font-size-tr;
		margin-top: 40rpx;
	}

	.care_block {
		padding: 5rpx 12rpx;
		font-size: $uni-font-size-sx;
		background-color: #0F77FF;
		text-align: center;
		display: inline-block;
		color: #FFFFFF;
		font-family: PingFang SC;
	}

	.text_name {
		font-weight: bold;
		color: #1A1A1A;
		font-size: $uni-font-size-sc;
	}

	.text_time {
		color: #808080;
		font-size: $uni-font-size-fo;
	}

	.text_college {
		margin: 8rpx 0;
		color: #808080;
		font-size: $uni-font-size-fo;
		line-height: 34rpx;

		.rg {
			margin-right: 28rpx;
		}
	}

	.right_icon {
		width: 35rpx;
		height: 35rpx;
		margin-left: 15rpx;
	}

	.btm_btnbg {
		width: 100%;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 80rpx
	}

	.blue_btn {
		background: linear-gradient(180deg, #006FFF 0%, rgba(15, 119, 255, 0.7) 100%);
		box-shadow: 0rpx 6rpx 12rpx #0F77FF;
		border-radius: 8rpx;
		color: #FFFFFF;
		line-height: 40rpx;
		width: 464rpx;
		padding: 20rpx 0;
		text-align: center;
		font-size: $uni-font-size-tr;
	}

	.gray_btn {
		text-align: center;
		border-radius: 8rpx;
		background: #F7F7F7;
		line-height: 40rpx;
		color: #808080;
		font-size: $uni-font-size-fo;
		padding: 8rpx 15rpx;
	}

	.year_orange {
		color: #FF8000;
		background: rgba(255, 128, 0, 0.15);
		margin-left: 10px;
		width: 90rpx;
		line-height: 32rpx;
		font-size: $uni-font-size-sx;
		text-align: center;
	}

	.list_tle_block {
		z-index: 100;
		background-color: #FFFFFF;
		display: flex;
		padding: 20rpx 0;
		font-size: $uni-font-size-tr;
		line-height: 40rpx;
		height: 40rpx;
		width: 100%;

		.tle_block {
			min-width: 180rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 30rpx;
		}

		.tle_line {
			width: 40rpx;
			height: 6rpx;
			margin-top: 8rpx;
			background: #0F77FF;
		}

		.tle_clicked {
			color: #0F77FF;
			font-size: $uni-font-size-fr;
		}
	}

	.from_box {
		padding: 24rpx 32rpx;

		.tle {
			font-size: $uni-font-size-fr;
			display: flex;
			align-items: center;
			line-height: 45rpx;
			margin: 45rpx 0 10rpx 0;
		}

		.tle image {
			width: 34rpx;
			height: 34rpx;
			margin-right: 10rpx;
		}


		.uni-forms-item {
			line-height: 40rpx;
			margin-bottom: 12rpx !important;
			border-bottom: 1px solid #E6E6E6;
		}

		.uni-forms-item__label {
			width: 160rpx !important;
			height: 96rpx !important;
			font-size: $uni-font-size-tr !important;
		}

		.uni-forms-item__content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.uni-forms-item__error {
			top: 0;
			line-height: 96rpx;
			right: 50rpx;
			left: auto;
			padding-top: 0;
		}

		/* .uni-forms-item__error.msg--active {
			position: initial;
		} */

		input {
			width: calc(100vw - 300rpx);
			height: 96rpx;
			font-size: $uni-font-size-tr;
		}
	}

	.shade {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 1000;
		top: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>