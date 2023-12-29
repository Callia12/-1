import {
	createStore
} from 'vuex'
import api from '@/utils/api.js'
const store = createStore({
	state: { //存放状态
		category: {},
		realInfo: {},
		incollection: [],
		outcollection: []
	},
	mutations: {
		setCategory(state, date) {
			state.category = date
		},
		setRealIndo(state, date) {
			state.realInfo = date
		},
		setInCollection(state, date) {
			state.incollection = date
		},
		setOutCollection(state, date) {
			state.outcollection = date
		}
	},
	actions: {
		/* async getCategory({
			commit,
			state
		}) {
			// if (Object.keys(state.category).length === 0) { // 判断是否已经有数据
			if (Object.getOwnPropertyNames(state.category).length === 0) {
				// 使用 Object.getOwnPropertyNames() 判断对象是否为空
				const res = await api.getCategory();
				commit("setCategory", res.data);
			}
			return state.category;
		} */
	},
	getters: {

	}
})

export default store