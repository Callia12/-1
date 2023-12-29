<template>
	<scroll-view scroll-y style="height: 100vh;">
		<view class="from_box">
			<text>信息填写</text>
			<uni-forms ref="form" :modelValue="formData.appeal_info" :rules="rules">
				<uni-forms-item label="姓名" required name="username">
					<input placeholder="请输入姓名" v-model="formData.appeal_info.username" />
				</uni-forms-item>
				<uni-forms-item label="专业" name="subject" required>
					<input placeholder="请选择专业" v-model="formData.appeal_info.subject" disabled
						@click="handleShowPicker('sbj')" />
					<uni-icons type="right" size="14" color="#000"></uni-icons>
				</uni-forms-item>
				<uni-forms-item label="班级" name="class" required>
					<input placeholder="请选择班级" v-model="formData.appeal_info.class" disabled
						@click="handleShowPicker('class')" />
					<uni-icons type="right" size="14" color="#000"></uni-icons>
				</uni-forms-item>
				<uni-forms-item label="身份证" name="id_card" required>
					<input placeholder="请输入你的身份证号" v-model="formData.appeal_info.id_card" />
				</uni-forms-item>
				<uni-forms-item label="手机号码" name="phone_number" required>
					<input placeholder="请输入手机号" v-model="formData.appeal_info.phone_number" />
				</uni-forms-item>
				<view class="tle">
					<image src="@/static/icon/friend.svg"></image>
					<text>邀请3名同班同学认证身份</text>
				</view>
				<view class="from_box2">
					<uni-forms ref="form2" :modelValue="formData.classmate_info" :rules="rules2">
						<uni-forms-item name="username1" required>
							<input placeholder="姓名1" v-model="formData.classmate_info.username1" />
						</uni-forms-item>
						<uni-forms-item name="phone_number1" required>
							<input placeholder="请输入手机号" v-model="formData.classmate_info.phone_number1" />
						</uni-forms-item>
						<uni-forms-item name="username2" required>
							<input placeholder="姓名2" v-model="formData.classmate_info.username2" />
						</uni-forms-item>
						<uni-forms-item name="phone_number2" required>
							<input placeholder="请输入手机号" v-model="formData.classmate_info.phone_number2" />
						</uni-forms-item>
						<uni-forms-item name="username3" required>
							<input placeholder="姓名3" v-model="formData.classmate_info.username3" />
						</uni-forms-item>
						<uni-forms-item name="phone_number3" required>
							<input placeholder="请输入手机号" v-model="formData.classmate_info.phone_number3" />
						</uni-forms-item>
					</uni-forms>
				</view>
				<view style="display: flex;justify-content: center;margin: 40rpx;0 10rpx 0">
					<view class="blue_btn" @click="handleAppeal">提交申请</view>
				</view>
			</uni-forms>
		</view>
	</scroll-view>
	<MyPickerView ref="picker" :queryId='subjectId' @submit="submitPicker"></MyPickerView>
</template>

<script>
	import MyPickerView from '@/components/myPickerView.vue'
	export default {
		components: {
			MyPickerView
		},
		data() {
			return {
				subjectId: null,
				formData: {
					appeal_info: {
						username: "陆欢",
						subject: null,
						class: null,
						id_card: "350661199506036325", // 身份证号码
						phone_number: "17369568956"
					},
					classmate_info: {
						username1: "陈毅",
						phone_number1: "17369862352",
						username2: "陈曦",
						phone_number2: "17396956986",
						username3: "刘希",
						phone_number3: "17369586268"
					}
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					subject: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					class: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					id_card: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					phone_number: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
				},
				rules2: {
					username1: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					username2: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					username3: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					phone_number1: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					phone_number2: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					phone_number3: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
				}
			}
		},
		methods: {
			handleAppeal() {
				this.$refs.form.validate().then(res => {
					this.$refs.form2.validate().then(res => {
						this.$api.postAppeal(this.formData).then((res) => {
							this.$showMsg(res);
							setTimeout(() => {
								let pages = getCurrentPages();
								let beforePage = pages[pages.length - 2];
								beforePage.$vm.reFresh = Math.random()
								uni.navigateBack()
							}, 1500)
						})
					})
				})
			},
			handleShowPicker(type) {
				if (type === 'class' && this.subjectId === null) {
					this.$showMsg("请先选择专业");
				} else {
					this.$refs.picker.handleShowPicker(type)
				}
			},
			submitPicker(value, type) {
				switch (type) {
					case "sbj":
						this.formData.appeal_info.subject = value.name;
						this.subjectId = value.id
						break;
					case "class":
						this.formData.appeal_info.class = value.class_name;
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
	.from_box2 {
		.uni-forms-item__label {
			width: 0 !important;
			height: 96rpx !important;
			font-size: $uni-font-size-tr !important;
		}
	}
</style>
