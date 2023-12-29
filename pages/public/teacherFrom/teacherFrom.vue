<template>
	<view class="from_box">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item label="姓名">
				<input v-model="userInfo.username" disabled />
			</uni-forms-item>

			<uni-forms-item label="性别" name="sex">
				<view class="form_item" @click="handleShowPicker('sex',formData.sex)">
					<input placeholder="请选择性别" v-model="formData.sex" disabled />
					<uni-icons type="right" size="14" color="#000" style="margin-left: 20px;"></uni-icons>
				</view>
				<!-- <input placeholder="请选择性别" v-model="formData.sex" disabled /> -->
			</uni-forms-item>
			<uni-forms-item label="校内职务">
				<input v-model="formData.position" placeholder="请输入校内职务" />
			</uni-forms-item>
			<uni-forms-item label="入职时间">
				<picker mode="date" fields="month" value="1" @change="handlePickeTime" style="width: 100%;">
					<view class="form_item">
						<input placeholder="请选择入职时间" v-model="formData.enter_date" disabled />
						<uni-icons type="right" size="14" color="#000"></uni-icons>
					</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="现所在单位">
				<input v-model="formData.working_place" placeholder="请输入现所在单位" />
			</uni-forms-item>
			<uni-forms-item label="邮箱">
				<input placeholder="请输入邮箱" v-model="formData.email" />
			</uni-forms-item>
			<uni-forms-item label="联系方式" required name="phone_number">
				<input placeholder="请输入电话号码" v-model="formData.phone_number" :always-embed="true" />
			</uni-forms-item>
			<uni-forms-item label="微信">
				<input placeholder="请输入微信号" v-model="formData.weChat_id" />
			</uni-forms-item>
		</uni-forms>
		<button class="blue_btn" style="margin-top: 120rpx;" @click="handleShow">确认</button>
		<auth-msg :id="userId" ref="mfg"></auth-msg>
	</view>
	<verifyPOP ref="veri" @post="handlePostInfo"></verifyPOP>
	<MyPickerView ref="picker" @submit="submitPicker"></MyPickerView>
</template>

<script>
	import MyPickerView from '@/components/myPickerView.vue'
	import verifyPOP from '@/components/verifyPOP.vue'
	import authMsg from '@/components/authMag.vue'
	export default {
		components: {
			MyPickerView,
			verifyPOP,
			authMsg
		},
		data() {
			return {
				isMY: '',
				userId: '',
				userInfo: {},
				formData: {
					phone_number: '',
					sex: "",
					verify_code: 41321,
					email: "",
					weChat_id: "",
					position: "",
					enter_date: "",
					working_place: ""
				},
				rules: {
					phone_number: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
				}
			};
		},
		onLoad(option) {
			this.isMY = option.userId === undefined
			if (option.info) {
				let info = JSON.parse(decodeURIComponent(option.info));
				this.userId = info.id
				this.userInfo.username = info.username
				this.formData.sex = info.sex
				this.formData.phone_number = info.phone_number
				this.formData.position = info.position
				this.formData.enter_date = info.enter_date
				this.formData.working_place = info.working_place
			} else {
				if (option.userId !== undefined) {
					this.userId = option.userId
					this.$api.getUserInfo(option.userId).then((res) => {
						this.userInfo = res
						this.changeInfo()
					})
				} else {
					this.userInfo = uni.getStorageSync("userInfo")
					this.userId = this.userInfo.id
					this.changeInfo()
				}
			}


		},
		methods: {
			changeInfo() {
				let obj = this.userInfo
				// this.formData.sex = obj.sex === '未知' ? '' : obj.sex
				this.formData.sex = obj.sex
				this.formData.phone_number = obj.phone_number
				this.formData.email = obj.email
				this.formData.weChat_id = obj.weChat_id
				this.formData.position = obj.position
				this.formData.enter_date = obj.enter_date
				this.formData.working_place = obj.working_place
			},
			handleShowPicker(type, value) {
				this.$refs.picker.handleShowPicker1(type, value)
			},
			handlePickeTime(e) {
				this.formData.enter_date = e.detail.value
			},
			// genderChange(e) {
			// 	this.formData.genderIndex = e.target.value
			// },
			submitPicker(value, type) {
				this.formData.sex = value
			},
			handlePostInfo(code) {
				this.formData.verify_code = code
				this.formData.sex = this.formData.sex === '男' ? '男' : '女'
				this.$api.postTeacherInfo(this.formData, this.userId).then((res) => {
					console.log(res)
					this.$refs.veri.changeShow(false)
					if (res.statusCode === undefined || res.statusCode < 400) {
						let isAttest = getApp().globalData.isAttest
						console.log(isAttest)
						if (isAttest) {
							if (this.isMY) {
								this.$api.getUserInfo(this.userId).then((res) => {
									// uni.removeStorageSync('userInfo')
									uni.setStorageSync('userInfo', res)
									// console.log(uni.getStorageSync('userInfo'))
									this.$returnPage()
								})
							} else {
								this.$returnPage()
							}
						} else {
							// debugger
							uni.removeStorageSync("TOKEN")
							console.log(uni.getStorageSync('userInfo'))
							uni.removeStorageSync('userInfo')
							console.log(uni.getStorageSync('userInfo'))
							this.$showMsg('认证成功')
							getApp().login()
							getApp().globalData.isAttest = true
							uni.reLaunch({
								url: "/pages/firstPage/home"
							})
						}
					} else {
						this.$showMsg('保存失败，请重试')
					}
				})
			},
			handleShow() {
				this.$refs.form.validate().then(res => {
					this.$refs.veri.changeShow(true)
				})

			}
		},

	}
</script>

<style lang="scss">
	.form_item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>