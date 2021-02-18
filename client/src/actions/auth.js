import axios from 'axios'
import {setAlert} from './alert'
import {REGISTER_FAIL,REGISTER_SUCCESS,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS } from './types'
import setAuthToken from '../utils/setAuthToken'


//load from localStorage
export const loadUser= ()=> async dispatch=>{

    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'))
    }
    try {
        const res=await axios.get('/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//register user
export const register=({name,email,password})=>async dispatch=>{

    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body=JSON.stringify({name,email,password})

    try {
        const res=await axios.post('/users',body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())

    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(e => {
               dispatch(setAlert(e.msg,'danger')) 
            });
        }
        dispatch({
            type:REGISTER_FAIL
        })
        
        
    }
} 

//login user
export const login=(email,password)=>async dispatch=>{

    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body=JSON.stringify({email,password})

    try {
        const res=await axios.post('/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(e => {
               dispatch(setAlert(e.msg,'danger')) 
            });
        }
        dispatch({
            type:LOGIN_FAIL
        })
        
        
    }
} 