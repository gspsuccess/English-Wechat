/**
 * 获取数组中的某一列
 * @param {Object} arr
 * @param {Object} column
 */
function arrayColumn(arr, column) {
	return arr.map(x => x[column])
}

/**
 * 获取当前时间戳（秒）
 */
function getTimeStamp() {
	return Date.parse(new Date()) / 1000
}

/**
 * @param {Object} str
 * @param {Object} re
 */
function getMatchNumbers(str,re){
	return ((str || '').match(re) || []).length
}

/**
 * 格式化时间（秒变为时分秒)
 * @param {Object} value
 */
function formatSeconds(value) {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	
	if(secondTime < 10){
		secondTime = '0' + secondTime
	}
	if(minuteTime < 10){
		minuteTime = '0' + minuteTime
	}
	if(hourTime < 10){
		hourTime = '0' + hourTime
	}

	let result = hourTime + ':' + minuteTime + ':' + secondTime
	
	return result;
}

/**
 * 格式化试卷内容
 * @param {Object} paper
 */
function formatPaper(paper){
	//听力PartA格式化
	for(let item of paper.thispaper.thisla.voice){
		for(let citem of item.info){
			let select = JSON.parse(citem.select)
			
			let items = []
			for(let key in select){
				items.push({
					option:key,
					text:key + '. ' + select[key]
				})
			}
			citem.select_format = items
		}
	}
	
	//阅读PartA格式化
	paper.thispaper.thisra.select = JSON.parse(paper.thispaper.thisra.select)
	let items_ra = []
	for(let key in paper.thispaper.thisra.select){
		items_ra.push({
			key:key,
			value:paper.thispaper.thisra.select[key]
		})
	}
	paper.thispaper.thisra.select_format = items_ra
	
	//阅读PartB格式化
	for(let item of paper.thispaper.thisrb.text){
		for(let citem of item.info){
			let select = JSON.parse(citem.select)
			
			let items = []
			for(let key in select){
				items.push({
					option:key,
					text:key + '. ' + select[key]
				})
			}
			citem.select_format = items
		}
	}
	
	paper.thispaper.thisrc.select = JSON.parse(paper.thispaper.thisrc.select)
	let items_rc = []
	for(let key in paper.thispaper.thisrc.select){
		items_rc.push({
			key:key,
			value:paper.thispaper.thisrc.select[key]
		})
	}
	paper.thispaper.thisrc.select_format = items_rc
	
	return paper
}

/**
 * 格式化试卷导航菜单
 * @param {Object} paper
 */
function formatPaperMenu(paper){
	let menuList = [
		{
			id: 1,
			name: '听力',
			namekey: 'listen',
			children: [
				{
					id: 11,
					name: 'Part A',
					namekey: 'listen-A'
				},
				{
					id: 12,
					name: 'Part B',
					namekey: 'listen-B'
				}
			]
		},
		{
			id: 2,
			name: '阅读',
			namekey: 'read',
			children: [
				{
					id: 21,
					name: 'Part A',
					namekey: 'read-A'
				},
				{
					id: 22,
					name: 'Part B',
					namekey: 'read-B'
				},
				{
					id: 23,
					name: 'Part C',
					namekey: 'read-C'
				}
			]
		},
		{
			id: 3,
			name: '写作',
			namekey: 'write',
			children: [
				{
					id: 31,
					name: 'Part A',
					namekey: 'write-A'
				},
				{
					id: 32,
					name: 'Part B',
					namekey: 'write-B'
				}
			]
		}
	];
	
	//获取听力A的子菜单项
	let thisla_children = []
	let thisla_first_index = 0
	let thisla_last_index = 0
	paper.thisla.voice.forEach((item, index) => {
		thisla_first_index = index * item.info.length + 1
		thisla_last_index += item.info.length
		thisla_children.push({
			id: 111 + index,
			name: thisla_first_index + '-' + thisla_last_index,
			namekey:'listen-A'
		})
	});
	menuList[0].children[0].children = thisla_children
	
	//获取阅读B的子菜单项
	let thisrb_children = []
	let thisrb_first_index = 0
	let thisrb_last_index = 0
	paper.thisrb.text.forEach((item, index) => {
		thisrb_first_index = index * item.info.length + 1
		thisrb_last_index += item.info.length
		thisrb_children.push({
			id: 221 + index,
			name: thisrb_first_index + '-' + thisrb_last_index,
			namekey:'read-B'
		})
	});
	menuList[1].children[1].children = thisrb_children
	
	return menuList
}

export default ({
	arrayColumn: arrayColumn,
	getTimeStamp: getTimeStamp,
	getMatchNumbers,
	formatSeconds: formatSeconds,
	formatPaper: formatPaper,
	formatPaperMenu: formatPaperMenu
})
