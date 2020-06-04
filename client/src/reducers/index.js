import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import itemsReducer from './itemsReducer'
import paymentReducer from './paymentReducer'

export default combineReducers({
    auth: authReducer,
    item: itemsReducer,
    cart: cartReducer,
    user: userReducer,
    payment: paymentReducer,
    form: formReducer

})