import baseUrl from "./baseUrl.js"
/* const token =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Ijg3NjQwNjIyNDQxNzY4OTUiLCJleHAiOjE2ODI2Nzc4MDksImlkZW50aWZpZXIiOiI4NzY0MDYyMjQ0MTc2ODk1In0.KuwtDnPqeSMV54xQeT1QFnIRIMMEej6E5hBJcSthX6M' */

function request(method, endpoint, data, query) {
	const token = uni.getStorageSync("TOKEN")
	let header = {
		'Authorization': 'JWT ' + token,
	};
	return new Promise((resolve, reject) => {
		let url = ''
		if (query) {
			url = `${endpoint}?${Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')}`
		} else {
			url = endpoint
		}
		console.log(url)
		uni.request({
			url: baseUrl + url,
			method: method,
			header: header,
			data: method === "POST" ? JSON.stringify(data) : data,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else if (res.statusCode === 401) {
					login()
				} else {
					resolve(res);
					// resolve(res.data.message);
				}
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}

function login() {
	uni.login({
		success: (res) => {
			const code = res.code;
			// const code = "jsdhsklfs"
			uni.request({
				url: baseUrl + 'wx_login/',
				data: {
					code: code
				},
				method: "POST",
				success: (res) => {
					if (res.statusCode == "200") {
						const token = res.data.token; //取出token
						uni.setStorageSync('TOKEN', token);
						if (getCurrentPages().length != 0) {
							//刷新当前页面的数据 todo有错误
							getCurrentPages()[getCurrentPages().length - 1].onLoad()
						}
					}
				}
			})
		},
	})
}

export default {
	request,
	login
}