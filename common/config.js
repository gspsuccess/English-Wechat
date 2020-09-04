class Config{
	constructor() {
	    
	}
}

Config.voiceImgs = {
	stop:'http://img.intelirri.com/voice.png',
	play:'http://img.intelirri.com/voice.gif'
}

Config.results = {
	ok:{
		name: 'circle-fill',
		size: 32,
		color: '#02bf6c'
	},
	no:{
		name: 'close-fill',
		size: 32,
		color: '#ff4d4f'
	}
}

Config.menuList = [
	{
		id: 1,
		name: '听力',
		namekey: 'listen',
		children: [
			{
				id: 11,
				name: 'Part A',
				namekey:'listen-A',
				children: [
					{
						id: 111,
						name: '1-3',
						namekey:'listen-A'
					},
					{
						id: 112,
						name: '4-6',
						namekey:'listen-A'
					},
					{
						id: 113,
						name: '7-10',
						namekey:'listen-A'
					},
					{
						id: 114,
						name: '11-13',
						namekey:'listen-A'
					},
					{
						id: 115,
						name: '14-16',
						namekey:'listen-A'
					},
					{
						id: 116,
						name: '17-20',
						namekey:'listen-A'
					}
				]
			},
			{
				id: 12,
				name: 'Part B',
				namekey:'listen-B'
			}
		]
	},
	{
		id: 2,
		name: '阅读',
		namekey:'read',
		children: [
			{
				id: 21,
				name: 'Part A',
				namekey:'read-A'
			},
			{
				id: 22,
				name: 'Part B',
				namekey:'read-B',				
				children: [
					{
						id: 221,
						name: 'Text 1',
						namekey:'read-B'
					},
					{
						id: 222,
						name: 'Text 2',
						namekey:'read-B'
					},
					{
						id: 223,
						name: 'Text 3',
						namekey:'read-B'
					}
				]
			},
			{
				id: 23,
				name: 'Part C',
				namekey:'read-C'
			}
		]
	},
	{
		id: 3,
		name: '写作',
		namekey:'write',
		children: [
			{
				id: 41,
				name: 'Part A',
				namekey:'write-A'
			},
			{
				id: 41,
				name: 'Part B',
				namekey:'write-B'
			}
		]
	}
]

module.exports = { 
	Config: Config ,
}