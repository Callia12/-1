<template>
	<!-- <scroll-view scroll-y="true" style="height:100vh"> -->
	<view class="from_box">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<block>
				<uni-forms-item label="姓名">
					<input v-model="userInfo.username" disabled />
				</uni-forms-item>
				<uni-forms-item label="学院">
					<input v-model="userInfo.faculty" disabled />
				</uni-forms-item>
				<uni-forms-item label="专业">
					<input v-model="userInfo.subject" disabled />
				</uni-forms-item>
				<uni-forms-item label="班级">
					<input v-model="userInfo.class_name" disabled />
				</uni-forms-item>
			</block>
			<block>
				<uni-forms-item label="性别" required name="sex">
					<view class="form_item" @click="handleShowPicker('sex',formData.sex)">
						<input placeholder="请选择性别" v-model="formData.sex" disabled />
						<uni-icons type="right" size="14" color="#000"></uni-icons>
					</view>
				</uni-forms-item>

				<uni-forms-item label="联系方式" name="phone_number" required>
					<input placeholder="请输入电话号码" v-model="formData.phone_number" />
				</uni-forms-item>
				<uni-forms-item label="微信" name="weChat_id">
					<input placeholder="请输入微信号" v-model="formData.weChat_id" />
				</uni-forms-item>
				<uni-forms-item label="邮箱" name="email" format>
					<input placeholder="请输入邮箱" v-model="formData.email" />
				</uni-forms-item>

				<uni-forms-item label="籍贯" name="native_place" required>
					<input placeholder="请输入籍贯" v-model="formData.native_place" />
				</uni-forms-item>

				<uni-forms-item label="所在位置(当前)" name="location">
					<picker mode="region" @change="handlePickAddress" :value="regionValue" id="location">
						<view class="form_item">
							<input placeholder="请选择所在位置" v-model="formData.location" disabled />
							<uni-icons type="right" size="14" color="#000"></uni-icons>
						</view>
					</picker>
				</uni-forms-item>
			</block>

			<uni-forms-item label="是否毕业" name="phone_number">
				<radio-group @change="handleRadio">
					<radio value="true" :checked="isgrad" color="#0F77FF" style="transform:scale(0.7)" />是
					<radio value="false" :checked="!isgrad" color="#0F77FF" style="transform:scale(0.7)" />否
				</radio-group>
			</uni-forms-item>
			<block v-if="isgrad">
				<view class="tle">
					<view>
						<image src="../../../static/icon/icon_work.svg"></image>
						<text>就业信息</text>
					</view>
					<view>
						<text style="color: #0F77FF ;font-size: 14px;" @click="delAll('work_experience')">重置</text>
					</view>
				</view>
				<block v-for="(item, index) in formData.work_experience" :key="index">
					<!-- 隐藏表单 -->
					<view
						v-if="expandedIndex !== index&& item.enter_date && item.departure_date&& item.name&& item.profession&& item.company_nature&& item.department&& item.position&& item.address"
						class="importantContent">
						<view>{{formData.work_experience[index].name}}</view>
						<view>{{formData.work_experience[index].position}}</view>
						<uni-icons custom-prefix="forward" type="forward" size="15"
							@click="expandedIndex = index"></uni-icons>
					</view>

					<!-- 显示表单 -->
					<view v-else>
						<uni-forms-item label="工作年限">
							<picker mode="date" fields="month" value="1" @change="handlePickeTime" id="1"
								:data-index="index">
								<input placeholder="请选择入职时间" v-model="formData.work_experience[index].enter_date"
									style="width: 200rpx;" disabled />
							</picker>
							<text>至&nbsp;&nbsp;&nbsp;</text>
							<picker mode="date" fields="month" value="1" @change="handlePickeTime" id="2"
								:data-index="index">
								<input placeholder="请选择离职时间" v-model="formData.work_experience[index].departure_date"
									style="width: 220rpx;" disabled />
							</picker>
						</uni-forms-item>
						<uni-forms-item label="入职公司">
							<input placeholder="请输入入职公司" v-model="formData.work_experience[index].name" />
						</uni-forms-item>
						<uni-forms-item label="所属行业">
							<view class="form_item" @click="handleShowPicker('prf',item.profession,index)">
								<input placeholder="请选择公司所属行业" v-model="formData.work_experience[index].profession"
									disabled />
								<uni-icons type="right" size="14" color="#000"></uni-icons>
							</view>
						</uni-forms-item>
						<uni-forms-item label="公司性质">
							<view class="form_item" @click="handleShowPicker('nat',item.company_nature,index)">
								<input placeholder="请选择公司性质" v-model="formData.work_experience[index].company_nature"
									disabled />
								<uni-icons type="right" size="14" color="#000"></uni-icons>
							</view>
						</uni-forms-item>
						<uni-forms-item label="工作部门">
							<input placeholder="请输入工作部门" v-model="formData.work_experience[index].department" />
						</uni-forms-item>
						<uni-forms-item label="工作职位">
							<view class="form_item" @click="handleShowPicker('pos',item.position,index)">
								<input placeholder="请选择工作职位" v-model="formData.work_experience[index].position"
									disabled />
								<uni-icons type="right" size="14" color="#000"></uni-icons>
							</view>
						</uni-forms-item>
						<uni-forms-item label="公司地址" name="phone_number">
							<picker mode="region" @change="handlePickAddress" :id="index"
								:value="formData.work_experience[index].address">
								<view class="form_item">
									<input placeholder="请选择公司地址" v-model="formData.work_experience[index].address"
										disabled />
									<uni-icons type="right" size="14" color="#000"></uni-icons>
								</view>
							</picker>
						</uni-forms-item>
					</view>


				</block>
				<view style="display: flex;flex-direction: column; align-items: center;">
					<view style="display: flex;flex-direction: row; justify-content: space-around;width: 100%;">
						<view class="add_btn" @click="handleAdd('work_experience')"> 新增</view>
						<view class="add_btn" @click="handleDelete('work_experience')" style="color:#808080;">删除</view>
					</view>
					<view>
						<button class="btn_save" type="submit" @click.prevent="saveForm('work_experience')">保存</button>
					</view>
				</view>
			</block>
			<!-- 教育经历 -->
			<block>
				<view class="tle">
					<view>
						<image src="../../../static/icon/icon_edu.svg"></image>
						<text>其他教育经历</text>
					</view>
					<view>
						<text style="color: #0F77FF ;font-size: 14px;" @click="delAll('educational_bg')">重置</text>
					</view>
				</view>

				<block v-if="formData.educational_bg" v-for="(item, index) in formData.educational_bg" :key="index">
					<!-- 隐藏表单 -->
					<view
						v-if="expandedIndex !== index&& item.education && item.college&& item.subject&& item.stime&& item.etime"
						class="importantContent">
						<view>{{formData.educational_bg[index].education}}</view>
						<view>{{formData.educational_bg[index].college}}</view>
						<uni-icons custom-prefix="forward" type="forward" size="15"
							@click="expandedIndex = index"></uni-icons>
					</view>
					<!-- 展开表单 -->
					<view class="myForm" v-else>
						<uni-forms-item label="学历" name="education">
							<view class="form_item">
								<input placeholder="请填写学历" v-model="formData.educational_bg[index].education" />
							</view>
						</uni-forms-item>
						<uni-forms-item label="学校" name="college">
							<view class="form_item">
								<input placeholder="请填写学校" v-model="formData.educational_bg[index].college" />
							</view>
						</uni-forms-item>
						<uni-forms-item label="专业" name="subject">
							<view class="form_item">
								<input placeholder="请填写专业" v-model="formData.educational_bg[index].subject" />
							</view>
						</uni-forms-item>
						<uni-forms-item label="毕业时间">
							<picker mode="date" fields="month" value="1" @change="handlePickeTime" id="3"
								:data-index="index">
								<input placeholder="请选择入学时间" v-model="formData.educational_bg[index].stime"
									style="width: 200rpx;" disabled />
							</picker>
							<text>至&nbsp;&nbsp;&nbsp;</text>
							<picker mode="date" fields="month" value="1" @change="handlePickeTime" id="4"
								:data-index="index">
								<input placeholder="请选择毕业时间" v-model="formData.educational_bg[index].etime"
									style="width: 220rpx;" disabled />
							</picker>
						</uni-forms-item>

					</view>
				</block>
				<view style="display: flex;flex-direction: column; align-items: center;">
					<view style="display: flex;flex-direction: row; justify-content: space-around;width: 100%;">
						<view class="add_btn" @click="handleAdd('educational_bg')"> 新增</view>
						<view class="add_btn" style="color:#808080;" @click="handleDelete('educational_bg')">删除
						</view>
					</view>
					<view>
						<button class="btn_save" type="submit" @click.prevent="saveForm('educational_bg')">保存</button>
					</view>
				</view>
			</block>
			<!-- 社团部分 -->
			<block>
				<view class="tle">
					<view>
						<image src="../../../static/icon/icon_clue.svg"></image>
						<text>校内社团经历</text>
					</view>

					<view>
						<text style="color: #0F77FF ;font-size: 14px;" @click="delAll('club')">重置</text>
					</view>
				</view>

				<block v-for="(item,index) in formData.club" :key="index">
					<!-- 隐藏表单 -->
					<view v-if="expandedIndex !== index && item.name && item.club_position" class="importantContent">
						<view>{{formData.club[index].name}}</view>
						<view>{{formData.club[index].club_position}}</view>
						<uni-icons custom-prefix="forward" type="forward" size="15"
							@click="expandedIndex = index"></uni-icons>
					</view>

					<block v-else>
						<uni-forms-item label="社团" name="name">
							<view class="form_item" @click="handleShowPicker('cln',formData.club[index].name,index)">
								<input placeholder="请选择社团" v-model="formData.club[index].name" disabled />
								<uni-icons type="right" size="14" color="#000"></uni-icons>
							</view>
						</uni-forms-item>
						<uni-forms-item label="担任职位" name="club_position">
							<view class="form_item"
								@click="handleShowPicker('clp',formData.club[index].club_position,index)">
								<input placeholder="请选择担任职位" v-model="formData.club[index].club_position" disabled />
								<uni-icons type="right" size="14" color="#000"></uni-icons>
							</view>
						</uni-forms-item>
					</block>



				</block>
				<view style="display: flex;flex-direction: column; align-items: center;">
					<view style="display: flex;flex-direction: row; justify-content: space-around;width: 100%;">
						<view class="add_btn" @click="handleAdd('club')"> 新增</view>
						<view class="add_btn" @click="handleDelete('club')" style="color:#808080;">删除</view>
					</view>
					<view>

						<button class="btn_save" type="submit" @click.prevent="saveForm('club')">保存</button>
					</view>
				</view>

			</block>

			<!-- 荣誉部分 -->
			<block>
				<view class="tle">
					<view>
						<image src="../../../static/icon/icon_clue.svg"></image>
						<text>所获荣誉</text>
					</view>
					<view>
						<text style="color: #0F77FF ;font-size: 14px;" @click="delAll('prize')">重置</text>
					</view>
				</view>
				<view class="text_box">
					{{prize}}
					<textarea placeholder="请输入自入学以后至今所获得主要的荣誉   &nbsp;&nbsp;&nbsp;格式:xxxx年xx月    荣誉名称  级别"
						v-model="formData.prize" placeholder-class="place-holder"></textarea>
				</view>
			</block>
		</uni-forms>
		<button class="blue_btn" style="margin: 120rpx auto 50rpx auto; " @click="handleShow">确认</button>
		<auth-msg :ids="userId" ref="mfg"></auth-msg>
	</view>
	<!-- </scroll-view> -->
	<verifyPOP ref="veri" @post="handlePostInfo"></verifyPOP>
	<MyPickerView ref="picker" @submit="submitPicker"></MyPickerView>
