import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/httpRequest'
import router from './common/router'
import util from './common/util'
import './common/stylus/common.styl'

Vue.config.productionTip = false
// #ifdef H5
window.QQmap = null;
// #endif
// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
	uni.onNetworkStatusChange(function(res) {
		//console.log(res.networkType);
		store.commit("networkChange", {
			isConnected: res.isConnected
		})
	});
}, 100)
// #endif

Vue.prototype.tui = tui
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
Vue.prototype.router = router
Vue.prototype.util = util
App.mpType = 'app'

import * as filters from './common/filters.js'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const app = new Vue({
	store,
	...App
})
app.$mount()