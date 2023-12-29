<template>
	<view class="from_box">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item label="姓名" name="username" required>
				<input placeholder="请输入姓名" v-model="formData.username" />
			</uni-forms-item>
			<uni-forms-item label="专业">
				<input placeholder="请选择专业" v-model="formData.subject" disabled @click="handleShowPicker('sbj')" />
				<uni-icons type="right" size="14" color="#000"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="班级">
				<input placeholder="请选择班级" v-model="formData._class" disabled @click="handleShowPicker('class')" />
				<uni-icons type="right" size="14" color="#000"></uni-icons>
			</uni-forms-item>
			<uni-forms-item label="毕业年份">
				<input placeholder="请输入毕业年份" v-model="formData.year" />
			</uni-forms-item>
			<view style="float: right;margin-top:60rpx;">
				<view class="btn" :class="isChange?'blue_btn':'gray_btn'" @click="handleSearch">确认</view>
			</view>
		</uni-forms>
	</view>
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
				formData: {
					username: "",
					subject: '',
					graduation_year: '',
					_class: '',
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					}
				},
				isChange: false,
				subjectId: null,
				pickIndex: '', //初始默认选中
			};
		},
		watch: {
			'formData.username': function(val) {
				this.isChange = val.length
			},
		},
		methods: {
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
						this.formData.subject = value.name;
						this.subjectId = value.id
						break;
					case "class":
						this.formData._class = value.class_name;
						break;
				}
			},
			handleSearch() {
				this.$refs.form.validate().then(res => {
					console.log(res)
					uni.navigateTo({
						url: '../aSearchResult/aSearchResult?query=' + encodeURIComponent(JSON.stringify(
							this
							.formData))
					})
				})
			}
		},
	}
</script>

<style lang="scss">
	.btn {
		width: 180rpx;
		padding: 20rpx 0;
		font-size: $uni-font-size-tr;
	}
</style>