import { ADD_CART,DELETE_FROM_CART,FETCH_CART, MAKE_CART, DELETE_CART } from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_CART:
            return action.payload
        case ADD_CART:
            return {...state, [action.payload.id]: action.payload}
        case MAKE_CART:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_FROM_CART: 
            return _.omit(state, [action.payload])
        case DELETE_CART:
            return _.omit(state, [action.payload])
        default:
            return state;
    }
}