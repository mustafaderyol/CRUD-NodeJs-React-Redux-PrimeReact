import {
    FETCH_PENDING,
    FETCH_FULFILLED,
    FETCH_REJECTED,


    NEW_PENDING,
    NEW_FULFILLED,
    NEW_REJECTED,

    DELETE_PENDING,
    DELETE_FULFILLED,
    DELETE_REJECTED,

    UPDATE_PENDING,
    UPDATE_FULFILLED,
    UPDATE_REJECTED
} from '../actions/parameterTypes';

const initialState = {
    fetching: false,
    dataList: [],
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type){
        case FETCH_PENDING:
        return {
            ...state,
            fetching: true
        };
        case FETCH_FULFILLED:
            return {
                ...state,
                dataList: action.payload,
                fetching: false
            };
        case FETCH_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };

        // NEW
        case NEW_PENDING:
            return {
                ...state,
                fetching: true
            };
        case NEW_FULFILLED:
            return {
                ...state,
                dataList: state.dataList.concat(action.payload),
                fetching: false
            };
        case NEW_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };

        // DELETE
        case DELETE_PENDING:
            return {
                ...state,
            };
        case DELETE_FULFILLED:
            return {
                ...state,
                dataList: state.dataList.filter(item => item._id !== action.payload.id),
            };
        case DELETE_REJECTED:
            return {
                ...state,
                error: action.payload,
            };

        // UPDATE
        case UPDATE_PENDING:
            return {
                ...state,
                fetching: true
            };
        case UPDATE_FULFILLED:
            const arrayList = state.dataList;
            arrayList.splice(arrayList.findIndex(item => item._id === action.payload.data._id), 1 , action.payload.data);
            return {
                ...state,
                dataList: arrayList,
                fetching: false,
                done: true
            };
        case UPDATE_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}