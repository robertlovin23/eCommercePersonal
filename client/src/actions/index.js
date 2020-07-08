import axios from 'axios'
import { FETCH_USER, 
        FETCH_USERS, 
        ADD_PAYMENT, 
        FETCH_ITEM, 
        CREATE_ITEM, 
        EDIT_ITEM, 
        FETCH_ITEMS, 
        DELETE_ITEM, 
        ADD_CART, 
        DELETE_FROM_CART, 
        FETCH_CART, 
        MAKE_CART, 
        ADD_LIKE,
        DELETE_LIKE, 
        ADD_COMMENT,
        DELETE_COMMENT,
        ADD_COMMENT_LIKE,
        DELETE_COMMENT_LIKE,
        DELETE_CART, 
        USER_PAY
     } from './types'
import history from '../components/history'

export const fetchUser = () => async (dispatch) => {
    const response = await axios.get('/api/current_user')
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
}

export const fetchUsers = () => async (dispatch) => {
    const response = await axios.get('/api/users')
    dispatch({
        type: FETCH_USERS,
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

export const userPay = () => async (dispatch) => {
    const response = await axios.get(`/api/secret`)
    dispatch({
        type: USER_PAY,
        payload: response.data
    })
    console.log(response.data)
}

export const fetchCart = (id) => async (dispatch) => {
    const response = await axios.get(`/api/cart/${id}`)
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
    const response = await axios.patch(`/api/cart/add/${id}`)
    console.log(response)
    dispatch({
        type: ADD_CART,
        payload: response.data
    })
    
}

export const addPayment = () => async (dispatch) => {
    const response = await axios.post('/api/record-payment')
    dispatch({
        type: ADD_PAYMENT,
        payload: response.data 
    })
    history.push("/")
}

export const deleteFromCart = (id) => async(dispatch) => {
    const response = await axios.patch(`/api/cart/delete/${id}`)
    dispatch({
        type: DELETE_FROM_CART,
        payload: response.data
    })
}

export const addLike = (id) => async(dispatch) => {
    const response = await axios.patch(`/api/likes/${id}`)
    dispatch({
        type: ADD_LIKE,
        payload: response.data
    })
    history.push("/")
}

export const deleteLike = (id) => async(dispatch) => {
    const response = await axios.patch(`/api/likes/${id}/delete`)
    dispatch({
        type: DELETE_LIKE,
        payload: response.data
    })
    history.push("/")
}

export const addComment = (id,formValues) => async (dispatch) => {
    const response = await axios.patch(`/api/comments/${id}`, formValues)
    dispatch({
        type: ADD_COMMENT,
        payload: response.data
    })
    console.log(response.data)
}

export const addCommentLike = (id,commentId) => async (dispatch) => {
    const response = await axios.patch(`/api/comments/like/${id}`,{commentId})
    dispatch({
        type: ADD_COMMENT_LIKE,
        payload: response.data
    })
    console.log(response.data)
}

export const deleteCommentLike = (id,commentId) => async (dispatch) => {
    const response = await axios.patch(`/api/comments/${id}/like/delete`, {commentId})
    dispatch({
        type: DELETE_COMMENT_LIKE,
        payload: response.data
    })
    console.log(response.data)
}

export const deleteComment = (id,commentId) => async (dispatch) => {
    const response = await axios.patch(`/api/comments/${id}/delete`, {commentId})
    dispatch({
        type: DELETE_COMMENT,
        payload: response.data
    })
    console.log(response.data)
}

export const deleteCart = (id) => async (dispatch) => {
    await axios.delete(`/api/cart/${id}`)
    dispatch({
        type: DELETE_CART,
        payload: id
    })
    history.push("/")
}

export const fetchItems = () => async (dispatch) => {
    const response = await axios.get('/api/items')
    dispatch({
        type: FETCH_ITEMS,
        payload: response.data
    })
}

export const createItem = (formValues,files) => async (dispatch,getState) => {
    const { twitterId } = getState().auth;
    const response = await axios.post('/api/createItem', {...formValues, files, twitterId})
    dispatch({
        type: CREATE_ITEM,
        payload: response.data
    })
    history.push("/")
}

export const editItem = (id,formValues,images) => async (dispatch) => {
    const response = await axios.patch(`/api/items/${id}`, formValues, images)
    dispatch({
        type: EDIT_ITEM,
        payload: response.data
    })
    console.log(response)
    history.push("/")
}

export const deleteItem = (id) => async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    dispatch({
        type: DELETE_ITEM,
        payload: id
    })
    history.push("/")
}