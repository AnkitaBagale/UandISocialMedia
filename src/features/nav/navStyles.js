export const logoTitleStyle = {
	fontSize: '2rem',
	fontFamily: 'Roboto Slab',
	fontWeight: '500',
	color: 'pink.800',
};

export const AndSymbolStyle = {
	fontSize: '1rem',
	marginRight: '0.1875rem',
	color: 'gray.800',
};

export const logoTaglineStyle = {
	fontSize: '0.625rem',
	fontWeight: '500',
	letterSpacing: '1px',
	color: 'gray.800',
	display: { base: 'none', md: 'block', lg: 'block', xl: 'block' },
};

export const navWrapperStyle = {
	bg: 'white',
	color: 'gray.800',
	minH: '60px',
	py: { base: 2 },
	px: { base: '1.5rem' },
	alignItems: 'center',
	justifyContent: 'space-between',
	boxShadow: '0px 0px 10px 4px rgb(0 0 0 / 5%)',
};

export const iconWrapperStyle = {
	flex: { base: 1, md: 'auto' },
	ml: { base: -2 },
	display: { base: 'flex', md: 'none' },
};

export const avatarWrapperStyle = {
	as: 'span',
	_hover: {
		bg: 'gray.100',
	},
	p: 0,
};

export const avatarStyle = {
	as: 'span',
	size: 'xs',
	_hover: {
		bg: 'pink.900',
	},
};

export const iconNavItemStyle = {
	as: 'span',
	minW: '1.5rem',
	color: 'gray.700',
	height: '1.5rem',
	_hover: {
		color: 'pink.900',
	},
	_active: {
		color: 'pink.900',
	},
};
