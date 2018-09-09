import {API_BASE} from '../config/env';
import axios from 'axios';

export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_REJECTED = "FETCH_REJECTED";

export const NEW_PENDING = "NEW_PENDING";
export const NEW_FULFILLED = "NEW_FULFILLED";
export const NEW_REJECTED = "NEW_REJECTED";

export const DELETE_PENDING = "DELETE_PENDING";
export const DELETE_FULFILLED = "DELETE_FULFILLED";
export const DELETE_REJECTED = "DELETE_REJECTED";

export const UPDATE_PENDING = "UPDATE_PENDING";
export const UPDATE_FULFILLED = "UPDATE_FULFILLED";
export const UPDATE_REJECTED = "UPDATE_REJECTED";

export function fetchParameterTypes() {
    return dispatch => {
        dispatch({
            type: "FETCH",
            payload: axios.get(`${API_BASE}/parameterTypes`)
                .then(result => result.data)
        })
    }
}

export function newParameterTypes(name) {
    return dispatch => {
        dispatch({
            type: "NEW",
            payload: axios.post(`${API_BASE}/parameterTypes`, {
                name
            }).then(result => result.data)
        });

    }
}

export function deleteParameterTypes(id) {
    return dispatch => {
        dispatch({
            type: "DELETE",
            payload: axios.delete(`${API_BASE}/parameterTypes/${id}`)
                .then(result => Object.assign({}, result, {id}))
        })

    }
}

export function updateParameterTypes(id, name ){
    return dispatch => {
        dispatch({
            type: "UPDATE",
            payload: axios.put(`${API_BASE}/parameterTypes/${id}`, {
                name
            })
        })
    }
}