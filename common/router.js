/**
 * @author 河畔一角
 * @description 通用的路由跳转文件
 */
const routerPath = {
	'index': '/pages/index/index',
	'my': '/pages/my/my',
	'exam': '/pages/exam/exam',
	'exam-listen': '/pages/exam/listen/listen',
	'exam-word': '/pages/exam/word/word',
	'exam-paper': '/pages/exam/paper/paper',
	'exam-paper-listen-A': '/pages/exam/paper/listen-A/listen-A',
	'exam-paper-listen-B': '/pages/exam/paper/listen-B/listen-B',
	'exam-paper-read-A': '/pages/exam/paper/read-A/read-A',
	'exam-paper-read-B': '/pages/exam/paper/read-B/read-B',
	'exam-paper-read-C': '/pages/exam/paper/read-C/read-C',
	'exam-paper-write-A': '/pages/exam/paper/write-A/write-A',
	'exam-paper-write-B': '/pages/exam/paper/write-B/write-B'
}

module.exports = {
	// 页面跳转
	push(path, option = {}) {
		if (typeof path == 'string') {
			option.path = path;
		} else {
			option = path;
		}
		let url = routerPath[option.path];
		let {
			query = {}, openType, duration
		} = option;
		let params = this.parse(query);
		if (params) {
			url += '?' + params;
		}
		duration ? setTimeout(() => {
			this.to(openType, url);
		}, duration) : this.to(openType, url);
	},
	to(openType, url) {
		let obj = {
			url
		};
		if (openType == 'redirect') {
			uni.redirectTo(obj)
		} else if (openType == 'reLaunch') {
			uni.reLaunch(obj)
		} else if (openType == 'back') {
			uni.navigateBack({
				delta: 1
			})
		} else if (openType == 'switchTab') {
			uni.switchTab(obj)
		}  else {
			uni.navigateTo(obj);
		}
	},
	parse(data) {
		let arr = [];
		for (let key in data) {
			arr.push(key + '=' + data[key]);
		}
		return arr.join('&');
	}
}
