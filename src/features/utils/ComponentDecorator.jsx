export const ComponentDecorator = (href, text, key) => (
	<a href={href} key={key} target='_blank' rel='noreferrer'>
		{text}
	</a>
);
