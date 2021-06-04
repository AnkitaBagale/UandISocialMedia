export const posts = [
	{
		_id: '1',
		caption: 'My first Post ever',
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
		totalLikes: 10,
		likedByViewer: true,
		savedByViewer: false,
		userId: {
			_id: '1',
			name: 'Ankita Bagale',
			userName: 'Ankita',
		},
		time: 'Fri Jun 04 2021',
	},
	{
		_id: '2',
		caption: 'My Second Post ever',
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
		totalLikes: 10,
		likedByViewer: false,
		userId: {
			_id: '2',
			name: 'Pooja Sabnani',
			userName: 'Pooja',
		},
		time: 'Fri Jun 04 2021',
	},
	{
		_id: '3',
		caption: 'My Third Post ever',
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
		totalLikes: 10,
		likedByViewer: true,
		savedByViewer: false,
		userId: {
			_id: '3',
			name: 'R. Sruthi',
			userName: 'Sruthi',
		},
		time: 'Fri Jun 04 2021',
	},
];

export const currentUser = {
	_id: '1',
	name: 'Ankita Bagale',
	userName: 'Ankita',
	bio: 'I learn and write about web development | JS is my language, @neogcamp is my country☺️',
	count: { followers: 0, following: 0, posts: 1 },
	link: 'https://ankitabagale-portfolio.netlify.app/',
};

export const users = [
	{
		_id: '1',
		name: 'Ankita Bagale',
		userName: 'Ankita',
		bio: 'I learn and write about web development | JS is my language, @neogcamp is my country☺️',
		count: { followers: 0, following: 0, posts: 1 },
		link: 'https://ankitabagale-portfolio.netlify.app/',
	},
	{
		_id: '2',
		name: 'Pooja Sabnani',
		userName: 'Pooja',
		bio: 'I learn and write about web development | JS is my language, @neogcamp is my country☺️',
		count: { followers: 0, following: 0, posts: 1 },
		link: 'https://ankitabagale-portfolio.netlify.app/',
	},
	{
		_id: '3',
		name: 'R. Sruthi',
		userName: 'Sruthi',
		bio: 'I learn and write about web development | JS is my language, @neogcamp is my country☺️',
		count: { followers: 0, following: 0, posts: 1 },
		link: 'https://ankitabagale-portfolio.netlify.app/',
	},
];
