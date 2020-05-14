import axios from 'axios'
import { FETCH_USER, FETCH_ITEM, CREATE_ITEM, EDIT_ITEM, FETCH_ITEMS, DELETE_ITEM, ADD_CART, DELETE_CART, FETCH_CART, MAKE_CART, ADD_LIKE } from './types'
import { bindActionCreators } from 'redux'

export const fetchUser = () => async (dispatch) => {
    const response = await axios.get('/api/current_user')
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
}

export const fetchItem = (id) => async (dispatch) => {
    const response = await axios.get(`/api/items/${id}`)
    dispatch({
        type: FETCH_ITEM,
        payload: response.data
    })
}

export const userPay = (token) => async (dispatch) => {
    const response = await axios.post(`/api/items/stripe`, token)
    dispatch({
        type: FETCH_ITEM,
        payload: response.data
    })
    console.log(response.data)
}

export const fetchCart = () => async (dispatch) => {
    const response = await axios.get(`/api/cart`)
    dispatch({
        type: FETCH_CART,
        payload: response.data
    })
}

export const makeCart = () => async(dispatch) => {
    // const { twitterId } = getState().auth
    const response = await axios.post(`/api/cart/add`)
    dispatch({
        type: MAKE_CART,
        payload: response.data
    })
}
export const addToCart = (id) => async(dispatch) => {
    // const { twitterId } = getState().auth
    const response = await axios.patch(`/api/cart/add/${id}`)
    dispatch({
        type: ADD_CART,
        payload: response.data
    })
}

export const addLike = (id) => async(dispatch) => {
    const response = await axios.patch(`/api/likes/${id}`)
    dispatch({
        type: ADD_LIKE,
        payload: response.data
    })
}

// export const deleteFromCart = (id) => async (dispatch) => {
//     const response = await axios.delete()
//     return{
//         type: DELETE_CART,
//         payload: id
//     }
// }

export const fetchItems = () => async (dispatch) => {
    const response = await axios.get('/api/items')
    dispatch({
        type: FETCH_ITEMS,
        payload: response.data
    })
}

export const createItem = (formValues) => async (dispatch,getState) => {
    const { twitterId } = getState().auth;
    const response = await axios.post('/api/createItem',{...formValues, twitterId})
    dispatch({
        type: CREATE_ITEM,
        payload: response.data
    })
}

export const editItem = (id,formValues) => async (dispatch) => {
    const response = await axios.patch(`/api/items/${id}`, formValues)
    dispatch({
        type: EDIT_ITEM,
        payload: response.data
    })
}

export const deleteItem = (id) => async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    dispatch({
        type: DELETE_ITEM,
        payload: id
    })
}