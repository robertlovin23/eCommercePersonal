import {FETCH_ITEM, CREATE_ITEM, EDIT_ITEM, FETCH_ITEMS, DELETE_ITEM,ADD_LIKE, DELETE_LIKE, ADD_COMMENT, DELETE_COMMENT, ADD_COMMENT_LIKE, DELETE_COMMENT_LIKE } from '../actions/types'
import _ from 'lodash'

export default (state = {},action) => {
    switch(action.type){
        case FETCH_ITEMS:
            return action.payload
        case FETCH_ITEM:
            return action.payload
        case CREATE_ITEM:
            return {...state, [action.payload.id]: action.payload}
        case ADD_LIKE:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_LIKE:
            return {...state, [action.payload.id]: action.payload}
        case ADD_COMMENT:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_COMMENT:
            return {...state, [action.payload.id]: action.payload}
        case ADD_COMMENT_LIKE:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_COMMENT_LIKE:
            return {...state, [action.payload.id]: action.payload}
        case EDIT_ITEM:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_ITEM:
            return _.omit(state, [action.payload])
        default:
            return state;
    }

}