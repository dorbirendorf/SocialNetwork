import axios from 'axios'
import {setAlert} from '../actions/alert'
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,GET_REPOS,NO_REPOS,GET_PROFILES,CLEAR_PROFILE} from './types'


export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res=await axios.get('/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    }
}

export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res=await axios.post('/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit?'profile updated!':'profile created!','success'))

        if(!edit){history.push('/dashboard')}

    } catch (error) {
        const errors=error.response.data.errors
          if(errors){
              errors.forEach(e => {
                 dispatch(setAlert(e.msg,'danger')) 
              });
          }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });

    }
}

export const addExperience = (formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.put('/profile/experience',formData,config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('experience added!','success'))
        history.push('/dashboard')

    } catch (error) {
        const errors=error.response.data.errors
          if(errors){
              errors.forEach(e => {
                 dispatch(setAlert(e.msg,'danger')) 
              });
          }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });

    }
}


export const addEducation = (formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res=await axios.put('/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education added!','success'))
        history.push('/dashboard')

    } catch (error) {
        const errors=error.response.data.errors
          if(errors){
              errors.forEach(e => {
                 dispatch(setAlert(e.msg,'danger')) 
              });
          }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
          });

    }
}

export const deleteExperience = (id) =>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.delete(`/profile/experience/${id}`,config)

        dispatch(setAlert('Experience deleted!','success'))
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

    } catch (err) {
        console.error(err)
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    };

// Delete education
export const deleteEducation = (id) => async dispatch => {
    try {
      const res = await axios.delete(`/profile/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        console.error(err)
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    };

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
      const res = await axios.get(`/profile/user/${userId}`);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
      const res = await axios.get(`/profile/github/${username}`);
  
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NO_REPOS
      });
    }
  };

  
// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
  
    try {
      const res = await axios.get('/profile');
  
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };