import { USER_PAGE_LOADED, SUBMIT_USER, DELETE_USER, SET_EDIT_USER, EDIT_USER } from '../actions/types';

const initialState = {
    users: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        //USER
        case USER_PAGE_LOADED:
            return {
                user: action.data.user,
            };
        case SUBMIT_USER:
            return {
                ...state,
                users: ([action.data.user]).concat(state.user),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.id),
            };
        case SET_EDIT_USER:
            return {
                ...state,
                userToEdit: action.user,
            };
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user._id === action.data.user._id) {
                        return {
                            ...action.data.user,
                        }
                    }
                    return user;
                }),
                userToEdit: undefined,
            };

        default:
            return state;
    }
};