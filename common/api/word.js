const request = require('../httpRequest.js')
class Word {
  /**
   * 列表
   */
  getAll(callback,data) {
    request.request('/user/wordtest','GET').then((res) => {
		callback()
	}).then((err) => {
		console.log(err)
	})
  }
}

export { Word }