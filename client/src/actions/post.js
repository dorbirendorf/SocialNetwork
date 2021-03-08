import axios from 'axios'
import {setAlert} from './alert'
import{ GET_POSTS,GET_POST,POST_ERROR} from './types'


export const getPosts = ()=> async dispatch =>{
    try {
        const posts=await axios.get('/posts')
        dispatch({
            type:GET_POSTS,
            payload:posts.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}