</template>

<script>
	import regionData from '@/static/region.json'
	import MyPickerView from '@/components/myPickerView.vue'
	import verifyPOP from '@/components/verifyPOP.vue'
	import authMsg from '@/components/authMag.vue'
	export default {
		components: {
			MyPickerView,
			verifyPOP,
			authMsg,
		},
		data() {
			return {
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						color: '#4893F4',
						radius: '30px'
					}
				},
				regionList: regionData.provinces,
				userInfo: {},
				formData: {
					verify_code: "",
					sex: null,
					location: [],
					work_experience: [],
					club: [],
					educational_bg: [],
				},
				rules: {
					sex: {
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
					native_place: {
						rules: [{
							required: true,
							errorMessage: '必填',
						}, ]
					},
					email: {
						rules: [{
							format: 'email',
							errorMessage: '无效的邮箱号',
						}, ]
					},
				},
				isgrad: "",
				faculty_id: "",
				indexEdu: '',
				userId: '',
				isMY: '',
				regionValue: '',
				keyboardHeight: 0,
				showForm: true,
				expandedIndex: -1,
				handle_only: "",
				prize: ''
			};
		},
		onLoad(option) {
			// debugger
			this.isMY = option.userId === undefined
			if (option.info) {
				console.log(info)
				let info = JSON.parse(decodeURIComponent(option.info));
				this.userId = info.id
				this.userInfo.username = info.username
				this.userInfo.faculty = info.faculty
				this.userInfo.subject = info.subject
				this.userInfo.class_name = info.class_name
				this.formData.sex = info.sex
				this.formData.phone_number = info.phone_number
				this.formData.native_place = info.native_place
				this.formData.email = info.email
				this.formData.weChat_id = info.weChat_id
				this.formData.prize = info.prize
				this.formData.verify_code = info.verify_code
				if (info.district) {
					let location = info.province + ',' + info.city + "," + info.district
					this.formData.location = location.split(",")
				} else {
					this.formData.location = []
				}

				if (info.work_experience.length !== 0) {
					this.isgrad = true
					this.formData.work_experience = this.$changeObjname(info.work_experience, "name", "company_name")
				}
				if (info.club.length !== 0) {
					this.formData.club = this.$changeObjname(info.club, "name", "club_name")
				}
				if (info.educational_bg.length !== 0) {
					console.log(info.educational_bg)
					this.formData.educational_bg = info.educational_bg
				}

			} else {
				if (option.userId !== undefined) {
					this.userId = option.userId
					this.$api.getUserInfo(option.userId).then((res) => {
						this.userInfo = res
						// console.log(this.userInfo)
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
				// debugger
				let obj = this.userInfo
				console.log(obj)
				if (obj.email || obj.weChat_id || obj.prize) {
					this.formData.email = obj.email
					this.formData.weChat_id = obj.weChat_id
					this.formData.prize = obj.prize
				}
				this.formData.sex = obj.sex === '未知' ? '' : obj.sex
				if (obj.district) {
					this.formData.location.push(obj.province, obj.city, obj.district);
				} else {
					this.formData.location = []
				}
				this.formData.phone_number = obj.phone_number
				this.formData.native_place = obj.native_place
				if (obj.work_experience.length !== 0) {
					this.isgrad = true
					this.formData.work_experience = this.$changeObjname(obj.work_experience, "name",
						"company_name")
				}
				if (obj.club.length !== 0) {
					this.formData.club = this.$changeObjname(obj.club, "name", "club_name")
				}
				if (obj.educational_bg.length > 0) {
					this.formData.educational_bg = obj.educational_bg
				}
			},
			handleShow() {
				this.$refs.form.validate().then(res => {
					this.$refs.veri.changeShow(true)
				}).catch(err => {
					this.$showMsg('未填写完整或填写错误')
				})
			},
			handlePostInfo(code) {
				//验证码输入的内容
				// debugger
				this.formData.verify_code = code
				if (code) {
					console.log(this.formData.sex)
					this.formData.sex = this.formData.sex === '男' ? 'male' : 'female'
					let date = this.formData
					// console.log(date)
					this.$api.postUserInfo(date, this.userId).then((res) => {
						this.$refs.veri.changeShow(false)
						if (res.statusCode === undefined || res.statusCode < 400) {
							let isAttest = getApp().globalData.isAttest
							if (isAttest) {
								if (this.isMY) {
									this.$api.getUserInfo(this.userId).then((res) => {
										uni.setStorageSync('userInfo', res)
										this.$returnPage()
									})
								} else {
									// this.$returnPage()
									// uni.reLaunch({
									// 	url: "/pages/connections/connections"
									// })
									uni.navigateTo({
										url: "../../personal/lighting/lighting?param1=1"
									})
								}
							} else {
								uni.removeStorageSync("TOKEN")
								uni.removeStorageSync('userInfo')
								this.$showMsg('认证成功')
								getApp().login()
								getApp().globalData.isAttest = true
								uni.reLaunch({
									url: '/pages/firstPage/home'
								});
							}
						} else {
							this.$showMsg('保存失败，请重试!!')
						}
					})
				} else {
					this.$showMsg('请填写验证码')
				}
			},
			handleShowPicker(type, value, ind) {
				this.indexEdu = ind
				if (type === 'sbj') {
					let obj = this.formData.educational_bg[ind]
					let id = obj.faculty_id !== '' ? obj.faculty_id : this.faculty_id
					if (obj.faculty) {
						this.$refs.picker.handleShowPicker1(type, value, ind, id)
					} else {
						this.$showMsg("请先选择学院")
					}
				} else if (type === 'clp' && this.formData.club[ind].name === "") {
					this.$showMsg("请先选择社团");
				} else if (type === 'pos') {
					let id = this.formData.work_experience[ind].company_nature
					if (id) {
						this.$refs.picker.handleShowPicker1(type, value, ind, id)
					} else {
						this.$showMsg("请先选择公司性质");
					}
				} else {
					this.$refs.picker.handleShowPicker1(type, value, ind)
				}
			},
			submitPicker(value, type) {
				let ind = this.indexEdu
				switch (type) {
					case "sex":
						this.formData.sex = value;
						break;
					case "cln":
						this.formData.club[ind].name = value.name;
						this.formData.club[ind].c_id = value.id;
						break;
					case "clp":
						this.formData.club[ind].club_position = value;
						break;
					case "prf":
						this.formData.work_experience[ind].profession = value.name;
						break;
					case "nat":
						this.formData.work_experience[ind].company_nature = value.name;
						break;
					case "pos":
						this.formData.work_experience[ind].position = value.name;
						break;
				}
			},
			handlePickeTime(e) {
				let index = e.target.dataset.index
				console.log(index)
				if (e.currentTarget.id === "1") {
					this.formData.work_experience[index].enter_date = e.detail.value
				} else if (e.currentTarget.id === "2") {
					this.formData.work_experience[index].departure_date = e.detail.value
				} else if (e.currentTarget.id === "3") {
					this.formData.educational_bg[index].stime = e.detail.value
				} else if (e.currentTarget.id === "4") {
					this.formData.educational_bg[index].etime = e.detail.value
				}
			},
			handlePickAddress(e) {
				if (e.currentTarget.id === 'location') {
					this.formData.location = e.detail.value
				} else {
					this.formData.work_experience[e.currentTarget.id].address = e.detail.value.join('')
				}
			},
			handleRadio(e) {
				this.isgrad = e.detail.value === 'true';
			},

			// 保存
			saveForm(section) {
				if (section === 'educational_bg') {
					this.expandedIndex = this.formData.educational_bg.length;
					let query = {
						handle_only: section,
						educational_bg: Object.values(this.formData.educational_bg).map(proxyObj => {
							const educationalObj = Object.fromEntries(
								Object.entries(proxyObj).map(([key, value]) => [key, value])
							);
							return {
								education: educationalObj.education,
								college: educationalObj.college,
								subject: educationalObj.subject,
								stime: educationalObj.stime,
								etime: educationalObj.etime
							};
						})
					};
					console.log(query)
					this.$api.postUserInfo(query, this.userId).then((res) => {
						// console.log(res)
						if (res === "保存成功") {
							this.$api.getUserInfo(this.userId).then((res) => {
								// console.log(res)
								uni.setStorageSync('userInfo', res)
								uni.showToast({
									title: '保存成功',
									duration: 2000
								});
								// this.$returnPage()
							})

						}
					})
				} else if (section === 'club') {
					this.expandedIndex = this.formData.club.length;
					let query = {
						handle_only: section,
						club: Object.values(this.formData.club).map(proxyObj => {
							const clubObj = Object.fromEntries(
								Object.entries(proxyObj).map(([key, value]) => [key, value])
							);
							return {
								club_position: clubObj.club_position,
								name: clubObj.name,
								c_id: clubObj.c_id
							};
						})
					};
					console.log(query)
					this.$api.postUserInfo(query, this.userId).then((res) => {
						// console.log(res)
						if (res === "保存成功") {
							this.$api.getUserInfo(this.userId).then((res) => {
								// console.log(res)
								uni.setStorageSync('userInfo', res)
								uni.showToast({
									title: '保存成功',
									duration: 2000
								});
								// this.$returnPage()
							})

						}
					})

				} else if (section === 'work_experience') {
					this.expandedIndex = this.formData.work_experience.length;
					let query = {
						handle_only: section,
						work_experience: Object.values(this.formData.work_experience).map(proxyObj => {
							const workObj = Object.fromEntries(
								Object.entries(proxyObj).map(([key, value]) => [key, value])
							);
							// item.enter_date && item.departure_date&& item.name&& item.profession&& item.company_nature&& item.department&& item.position&& item.address
							return {
								enter_date: workObj.enter_date,
								departure_date: workObj.departure_date,
								name: workObj.name,
								profession: workObj.profession,
								company_nature: workObj.company_nature,
								department: workObj.department,
								position: workObj.position,
								address: workObj.address,
							};
						})
					};
					console.log(query)
					this.$api.postUserInfo(query, this.userId).then((res) => {
						console.log(res)
						if (res === "保存成功") {
							this.$api.getUserInfo(this.userId).then((res) => {
								// console.log(res)
								uni.setStorageSync('userInfo', res)
								uni.showToast({
									title: '保存成功',
									duration: 2000
								});
								// this.$returnPage()
							})
						}
					})

				}

			},
			// 新增
			handleAdd(name) {
				if (name === 'club') {
					const newFormData = [...this.formData[name]]; // 克隆 formData
					// this.formData[name].push(this[name]);
					// 创建一个空的表单对象
					const clubForm = {
						club_position: '',
						c_id: null,
						name: ''
					};

					// 将空的表单对象添加到 formData 数组中
					this.formData[name].push(clubForm);
					// 将 expandedIndex 设置为新项的索引
					this.expandedIndex = this.formData[name].length - 1;
				} else if (name === 'educational_bg') {
					const newFormData = [...this.formData[name]];
					// 创建一个空的表单对象
					const educationalForm = {
						education: "",
						college: "",
						subject: "",
						stime: "",
						etime: ""
					};
					this.formData[name].push(educationalForm);
					this.expandedIndex = this.formData[name].length - 1;
				} else if (name === 'work_experience') {
					const newFormData = [...this.formData[name]];
					// 创建一个空的表单对象
					const workForm = {
						enter_date: "",
						departure_date: "",
						name: "",
						profession: "",
						company_nature: "",
						department: '',
						position: '',
						address: ''
					};
					this.formData[name].push(workForm);
					this.expandedIndex = this.formData[name].length - 1;
				}
			},
			// 删除
			handleDelete(name) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: (res) => {
						if (res.confirm) {
							// 点击确认按钮，触发 saveForm 方法
							if (this.formData[name].length > 0) {
								this.formData[name].pop()
								this.saveForm(name);
							} else {
								uni.showToast({
									title: '没有更多的数据了',
									duration: 2000
								});
							}

						}
					}
				});
			},
			// 重置
			delAll(name) {
				uni.showModal({
					title: '提示',
					content: '确定要重置吗？',
					success: (res) => {
						if (res.confirm) {
							if (this.formData[name].length > 0) {
								this.formData[name] = []
								this.saveForm(name);
							} else {
								uni.showToast({
									title: '没有更多数据了',
									duration: 2000
								});
							}

						}
					}
				});
			}
		}


	}
