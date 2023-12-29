import req from '@/utils/request.js'
const request = req.request
export default {
	getUserInfo: (id) => request('GET', "user/" + id + '/'),
	getFctList: () => request('GET', "faculty/"), //学院
	getFctListYear: (item) => request('GET', 'faculty/?year=' + item), //按条件查询学院
	getSbjList: (id) => {
		if (id) {
			return request('GET', "subject/?faculty=" + id)
		} else {
			return request('GET', "subject/")
		}
	}, //专业
	// getSbjList: (id) => request('GET', "subject/?faculty=" + id), //专业
	getClass: (id) => request('GET', "class/" + id),
	getClubList: () => request('GET', "club/"),
	getCategory: () => request('GET', "category"), //下拉类别
	getAlumnList: (query) => request('GET', "user/", {}, query),
	getApplyList: (query) => request("GET", "message/", {}, query),
	getInformation: (query) => request("GET", "information/", {}, query),
	getOutList: (query) => request("GET", 'great_alumni/', {}, query),
	getDonaList: (query) => request("GET", 'donate/', {}, query),
	getAcquaintance: (query) => request("GET", 'acquaintance', {}, query),
	getAuthMsg: (id) => request('GET', 'user/auth_msg/' + id + '/'),

	postApply: (data) => request("POST", "user/post_friend/", data),
	// postUserInfo: (data, id) => request("POST", "user/" + id + '/', data),
	postUserInfo: (data, id) => request("PATCH", "user/" + id + '/', data),
	// postUserInfo: (query, id) => request("PATCH", "user/" + id + '/', {}, {
	// 	params: query
	// }),
	postTeacherInfo: (data, id) => request("POST", "user/teacher/" + id + '/', data),
	postFeedback: (data) => request("POST", "feed_back/", data),
	postAppeal: (data) => request("POST", "appeal", data),

	search: (query) => request("GET", "search", {}, query),
	getClassMates: () => request('GET', 'user/get_classmates/'), //获取班级数据
	getHelpUser: () => request('GET', 'user/helped_user/'), //获取我的点亮
	getMyFriends: () => request('GET', 'user/friends/'), //获取我的好友
	getInformationDetail: (id) => request('GET', 'information/' + id + '/'),
	getTeacher: (query) => request('GET', 'teacher/', {}, query), //获取教师
	getSearchTeacher: (name) => request('GET', 'teacher/?username=' + name), //按条件查询教师
	getRanking: (query) => request('GET', 'ranking/', {}, query), //获取点亮榜
	getSearchRanking: (name) => request('GET', 'ranking/?username=' + name), //按条件查询点亮榜
	getCourse: () => request('GET', 'v_category/'), //查询学科课程
	getCourseVideo: (id) => request('GET', 'video/?category=' + id), //查询学科视频  
	getCourseCollectionPost: (data) => request('POST', 'v_category/collection/', data), //视频收藏
	getCourseCollection: (name) => request('GET', 'v_category/get_collections/?in_campus=' + name), //获取视频收藏
	deleteCollection: (data) => request('DELETE', 'v_category/del_collect/', data), //取消视频收藏

}