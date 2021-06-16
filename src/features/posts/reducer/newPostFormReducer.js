export const initialStateOfPostForm = {
	caption: '',
	content: '',
	contentError: '',
};

export const ACTIONS = {
	SET_CAPTION: 'SET_CAPTION',
	SET_CONTENT: 'SET_CONTENT',
	SET_CONTENT_ERROR: 'SET_CONTENT_ERROR',
	CLEAR_ERRORS: 'CLEAR_ERRORS',
	CLEAR_FORM: 'CLEAR_FORM',
	EMOJI_CLICKED: 'EMOJI_CLICKED',
};

export const newPostFormReducer = (state, { type, payload }) => {
	const {
		SET_CAPTION,
		SET_CONTENT,
		SET_CONTENT_ERROR,
		CLEAR_ERRORS,
		CLEAR_FORM,
		EMOJI_CLICKED,
	} = ACTIONS;

	switch (type) {
		case SET_CAPTION: {
			return { ...state, caption: payload.caption };
		}
		case EMOJI_CLICKED: {
			return { ...state, content: state.content + payload.emoji };
		}
		case SET_CONTENT: {
			return { ...state, content: payload.content };
		}
		case SET_CONTENT_ERROR: {
			return { ...state, contentError: payload.error };
		}
		case CLEAR_ERRORS: {
			return { ...state, contentError: '' };
		}
		case CLEAR_FORM: {
			return initialStateOfPostForm;
		}
		default:
			throw new Error('Invalid Action');
	}
};
