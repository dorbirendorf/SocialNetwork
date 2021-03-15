import axios from 'axios'
import {setAlert} from './alert'
import{ GET_POSTS,GET_POST,POST_ERROR,UPDATE_LIKES,DELETE_POST, ADD_POST,ADD_COMMENT,REMOVE_COMMENT} from './types'


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

export const getPost = (postId)=> async dispatch =>{
    try {
        const res=await axios.get(`/posts/${postId}`)
        dispatch({
            type:GET_POST,
            payload:res.data
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
        const res=await axios.put(`/posts/like/${postId}`)
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
        const res=await axios.put(`/posts/unlike/${postId}`)
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

export const deletePost = (postId)=> async dispatch =>{
    try {
        await axios.delete(`/posts/${postId}`)
        dispatch({
            type:DELETE_POST,
            payload:postId
        })
        dispatch(setAlert('Post removed','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}

export const addPost = FormData=> async dispatch =>{
    try {
        const config={
            Headers:{
                'Content-type':'application/json'
            }
        }
        const res=await axios.post(`/posts`,FormData,config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post Created','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}

export const addComment = (postId, formData) => async dispatch => {
    try {
      const res = await axios.put(`/posts/comment/${postId}`, formData);
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
  
      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete comment
  export const deleteComment = (postId, commentId) => async dispatch => {
    try {
      await axios.delete(`/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
  
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
