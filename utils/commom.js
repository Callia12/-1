export function showMsg(msg) {
	uni.showToast({
		title: msg,
		icon: "none"
	})
}
export function generateYears(name) {
	let years = []
	// const currentYear = new Date().getFullYear();
	for (let i = 2000; i <= 2099; i++) {
		years.push({
			name: i + name
		});
	}
	return years
}
export function clearArray(arr) {
	arr.forEach((item, index) => {
		let isnull = Object.values(item).every(value => {
			if (Array.isArray(value)) {
				return value.length === 0
			}
			return value === null || value === undefined || value === ''
		})
		if (isnull) {
			arr[index] = {}
		}
	})
	let newarr = arr.filter((item) => Object.keys(item).length !== 0)
	return newarr
}

export function removeUndefinedProperties(obj) {
	for (const key in obj) {
		// obj.hasOwnProperty(key)
		if (obj[key] === '' || obj[key] === undefined) {
			delete obj[key];
		}
	}
	return obj;
}

export function changeObjname(objArray, newPropertyName, oldPropertyName) {
	const newObjArray = objArray.map(obj => {
		const newObj = {
			...obj
		};
		newObj[newPropertyName] = newObj[oldPropertyName];
		delete newObj[oldPropertyName];
		return newObj
	})
	return newObjArray;
}

export function formattedDate(dateStr) {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const formattedDate = `${year}年${month}月${day}日`;
	return formattedDate
}
export function formattedDate2(dateStr) {
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate
}
export function returnPage(dateStr) {
	let pages = getCurrentPages();
	let beforePage = pages[pages.length - 2];
	beforePage.$vm.reFresh = Math.random()
	uni.navigateBack()
}