import App from './App'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import store from './store'
import api from "@/utils/api.js"
import url from "@/utils/baseUrl.js"
import * as common from '@/utils/commom.js'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$api = api
	app.config.globalProperties.$url = url
	for (const key in common) {
		app.config.globalProperties[`$${key}`] = common[key];
	}
	app.use(store)
	return {
		app
	}
}
// #endif
