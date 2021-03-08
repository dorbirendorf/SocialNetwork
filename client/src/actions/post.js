import axios from 'axios'
import {setAlert} from './alert'
import{ GET_POSTS,GET_POST,POST_ERROR,UPDATE_LIKES} from './types'


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

export const addLike = (postId)=> async dispatch =>{
    try {
        const res=await axios.put(`posts/like/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}


export const removeLike = (postId)=> async dispatch =>{
    try {
        const res=await axios.put(`posts/unlike/${postId}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{postId,likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}

