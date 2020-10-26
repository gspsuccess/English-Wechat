import util from './util.js'

exports.formatSeconds = (value) => {
	return util.formatSeconds(value)
}

exports.formatDateJoined = (value) => {
	return value.substr(0,19).replace('T',' ')
}

exports.formatContent = (value) => {
	if(value){
		return value.replace(/{!}/g,'______')
	}
	return value
}