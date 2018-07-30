import * as actionTypes from '../constants/types';

const initialState = {
    showLoading: false,
    showSuccess: {
        show: false,
        text: '操作成功'
    },
    showError: {
        show: false,
        text: ''
    },
};

export default function globalVal(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case actionTypes.SHOW_SUCCESS:
            return {
                ...state,
                showSuccess: {
                    show: true,
                    text: action.text
                }
            };
        case actionTypes.HIDE_SUCCESS:
            return {
                ...state,
                showSuccess: {
                    show: false,
                    text: '操作成功'
                }
            };
        case actionTypes.SHOW_ERROR:
            return {
                ...state,
                showError: {
                    show: true,
                    text: action.text
                }
            };
        case actionTypes.HIDE_ERROR:
            return {
                ...state,
                showError: {
                    show: false,
                    text: ''
                }
            };
        case actionTypes.SHOW_LOADING:
            return {
                ...state,
                showLoading: true
            };
        case actionTypes.HIDE_LOADING:
            return {
                ...state,
                showLoading: false
            };
        default:
            return state;
    }
}

