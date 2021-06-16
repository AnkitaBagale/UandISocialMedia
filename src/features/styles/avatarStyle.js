const commonStyle = {
	bg: 'pink.700',
	color: 'white',
};

export const mdAvatarStyle = {
	mr: '1rem',
	size: 'md',
	...commonStyle,
};

export const avatarStyle = {
	width: { md: '1.8rem', base: '2.5rem' },
	height: { md: '1.8rem', base: '2.5rem' },
	border: '3px double',
	as: 'span',
	size: 'xs',
	...commonStyle,
};

export const smallAvatarStyle = {
	mr: '1rem',
	size: 'sm',
	...commonStyle,
};

export const profileAvatarStyle = {
	size: '2xl',
	mr: { md: '2rem', base: '0' },
	mb: '2rem',
	...commonStyle,
};
