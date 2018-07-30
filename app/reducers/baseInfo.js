import * as actionTypes from '../constants/types';

const initialState = {
    games: [],
    users: [],
};

export default function baseInfo(state = initialState, action) {
    console.info(action);
    switch (action.type) {
        case actionTypes.GET_BASEINFO_USER_SUCCESS:
            let result = action.json;
            return {
                ...state,
                users: result.users,
                games: result.games
            };
        default:
            return state;
    }
}