</script>

<style lang="scss">
	.from_box {
		height: 100vh;
		overflow: auto;
		padding: 24rpx 32rpx;

		picker {
			width: 100%;
		}

		.form_item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.tle {
			font-size: $uni-font-size-fr;
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 45rpx;
			margin: 45rpx 0 10rpx 0;
		}

		.tle image {
			width: 34rpx;
			height: 34rpx;
			margin-right: 10rpx;
		}

		.pickIpt {
			line-height: 96rpx;
		}

		.add_btn {
			margin-top: 24rpx;
			width: 300rpx;
			line-height: 80rpx;
			border-radius: 8rpx;
			background: #F7F7F7;
			color: #0F77FF;
			font-size: $uni-font-size-tr;
			text-align: center;
		}

		.btn_save {
			margin-top: 24rpx;
			border-radius: 8rpx;
			font-size: $uni-font-size-tr;
			text-align: center;
			line-height: 90rpx;
			width: 650rpx;
			color: white;
			background: radial-gradient(#4893F4 100%, #0F77FF 100%);
			box-shadow: 0px 0px 6px 0px #0F77FF;
		}

		.importantContent {
			display: flex;
			justify-content: space-between;
			width: 100%;
			font-family: UICTFontTextStyleBody;
			font-size: 28rpx;
			color: #333333;
			margin-top: 10px;
		}

		.text_box {
			display: flex;
			justify-content: center;
			align-items: center;

			textarea {
				width: calc(100vw - 200rpx);
				margin-top: 10px;
				border: 1px solid #E6E6E6;
				padding: 10rpx;
			}

			.place-holder {
				font-size: 12px !important;
			}


		}


	}
</style>