import {ADD_POST, GET_ERRORS} from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				post: [action.payload, ...state.posts]
			};
		default:
			return state;
	}
};