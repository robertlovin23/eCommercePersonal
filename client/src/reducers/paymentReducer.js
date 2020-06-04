import {USER_PAY, ADD_PAYMENT} from '../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case USER_PAY:
            return action.payload;
        case ADD_PAYMENT:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}